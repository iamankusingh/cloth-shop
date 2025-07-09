import { useEffect, useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<string>("");
  const {
    logoImg,
    updateLogoImg,
    updateLogoPath,
    updateImageSize,
    updatePositionY,
  } = useClothConfigStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageName = e.target.files?.[0].name;
      setFile(imageName);

      const url = URL.createObjectURL(e.target.files?.[0]);
      updateLogoPath(url);
      updateLogoImg(imageName);
    }
  };

  useEffect(() => {
    if (!file) {
      setFile(logoImg);
    }
  }, [file, logoImg]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
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

      {file ? (
        <div className="w-[80%]">
          <p className="">{!file ? "" : file}</p>
          <button
            className="inline-block px-4 py-2 font-semibold rounded-lg bg-red-600 cursor-pointer"
            onClick={() => {
              updateLogoPath("");
              setFile("");
              updateLogoImg("");
            }}
          >
            Remove image
          </button>

          <label htmlFor="img-size">Image Size : </label>

          <input
            type="range"
            name="img-size"
            id="img-size"
            min={5}
            max={50}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateImageSize(parseFloat(e.target.value))
            }
          />

          <label htmlFor="positionY">Position Y : </label>

          <input
            type="range"
            name="positionY"
            id="positionY"
            min={-25}
            max={25}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePositionY(parseFloat(e.target.value))
            }
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageUpload;
