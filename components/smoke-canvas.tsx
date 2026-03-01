"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Puff = {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
};

function SmokeField({
  pointer,
  scrollVelocity
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
  scrollVelocity: MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const puffs = useMemo<Puff[]>(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        x: (Math.random() - 0.5) * 11,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 7,
        scale: 0.65 + Math.random() * 1.6,
        speed: 0.1 + (index % 7) * 0.06
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.04 + pointer.current.x * 0.3;
    groupRef.current.position.x = pointer.current.x * 0.6;
    groupRef.current.position.y = pointer.current.y * 0.3;

    groupRef.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh;
      const puff = puffs[index];
      mesh.position.y = puff.y + Math.sin(t * puff.speed + index) * 0.3 + scrollVelocity.current * 0.2;
      mesh.position.x = puff.x + Math.cos(t * 0.2 + index) * 0.24;
      mesh.rotation.z = t * 0.05 * (index % 2 === 0 ? 1 : -1);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = 0.06 + Math.sin(t * puff.speed + index) * 0.02 + scrollVelocity.current * 0.03;
    });

    scrollVelocity.current *= 0.92;
  });

  return (
    <group ref={groupRef}>
      {puffs.map((puff, index) => (
        <mesh key={`${puff.x}-${index}`} position={[puff.x, puff.y, puff.z]} scale={puff.scale}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#66d8ff" : "#7effd9"}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SmokeCanvas() {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    let lastY = window.scrollY;
    let lastTime = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastY);
      const deltaT = Math.max(16, now - lastTime);
      scrollVelocity.current = Math.min(1.25, deltaY / deltaT);
      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 opacity-90">
      <Canvas gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 8], fov: 58 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.34} />
        <directionalLight position={[2, 2, 3]} color="#7effd9" intensity={1.1} />
        <pointLight position={[-4, -1, 2]} color="#66d8ff" intensity={0.6} />
        <fog attach="fog" args={["#03070f", 4, 16]} />
        <SmokeField pointer={pointer} scrollVelocity={scrollVelocity} />
      </Canvas>
    </div>
  );
}
