import { useEffect, useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";

const TextInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const { updateText } = useClothConfigStore();

  useEffect(() => {
    if (text) {
      updateText(text);
    } else {
      updateText("");
    }
  }, [text, updateText]);

  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <input
        type="text"
        value={text}
        autoFocus
        className="p-2 text-xl border rounded-lg"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button
        className="p-2 inline-block bg-blue-500 rounded-lg"
        onClick={() => setText("")}
      >
        Clear
      </button>
    </div>
  );
};

export default TextInput;
