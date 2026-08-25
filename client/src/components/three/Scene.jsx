import React, { Suspense } from 'react';
import CanvasWrapper from './CanvasWrapper';
import CameraRig from './CameraRig';
import Lighting from './Lighting';
import ResortModel from './ResortModel';
import Particles from './Particles';
import WebGLFallback from './WebGLFallback';

export default function Scene() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[480px]">
      <CanvasWrapper>
        <Lighting />
        <CameraRig>
          <ResortModel />
          <Particles count={60} />
        </CameraRig>
      </CanvasWrapper>
    </div>
  );
}
