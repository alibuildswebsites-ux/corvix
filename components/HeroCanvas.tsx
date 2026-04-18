"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 120; // pixels
const PULSE_RADIUS = 150;         // pixels — cursor proximity boost radius
const BLOOM_OPACITY = 0.045;
const BLOOM_LERP = 0.08;
const FAR_Z_MAX = -1.0;
const NEAR_Z_MIN = 0.5;

const ACCENT = new THREE.Color("#0077FF");
const WHITE = new THREE.Color("#F5F5F5");

type Layer = "far" | "mid" | "near";

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  color: THREE.Color;
  opacity: number;
  layer: Layer;
}

function layerOf(z: number): Layer {
  if (z < FAR_Z_MAX) return "far";
  if (z >= NEAR_Z_MIN) return "near";
  return "mid";
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL availability check
    try {
      const testCanvas = document.createElement("canvas");
      const ctx = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!ctx) return;
    } catch {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    // Resize handler
    let w = 0, h = 0;
    const resize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ── Particles ──────────────────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const z = (Math.random() - 0.5) * 4;
      const layer = layerOf(z);
      const speedMult = layer === "far" ? 0.4 : layer === "near" ? 1.8 : 1.0;
      const opacityMult = layer === "far" ? 0.5 : layer === "near" ? 1.2 : 1.0;
      const rawOpacity = 0.3 + Math.random() * 0.7;
      return {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z,
        vx: (Math.random() - 0.5) * 0.0006 * speedMult,
        vy: (Math.random() - 0.5) * 0.0006 * speedMult,
        vz: (Math.random() - 0.5) * 0.0003 * speedMult,
        color: Math.random() < 0.6 ? ACCENT.clone() : WHITE.clone(),
        opacity: Math.min(rawOpacity * opacityMult, 1.0),
        layer,
      };
    });

    // Separate particles by layer for geometry building
    const farParticles  = particles.filter(p => p.layer === "far");
    const midParticles  = particles.filter(p => p.layer === "mid");
    const nearParticles = particles.filter(p => p.layer === "near");

    // Build a Points object for a given subset of particles
    function buildPoints(
      subset: Particle[],
      size: number
    ): { geo: THREE.BufferGeometry; mat: THREE.PointsMaterial; pts: THREE.Points } {
      const pos = new Float32Array(subset.length * 3);
      const col = new Float32Array(subset.length * 3);
      subset.forEach((p, i) => {
        pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
        col[i * 3]     = p.color.r * p.opacity;
        col[i * 3 + 1] = p.color.g * p.opacity;
        col[i * 3 + 2] = p.color.b * p.opacity;
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size, vertexColors: true, sizeAttenuation: true, transparent: true });
      const pts = new THREE.Points(geo, mat);
      return { geo, mat, pts };
    }

    const far  = buildPoints(farParticles,  0.018);
    const mid  = buildPoints(midParticles,  0.030);
    const near = buildPoints(nearParticles, 0.045);
    scene.add(far.pts);
    scene.add(mid.pts);
    scene.add(near.pts);

    // ── Constellation lines ────────────────────────────────────────────────
    const maxLines = PARTICLE_COUNT * 10;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors    = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors,    3));
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineSegments);

    // ── Cursor bloom ───────────────────────────────────────────────────────
    const bloomGeo = new THREE.CircleGeometry(0.8, 32);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: BLOOM_OPACITY,
      depthWrite: false,
    });
    const bloom = new THREE.Mesh(bloomGeo, bloomMat);
    bloom.position.set(0, 0, 0.5);
    const bloomTarget = new THREE.Vector3();
    if (!prefersReduced) scene.add(bloom);

    // ── Mouse parallax ─────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let camOffsetX = 0, camOffsetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── IntersectionObserver ───────────────────────────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(mount);

    // Helper: update a layer's geometry positions each frame
    function updateLayerPositions(subset: Particle[], geo: THREE.BufferGeometry) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      subset.forEach((p, i) => pos.setXYZ(i, p.x, p.y, p.z));
      pos.needsUpdate = true;
    }

    // ── Static snapshot for reduced motion ─────────────────────────────────
    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        far.geo.dispose();  far.mat.dispose();
        mid.geo.dispose();  mid.mat.dispose();
        near.geo.dispose(); near.mat.dispose();
        lineGeo.dispose(); lineMaterial.dispose();
        bloomGeo.dispose(); bloomMat.dispose();
        renderer.dispose();
        ro.disconnect();
        observer.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    }

    // ── Pre-allocated scratch for per-frame projection ─────────────────────
    const _v = new THREE.Vector3();
    const projected = new Float32Array(PARTICLE_COUNT * 2);

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Move all particles and wrap boundaries
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (p.x >  5) p.x = -5; if (p.x < -5) p.x =  5;
        if (p.y >  3) p.y = -3; if (p.y < -3) p.y =  3;
        if (p.z >  2) p.z = -2; if (p.z < -2) p.z =  2;
      }

      // Update geometry positions per layer
      updateLayerPositions(farParticles,  far.geo);
      updateLayerPositions(midParticles,  mid.geo);
      updateLayerPositions(nearParticles, near.geo);

      // Project all particles to screen space (pre-allocated, no allocations)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        _v.set(particles[i].x, particles[i].y, particles[i].z).project(camera);
        projected[i * 2]     = (_v.x *  0.5 + 0.5) * w;
        projected[i * 2 + 1] = (-_v.y * 0.5 + 0.5) * h;
      }

      // Cursor screen position for proximity boost
      const cursorSx = (mouseX *  0.5 + 0.5) * w;
      const cursorSy = (-mouseY * 0.5 + 0.5) * h;

      // Draw constellation lines with proximity pulse
      const lp = lineGeo.attributes.position as THREE.BufferAttribute;
      const lc = lineGeo.attributes.color    as THREE.BufferAttribute;
      let lineIdx = 0;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j++) {
          const dx   = projected[i * 2]     - projected[j * 2];
          const dy   = projected[i * 2 + 1] - projected[j * 2 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const midSx = (projected[i * 2]     + projected[j * 2])     * 0.5;
            const midSy = (projected[i * 2 + 1] + projected[j * 2 + 1]) * 0.5;
            const cdx = midSx - cursorSx;
            const cdy = midSy - cursorSy;
            const cursorDist = Math.sqrt(cdx * cdx + cdy * cdy);
            const proximityBoost = cursorDist < PULSE_RADIUS
              ? (1 - cursorDist / PULSE_RADIUS) * 0.4
              : 0;
            const alpha = Math.min((1 - dist / CONNECTION_DISTANCE) * 0.3 + proximityBoost, 0.7);

            lp.setXYZ(lineIdx * 2,     particles[i].x, particles[i].y, particles[i].z);
            lp.setXYZ(lineIdx * 2 + 1, particles[j].x, particles[j].y, particles[j].z);
            lc.setXYZ(lineIdx * 2,     ACCENT.r * alpha, ACCENT.g * alpha, ACCENT.b * alpha);
            lc.setXYZ(lineIdx * 2 + 1, ACCENT.r * alpha, ACCENT.g * alpha, ACCENT.b * alpha);
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lp.needsUpdate = true;
      lc.needsUpdate = true;

      // Bloom: unproject cursor to world space, lerp bloom mesh toward it
      bloomTarget.set(mouseX, mouseY, 0.5).unproject(camera);
      bloom.position.lerp(bloomTarget, BLOOM_LERP);

      // Camera parallax
      camOffsetX += (mouseX * 0.2 - camOffsetX) * 0.05;
      camOffsetY += (mouseY * 0.1 - camOffsetY) * 0.05;
      camera.position.x = camOffsetX;
      camera.position.y = camOffsetY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      far.geo.dispose();  far.mat.dispose();
      mid.geo.dispose();  mid.mat.dispose();
      near.geo.dispose(); near.mat.dispose();
      lineGeo.dispose(); lineMaterial.dispose();
      bloomGeo.dispose(); bloomMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
