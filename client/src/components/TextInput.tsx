import { useEffect, useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import ColorPicker from "./ColorPicker";
import { Button } from "@/components/ui/button";

const TextInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const {
    clothText,
    updateClothText,
    clothTextColor,
    updateClothTextColor,
    clothTextSize,
    updateClothTextSize,
    clothTextPositionY,
    updateClothTextPositionY,
  } = useClothConfigStore();

  useEffect(() => {
    if (text) {
      updateClothText(text);
    } else {
      updateClothText("");
      setText(clothText);
    }
  }, [text, clothText, updateClothText]);

  return (
    <div className="flex flex-col justify-between items-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          value={text}
          // autoFocus
          className="p-2 text-xl border rounded-lg"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Button
          variant="secondary"
          onClick={() => {
            setText("");
            updateClothText("");
          }}
        >
          Clear
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <label htmlFor="txt-size">Text Size : </label>

        <input
          type="range"
          name="txt-size"
          id="txt-size"
          min={50}
          max={200}
          value={clothTextSize}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateClothTextSize(parseFloat(e.target.value))
          }
        />

        <label htmlFor="positionY">Position Y : </label>

        <input
          type="range"
          name="positionY"
          id="positionY"
          min={-150}
          max={150}
          value={clothTextPositionY}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateClothTextPositionY(parseFloat(e.target.value))
          }
        />
        <ColorPicker color={clothTextColor} updator={updateClothTextColor} />
      </div>
    </div>
  );
};

export default TextInput;
