"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const BLOOM_OPACITY = 0.045;
const BLOOM_LERP = 0.08;
const FAR_Z_MAX = -1.0;
const NEAR_Z_MIN = 0.5;
const TARGET_FRAME_MS = 1000 / 60;
const QUALITY_DOWNGRADE_WINDOW_MS = 1800;
const QUALITY_UPGRADE_WINDOW_MS = 7000;

const ACCENT = new THREE.Color("#0077FF");
const WHITE = new THREE.Color("#F5F5F5");

type Layer = "far" | "mid" | "near";

type HeroQuality = {
  name: "ultra" | "high" | "medium" | "low";
  particleCount: number;
  maxConnections: number;
  connectionDistance: number;
  maxDpr: number;
  simulationHz: number;
  enableLines: boolean;
  enableBloom: boolean;
  enablePointer: boolean;
};

const QUALITY_PROFILES: HeroQuality[] = [
  {
    name: "ultra",
    particleCount: 500,
    maxConnections: 2600,
    connectionDistance: 275,
    maxDpr: 2,
    simulationHz: 60,
    enableLines: true,
    enableBloom: true,
    enablePointer: true,
  },
  {
    name: "high",
    particleCount: 360,
    maxConnections: 1900,
    connectionDistance: 245,
    maxDpr: 1.5,
    simulationHz: 60,
    enableLines: true,
    enableBloom: true,
    enablePointer: true,
  },
  {
    name: "medium",
    particleCount: 240,
    maxConnections: 950,
    connectionDistance: 220,
    maxDpr: 1.25,
    simulationHz: 45,
    enableLines: true,
    enableBloom: false,
    enablePointer: false,
  },
  {
    name: "low",
    particleCount: 110,
    maxConnections: 300,
    connectionDistance: 190,
    maxDpr: 1,
    simulationHz: 30,
    enableLines: true,
    enableBloom: false,
    enablePointer: false,
  },
];

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: THREE.Color;
  opacity: number;
  layer: Layer;
}

function layerOf(z: number): Layer {
  if (z < FAR_Z_MAX) return "far";
  if (z >= NEAR_Z_MIN) return "near";
  return "mid";
}

function selectInitialQuality(): HeroQuality {
  if (typeof window === "undefined") return QUALITY_PROFILES[1];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = connection?.saveData === true;
  const cores = navigator.hardwareConcurrency || 4;
  const dpr = window.devicePixelRatio || 1;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const width = window.innerWidth;

  if (reducedMotion || saveData) return QUALITY_PROFILES[3];
  if (isTouch || width < 768) return QUALITY_PROFILES[2];
  if (cores >= 8 && dpr <= 1.5) return QUALITY_PROFILES[0];
  return QUALITY_PROFILES[1];
}

function profileIndex(profile: HeroQuality) {
  return QUALITY_PROFILES.findIndex((item) => item.name === profile.name);
}

