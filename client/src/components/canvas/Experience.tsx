import { OrbitControls, Stage, Environment, ContactShadows } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      <color attach="background" args={["#1a1a1a"]} />
      <fog attach="fog" args={["#1a1a1a", 10, 20]} />

      <Stage
        environment="warehouse"
        intensity={0.5}
        adjustCamera={false}
        shadows="contact"
      >
        <Model />
      </Stage>

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.35}
        scale={10}
        blur={2.5}
        far={4}
      />

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2} 
        enableZoom={true}
        enablePan={true}
      />
    </>
  );
}