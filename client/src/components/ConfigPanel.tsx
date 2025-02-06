import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { baseWidths, surfaceTreatments, hardwareOptions } from "@shared/schema";

export default function ConfigPanel() {
  const {
    baseWidth, setBaseWidth,
    height,
    depth,
    surfaceTreatment, setSurfaceTreatment,
    hardware, setHardware,
    quantity, setQuantity,
    calculatePrice,
  } = useConfigurator();

  const price = calculatePrice();

  return (
    <Card className="h-full rounded-none border-0 overflow-y-auto">
      <CardHeader>
        <CardTitle>Bracket Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Base Width</Label>
            <Select value={baseWidth} onValueChange={setBaseWidth}>
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(baseWidths).map((width) => (
                  <SelectItem key={width} value={width}>
                    {width}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dimensions</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Height:</span>
                <p className="font-medium">{height} inches</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Depth:</span>
                <p className="font-medium">{depth} inches</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Surface Treatment</Label>
            <Select value={surfaceTreatment} onValueChange={setSurfaceTreatment}>
              <SelectTrigger>
                <SelectValue placeholder="Select surface treatment" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(surfaceTreatments).map((treatment) => (
                  <SelectItem key={treatment} value={treatment}>
                    {treatment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Hardware</Label>
            <Select value={hardware} onValueChange={setHardware}>
              <SelectTrigger>
                <SelectValue placeholder="Select hardware" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(hardwareOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
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
                +
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}