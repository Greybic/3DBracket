import { Canvas } from "@react-three/fiber";
import Experience from "../components/canvas/Experience";
import ConfigPanel from "../components/ConfigPanel";

export default function Configurator() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-1/4 min-w-[300px] border-r">
        <ConfigPanel />
      </div>
      <div className="flex-1">
        <Canvas
          camera={{ position: [4, 4, 4], fov: 50 }}
          className="w-full h-full bg-neutral-900"
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  );
}
