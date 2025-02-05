import { OrbitControls, Stage } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      <Stage environment="city" intensity={0.5}>
        <Model />
      </Stage>
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