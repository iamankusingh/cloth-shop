import { useRef } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import { sampleDesigns } from "../assets/design";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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
        className="w-full p-2 md:p-4 text-center inline-block bg-[#d9d9d9] dark:bg-[#d9d9d915] rounded border-2 border-blue-500 border-dashed cursor-pointer"
      >
        Upload Image
      </label>

      {design ? (
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
          <p className="">{!design ? "" : design}</p>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              updateDesign("");
              updateDesignPath("");
              handleReset();
            }}
          >
            Remove image
          </Button>

          <div className="w-full p-4 space-y-2 bg-[#d9d9d9] dark:bg-[#d9d9d915] rounded-md">
            <label>Image Size : </label>
            <Slider
              min={30}
              max={100}
              step={1}
              defaultValue={[designScale]}
              onValueChange={(value) => {
                updateDesignScale(value[0]);
              }}
            />
          </div>
        </div>
      ) : (
        <ScrollArea className="h-[30dvh] lg:h-[60dvh] w-sm md:w-xl rounded-md border p-1">
          <div className="h-full w-full grid grid-cols-4 items-center content-start justify-items-center gap-2">
            {Object.entries(designPlattate).map(([key, value]) => (
              <div
                key={key}
                className="p-2 flex items-center justify-center bg-red-300 rounded-md"
              >
                <img
                  src={value}
                  alt={key}
                  key={key}
                  className="max-h-auto w-20"
                  onClick={() => {
                    updateDesign(key);
                    updateDesignPath(value);
                  }}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default DesignUpload;
