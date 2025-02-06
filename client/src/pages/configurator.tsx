import { Canvas } from "@react-three/fiber";
import Experience from "../components/canvas/Experience";
import ConfigPanel from "../components/ConfigPanel";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function Configurator() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-1/4 min-w-[300px] border-r">
        <ConfigPanel />
      </div>
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [4, 4, 4], fov: 50 }}
          className="w-full h-full bg-neutral-900"
        >
          <Experience />
        </Canvas>
        {/* Camera Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const event = new CustomEvent('zoom-in');
                canvas.dispatchEvent(event);
              }
            }}
            className="bg-black/50 hover:bg-black/70"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const event = new CustomEvent('zoom-out');
                canvas.dispatchEvent(event);
              }
            }}
            className="bg-black/50 hover:bg-black/70"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const event = new CustomEvent('reset-camera');
                canvas.dispatchEvent(event);
              }
            }}
            className="bg-black/50 hover:bg-black/70"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}