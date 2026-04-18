"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ── Material helpers ──────────────────────────────────────────────────────────
function stdMat(color: number, roughness = 0.6, metalness = 0.4) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}
function basicMat(color: number, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
  });
}

// ── Geometry helpers ──────────────────────────────────────────────────────────
function box(w: number, h: number, d: number) { return new THREE.BoxGeometry(w, h, d); }
function cyl(rt: number, rb: number, h: number, seg = 8) { return new THREE.CylinderGeometry(rt, rb, h, seg); }
function sph(r: number, seg = 16) { return new THREE.SphereGeometry(r, seg, seg); }

export default function RobotCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  // Typed greeting effect
  useEffect(() => {
    const FULL_TEXT = "Hello! I'm Corvix AI.";
    const CHAR_DELAY = 55;
    const START_DELAY = 1800;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setGreeting(FULL_TEXT);
      return;
    }

    let idx = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setShowCursor(true);
      interval = setInterval(() => {
        idx++;
        setGreeting(FULL_TEXT.slice(0, idx));
        if (idx >= FULL_TEXT.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 600);
        }
      }, CHAR_DELAY);
    }, START_DELAY);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Three.js scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL check
    try {
      const test = document.createElement("canvas");
      const ctx = test.getContext("webgl") || test.getContext("experimental-webgl");
      if (!ctx) return;
    } catch { return; }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    let w = mount.clientWidth, h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 6);

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

    // ── Lights ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const blueKey = new THREE.PointLight(0x0077ff, 2.5, 20);
    blueKey.position.set(-3, 3, 4);
    scene.add(blueKey);
    const fillLight = new THREE.PointLight(0xf5f5f5, 0.8, 20);
    fillLight.position.set(3, -1, 3);
    scene.add(fillLight);

    // ── Robot geometry ──────────────────────────────────────────────────────
    const DARK   = 0x141414;
    const STEEL  = 0x1a1a2e;
    const BLUE   = 0x0077ff;

    // Collect all disposables
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];

    function mesh(geo: THREE.BufferGeometry, mat: THREE.Material): THREE.Mesh {
      geos.push(geo); mats.push(mat);
      return new THREE.Mesh(geo, mat);
    }

    // ── Robot group (root) ──────────────────────────────────────────────────
    const robotGroup = new THREE.Group();
    robotGroup.position.set(1.2, 0, 0);
    scene.add(robotGroup);

    // Head pivot (for mouse tracking)
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 1.05, 0); // top of neck
    robotGroup.add(headPivot);

    const headMesh = mesh(box(0.7, 0.65, 0.65), stdMat(STEEL));
    headPivot.add(headMesh);

    const leftEye = mesh(sph(0.08), basicMat(BLUE));
    leftEye.position.set(-0.17, 0.05, 0.33);
    headPivot.add(leftEye);

    const rightEye = mesh(sph(0.08), basicMat(BLUE));
    rightEye.position.set(0.17, 0.05, 0.33);
    headPivot.add(rightEye);

    // Antenna
    const antennaPivot = new THREE.Group();
    antennaPivot.position.set(0, 0.35, 0);
    headPivot.add(antennaPivot);

    const antennaBase = mesh(cyl(0.03, 0.03, 0.25, 8), stdMat(BLUE, 0.3, 0.8));
    antennaBase.position.set(0, 0.125, 0);
    antennaPivot.add(antennaBase);

    const antennaTip = mesh(sph(0.06), basicMat(BLUE));
    antennaTip.position.set(0, 0.265, 0);
    antennaPivot.add(antennaTip);

    // Neck
    const neck = mesh(cyl(0.1, 0.1, 0.15, 8), stdMat(DARK));
    neck.position.set(0, 0.775, 0);
    robotGroup.add(neck);

    // Body
    const body = mesh(box(1.0, 1.1, 0.55), stdMat(DARK));
    body.position.set(0, 0.1, 0);
    robotGroup.add(body);

    // Chest panel
    const chestPanel = mesh(box(0.5, 0.35, 0.02), basicMat(BLUE, 0.6));
    chestPanel.position.set(0, 0.15, 0.28);
    robotGroup.add(chestPanel);

    // Left arm
    const leftShoulderPivot = new THREE.Group();
    leftShoulderPivot.position.set(-0.65, 0.45, 0);
    robotGroup.add(leftShoulderPivot);

    const leftUpperArm = mesh(cyl(0.1, 0.09, 0.55, 8), stdMat(STEEL));
    leftUpperArm.rotation.z = Math.PI / 2;
    leftUpperArm.position.set(-0.275, 0, 0);
    leftShoulderPivot.add(leftUpperArm);

    const leftElbowPivot = new THREE.Group();
    leftElbowPivot.position.set(-0.55, 0, 0);
    leftShoulderPivot.add(leftElbowPivot);

    const leftForearm = mesh(cyl(0.08, 0.07, 0.45, 8), stdMat(DARK));
    leftForearm.rotation.z = Math.PI / 2;
    leftForearm.position.set(-0.225, 0, 0);
    leftElbowPivot.add(leftForearm);

    // Right arm (wave pivot)
    const rightShoulderPivot = new THREE.Group();
    rightShoulderPivot.position.set(0.65, 0.45, 0);
    rightShoulderPivot.rotation.z = -0.3;
    robotGroup.add(rightShoulderPivot);

    const rightUpperArm = mesh(cyl(0.1, 0.09, 0.55, 8), stdMat(STEEL));
    rightUpperArm.rotation.z = Math.PI / 2;
    rightUpperArm.position.set(0.275, 0, 0);
    rightShoulderPivot.add(rightUpperArm);

    const rightElbowPivot = new THREE.Group();
    rightElbowPivot.position.set(0.55, 0, 0);
    rightShoulderPivot.add(rightElbowPivot);

    const rightForearm = mesh(cyl(0.08, 0.07, 0.45, 8), stdMat(DARK));
    rightForearm.rotation.z = Math.PI / 2;
    rightForearm.position.set(0.225, 0, 0);
    rightElbowPivot.add(rightForearm);

    // Left leg
    const leftHipPivot = new THREE.Group();
    leftHipPivot.position.set(-0.28, -0.55, 0);
    robotGroup.add(leftHipPivot);

    const leftLeg = mesh(cyl(0.11, 0.09, 0.7, 8), stdMat(STEEL));
    leftLeg.position.set(0, -0.35, 0);
    leftHipPivot.add(leftLeg);

    const leftFoot = mesh(box(0.18, 0.12, 0.28), stdMat(DARK));
    leftFoot.position.set(0, -0.76, 0.05);
    leftHipPivot.add(leftFoot);

    // Right leg
    const rightHipPivot = new THREE.Group();
    rightHipPivot.position.set(0.28, -0.55, 0);
    robotGroup.add(rightHipPivot);

    const rightLeg = mesh(cyl(0.11, 0.09, 0.7, 8), stdMat(STEEL));
    rightLeg.position.set(0, -0.35, 0);
    rightHipPivot.add(rightLeg);

    const rightFoot = mesh(box(0.18, 0.12, 0.28), stdMat(DARK));
    rightFoot.position.set(0, -0.76, 0.05);
    rightHipPivot.add(rightFoot);

    // ── Mouse tracking ──────────────────────────────────────────────────────
    let mouseNX = 0, mouseNY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseNX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── IntersectionObserver ────────────────────────────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(mount);

    // ── Wave state ──────────────────────────────────────────────────────────
    const waveState = { active: false, startTime: 0 };

    // ── Clock ───────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    // ── Static snapshot for reduced motion ──────────────────────────────────
    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        geos.forEach(g => g.dispose());
        mats.forEach(m => m.dispose());
        renderer.dispose();
        ro.disconnect();
        observer.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    }

    // Schedule wave start
    const waveTimeout = setTimeout(() => {
      waveState.active = true;
      waveState.startTime = clock.getElapsedTime();
    }, 300);

    // ── Animation loop ──────────────────────────────────────────────────────
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Idle bob
      robotGroup.position.y = Math.sin(t * 1.2) * 0.12;

      // Wave animation
      if (waveState.active) {
        const elapsed = t - waveState.startTime;
        const progress = Math.min(elapsed / 1.5, 1.0);
        // ease in-out quad
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        rightShoulderPivot.rotation.z = -0.3 + Math.sin(eased * Math.PI) * -1.5;
        if (progress >= 1.0) {
          waveState.active = false;
          rightShoulderPivot.rotation.z = -0.3;
        }
      }

      // Head mouse tracking (lerp)
      headPivot.rotation.y += (mouseNX * 0.25 - headPivot.rotation.y) * 0.06;
      headPivot.rotation.x += (-mouseNY * 0.15 - headPivot.rotation.x) * 0.06;

      // Antenna subtle wobble
      antennaPivot.rotation.z = Math.sin(t * 2.5) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      clearTimeout(waveTimeout);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      geos.forEach(g => g.dispose());
      mats.forEach(m => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Three.js canvas mount */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />

      {/* Typed greeting overlay */}
      {greeting && (
        <div
          aria-live="polite"
          className="absolute left-1/2 -translate-x-1/2 font-display text-corvix-accent text-lg font-semibold tracking-wide whitespace-nowrap"
          style={{ bottom: "18%", zIndex: 10 }}
        >
          {greeting}
          {showCursor && (
            <span
              className="inline-block ml-0.5 text-corvix-accent"
              style={{ animation: "blink 0.7s step-end infinite" }}
            >
              |
            </span>
          )}
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
