import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingObject() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#1e2024"
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}
