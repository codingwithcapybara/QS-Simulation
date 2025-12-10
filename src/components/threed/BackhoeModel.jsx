import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useSensorStore from '../../store/sensorStore';

const BackhoeModel = () => {
  const { armAngles, soilVolume } = useSensorStore();

  const basePivotRef = useRef();
  const boomRef = useRef();
  const stickRef = useRef();
  const bucketRef = useRef();

  useFrame(() => {
    if (basePivotRef.current) {
      basePivotRef.current.rotation.y = armAngles.base;
    }

    if (boomRef.current) {
      boomRef.current.rotation.x = armAngles.boom;
    }

    if (stickRef.current) {
      stickRef.current.rotation.x = armAngles.stick;
    }

    if (bucketRef.current) {
      bucketRef.current.rotation.x = armAngles.bucket;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* CHASSIS/BASE */}
      <mesh
        position={[0, 0.4, 0]}
        castShadow>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <meshStandardMaterial
          color='#FFD700'
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* CABIN */}
      <mesh
        position={[0.2, 1.2, 0]}
        castShadow>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>

      {/* COUNTERWEIGHT */}
      <mesh
        position={[-0.8, 0.8, 0]}
        castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='#333333' />
      </mesh>

      {/* TRACKS */}
      <mesh
        position={[-0.5, 0.15, -0.9]}
        castShadow>
        <boxGeometry args={[2.2, 0.3, 0.4]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>
      <mesh
        position={[-0.5, 0.15, 0.9]}
        castShadow>
        <boxGeometry args={[2.2, 0.3, 0.4]} />
        <meshStandardMaterial color='#1a1a1a' />
      </mesh>

      {/* ROTATING BASE FOR ARM */}
      <group
        ref={basePivotRef}
        position={[0.3, 1.1, 0]}>
        {/* BOOM - Main upper arm, extends forward */}
        <group ref={boomRef}>
          {/* Boom segment */}
          <mesh
            position={[1.5, 0, 0]}
            castShadow>
            <boxGeometry args={[3, 0.4, 0.4]} />
            <meshStandardMaterial
              color='#FF6B00'
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>

          {/* STICK - Forearm, attached at end of boom */}
          <group
            ref={stickRef}
            position={[3, 0, 0]}>
            {/* Stick segment */}
            <mesh
              position={[1.2, 0, 0]}
              castShadow>
              <boxGeometry args={[2.4, 0.35, 0.35]} />
              <meshStandardMaterial
                color='#FF8C00'
                metalness={0.4}
                roughness={0.6}
              />
            </mesh>

            {/* BUCKET - Attached at end of stick */}
            <group
              ref={bucketRef}
              position={[2.4, 0, 0]}>
              {/* Bucket scoop body */}
              <mesh
                position={[0, -0.25, 0]}
                castShadow>
                <boxGeometry args={[0.9, 0.6, 0.6]} />
                <meshStandardMaterial
                  color='#C0C0C0'
                  metalness={0.6}
                  roughness={0.4}
                />
              </mesh>

              {/* Bucket teeth */}
              {[-0.3, -0.1, 0.1, 0.3].map((offset, i) => (
                <mesh
                  key={i}
                  position={[0.45 + offset * 0.08, -0.4, offset * 0.15]}
                  castShadow>
                  <boxGeometry args={[0.15, 0.3, 0.1]} />
                  <meshStandardMaterial
                    color='#666666'
                    metalness={0.5}
                    roughness={0.7}
                  />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>

      {/* DUMP TRUCK */}
      <group position={[7, 0, 0]}>
        {/* Truck chassis */}
        <mesh
          position={[0, 0.4, 0]}
          castShadow>
          <boxGeometry args={[2, 0.8, 1.5]} />
          <meshStandardMaterial
            color='#2a5a2a'
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Truck bed */}
        <mesh
          position={[0, 1.3, 0]}
          castShadow>
          <boxGeometry args={[2, 1.5, 1.8]} />
          <meshStandardMaterial
            color='#654321'
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Wheels */}
        {[
          [-0.7, -0.8],
          [-0.7, 0.8],
          [0.7, -0.8],
          [0.7, 0.8],
        ].map(([x, z], i) => (
          <mesh
            key={i}
            position={[x, 0.25, z]}
            castShadow>
            <cylinderGeometry
              args={[0.35, 0.35, 0.3, 16]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <meshStandardMaterial color='#1a1a1a' />
          </mesh>
        ))}

        {/* Soil pile in truck bed */}
        <mesh
          position={[0, 1.3 + soilVolume / 150, 0]}
          castShadow>
          <coneGeometry
            args={[0.6 + soilVolume / 200, 0.4 + soilVolume / 250, 8]}
          />
          <meshStandardMaterial color='#5a4332' />
        </mesh>
      </group>

      {/* DIGGING PIT */}
      <group position={[-3, -0.01, 2]}>
        {/* Pit depression */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial color='#3d2817' />
        </mesh>

        {/* Pit edges */}
        <mesh
          position={[0, -0.3, 0]}
          castShadow>
          <cylinderGeometry args={[2.2, 2, 0.6, 32]} />
          <meshStandardMaterial color='#4a3322' />
        </mesh>
      </group>
    </group>
  );
};

export default BackhoeModel;
