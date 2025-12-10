import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useSensorStore from '../../store/sensorStore';

const AnimatedExcavator = () => {
  const { armAngles, soilVolume } = useSensorStore();

  const baseRef = useRef();
  const boomRef = useRef();
  const stickRef = useRef();
  const bucketRef = useRef();

  useFrame(() => {
    if (baseRef.current) {
      baseRef.current.rotation.y +=
        (armAngles.base - baseRef.current.rotation.y) * 0.08;
    }
    if (boomRef.current) {
      boomRef.current.rotation.z +=
        (armAngles.boom - boomRef.current.rotation.z) * 0.08;
    }
    if (stickRef.current) {
      stickRef.current.rotation.z +=
        (armAngles.stick - stickRef.current.rotation.z) * 0.08;
    }
    if (bucketRef.current) {
      bucketRef.current.rotation.z +=
        (armAngles.bucket - bucketRef.current.rotation.z) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========== EXCAVATOR BASE ========== */}

      {/* Tracks */}
      <mesh
        position={[0, 0.3, -0.9]}
        castShadow>
        <boxGeometry args={[2.8, 0.5, 0.6]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>
      <mesh
        position={[0, 0.3, 0.9]}
        castShadow>
        <boxGeometry args={[2.8, 0.5, 0.6]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>

      {/* Chassis */}
      <mesh
        position={[0, 0.8, 0]}
        castShadow>
        <boxGeometry args={[2.6, 0.8, 1.8]} />
        <meshStandardMaterial color='#FFD700' />
      </mesh>

      {/* Cabin */}
      <mesh
        position={[0.2, 1.6, 0]}
        castShadow>
        <boxGeometry args={[1.4, 1.2, 1.4]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>

      {/* Counterweight */}
      <mesh
        position={[-0.9, 1.3, 0]}
        castShadow>
        <boxGeometry args={[1.4, 1.4, 1.6]} />
        <meshStandardMaterial color='#333' />
      </mesh>

      {/* ========== ARM (C-SHAPED) ========== */}
      <group
        ref={baseRef}
        position={[0.8, 1.8, 0]}>
        {/* BOOM - upper arm */}
        <group ref={boomRef}>
          <mesh
            position={[2, 0, 0]}
            castShadow>
            <boxGeometry args={[4, 0.4, 0.4]} />
            <meshStandardMaterial color='#FF6B00' />
          </mesh>
          <mesh position={[4, 0, 0]}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color='#555' />
          </mesh>

          {/* STICK - lower arm */}
          <group
            ref={stickRef}
            position={[4, 0, 0]}>
            <mesh
              position={[1.5, 0, 0]}
              castShadow>
              <boxGeometry args={[3, 0.35, 0.35]} />
              <meshStandardMaterial color='#FF8C00' />
            </mesh>
            <mesh position={[3, 0, 0]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshStandardMaterial color='#555' />
            </mesh>

            {/* BUCKET */}
            <group
              ref={bucketRef}
              position={[3, 0, 0]}>
              <mesh
                position={[0.4, 0, 0]}
                castShadow>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color='#C0C0C0' />
              </mesh>
              {[-0.3, 0, 0.3].map((z, i) => (
                <mesh
                  key={i}
                  position={[0.7, -0.4, z]}
                  castShadow>
                  <boxGeometry args={[0.2, 0.2, 0.12]} />
                  <meshStandardMaterial color='#888' />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>

      {/* ========== STORAGE TRUCK (left side) ========== */}
      <group position={[0, 0, -5.5]}>
        {/* Truck chassis */}
        <mesh
          position={[0, 0.6, 0]}
          castShadow>
          <boxGeometry args={[2.8, 1, 2]} />
          <meshStandardMaterial color='#2a5a2a' />
        </mesh>

        {/* Cabin */}
        <mesh
          position={[-1, 1.3, 0]}
          castShadow>
          <boxGeometry args={[1, 1, 1.5]} />
          <meshStandardMaterial color='#1a4a1a' />
        </mesh>

        {/* Truck bed/storage */}
        <mesh
          position={[0.5, 1.6, 0]}
          castShadow>
          <boxGeometry args={[2.6, 2, 2.2]} />
          <meshStandardMaterial color='#654321' />
        </mesh>

        {/* Wheels */}
        <mesh
          position={[-1.2, 0.35, -1]}
          castShadow>
          <cylinderGeometry
            args={[0.45, 0.45, 0.4, 16]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color='#1a1a1a' />
        </mesh>
        <mesh
          position={[-1.2, 0.35, 1]}
          castShadow>
          <cylinderGeometry
            args={[0.45, 0.45, 0.4, 16]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color='#1a1a1a' />
        </mesh>
        <mesh
          position={[1, 0.35, -1]}
          castShadow>
          <cylinderGeometry
            args={[0.45, 0.45, 0.4, 16]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color='#1a1a1a' />
        </mesh>
        <mesh
          position={[1, 0.35, 1]}
          castShadow>
          <cylinderGeometry
            args={[0.45, 0.45, 0.4, 16]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color='#1a1a1a' />
        </mesh>

        {/* Soil pile */}
        <mesh
          position={[0.5, 1.6 + Math.min(soilVolume / 80, 1), 0]}
          castShadow>
          <coneGeometry
            args={[
              0.8 + Math.min(soilVolume / 120, 0.5),
              0.6 + Math.min(soilVolume / 140, 0.7),
              6,
            ]}
          />
          <meshStandardMaterial color='#5a4332' />
        </mesh>
      </group>
    </group>
  );
};

export default AnimatedExcavator;
