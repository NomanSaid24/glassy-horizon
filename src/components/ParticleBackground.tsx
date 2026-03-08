import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AudioWaveParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      // Purple to cyan gradient
      const t = Math.random();
      col[i * 3] = 0.5 + t * 0.3;     // R
      col[i * 3 + 1] = 0.1 + t * 0.5; // G
      col[i * 3 + 2] = 0.8 + t * 0.2; // B
    }
    return [pos, col];
  }, []);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];
      
      // Audio wave-like motion
      posArray[i3] = x + Math.sin(time * 0.5 + y * 0.5) * 0.3;
      posArray[i3 + 1] = y + Math.sin(time * 0.8 + x * 0.3) * 0.5;
      posArray[i3 + 2] = z + Math.cos(time * 0.3 + x * 0.2) * 0.3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.15;
      ring2.current.rotation.x = t * 0.1;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.25;
      ring3.current.rotation.y = t * 0.05;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[0, 0, -3]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2} position={[0, 0, -3]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3} position={[0, 0, -3]}>
        <torusGeometry args={[5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.3} />
        <AudioWaveParticles />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
