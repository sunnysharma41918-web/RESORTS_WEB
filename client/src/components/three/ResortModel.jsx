import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ResortModel() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base platform */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Modern cantilevered pavilion blocks */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.5, 1.4]} />
        <meshStandardMaterial color="#2a2c32" roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh position={[0.4, 0.5, 0.2]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[1.3, 0.4, 1.1]} />
        <meshStandardMaterial color="#c5a880" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Delicate glass reflection block */}
      <mesh position={[-0.3, 0.9, -0.1]}>
        <boxGeometry args={[0.9, 0.35, 0.8]} />
        <meshStandardMaterial
          color="#f7f6f2"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}
