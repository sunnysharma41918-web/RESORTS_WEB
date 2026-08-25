import React from 'react';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#fff8ee" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#c5a880" />
      <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={1} color="#e8e5dc" />
    </>
  );
}
