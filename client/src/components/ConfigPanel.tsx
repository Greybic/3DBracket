import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfigurator } from "@/store/configurator";
import { bracketTypes, materials, finishes } from "@shared/schema";

export default function ConfigPanel() {
  const {
    width, setWidth,
    height, setHeight,
    depth, setDepth,
    type, setType,
    material, setMaterial,
    finish, setFinish,
    thickness, setThickness
  } = useConfigurator();

  return (
    <Card className="h-full rounded-none border-0">
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
        </div>
      </CardContent>
    </Card>
  );
}