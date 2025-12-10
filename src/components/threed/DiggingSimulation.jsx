import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSensorStore from '../../store/sensorStore';

const DiggingSimulation = () => {
  const { soilVolume, armAngles } = useSensorStore();
  const particlesRef = useRef();

  const particleCount = 500;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6 - 3;
      positions[i * 3 + 1] = Math.random() * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 + 2;

      colors[i * 3] = 0.4 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.25 + Math.random() * 0.15;
      colors[i * 3 + 2] = 0.1 + Math.random() * 0.1;

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    const digPhase = (Math.sin(time * 0.5) + 1) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (soilVolume < 100) {
        if (digPhase > 0.3 && digPhase < 0.7) {
          positions[i3 + 1] += Math.sin(time * 2 + i) * 0.01;

          positions[i3] += (Math.random() - 0.5) * 0.02;
          positions[i3 + 2] += (Math.random() - 0.5) * 0.02;
        } else {
          if (positions[i3 + 1] > 0.1) {
            positions[i3 + 1] -= 0.02;
          }
        }
      } else {
        const targetX = 5;
        const targetY = 0.5;
        const targetZ = 0;

        positions[i3] += (targetX - positions[i3]) * 0.02;
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.02;
      }
      if (positions[i3 + 1] < -2) {
        positions[i3] = (Math.random() - 0.5) * 6 - 3;
        positions[i3 + 1] = 0.1;
        positions[i3 + 2] = (Math.random() - 0.5) * 6 + 2;
      }

      if (Math.abs(positions[i3]) > 10 || Math.abs(positions[i3 + 2]) > 10) {
        positions[i3] = (Math.random() - 0.5) * 6 - 3;
        positions[i3 + 2] = (Math.random() - 0.5) * 6 + 2;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Soil Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-color'
            count={particleCount}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-size'
            count={particleCount}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Excavated soil pile in truck (grows with volume) */}
      <mesh
        position={[6, 1.2 + soilVolume / 200, 0]}
        castShadow>
        <coneGeometry
          args={[0.8 + soilVolume / 150, 0.5 + soilVolume / 200, 8]}
        />
        <meshStandardMaterial color='#5a4332' />
      </mesh>
    </group>
  );
};

export default DiggingSimulation;
