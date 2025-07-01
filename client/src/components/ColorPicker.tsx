import { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  hex: string;
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  oldHue: number;
  rgb: { r: number; g: number; b: number; a: number };
  source: string;
}

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("22194D");

  return (
    <SketchPicker
      className="text-black"
      color={color}
      disableAlpha
      onChange={(color: ColorPickerProps) => {
        console.log(color);
        setColor(color.hex);
      }}
    />
  );
};

export default ColorPicker;
