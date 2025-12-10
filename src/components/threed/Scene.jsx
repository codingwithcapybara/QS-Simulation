import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Sky } from '@react-three/drei';
import AnimatedExcavator from './AnimatedExcavator';
import DiggingSimulation from './DiggingSimulation';

const Scene = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [12, 8, 10], fov: 45 }}
        shadows>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight
          position={[-10, 10, -10]}
          intensity={0.3}
        />

        {/* Sky */}
        <Sky sunPosition={[100, 20, 100]} />

        {/* Environment */}
        <Environment preset='sunset' />

        {/* Ground Grid */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor='#6f6f6f'
          sectionSize={5}
          sectionThickness={1}
          sectionColor='#9d4b4b'
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
        />

        {/* Ground Plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color='#8B7355' />
        </mesh>

        {/* Digging Simulation (particles, pit, soil) */}
        <DiggingSimulation />

        {/* Animated Excavator */}
        <AnimatedExcavator />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
