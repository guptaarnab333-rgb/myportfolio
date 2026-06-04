"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The "ARNAB" wordmark as a field of dots with an interactive ripple: concentric
 * waves radiate from the cursor (and pulse gently from the centre when idle),
 * displacing each dot radially. Fades + drifts up on scroll. Vanilla three.js,
 * loaded via next/dynamic(ssr:false) so three stays out of the initial bundle.
 */
export default function HeroParticles() {
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
    const camera = new THREE.OrthographicCamera(
      -vw / 2, vw / 2, vh / 2, -vh / 2, -100, 100
    );
    camera.position.z = 10;

    let count = 0;
    let homes = new Float32Array(0);
    let geom = new THREE.BufferGeometry();
    const mat = new THREE.PointsMaterial({
      color: 0x141414,
      size: 2.6 * dpr,
      sizeAttenuation: false,
      transparent: true,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    function buildText() {
      const FW = 1100, FH = 340;
      const off = document.createElement("canvas");
      off.width = FW;
      off.height = FH;
      const ctx = off.getContext("2d")!;
      ctx.clearRect(0, 0, FW, FH);
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 250px Arial, Helvetica, sans-serif";
      ctx.fillText("ARNAB", FW / 2, FH / 2 + 6);
      const data = ctx.getImageData(0, 0, FW, FH).data;

      const step = vw < 720 ? 5 : 4;
      const targetW = Math.min(vw * 0.66, 780);
      const s = targetW / FW;
      const pos: number[] = [];
      for (let y = 0; y < FH; y += step) {
        for (let x = 0; x < FW; x += step) {
          if (data[(y * FW + x) * 4 + 3] > 128) {
            pos.push((x - FW / 2) * s, -(y - FH / 2) * s);
          }
        }
      }
      count = pos.length / 2;
      homes = new Float32Array(count * 2);
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        homes[i * 2] = pos[i * 2];
        homes[i * 2 + 1] = pos[i * 2 + 1];
        arr[i * 3] = pos[i * 2];
        arr[i * 3 + 1] = pos[i * 2 + 1];
        arr[i * 3 + 2] = 0;
      }
      geom.dispose();
      geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      points.geometry = geom;
    }
    buildText();

    // Ripple centre target (cursor when active, wordmark centre when idle).
    const target = { x: 0, y: 0 };
    const center = { x: 0, y: 0 };
    let intensity = 0; // ripple strength: spikes on cursor move, settles when idle
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = e.clientX - r.left - vw / 2;
      target.y = -(e.clientY - r.top - vh / 2);
      intensity = 1;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);

    let progress = 0;
    const onScroll = () => {
      progress = Math.min(window.scrollY / (vh * 0.85), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const AMP = 23;      // ripple displacement (px)
    const FREQ = 0.05;   // ring spacing
    const SPEED = 3.3;   // outward ring speed
    const RANGE = 380;   // falloff radius
    const AMB = 1.6;     // idle shimmer

    let raf = 0;
    let last = 0;
    let t = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      t += dt;

      if (progress < 0.98) {
        // ease ripple centre toward cursor; let ripple strength settle when idle
        center.x += (target.x - center.x) * 0.1;
        center.y += (target.y - center.y) * 0.1;
        intensity = Math.max(0, intensity - dt * 0.5);
        const strength = intensity * intensity; // ease-out the calm-down

        const arr = geom.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const hx = homes[i * 2];
          const hy = homes[i * 2 + 1];
          const dx = hx - center.x;
          const dy = hy - center.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
          const falloff = Math.exp(-dist / RANGE);
          const wave = Math.sin(dist * FREQ - t * SPEED);
          const disp = AMP * wave * falloff * strength;
          const amb = Math.sin(hx * 0.02 + t * 1.4) * AMB; // always-on faint shimmer
          // height-field ripple: mostly vertical (keeps letters legible) with a
          // small radial component for dimension.
          arr[i * 3] = hx + (dx / dist) * disp * 0.3;
          arr[i * 3 + 1] = hy + disp * 0.92 + amb;
        }
        geom.attributes.position.needsUpdate = true;
      }

      mat.opacity = Math.max(0, 1 - progress * 1.1);
      points.position.y = progress * 80;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      vw = mount.clientWidth || 1;
      vh = mount.clientHeight || 1;
      renderer.setSize(vw, vh);
      camera.left = -vw / 2;
      camera.right = vw / 2;
      camera.top = vh / 2;
      camera.bottom = -vh / 2;
      camera.updateProjectionMatrix();
      buildText();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mat.dispose();
      geom.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
