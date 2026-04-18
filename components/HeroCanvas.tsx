"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 120; // pixels
const ACCENT = new THREE.Color("#0077FF");
const WHITE = new THREE.Color("#F5F5F5");

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  color: THREE.Color;
  opacity: number;
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
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      vz: (Math.random() - 0.5) * 0.0003,
      color: Math.random() < 0.6 ? ACCENT.clone() : WHITE.clone(),
      opacity: 0.3 + Math.random() * 0.7,
    }));

    // Points geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.x; positions[i * 3 + 1] = p.y; positions[i * 3 + 2] = p.z;
      colors[i * 3] = p.color.r * p.opacity;
      colors[i * 3 + 1] = p.color.g * p.opacity;
      colors[i * 3 + 2] = p.color.b * p.opacity;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, sizeAttenuation: true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Line geometry (pre-allocated for max connections)
    const maxLines = PARTICLE_COUNT * 4;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineSegments);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    let camOffsetX = 0, camOffsetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // IntersectionObserver to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(mount);

    // Static snapshot for reduced motion
    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        geo.dispose();
        mat.dispose();
        lineGeo.dispose();
        lineMaterial.dispose();
        renderer.dispose();
        ro.disconnect();
        observer.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Update particles
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const col = geo.attributes.color as THREE.BufferAttribute;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        // Wrap boundaries
        if (p.x > 5) p.x = -5; if (p.x < -5) p.x = 5;
        if (p.y > 3) p.y = -3; if (p.y < -3) p.y = 3;
        if (p.z > 2) p.z = -2; if (p.z < -2) p.z = 2;
        pos.setXYZ(i, p.x, p.y, p.z);
        col.setXYZ(i, p.color.r * p.opacity, p.color.g * p.opacity, p.color.b * p.opacity);
      });
      pos.needsUpdate = true;
      col.needsUpdate = true;

      // Update constellation lines
      const lp = lineGeo.attributes.position as THREE.BufferAttribute;
      const lc = lineGeo.attributes.color as THREE.BufferAttribute;
      let lineIdx = 0;

      // Project to screen to measure pixel distance
      const w = mount.clientWidth, h = mount.clientHeight;
      const projected = particles.map((p) => {
        const v = new THREE.Vector3(p.x, p.y, p.z);
        v.project(camera);
        return { sx: (v.x * 0.5 + 0.5) * w, sy: (-v.y * 0.5 + 0.5) * h };
      });

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j++) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.3;
            lp.setXYZ(lineIdx * 2, particles[i].x, particles[i].y, particles[i].z);
            lp.setXYZ(lineIdx * 2 + 1, particles[j].x, particles[j].y, particles[j].z);
            lc.setXYZ(lineIdx * 2, ACCENT.r * alpha, ACCENT.g * alpha, ACCENT.b * alpha);
            lc.setXYZ(lineIdx * 2 + 1, ACCENT.r * alpha, ACCENT.g * alpha, ACCENT.b * alpha);
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lp.needsUpdate = true;
      lc.needsUpdate = true;

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
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
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
