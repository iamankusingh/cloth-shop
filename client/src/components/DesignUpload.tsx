import { useEffect, useRef, useState } from "react";
import useClothConfigStore from "../store/clothConfigStore";

const DesignUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const {
    designImg,
    updateDesignImg,
    updateDesignImgPath,
    updateDesignImageScale,
  } = useClothConfigStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageName = e.target.files?.[0].name;
      setUploadedFile(imageName);

      const url = URL.createObjectURL(e.target.files?.[0]);
      updateDesignImg(imageName);
      updateDesignImgPath(url);
    }
  };

  useEffect(() => {
    if (!uploadedFile) {
      setUploadedFile(designImg);
    }
    updateDesignImageScale(50);
  }, [uploadedFile, designImg, updateDesignImageScale]);

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      <input
        id="design-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <label
        htmlFor="design-upload"
        className="p-6 inline-block text-white rounded border-2 border-blue-500 border-dashed cursor-pointer"
      >
        Upload Image
      </label>

      {uploadedFile ? (
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
          <p className="">{!uploadedFile ? "" : uploadedFile}</p>
          <button
            className="inline-block px-4 py-2 font-semibold rounded-lg bg-red-600 cursor-pointer"
            onClick={() => {
              setUploadedFile("");
              updateDesignImg("");
              updateDesignImgPath("");
              handleReset();
            }}
          >
            Remove image
          </button>

          <label htmlFor="scale">Image Size : </label>

          <input
            type="range"
            name="scale"
            id="scale"
            value={50}
            min={30}
            max={100}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateDesignImageScale(parseFloat(e.target.value));
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DesignUpload;
