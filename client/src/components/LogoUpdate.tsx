import { useRef } from "react";
import useClothConfigStore from "../store/clothConfigStore";
import { sampleLogo } from "../assets/logo";

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
        alert("Failed to upload image. Please try again.");
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
        className="p-2  md:p-4 lg:p-6 inline-block text-white rounded border-2 border-blue-500 border-dashed cursor-pointer"
      >
        Upload Image
      </label>

      {logo ? (
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
          <p className="">{!logo ? "" : logo}</p>
          <button
            className="inline-block px-4 py-2 font-semibold rounded-lg bg-red-600 cursor-pointer"
            onClick={() => {
              updateLogoPath("");
              updateLogo("");
              handleReset();
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
            value={logoSize}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateLogoSize(parseFloat(e.target.value))
            }
          />

          <label htmlFor="positionY">Position Y : </label>

          <input
            type="range"
            name="positionY"
            id="positionY"
            min={-25}
            max={25}
            value={logoPositionY}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateLogoPositionY(parseFloat(e.target.value))
            }
          />
        </div>
      ) : (
        <div className="h-full w-full grid grid-cols-4 items-center content-center justify-items-center gap-2">
          {Object.entries(logoPalletImg).map(([key, value]) => (
            <img
              src={value}
              alt={key}
              key={key}
              className="h-auto w-20 p-2 bg-red-300 rounded-lg"
              onClick={() => {
                updateLogo(key);
                updateLogoPath(value);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LogoUpdate;
