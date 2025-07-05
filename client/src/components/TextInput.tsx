import { useEffect, useState } from "react";

const TextInput = () => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (text) {
      console.log(text);
    }
  }, [text]);

  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <input
        type="text"
        value={text}
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
