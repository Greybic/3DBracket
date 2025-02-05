import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useConfigurator } from "@/store/configurator";

export default function ConfigPanel() {
  const { 
    width, setWidth,
    height, setHeight,
    depth, setDepth,
    color, setColor 
  } = useConfigurator();

  return (
    <Card className="h-full rounded-none border-0">
      <CardHeader>
        <CardTitle>Bracket Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {["#CCCCCC", "#666666", "#000000"].map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === c ? "border-primary" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
