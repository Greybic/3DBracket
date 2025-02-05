import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfigurator } from "@/store/configurator";
import { bracketTypes, materials, finishes } from "@shared/schema";
import { Minus, Plus, X } from "lucide-react";

export default function ConfigPanel() {
  const {
    width, setWidth,
    height, setHeight,
    depth, setDepth,
    type, setType,
    material, setMaterial,
    finish, setFinish,
    thickness, setThickness,
    quantity, setQuantity,
    holes, setHoleDiameter,
    addHole, removeHole,
  } = useConfigurator();

  return (
    <Card className="h-full rounded-none border-0 overflow-y-auto">
      <CardHeader>
        <CardTitle>Bracket Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Bracket Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(bracketTypes).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(materials).map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Finish</Label>
            <Select value={finish} onValueChange={setFinish}>
              <SelectTrigger>
                <SelectValue placeholder="Select finish" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(finishes).map((finish) => (
                  <SelectItem key={finish} value={finish}>
                    {finish}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Thickness (inches)</Label>
            <Slider
              value={[thickness]}
              onValueChange={([value]) => setThickness(value)}
              min={0.125}
              max={0.5}
              step={0.125}
            />
            <span className="text-sm text-muted-foreground">{thickness}"</span>
          </div>

          <div className="space-y-2">
            <Label>Width (inches)</Label>
            <Slider
              value={[width]}
              onValueChange={([value]) => setWidth(value)}
              min={1}
              max={12}
              step={0.1}
            />
            <span className="text-sm text-muted-foreground">{width}"</span>
          </div>

          <div className="space-y-2">
            <Label>Height (inches)</Label>
            <Slider
              value={[height]}
              onValueChange={([value]) => setHeight(value)}
              min={1}
              max={12}
              step={0.1}
            />
            <span className="text-sm text-muted-foreground">{height}"</span>
          </div>

          <div className="space-y-2">
            <Label>Depth (inches)</Label>
            <Slider
              value={[depth]}
              onValueChange={([value]) => setDepth(value)}
              min={0.125}
              max={2}
              step={0.125}
            />
            <span className="text-sm text-muted-foreground">{depth}"</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Holes</Label>
              <div className="mt-2">
                <Label className="text-sm">Hole Diameter (inches)</Label>
                <Slider
                  value={[holes.diameter]}
                  onValueChange={([value]) => setHoleDiameter(value)}
                  min={0.125}
                  max={0.5}
                  step={0.0625}
                  className="mt-2"
                />
                <span className="text-sm text-muted-foreground">{holes.diameter}"</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => addHole({ x: width / 2, y: height / 2 })}
              >
                Add Hole
              </Button>

              {holes.positions.map((hole, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                  <div className="flex-1 space-y-1">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs">X Position</Label>
                        <Input
                          type="number"
                          value={hole.x}
                          onChange={(e) => {
                            const newHoles = [...holes.positions];
                            newHoles[index] = { ...hole, x: parseFloat(e.target.value) || 0 };
                            // Update hole position in state
                            
                          }}
                          className="h-8"
                          step={0.125}
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs">Y Position</Label>
                        <Input
                          type="number"
                          value={hole.y}
                          onChange={(e) => {
                            const newHoles = [...holes.positions];
                            newHoles[index] = { ...hole, y: parseFloat(e.target.value) || 0 };
                            // Update hole position in state
                            
                          }}
                          className="h-8"
                          step={0.125}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => removeHole(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}