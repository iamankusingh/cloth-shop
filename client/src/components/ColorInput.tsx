import useClothConfigStore from "../store/clothConfigStore";
import ColorPicker from "./ColorPicker";

const ColorInput = () => {
  const { hexColor, updateHexColor } = useClothConfigStore();

  return (
    <div>
      <ColorPicker color={hexColor} updator={updateHexColor} />
    </div>
  );
};

export default ColorInput;
