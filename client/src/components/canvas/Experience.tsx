import { OrbitControls, Stage, Environment, ContactShadows, Grid } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      {/* Set solid dark background */}
      <color attach="background" args={["#1a1a1a"]} />

      <Stage
        environment="warehouse"
        intensity={0.7}
        adjustCamera={false}
        shadows="contact"
        preset="rembrandt"
      >
        <Model />
      </Stage>

      {/* White grid with fade-out effect */}
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