"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 500;
const MAX_LINES_PER_PARTICLE = 15; // Increased for longer connections
const CONNECTION_DISTANCE = 275; 
const PULSE_RADIUS = 200;         
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

const vertexShader = `
  attribute vec2 lineIndices; // x = p1, y = p2
  uniform sampler2D positionsTexture;
  uniform float textureSize;
  uniform float connectionDistance;
  uniform vec2 mousePos;
  uniform float pulseRadius;
  varying float vAlpha;

  vec3 getPos(float index) {
    float y = floor(index / textureSize);
    float x = mod(index, textureSize);
    vec2 uv = vec2((x + 0.5) / textureSize, (y + 0.5) / textureSize);
    return texture2D(positionsTexture, uv).xyz;
  }

  void main() {
    vec3 p1 = getPos(lineIndices.x);
    vec3 p2 = getPos(lineIndices.y);
    
    float dist = distance(p1, p2);
    
    // Determine which particle this vertex belongs to
    vec3 pos = (mod(float(gl_VertexID), 2.0) < 0.5) ? p1 : p2;
    
    if (dist > connectionDistance) {
      vAlpha = 0.0;
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // Clip it
    } else {
      float baseAlpha = (1.0 - dist / connectionDistance) * 0.25;
      
      // Proximity boost on GPU
      vec3 mid = (p1 + p2) * 0.5;
      vec4 viewMid = modelViewMatrix * vec4(mid, 1.0);
      vec4 projMid = projectionMatrix * viewMid;
      vec2 screenMid = projMid.xy / projMid.w;
      
      float mDist = distance(screenMid, mousePos);
      float boost = 0.0;
      if (mDist < 0.3) { // 0.3 is approx 200px in clip space
        boost = (1.0 - mDist / 0.3) * 0.4;
      }
      
      vAlpha = min(baseAlpha + boost, 0.4);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    if (vAlpha <= 0.0) discard;
    gl_FragColor = vec4(uColor, vAlpha);
  }
`;

export default function HeroCanvas({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyCalledRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    let w = 0, h = 0;
    const resize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h; camera.updateProjectionMatrix();
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
      return {
        x: (Math.random() - 0.5) * 25, y: (Math.random() - 0.5) * 10, z,
        vx: (Math.random() - 0.5) * 0.0006 * speedMult,
        vy: (Math.random() - 0.5) * 0.0006 * speedMult,
        vz: (Math.random() - 0.5) * 0.0003 * speedMult,
        color: Math.random() < 0.6 ? ACCENT.clone() : WHITE.clone(),
        opacity: Math.min((0.3 + Math.random() * 0.7) * opacityMult, 1.0),
        layer,
      };
    });

    // Points setup
    const buildPoints = (subset: Particle[], size: number) => {
      const pos = new Float32Array(subset.length * 3);
      const col = new Float32Array(subset.length * 3);
      subset.forEach((p, i) => {
        pos[i*3] = p.x; pos[i*3+1] = p.y; pos[i*3+2] = p.z;
        col[i*3] = p.color.r * p.opacity; col[i*3+1] = p.color.g * p.opacity; col[i*3+2] = p.color.b * p.opacity;
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size, vertexColors: true, transparent: true });
      return new THREE.Points(geo, mat);
    };

    const far = buildPoints(particles.filter(p => p.layer === "far"), 0.025);
    const mid = buildPoints(particles.filter(p => p.layer === "mid"), 0.045);
    const near = buildPoints(particles.filter(p => p.layer === "near"), 0.065);
    scene.add(far, mid, near);

    // ── GPU Line System ───────────────────────────────────────────────────
    const texSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const posData = new Float32Array(texSize * texSize * 4);
    const posTexture = new THREE.DataTexture(posData, texSize, texSize, THREE.RGBAFormat, THREE.FloatType);

    const lineCount = PARTICLE_COUNT * MAX_LINES_PER_PARTICLE;
    const lineIndices = new Float32Array(lineCount * 2 * 2); // 2 vertices per line, 2 indices per vertex
    for (let i = 0; i < lineCount; i++) {
      const p1 = Math.floor(Math.random() * PARTICLE_COUNT);
      let p2 = Math.floor(Math.random() * PARTICLE_COUNT);
      lineIndices[i * 4] = p1; lineIndices[i * 4 + 1] = p2;
      lineIndices[i * 4 + 2] = p1; lineIndices[i * 4 + 3] = p2;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("lineIndices", new THREE.BufferAttribute(lineIndices, 2));
    const lineMat = new THREE.ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        positionsTexture: { value: posTexture },
        textureSize: { value: texSize },
        connectionDistance: { value: CONNECTION_DISTANCE },
        uColor: { value: ACCENT },
        mousePos: { value: new THREE.Vector2() },
        pulseRadius: { value: PULSE_RADIUS }
      },
      transparent: true, depthWrite: false
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Cursor Bloom
    const bloom = new THREE.Mesh(new THREE.CircleGeometry(0.8, 32), new THREE.MeshBasicMaterial({ color: 0x0077ff, transparent: true, opacity: BLOOM_OPACITY, depthWrite: false }));
    scene.add(bloom);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      lineMat.uniforms.mousePos.value.set(mouseX, mouseY);
    };
    window.addEventListener("mousemove", onMouseMove);

    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; });
    let isVisible = true; observer.observe(mount);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (p.x > 12.5) p.x = -12.5; if (p.x < -12.5) p.x = 12.5;
        if (p.y > 5) p.y = -5; if (p.y < -5) p.y = 5;
        if (p.z > 2) p.z = -2; if (p.z < -2) p.z = 2;
        posData[i * 4] = p.x; posData[i * 4 + 1] = p.y; posData[i * 4 + 2] = p.z;
      });
      posTexture.needsUpdate = true;

      // Update static points
      [far, mid, near].forEach(pts => {
        const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
        const subset = particles.filter(p => p.layer === (pts === far ? "far" : pts === mid ? "mid" : "near"));
        subset.forEach((p, i) => attr.setXYZ(i, p.x, p.y, p.z));
        attr.needsUpdate = true;
      });

      bloom.position.lerp(new THREE.Vector3(mouseX, mouseY, 0.5).unproject(camera), BLOOM_LERP);
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (onReady && !readyCalledRef.current) { readyCalledRef.current = true; onReady(); }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId); observer.disconnect(); ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      [far, mid, near].forEach(p => { p.geometry.dispose(); (p.material as THREE.Material).dispose(); });
      lineGeo.dispose(); lineMat.dispose(); posTexture.dispose();
      renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-[1500ms] ease-out" style={{ zIndex: 0 }} />;
}
