import { useRef } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import { sampleLogo } from "../assets/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface logoPalletImgInterface {
  [key: string]: string;
}

const LogoUpdate: React.FC = () => {
  const {
    logo,
    updateLogo,
    updateLogoPath,
    logoSize,
    updateLogoSize,
    logoPositionY,
    updateLogoPositionY,
    updateLogoUrl,
  } = useClothConfigStore();

  const logoPalletImg: logoPalletImgInterface = {
    "react.png": sampleLogo.react,
    "threejs.png": sampleLogo.threejs,
    "cat.png": sampleLogo.cat,
    "dog.png": sampleLogo.dog,
    "e;ephant.png": sampleLogo.elephant,
    "flower.png": sampleLogo.flower,
    "giraffe.png": sampleLogo.giraffe,
    "js.png": sampleLogo.js,
    "linux.png": sampleLogo.linux,
    "moon.png": sampleLogo.moon,
    "nodejs.png": sampleLogo.nodejs,
    "peacockFeather.png": sampleLogo.peacockFeather,
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageName = e.target.files?.[0].name;
      updateLogo(imageName);

      const url = URL.createObjectURL(e.target.files?.[0]);
      updateLogoPath(url);

      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "cloth shop 3D");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const uploadCloudinary = await res.json();
        console.log("uploadCloudinary", uploadCloudinary.url);
        updateLogoUrl(uploadCloudinary.url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        toast.error("Failed to upload image.", {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      updateLogoPath("");
      updateLogo("");
      updateLogoSize(15);
      updateLogoPositionY(0);
      updateLogoUrl("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <label
        htmlFor="file-upload"
        className="p-2 md:p-4 inline-block rounded border-2 border-blue-500 border-dashed cursor-pointer"
      >
        Upload Image
      </label>

      {logo ? (
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
          <p className="">{!logo ? "" : logo}</p>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              updateLogoPath("");
              updateLogo("");
              handleReset();
              updateLogoUrl("");
            }}
          >
            Remove Image
          </Button>

          <label>Image Size : </label>

          <Slider
            min={5}
            max={50}
            step={1}
            defaultValue={[logoSize]}
            onValueChange={(value) => {
              updateLogoSize(value[0]);
            }}
          />

          <label>Position Y : </label>

          <Slider
            min={-25}
            max={25}
            defaultValue={[logoPositionY]}
            onValueChange={(value) => {
              updateLogoPositionY(value[0]);
            }}
          />
        </div>
      ) : (
        <ScrollArea className="h-[30vh] lg:h-[60vh] w-sm md:w-xl rounded-md border p-4">
          <div className="h-full w-full grid content-center grid-cols-4 gap-2">
            {Object.entries(logoPalletImg).map(([key, value]) => (
              <img
                src={value}
                alt={key}
                key={key}
                className="h-20 w-auto p-2 bg-red-300 rounded-lg"
                onClick={() => {
                  updateLogo(key);
                  updateLogoPath(value);
                }}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default LogoUpdate;
