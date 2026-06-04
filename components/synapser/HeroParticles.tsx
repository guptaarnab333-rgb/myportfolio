"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The interactive particle wordmark canvas (three.js). Self-contained: attaches
 * its own pointer + scroll listeners. Loaded via next/dynamic(ssr:false) so
 * three.js stays out of the initial bundle.
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
    let curs = new Float32Array(0);
    let vels = new Float32Array(0);
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
      curs = new Float32Array(count * 2);
      vels = new Float32Array(count * 2);
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const hx = pos[i * 2];
        const hy = pos[i * 2 + 1];
        homes[i * 2] = hx;
        homes[i * 2 + 1] = hy;
        curs[i * 2] = hx;
        curs[i * 2 + 1] = hy;
        arr[i * 3] = hx;
        arr[i * 3 + 1] = hy;
        arr[i * 3 + 2] = 0;
      }
      geom.dispose();
      geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      points.geometry = geom;
    }
    buildText();

    const mouse = { x: 1e6, y: 1e6, active: false };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.x = e.clientX - r.left - vw / 2;
      mouse.y = -(e.clientY - r.top - vh / 2);
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = 1e6;
      mouse.y = 1e6;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);

    let progress = 0;
    const onScroll = () => {
      progress = Math.min(window.scrollY / (vh * 0.85), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const R = 130, R2 = R * R, FORCE = 30, SPRING = 0.05, DAMP = 0.84;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const arr = geom.attributes.position.array as Float32Array;
      if (progress < 0.98) {
        for (let i = 0; i < count; i++) {
          let cx = curs[i * 2];
          let cy = curs[i * 2 + 1];
          let vx = vels[i * 2];
          let vy = vels[i * 2 + 1];
          vx += (homes[i * 2] - cx) * SPRING;
          vy += (homes[i * 2 + 1] - cy) * SPRING;
          if (mouse.active) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / R) * FORCE;
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }
          vx *= DAMP;
          vy *= DAMP;
          cx += vx;
          cy += vy;
          curs[i * 2] = cx;
          curs[i * 2 + 1] = cy;
          vels[i * 2] = vx;
          vels[i * 2 + 1] = vy;
          arr[i * 3] = cx;
          arr[i * 3 + 1] = cy;
        }
        geom.attributes.position.needsUpdate = true;
      }
      mat.opacity = Math.max(0, 1 - progress * 1.1);
      points.position.y = progress * 80;
      renderer.render(scene, camera);
    };
    tick();

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
