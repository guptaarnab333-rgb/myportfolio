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

/**
 * A full-bleed montage of project images (cover-fit grid) that slowly drifts and
 * breathes, with a screen-space cursor ripple. It fills the screen so the logo
 * cut-out always reveals rich imagery. Loaded via dynamic ssr:false.
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

    const uTime = { value: 0 };
    const uMouse = { value: new THREE.Vector2(0.5, 0.5) };
    const uRes = { value: new THREE.Vector2(vw * dpr, vh * dpr) };
    const uIntensity = { value: 0 };

    const vertexShader = `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
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
      uniform float uPlaneAspect;
      uniform float uTexAspect;
      void main(){
        // cover-fit (no distortion, crop overflow)
        vec2 uv = vUv;
        if (uPlaneAspect > uTexAspect) uv.y = (uv.y - 0.5) * (uTexAspect / uPlaneAspect) + 0.5;
        else uv.x = (uv.x - 0.5) * (uPlaneAspect / uTexAspect) + 0.5;
        // screen-space cursor ripple
        vec2 screenUV = gl_FragCoord.xy / uRes;
        vec2 d = screenUV - uMouse;
        d.x *= uRes.x / uRes.y;
        float dist = length(d);
        float ripple = sin(dist * 22.0 - uTime * 1.4) * exp(-dist * 4.5) * uIntensity;
        vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
        uv += dir * ripple * 0.05;
        vec4 c = texture2D(uTex, uv);
        gl_FragColor = vec4(c.rgb, c.a * uOpacity);
      }
    `;

    const loader = new THREE.TextureLoader();
    const planes: THREE.Mesh[] = [];
    const COLS = 4;
    const ROWS = 3;
    const COVER_W = 13;
    const COVER_H = 8;
    const cellW = COVER_W / COLS;
    const cellH = COVER_H / ROWS;
    const planeAspect = cellW / cellH;
    const group = new THREE.Group();
    scene.add(group);

    let k = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const src = IMAGES[k % IMAGES.length];
        k++;
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTex: { value: null },
            uTime,
            uMouse,
            uRes,
            uIntensity,
            uOpacity: { value: 0 },
            uPlaneAspect: { value: planeAspect },
            uTexAspect: { value: 1.4 },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(cellW * 1.06, cellH * 1.06),
          mat
        );
        loader.load(src, (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          const img = t.image as { width: number; height: number };
          mat.uniforms.uTexAspect.value =
            img.width && img.height ? img.width / img.height : 1.4;
          mat.uniforms.uTex.value = t;
          mesh.userData.ready = true;
        });
        mesh.position.set(
          -COVER_W / 2 + cellW * (c + 0.5),
          COVER_H / 2 - cellH * (r + 0.5),
          0
        );
        mesh.userData = { ready: false };
        group.add(mesh);
        planes.push(mesh);
      }
    }

    let targetIntensity = 0;
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      uMouse.value.set(
        (e.clientX - rect.left) / vw,
        1 - (e.clientY - rect.top) / vh
      );
      targetIntensity = 1;
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      uTime.value += dt;
      const t = uTime.value;

      uIntensity.value += (targetIntensity - uIntensity.value) * 0.05;
      targetIntensity *= 0.965;

      // slow drift + breathe so it reads like a living backdrop
      group.position.x = Math.sin(t * 0.08) * 0.5;
      group.position.y = Math.cos(t * 0.06) * 0.32;
      group.scale.setScalar(1.04 + Math.sin(t * 0.05) * 0.04);

      for (const p of planes) {
        const mat = p.material as THREE.ShaderMaterial;
        const tgt = (p.userData as { ready?: boolean }).ready ? 0.95 : 0;
        mat.uniforms.uOpacity.value += (tgt - mat.uniforms.uOpacity.value) * 0.06;
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
