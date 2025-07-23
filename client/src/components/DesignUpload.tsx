import { useRef } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import { sampleDesigns } from "../assets/design";

interface designPalletImgInterface {
  [key: string]: string;
}

const DesignUpload: React.FC = () => {
  const designPlattate: designPalletImgInterface = {
    check1: sampleDesigns.check1,
    check2: sampleDesigns.check2,
    check3: sampleDesigns.check3,
    check4: sampleDesigns.check4,
    flower1: sampleDesigns.flower1,
    flower2: sampleDesigns.flower2,
    flower3: sampleDesigns.flower3,
  };

  const {
    design,
    designScale,
    updateDesign,
    updateDesignPath,
    updateDesignScale,
  } = useClothConfigStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageName = e.target.files?.[0].name;

      const url = URL.createObjectURL(e.target.files?.[0]);
      updateDesign(imageName);
      updateDesignPath(url);
    }
  };

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

      {design ? (
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
          <p className="">{!design ? "" : design}</p>
          <button
            className="inline-block px-4 py-2 font-semibold rounded-lg bg-red-600 cursor-pointer"
            onClick={() => {
              updateDesign("");
              updateDesignPath("");
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
            value={designScale}
            min={30}
            max={100}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateDesignScale(parseFloat(e.target.value));
            }}
          />
        </div>
      ) : (
        <div className="h-full w-full grid grid-cols-4 items-center content-center justify-items-center gap-2">
          {Object.entries(designPlattate).map(([key, value]) => (
            <img
              src={value}
              alt={key}
              key={key}
              className="h-auto w-20 p-2 bg-red-300 rounded-lg"
              onClick={() => {
                updateDesign(key);
                updateDesignPath(value);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignUpload;
