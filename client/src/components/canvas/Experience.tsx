import { OrbitControls, Stage } from "@react-three/drei";
import Model from "./Model";
import { useConfigurator } from "@/store/configurator";

export default function Experience() {
  const { color } = useConfigurator();

  return (
    <>
      <Stage environment="city" intensity={0.5}>
        <Model color={color} />
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
