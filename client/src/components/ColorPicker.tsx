import { SketchPicker } from "react-color";
import type { ColorResult } from "react-color";
import useClothConfigStore from "../store/clothConfigStore";

const ColorPicker: React.FC = () => {
  const { hexColor, updateHexColor } = useClothConfigStore();

  return (
    <SketchPicker
      className="text-black"
      color={hexColor}
      disableAlpha
      onChange={(color: ColorResult) => {
        updateHexColor(color.hex);
      }}
    />
  );
};

export default ColorPicker;
