// page appear when have to customize the selected cloth
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import PageTitle from "../components/PageTitle";
import TextInput from "../components/TextInput";
import DesignUpload from "../components/DesignUpload";
import LinkButton from "../components/LinkButton";
import useClothConfigStore from "../store/clothConfigStore";
import LogoUpdate from "../components/LogoUpdate";
import useUserStore from "../store/userStore";
import { useAuth } from "@clerk/clerk-react";

interface updateApiResponse {
  success: boolean;
  message: string;
}

const Customizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("color");

  // cloth configuration from zustand to update and reset database
  const {
    hexColor,
    logo,
    logoPath,
    logoSize,
    logoPositionY,
    clothText,
    design,
    designPath,
    designScale,
    // updater
    updateHexColor,
    updateLogo,
    updateLogoPath,
    updateLogoSize,
    updateLogoPositionY,
    updateClothText,
    updateDesign,
    updateDesignPath,
    updateDesignScale,
  } = useClothConfigStore();

  // from clerk
  const { isSignedIn } = useAuth();

  const handelSaveButton = async () => {
    if (isSignedIn) {
      updateClothConfig();
    } else {
      console.log("Please Sign in first");
      alert("Please Sign in first");
    }
  };

  const handleResetButton = async () => {
    // update zustand store with default values
    updateHexColor("#24D6A6");
    updateLogo("");
    updateLogoPath("");
    updateLogoSize(15);
    updateLogoPositionY(0);
    updateClothText("");
    updateDesign("");
    updateDesignPath("");
    updateDesignScale(0);

    if (isSignedIn) {
      updateClothConfig();
    }
  };

  // user configuration from zustand
  const { uid } = useUserStore();

  // update or reset cloth configuration api call
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
            logo,
            logoPath,
            logoSize,
            logoPositionY,
            clothText,
            design,
            designPath,
            designScale,
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

  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <main className="h-[60dvh] lg:h-screen w-screen lg:w-[50vw] lg:pt-16 flex flex-col justify-between">
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
            onClick={() => handleResetButton()}
          >
            Reset
          </button>

          <button className="mx-4 button" onClick={() => handelSaveButton()}>
            Save
          </button>
        </div>
      </main>
    </>
  );
};

export default Customizer;
