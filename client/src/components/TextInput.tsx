import { useEffect, useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import ColorPicker from "./ColorPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const TextInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const {
    clothText,
    updateClothText,
    clothTextColor,
    updateClothTextColor,
    clothTextSize,
    updateClothTextSize,
    clothTextPositionX,
    updateClothTextPositionX,
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
        <Input
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
        <label>Text Size : </label>

        <Slider
          min={50}
          max={200}
          step={1}
          defaultValue={[clothTextSize]}
          onValueChange={(value) => {
            updateClothTextSize(value[0]);
          }}
        />

        <label>Position X : </label>

        <Slider
          min={-200}
          max={150}
          step={1}
          defaultValue={[clothTextPositionX]}
          onValueChange={(value) => {
            updateClothTextPositionX(value[0]);
          }}
        />
        <label>Position Y : </label>

        <Slider
          min={-200}
          max={150}
          step={1}
          defaultValue={[clothTextPositionY]}
          onValueChange={(value) => {
            updateClothTextPositionY(value[0]);
          }}
        />
        <br />

        <ColorPicker color={clothTextColor} updator={updateClothTextColor} />
      </div>
    </div>
  );
};

export default TextInput;
