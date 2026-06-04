"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "The Object" — a faceted monochrome form on a slow turntable, nudged by the
 * cursor. Vanilla three.js (no react-reconciler) so it is robust across React
 * versions and adds only three to the lazy chunk. Matte metal catching a key +
 * rim light reads as a silhouette against the near-black page.
 */
export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    const size = () => ({
      w: mount.clientWidth || 1,
      h: mount.clientHeight || 1,
    });
    let { w, h } = size();
    renderer.setSize(w, h);
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1b1b1b,
      metalness: 0.7,
      roughness: 0.34,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.45, 0.1, 0);
    mesh.scale.setScalar(1.55);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(4, 5, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9aa0ff, 1.1);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      mesh.rotation.y += dt * 0.16;
      mesh.rotation.x += (pointer.y * 0.35 - mesh.rotation.x) * 0.04;
      mesh.rotation.z += (-pointer.x * 0.25 - mesh.rotation.z) * 0.04;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      ({ w, h } = size());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        clock.getDelta(); // discard the gap so it doesn't jump
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
