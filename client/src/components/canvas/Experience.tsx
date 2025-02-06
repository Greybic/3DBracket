import { OrbitControls, Stage, Environment, ContactShadows, Grid, GradientTexture } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      {/* Create gradient background */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 1]} // Gradient stops
            colors={['#2a2a2a', '#ffffff']} // Dark gray to white
          />
        </meshBasicMaterial>
      </mesh>

      <Stage
        environment="warehouse"
        intensity={0.7}
        adjustCamera={false}
        shadows="contact"
        preset="rembrandt"
      >
        <Model />
      </Stage>

      {/* Adjusted grid position to be level with the floor */}
      <Grid
        position={[0, -2, 0]}
        args={[10.5, 10.5]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#ffffff"
        sectionSize={3}
        fadeDistance={20}
        fadeStrength={1}
        infiniteGrid
      />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.35}
        scale={10}
        blur={2.5}
        far={4}
      />

      <OrbitControls 
        makeDefault 
        minPolarAngle={0.2} 
        maxPolarAngle={Math.PI / 2.1} 
        enableZoom={true}
        enablePan={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
}