import { SketchPicker } from "react-color";
import type { ColorResult } from "react-color";

interface ColorPickerProps {
  color: string;
  updator: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, updator }) => {
  return (
    <SketchPicker
      className="text-black"
      color={color}
      disableAlpha
      onChange={(color: ColorResult) => {
        updator(color.hex);
      }}
    />
  );
};

export default ColorPicker;
