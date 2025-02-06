import { Canvas } from "@react-three/fiber";
import Experience from "../components/canvas/Experience";
import ConfigPanel from "../components/ConfigPanel";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        <div className="absolute bottom-6 right-6 flex gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="default"
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                      const event = new CustomEvent('zoom-in');
                      canvas.dispatchEvent(event);
                    }
                  }}
                  className="bg-white hover:bg-blue-50"
                >
                  <ZoomIn className="h-5 w-5 text-neutral-800" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="default"
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                      const event = new CustomEvent('zoom-out');
                      canvas.dispatchEvent(event);
                    }
                  }}
                  className="bg-white hover:bg-blue-50"
                >
                  <ZoomOut className="h-5 w-5 text-neutral-800" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="default"
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                      const event = new CustomEvent('reset-camera');
                      canvas.dispatchEvent(event);
                    }
                  }}
                  className="bg-white hover:bg-blue-50"
                >
                  <Maximize2 className="h-5 w-5 text-neutral-800" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}