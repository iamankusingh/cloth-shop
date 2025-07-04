import { useEffect, useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      console.log("File in useState:", file);
    }
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <input
        id="file-upload"
        type="file"
        accept="image/png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
          }
        }}
      />

      <label
        htmlFor="file-upload"
        className="p-6 inline-block bg-blue-500 text-white rounded cursor-pointer"
      >
        Upload Image (.png)
      </label>

      <p className="">{!file ? "" : file.name}</p>
    </div>
  );
};

export default ImageUpload;
