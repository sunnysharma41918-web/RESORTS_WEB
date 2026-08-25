import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({ children }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (state.pointer.x * Math.PI) / 10,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (-state.pointer.y * Math.PI) / 10,
        0.05
      );
    }
  });

  return <group ref={group}>{children}</group>;
}
