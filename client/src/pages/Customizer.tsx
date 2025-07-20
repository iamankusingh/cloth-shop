// page appear when have to customize the selected cloth

import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import PageTitle from "../components/PageTitle";
import TextInput from "../components/TextInput";
import DesignUpload from "../components/DesignUpload";
import LinkButton from "../components/LinkButton";
import useClothConfigStore from "../store/clothConfigStore";
import LogoUpdate from "../components/LogoUpdate";

interface updateApiResponse {
  success: boolean;
  message: string;
}

const Customizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("color");

  // cloth configuration from zustand to update and reset database
  const {
    uid,
    hexColor,
    updateColor,
    logoImg,
    updateLogoImg,
    logoPath,
    updateLogoPath,
    logoSize,
    updateLogoImageSize,
    logoPositionY,
    updateLogoPositionY,
    clothText,
    updateClothText,
    designImg,
    updateDesignImg,
    designImgPath,
    updateDesignImgPath,
    designImageScale,
    updateDesignImageScale,
  } = useClothConfigStore();

  // update cloth configuration in databaase
  const updateClothConfig = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${uid}`,
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            hexColor,
            logoImg,
            logoPath,
            logoSize,
            logoPositionY,
            clothText,
            designImg,
            designImgPath,
            designImageScale,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // reset cloth configuration to deafult
  const resetClothConfig = async () => {
    // update zustand store with default values
    updateColor("#24D6A6");
    updateLogoImg("");
    updateLogoPath("");
    updateLogoImageSize(15);
    updateLogoPositionY(0);
    updateClothText("");
    updateDesignImg("");
    updateDesignImgPath("");
    updateDesignImageScale(0);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${uid}`,
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            hexColor: "#24D6A6",
            logoImg: "",
            logoPath: "",
            logoSize: 15,
            logoPositionY: 0,
            clothText: "",
            designImg: "",
            designImgPath: "",
            designImageScale: 0,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        alert("Cloth config reset");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <main className="h-[50dvh] lg:h-screen w-screen lg:w-[50vw] lg:pt-16 flex flex-col justify-between">
        <div className="max-w-full p-2 text-white bg-gray-500 rounded-lg flex items-center justify-around md:text-xl">
          <button
            className={`tabButton ${
              activeTab === "color" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("color")}
          >
            Colors
          </button>

          <button
            className={`tabButton ${activeTab === "logo" ? "bg-blue-600" : ""}`}
            onClick={() => setActiveTab("logo")}
          >
            Logo
          </button>

          <button
            className={`tabButton ${activeTab === "text" ? "bg-blue-600" : ""}`}
            onClick={() => setActiveTab("text")}
          >
            Text
          </button>

          <button
            className={`tabButton ${
              activeTab === "design" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("design")}
          >
            Design
          </button>

          <LinkButton path="/order" title="Order now" />
        </div>

        <section className="lg:w-[50vw] p-2 flex justify-center">
          {activeTab === "color" ? <ColorPicker /> : ""}
          {activeTab === "logo" ? <LogoUpdate /> : ""}
          {activeTab === "text" ? <TextInput /> : ""}
          {activeTab === "design" ? <DesignUpload /> : ""}
        </section>

        <div className="w-full p-2 text-center">
          <button
            className="mx-4 button !bg-orange-500"
            onClick={() => resetClothConfig()}
          >
            Reset
          </button>
          <button className="mx-4 button" onClick={() => updateClothConfig()}>
            Save
          </button>
        </div>
      </main>
    </>
  );
};

export default Customizer;