export default function HeroCanvas({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyCalledRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    try {
      const testCanvas = document.createElement("canvas");
      const ctx = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!ctx) {
        onReady?.();
        return;
      }
    } catch {
      onReady?.();
      return;
    }

    const initialQuality = selectInitialQuality();
    let quality = initialQuality;
    let qualityIdx = profileIndex(initialQuality);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, quality.maxDpr);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = h === 0 ? 1 : w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let particles: Particle[] = [];
    let farParticles: Particle[] = [];
    let midParticles: Particle[] = [];
    let nearParticles: Particle[] = [];

    function createParticles(count: number) {
      const created = Array.from({ length: count }, () => {
        const z = (Math.random() - 0.5) * 4;
        const layer = layerOf(z);
        const speedMult = layer === "far" ? 0.4 : layer === "near" ? 1.8 : 1.0;
        const opacityMult = layer === "far" ? 0.5 : layer === "near" ? 1.2 : 1.0;
        const rawOpacity = 0.3 + Math.random() * 0.7;
        return {
          x: (Math.random() - 0.5) * 25,
          y: (Math.random() - 0.5) * 10,
          z,
          vx: (Math.random() - 0.5) * 0.0006 * speedMult,
          vy: (Math.random() - 0.5) * 0.0006 * speedMult,
          vz: (Math.random() - 0.5) * 0.0003 * speedMult,
          color: Math.random() < 0.6 ? ACCENT.clone() : WHITE.clone(),
          opacity: Math.min(rawOpacity * opacityMult, 1.0),
          layer,
        } satisfies Particle;
      });

      particles = created;
      farParticles = created.filter((p) => p.layer === "far");
      midParticles = created.filter((p) => p.layer === "mid");
      nearParticles = created.filter((p) => p.layer === "near");
    }

    function buildPoints(subset: Particle[], size: number) {
      const pos = new Float32Array(subset.length * 3);
      const col = new Float32Array(subset.length * 3);
      subset.forEach((p, i) => {
        pos[i * 3] = p.x;
        pos[i * 3 + 1] = p.y;
        pos[i * 3 + 2] = p.z;
        col[i * 3] = p.color.r * p.opacity;
        col[i * 3 + 1] = p.color.g * p.opacity;
        col[i * 3 + 2] = p.color.b * p.opacity;
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
      });
      const pts = new THREE.Points(geo, mat);
      return { geo, mat, pts };
    }

    createParticles(quality.particleCount);

    let far = buildPoints(farParticles, 0.025);
    let mid = buildPoints(midParticles, 0.045);
    let near = buildPoints(nearParticles, 0.065);
    scene.add(far.pts, mid.pts, near.pts);

    const maxLineCapacity = QUALITY_PROFILES[0].maxConnections;
    const linePositions = new Float32Array(maxLineCapacity * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.28,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineSegments);

    const bloomGeo = new THREE.CircleGeometry(0.8, 24);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: BLOOM_OPACITY,
      depthWrite: false,
    });
    const bloom = new THREE.Mesh(bloomGeo, bloomMat);
    bloom.position.set(0, 0, 0.5);
    const bloomTarget = new THREE.Vector3();
    if (quality.enableBloom && !prefersReduced) scene.add(bloom);

    let mouseX = 0;
    let mouseY = 0;
    let camOffsetX = 0;
    let camOffsetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!quality.enablePointer) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!quality.enablePointer || e.touches.length === 0) return;
      mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    };

    if (quality.enablePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(mount);

    const _v = new THREE.Vector3();
    const projected = new Float32Array(QUALITY_PROFILES[0].particleCount * 2);
    const gridCols = 6;
    const gridRows = 3;
    const grid: number[][] = Array.from({ length: gridCols * gridRows }, () => []);
    const neighborOffsets = [
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ] as const;

    let rafId = 0;
    let lastFrame = performance.now();
    let lastSimulation = lastFrame;
    let performanceWindowStart = lastFrame;
    let poorFrameTime = 0;
    let goodFrameTime = 0;

    function disposeLayer(layer: {
      geo: THREE.BufferGeometry;
      mat: THREE.Material;
      pts: THREE.Points;
    }) {
      layer.geo.dispose();
      layer.mat.dispose();
      scene.remove(layer.pts);
    }

    function rebuildQuality(nextIdx: number) {
      if (nextIdx === qualityIdx) return;
      quality = QUALITY_PROFILES[nextIdx];
      qualityIdx = nextIdx;
      resize();

      disposeLayer(far);
      disposeLayer(mid);
      disposeLayer(near);

      createParticles(quality.particleCount);
      far = buildPoints(farParticles, 0.025);
      mid = buildPoints(midParticles, 0.045);
      near = buildPoints(nearParticles, 0.065);
      scene.add(far.pts, mid.pts, near.pts);
      lineGeo.setDrawRange(0, 0);
      lineSegments.visible = quality.enableLines;
      bloom.visible = quality.enableBloom && !prefersReduced;
      mouseX = 0;
      mouseY = 0;
    }

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      lastFrame = performance.now();
      lastSimulation = lastFrame;
      performanceWindowStart = lastFrame;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    function updateLayerPositions(subset: Particle[], geo: THREE.BufferGeometry) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < subset.length; i++) {
        const p = subset[i];
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true;
    }

    const cleanup = () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      disposeLayer(far);
      disposeLayer(mid);
      disposeLayer(near);
      lineGeo.dispose();
      lineMaterial.dispose();
      bloomGeo.dispose();
      bloomMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };

    if (prefersReduced) {
      renderer.render(scene, camera);
      onReady?.();
      return cleanup;
    }

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) {
        lastFrame = now;
        return;
      }

      const frameDelta = now - lastFrame;
      lastFrame = now;
      if (frameDelta > TARGET_FRAME_MS * 1.35) poorFrameTime += frameDelta;
      else poorFrameTime = Math.max(0, poorFrameTime - frameDelta * 0.35);

      const performanceWindowElapsed = now - performanceWindowStart;
      const simulationInterval = 1000 / quality.simulationHz;
      if (now - lastSimulation < simulationInterval) return;
      const delta = Math.min(now - lastSimulation, 64);
      lastSimulation = now;

      for (let i = 0; i < grid.length; i++) grid[i].length = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (delta / 16.67);
        p.y += p.vy * (delta / 16.67);
        p.z += p.vz * (delta / 16.67);
        if (p.x > 12.5) p.x = -12.5;
        if (p.x < -12.5) p.x = 12.5;
        if (p.y > 5) p.y = -5;
        if (p.y < -5) p.y = 5;
        if (p.z > 2) p.z = -2;
        if (p.z < -2) p.z = 2;

        const gx = Math.max(
          0,
          Math.min(Math.floor(((p.x + 12.5) / 25) * gridCols), gridCols - 1),
        );
        const gy = Math.max(
          0,
          Math.min(Math.floor(((p.y + 5) / 10) * gridRows), gridRows - 1),
        );
        grid[gy * gridCols + gx].push(i);
      }

      updateLayerPositions(farParticles, far.geo);
      updateLayerPositions(midParticles, mid.geo);
      updateLayerPositions(nearParticles, near.geo);

      if (quality.enableLines) {
        for (let i = 0; i < particles.length; i++) {
          _v.set(particles[i].x, particles[i].y, particles[i].z).project(camera);
          projected[i * 2] = (_v.x * 0.5 + 0.5) * w;
          projected[i * 2 + 1] = (-_v.y * 0.5 + 0.5) * h;
        }

        const lp = lineGeo.attributes.position as THREE.BufferAttribute;
        let lineIdx = 0;

        outer: for (let gy = 0; gy < gridRows; gy++) {
          for (let gx = 0; gx < gridCols; gx++) {
            const cellParticles = grid[gy * gridCols + gx];
            for (const p1Idx of cellParticles) {
              for (const [offsetX, offsetY] of neighborOffsets) {
                const nx = gx + offsetX;
                const ny = gy + offsetY;
                if (nx < 0 || nx >= gridCols || ny < 0 || ny >= gridRows) continue;

                const nextCellParticles = grid[ny * gridCols + nx];
                for (const p2Idx of nextCellParticles) {
                  if (p1Idx >= p2Idx) continue;

                  const dx = projected[p1Idx * 2] - projected[p2Idx * 2];
                  const dy = projected[p1Idx * 2 + 1] - projected[p2Idx * 2 + 1];
                  const distSq = dx * dx + dy * dy;
                  if (distSq >= quality.connectionDistance * quality.connectionDistance) continue;

                  const p1 = particles[p1Idx];
                  const p2 = particles[p2Idx];
                  lp.setXYZ(lineIdx * 2, p1.x, p1.y, p1.z);
                  lp.setXYZ(lineIdx * 2 + 1, p2.x, p2.y, p2.z);
                  lineIdx++;

                  if (lineIdx >= quality.maxConnections) break outer;
                }
              }
            }
          }
        }

        lineGeo.setDrawRange(0, lineIdx * 2);
        lp.needsUpdate = true;
      } else {
        lineGeo.setDrawRange(0, 0);
      }

      if (quality.enablePointer) {
        if (quality.enableBloom) {
          bloomTarget.set(mouseX, mouseY, 0.5).unproject(camera);
          bloom.position.lerp(bloomTarget, BLOOM_LERP);
        }
        camOffsetX += (mouseX * 0.2 - camOffsetX) * 0.05;
        camOffsetY += (mouseY * 0.1 - camOffsetY) * 0.05;
        camera.position.x = camOffsetX;
        camera.position.y = camOffsetY;
      } else {
        camOffsetX *= 0.9;
        camOffsetY *= 0.9;
        camera.position.x = camOffsetX;
        camera.position.y = camOffsetY;
      }
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (performanceWindowElapsed >= QUALITY_DOWNGRADE_WINDOW_MS) {
        const averagePoorFrameRatio = poorFrameTime / performanceWindowElapsed;
        if (averagePoorFrameRatio > 0.14 && qualityIdx < QUALITY_PROFILES.length - 1) {
          rebuildQuality(qualityIdx + 1);
        }

        if (averagePoorFrameRatio < 0.04) goodFrameTime += performanceWindowElapsed;
        else goodFrameTime = 0;

        if (goodFrameTime >= QUALITY_UPGRADE_WINDOW_MS && qualityIdx > profileIndex(initialQuality)) {
          rebuildQuality(qualityIdx - 1);
          goodFrameTime = 0;
        }

        poorFrameTime = 0;
        performanceWindowStart = now;
      }

      if (!readyCalledRef.current) {
        readyCalledRef.current = true;
        onReady?.();
      }
    };

    animate(performance.now());

    const fadeTimeout = window.setTimeout(() => {
      if (mountRef.current) mountRef.current.style.opacity = "1";
    }, 50);

    return () => {
      window.clearTimeout(fadeTimeout);
      cleanup();
    };
  }, [onReady]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-[1500ms] ease-out"
      style={{ zIndex: 0 }}
    />
  );
}
