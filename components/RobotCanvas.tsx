"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    let w = mount.clientWidth, h = mount.clientHeight;
    // Lower camera slightly and point it up to frame the robot nicely
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.25, 100);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 1.5, 0);

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
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    
    const dirLight = new THREE.DirectionalLight(0x0077ff, 2.5);
    dirLight.position.set(-3, 10, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);
    
    const fillLight = new THREE.PointLight(0xffffff, 1.5);
    fillLight.position.set(5, 2, -2);
    scene.add(fillLight);

    // ── GLTF Loader ─────────────────────────────────────────────────────────
    let mixer: THREE.AnimationMixer;
    let modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Add a platform/shadow catcher
    const planeGeo = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    if (prefersReduced) {
      // Don't load the heavy model for reduced motion
      renderer.render(scene, camera);
    } else {
      const loader = new GLTFLoader();
      loader.load('/RobotExpressive.glb', (gltf) => {
        const model = gltf.scene;
        // Position and scale to fit our scene nicely
        model.position.set(0, -0.5, 0);
        model.scale.set(0.6, 0.6, 0.6);
        
        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        modelGroup.add(model);

        // Animations
        mixer = new THREE.AnimationMixer(model);
        const animations = gltf.animations;

        // Find standard animations
        const idleClip = THREE.AnimationClip.findByName(animations, 'Idle');
        const waveClip = THREE.AnimationClip.findByName(animations, 'Wave');

        if (idleClip && waveClip) {
          const idleAction = mixer.clipAction(idleClip);
          const waveAction = mixer.clipAction(waveClip);

          // Start idle
          idleAction.play();

          // Play wave after a small delay
          setTimeout(() => {
            waveAction.reset();
            waveAction.setLoop(THREE.LoopOnce, 1);
            waveAction.clampWhenFinished = true;
            waveAction.crossFadeFrom(idleAction, 0.2, true);
            waveAction.play();

            // When wave finishes, crossfade back to idle
            mixer.addEventListener('finished', (e) => {
              if (e.action === waveAction) {
                idleAction.reset();
                idleAction.crossFadeFrom(waveAction, 0.5, true);
                idleAction.play();
              }
            });
          }, 300);
        }
      });
    }

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

    // ── Clock ───────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    if (prefersReduced) {
      return () => {
        ro.disconnect();
        observer.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    }

    // ── Animation loop ──────────────────────────────────────────────────────
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      // Subtly rotate the entire model group towards the mouse
      modelGroup.rotation.y += (mouseNX * 0.5 - modelGroup.rotation.y) * 0.05;
      modelGroup.rotation.x += (-mouseNY * 0.1 - modelGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
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