import { useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { updateLogoPath } = useClothConfigStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files?.[0]);
      const url = URL.createObjectURL(e.target.files?.[0]);
      updateLogoPath(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <label
        htmlFor="file-upload"
        className="p-6 inline-block text-white rounded border-2 border-blue-500 border-dashed cursor-pointer"
      >
        Upload Image
      </label>

      <p className="">{!file ? "" : file.name}</p>
      {file ? (
        <button
          className="inline-block px-4 py-2 font-semibold rounded-lg bg-red-600 cursor-pointer"
          onClick={() => {
            updateLogoPath("");
            setFile(null);
          }}
        >
          Remove image
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageUpload;
