import { SketchPicker } from "react-color";
import useClothConfigStore from "../store/clothConfigStore";

interface ColorPickerProps {
  hex: string;
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  oldHue: number;
  rgb: { r: number; g: number; b: number; a: number };
  source: string;
}

const ColorPicker: React.FC = () => {
  const { hexColor, updateHexColor } = useClothConfigStore();

  return (
    <SketchPicker
      className="text-black"
      color={hexColor}
      disableAlpha
      onChange={(color: ColorPickerProps) => {
        updateHexColor(color.hex);
      }}
    />
  );
};

export default ColorPicker;
