"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const IMAGES = [
  "/cases/cs01-ignored-user.png",
  "/cases/cs05-uphaar-tea.png",
  "/cases/cs03-headway.png",
  "/cases/cs07-biroti-cafe.png",
  "/cases/cs02-clutter-comfort.png",
  "/cases/cs06-gargi.png",
  "/cases/cs04-isbt-flyover.png",
  "/cases/cs08-scout.png",
];

const FAR = -26;
const NEAR_FADE = 0.5;
const RESET_Z = 2.4;

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Podium-style gallery: project images drift slowly toward the viewer, fading
 * in far and out before they reach the camera. A slow cursor ripple distorts
 * the images in screen space. Fades out on scroll. Loaded via dynamic ssr:false.
 */
export default function HeroGallery() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    let vw = mount.clientWidth || 1;
    let vh = mount.clientHeight || 1;
    renderer.setSize(vw, vh);
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, vw / vh, 0.1, 100);
    camera.position.z = 6;

    // Shared uniforms (same refs across all plane materials).
    const uTime = { value: 0 };
    const uMouse = { value: new THREE.Vector2(0.5, 0.5) };
    const uRes = { value: new THREE.Vector2(vw * dpr, vh * dpr) };
    const uIntensity = { value: 0 };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform vec2 uMouse;
      uniform vec2 uRes;
      uniform float uTime;
      uniform float uIntensity;
      uniform float uOpacity;
      void main() {
        vec2 screenUV = gl_FragCoord.xy / uRes;
        vec2 d = screenUV - uMouse;
        d.x *= uRes.x / uRes.y;
        float dist = length(d);
        float ripple = sin(dist * 22.0 - uTime * 1.4) * exp(-dist * 4.5) * uIntensity;
        vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
        vec2 uv = vUv + dir * ripple * 0.05;
        vec4 c = texture2D(uTex, uv);
        gl_FragColor = vec4(c.rgb, c.a * uOpacity);
      }
    `;

    const loader = new THREE.TextureLoader();
    const planes: THREE.Mesh[] = [];
    const SPREAD_X = 6.5;
    const SPREAD_Y = 3.4;

    function place(p: THREE.Mesh, z: number) {
      p.position.z = z;
      p.position.x = (Math.random() * 2 - 1) * SPREAD_X;
      p.position.y = (Math.random() * 2 - 1) * SPREAD_Y;
    }

    IMAGES.forEach((src, i) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTex: { value: null },
          uTime,
          uMouse,
          uRes,
          uIntensity,
          uOpacity: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      });
      const tex = loader.load(src, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        // Size the plane to the image's real aspect ratio (longest side = BASE)
        const img = t.image as { width: number; height: number };
        const aspect = img.width && img.height ? img.width / img.height : 1.4;
        const BASE = 2.5;
        if (aspect >= 1) mesh.scale.set(BASE, BASE / aspect, 1);
        else mesh.scale.set(BASE * aspect, BASE, 1);
        mat.uniforms.uTex.value = t;
        (mesh.userData as { ready?: boolean }).ready = true;
      });
      mat.uniforms.uTex.value = tex;

      // Unit plane; real proportions are applied via mesh.scale on load.
      const geo = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geo, mat);
      // stagger initial depth so they're spread along the tunnel
      place(mesh, FAR + (i / IMAGES.length) * (RESET_Z - FAR));
      mesh.userData.ready = false;
      scene.add(mesh);
      planes.push(mesh);
    });

    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      uMouse.value.set((e.clientX - r.left) / vw, 1 - (e.clientY - r.top) / vh);
      targetIntensity = 1;
    };
    window.addEventListener("pointermove", onMove);

    let targetIntensity = 0;

    const FORWARD = 1.7; // units/sec — slow drift toward viewer
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      uTime.value += dt;

      // slow cursor response
      uIntensity.value += (targetIntensity - uIntensity.value) * 0.05;
      targetIntensity *= 0.965;

      for (const p of planes) {
        p.position.z += FORWARD * dt;
        if (p.position.z > RESET_Z) place(p, FAR - Math.random() * 6);
        const z = p.position.z;
        const env = smoothstep(FAR, FAR + 6, z) * (1 - smoothstep(NEAR_FADE, RESET_Z, z));
        const ready = (p.userData as { ready?: boolean }).ready ? 1 : 0;
        const mat = p.material as THREE.ShaderMaterial;
        const targetOp = env * 0.9 * ready;
        mat.uniforms.uOpacity.value +=
          (targetOp - mat.uniforms.uOpacity.value) * 0.12;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      vw = mount.clientWidth || 1;
      vh = mount.clientHeight || 1;
      renderer.setSize(vw, vh);
      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();
      uRes.value.set(vw * dpr, vh * dpr);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      for (const p of planes) {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
