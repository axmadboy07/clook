import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import { ProceduralWatchModel } from './ProceduralWatchModel.jsx';

export const LuxuryWatchCanvas = ({
  enableControls = true,
  autoRotate = false,
  enableZoom = true,
  floating = true,
  cameraPosition = [0, 0, 7.5],
  fov = 45,
  className = 'w-full h-full min-h-[360px]',
  lightingPreset = 'studio',
  ...watchProps
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ cursor: 'grab' }}
      >
        <Suspense fallback={null}>
          {/* Studio Lights for Horology Refraction */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={1.2} color="#f7edbf" />
          <directionalLight position={[0, 6, -6]} intensity={1.5} color="#b76e79" />
          <pointLight position={[2, 2, 4]} intensity={2.5} color="#d4af37" distance={10} />

          {/* HDR Environment Reflections */}
          <Environment preset="city" />

          {/* Floating Motion */}
          {floating ? (
            <Float
              speed={2.0}
              rotationIntensity={0.4}
              floatIntensity={0.6}
              floatingRange={[-0.15, 0.15]}
            >
              <ProceduralWatchModel autoRotate={autoRotate} {...watchProps} />
            </Float>
          ) : (
            <ProceduralWatchModel autoRotate={autoRotate} {...watchProps} />
          )}

          {/* Realistic Floor Shadow */}
          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.6}
            scale={8}
            blur={2.5}
            far={4.5}
            color="#000000"
          />

          {/* Orbit Navigation */}
          {enableControls && (
            <OrbitControls
              enableZoom={enableZoom}
              enablePan={false}
              minDistance={4}
              maxDistance={12}
              autoRotate={autoRotate}
              autoRotateSpeed={1.0}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LuxuryWatchCanvas;
