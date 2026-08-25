import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WebGLFallback from './WebGLFallback';

export default function CanvasWrapper({ children, className = '' }) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
