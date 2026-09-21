import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralWatchModel } from './ProceduralWatchModel.jsx';

const MouseParallaxGroup = ({ children, mousePos }) => {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotX = (mousePos.y * 0.4) + 0.15; // gentle default tilt
    const targetRotY = (mousePos.x * 0.7) - 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
  });

  return <group ref={groupRef}>{children}</group>;
};

export const HeroWatch3D = ({ currentWatchConfig }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize from -1 to 1 based on window center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const config = currentWatchConfig || {
    caseColor: '#d4af37',
    bezelColor: '#b89228',
    dialColor: '#0a0b0e',
    handColor: '#f7edbf',
    strapColor: '#1a140f',
    isSkeleton: true,
    hasTourbillon: true,
    metalness: 0.95,
    roughness: 0.15,
  };

  return (
    <div className="relative select-none" style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      {/* Background ethereal atmospheric glow in 3D scene */}
      <Canvas
        camera={{ position: [0, 0, 7.6], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 9, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-6, -4, -2]} intensity={1.5} color="#e5c158" />
        <directionalLight position={[0, -5, 5]} intensity={0.9} color="#38bdf8" />
        <pointLight position={[0, 3, 4]} intensity={3.0} color="#f7edbf" distance={8} />

        <Environment preset="night" />

        {/* Floating Aura ring behind watch */}
        <mesh position={[0, 0, -2.5]}>
          <torusGeometry args={[2.8, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={1.0}
            transparent
            opacity={0.3}
          />
        </mesh>

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
          <MouseParallaxGroup mousePos={mousePos}>
            <ProceduralWatchModel
              caseColor={config.caseColor}
              bezelColor={config.bezelColor}
              dialColor={config.dialColor}
              handColor={config.handColor}
              strapColor={config.strapColor}
              isSkeleton={config.isSkeleton}
              hasTourbillon={config.hasTourbillon}
              metalness={config.metalness}
              roughness={config.roughness}
              autoRotate={false}
            />
          </MouseParallaxGroup>
        </Float>

        <ContactShadows
          position={[0, -3.0, 0]}
          opacity={0.7}
          scale={9}
          blur={2.8}
          far={5}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};

export default HeroWatch3D;
