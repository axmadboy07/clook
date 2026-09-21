import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ProceduralWatchModel = ({
  caseColor = '#d4af37',
  bezelColor = '#b89228',
  dialColor = '#0a0b0e',
  handColor = '#f7edbf',
  strapColor = '#1c130d',
  strapRoughness,
  strapMetalness,
  isSkeleton = false,
  hasTourbillon = true,
  roughness = 0.15,
  metalness = 0.95,
  exploded = false,
  rotationSpeed = 0.3,
  autoRotate = true,
}) => {
  const rootGroupRef = useRef(null);
  const secondHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);
  const tourbillonCageRef = useRef(null);
  const balanceWheelRef = useRef(null);
  const gear1Ref = useRef(null);
  const gear2Ref = useRef(null);

  // Computed strap material properties if not explicitly provided
  const effectiveStrapColor = strapColor;
  const effectiveStrapRoughness = strapRoughness !== undefined 
    ? strapRoughness 
    : (strapColor === caseColor ? roughness : 0.8);
  const effectiveStrapMetalness = strapMetalness !== undefined 
    ? strapMetalness 
    : (strapColor === caseColor ? metalness : 0.1);

  // Smooth exploded offsets
  const explodeFactor = exploded ? 1 : 0;
  const currentExplodeRef = useRef(0);

  useFrame((state, delta) => {
    // Smooth transition for exploded view
    currentExplodeRef.current = THREE.MathUtils.lerp(
      currentExplodeRef.current,
      explodeFactor,
      delta * 4
    );

    // Gentle floating and auto-rotation
    if (autoRotate && rootGroupRef.current) {
      rootGroupRef.current.rotation.y += delta * rotationSpeed;
    }

    // Realistic time sweep
    const time = state.clock.getElapsedTime();
    if (secondHandRef.current) {
      // Smooth continuous sweeping seconds hand (36,000 vph)
      secondHandRef.current.rotation.z = -time * (Math.PI / 30) * 4;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -time * (Math.PI / 1800);
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -time * (Math.PI / 21600);
    }

    // Tourbillon cage rotation & balance wheel oscillation
    if (tourbillonCageRef.current) {
      tourbillonCageRef.current.rotation.z += delta * 1.5;
    }
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(time * 24) * 0.8;
    }
    if (gear1Ref.current) {
      gear1Ref.current.rotation.z += delta * 2.2;
    }
    if (gear2Ref.current) {
      gear2Ref.current.rotation.z -= delta * 1.8;
    }
  });

  const exp = explodeFactor;

  return (
    <group ref={rootGroupRef} dispose={null} scale={[1.02, 1.02, 1.02]}>
      {/* 1. TOP SAPPHIRE CRYSTAL */}
      <mesh position={[0, 0, 0.42 + exp * 1.8]}>
        <cylinderGeometry args={[2.02, 2.05, 0.04, 64]} />
        <meshStandardMaterial
          color="#e0f2fe"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* 2. BEZEL & TACHYMETER RING */}
      <group position={[0, 0, 0.35 + exp * 1.2]}>
        <mesh>
          <torusGeometry args={[2.15, 0.18, 24, 64]} />
          <meshStandardMaterial
            color={bezelColor}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={2.5}
          />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[1.9, 2.12, 64]} />
          <meshStandardMaterial
            color="#141720"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x = Math.sin(angle) * 2.02;
          const y = Math.cos(angle) * 2.02;
          return (
            <mesh key={`bezel-dot-${i}`} position={[x, y, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
              <meshStandardMaterial
                color={i === 0 ? '#ef4444' : '#e2e8f0'}
                emissive={i === 0 ? '#ef4444' : '#d4af37'}
                emissiveIntensity={0.6}
              />
            </mesh>
          );
        })}
      </group>

      {/* 3. DIAL & HANDS LAYER */}
      <group position={[0, 0, 0.2 + exp * 0.6]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.98, 1.98, 0.05, 64]} />
          <meshStandardMaterial
            color={dialColor}
            metalness={isSkeleton ? 0.3 : 0.85}
            roughness={0.25}
            opacity={isSkeleton ? 0.4 : 1}
            transparent={isSkeleton}
          />
        </mesh>

        <mesh position={[0, 0, 0.03]}>
          <ringGeometry args={[1.82, 1.95, 64]} />
          <meshStandardMaterial color="#2b3044" metalness={0.5} roughness={0.4} />
        </mesh>

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x = Math.sin(angle) * 1.68;
          const y = Math.cos(angle) * 1.68;
          const isCardinal = i % 3 === 0;
          return (
            <group key={`marker-${i}`} position={[x, y, 0.04]} rotation={[0, 0, -angle]}>
              <mesh>
                <boxGeometry args={[isCardinal ? 0.1 : 0.06, isCardinal ? 0.35 : 0.22, 0.06]} />
                <meshStandardMaterial
                  color={handColor}
                  metalness={0.98}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.035]}>
                <boxGeometry args={[isCardinal ? 0.04 : 0.02, isCardinal ? 0.22 : 0.14, 0.01]} />
                <meshStandardMaterial
                  color="#86efac"
                  emissive="#4ade80"
                  emissiveIntensity={0.7}
                />
              </mesh>
            </group>
          );
        })}

        <mesh position={[0, 0.9, 0.035]}>
          <planeGeometry args={[0.8, 0.25]} />
          <meshStandardMaterial color="#0f1117" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.9, 0.04]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial color={caseColor} emissive={caseColor} emissiveIntensity={0.4} />
        </mesh>

        {/* Sub-dials */}
        {[-0.85, 0.85].map((xOffset, idx) => (
          <group key={`subdial-${idx}`} position={[xOffset, 0, 0.035]}>
            <mesh>
              <ringGeometry args={[0.38, 0.42, 32]} />
              <meshStandardMaterial color={bezelColor} metalness={metalness} roughness={roughness} />
            </mesh>
            <mesh position={[0, 0, -0.005]}>
              <circleGeometry args={[0.38, 32]} />
              <meshStandardMaterial color="#0b0e14" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.12, 0.01]} rotation={[0, 0, idx === 0 ? 0.8 : -1.2]}>
              <boxGeometry args={[0.02, 0.24, 0.01]} />
              <meshStandardMaterial color={handColor} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Flying Tourbillon Cage */}
        {hasTourbillon && (
          <group position={[0, -0.75, 0.04]}>
            <mesh>
              <ringGeometry args={[0.5, 0.58, 48]} />
              <meshStandardMaterial color={bezelColor} metalness={metalness} roughness={roughness} />
            </mesh>
            <mesh position={[0, 0, -0.02]}>
              <circleGeometry args={[0.5, 48]} />
              <meshStandardMaterial color="#050608" roughness={0.8} />
            </mesh>

            <group ref={tourbillonCageRef}>
              {Array.from({ length: 3 }).map((_, idx) => {
                const rot = (idx * Math.PI * 2) / 3;
                return (
                  <mesh key={`cage-arm-${idx}`} rotation={[0, 0, rot]} position={[0, 0, 0.02]}>
                    <boxGeometry args={[0.04, 0.45, 0.02]} />
                    <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
                  </mesh>
                );
              })}
              <mesh position={[0, 0, 0.04]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#e11d48" roughness={0.1} metalness={0.2} />
              </mesh>
              <mesh ref={balanceWheelRef} position={[0, 0, -0.01]}>
                <torusGeometry args={[0.32, 0.025, 16, 32]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          </group>
        )}

        {/* Center Hands */}
        <group position={[0, 0, 0.06]}>
          <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 32]} />
            <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
          </mesh>

          {/* Hour Hand */}
          <mesh ref={hourHandRef} position={[0, 0, 0.02]} rotation={[0, 0, -0.8]}>
            <group position={[0, 0.48, 0]}>
              <boxGeometry args={[0.09, 0.95, 0.02]} />
              <meshStandardMaterial color={handColor} metalness={0.95} roughness={0.1} />
              <mesh position={[0, 0.1, 0.015]}>
                <boxGeometry args={[0.04, 0.6, 0.005]} />
                <meshStandardMaterial color="#86efac" emissive="#4ade80" emissiveIntensity={0.6} />
              </mesh>
            </group>
          </mesh>

          {/* Minute Hand */}
          <mesh ref={minuteHandRef} position={[0, 0, 0.04]} rotation={[0, 0, 1.4]}>
            <group position={[0, 0.72, 0]}>
              <boxGeometry args={[0.07, 1.45, 0.02]} />
              <meshStandardMaterial color={handColor} metalness={0.95} roughness={0.1} />
              <mesh position={[0, 0.15, 0.015]}>
                <boxGeometry args={[0.03, 0.9, 0.005]} />
                <meshStandardMaterial color="#86efac" emissive="#4ade80" emissiveIntensity={0.6} />
              </mesh>
            </group>
          </mesh>

          {/* Seconds Hand */}
          <mesh ref={secondHandRef} position={[0, 0, 0.07]}>
            <group position={[0, 0.75, 0]}>
              <boxGeometry args={[0.02, 1.7, 0.015]} />
              <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
              <mesh position={[0, -1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
            </group>
          </mesh>
        </group>
      </group>

      {/* 4. SKELETON CALIBRE MOVEMENT */}
      <group position={[0, 0, -0.15 - exp * 0.5]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.9, 1.9, 0.2, 48]} />
          <meshStandardMaterial
            color={caseColor}
            metalness={metalness}
            roughness={roughness}
          />
        </mesh>
        <mesh ref={gear1Ref} position={[-0.6, 0.6, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.04, 24]} />
          <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh ref={gear2Ref} position={[0.6, 0.5, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* 5. MAIN WATCH CASE & LUGS */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.5, 64]} />
          <meshStandardMaterial
            color={caseColor}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* 4 Lugs */}
        <mesh position={[-1.6, 2.3, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.38, 1.1, 0.45]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[1.6, 2.3, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.38, 1.1, 0.45]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[-1.6, -2.3, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.38, 1.1, 0.45]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[1.6, -2.3, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.38, 1.1, 0.45]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>

        {/* Crown & Pushers */}
        <group position={[2.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.28, 0.35, 24]} />
            <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.1} />
          </mesh>
        </group>

        <mesh position={[2.2, 1.3, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <cylinderGeometry args={[0.16, 0.16, 0.28, 16]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[2.2, -1.3, 0]} rotation={[0, 0, -Math.PI / 1.5]}>
          <cylinderGeometry args={[0.16, 0.16, 0.28, 16]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
      </group>

      {/* 6. STRAP / BRACELET */}
      <group position={[0, 0, -0.05]}>
        <mesh position={[0, 3.4, -0.15]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[2.5, 2.0, 0.25]} />
          <meshStandardMaterial
            color={effectiveStrapColor}
            roughness={effectiveStrapRoughness}
            metalness={effectiveStrapMetalness}
          />
        </mesh>
        <mesh position={[0, 4.8, -0.7]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[2.4, 1.6, 0.24]} />
          <meshStandardMaterial
            color={effectiveStrapColor}
            roughness={effectiveStrapRoughness}
            metalness={effectiveStrapMetalness}
          />
        </mesh>

        <mesh position={[0, -3.4, -0.15]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[2.5, 2.0, 0.25]} />
          <meshStandardMaterial
            color={effectiveStrapColor}
            roughness={effectiveStrapRoughness}
            metalness={effectiveStrapMetalness}
          />
        </mesh>
        <mesh position={[0, -4.8, -0.7]} rotation={[-0.6, 0, 0]}>
          <boxGeometry args={[2.4, 1.6, 0.24]} />
          <meshStandardMaterial
            color={effectiveStrapColor}
            roughness={effectiveStrapRoughness}
            metalness={effectiveStrapMetalness}
          />
        </mesh>
      </group>

      {/* 7. SAPPHIRE CASEBACK */}
      <group position={[0, 0, -0.38 - exp * 1.5]}>
        <mesh>
          <torusGeometry args={[2.1, 0.16, 16, 48]} />
          <meshStandardMaterial color={caseColor} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[1.9, 48]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.9}
            transparent
            roughness={0.05}
            ior={1.7}
          />
        </mesh>
      </group>
    </group>
  );
};
