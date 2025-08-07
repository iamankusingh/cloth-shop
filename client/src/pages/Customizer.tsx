// page appear when have to customize the selected cloth
import ColorInput from "../components/ColorInput";
import PageTitle from "../components/PageTitle";
import TextInput from "../components/TextInput";
import DesignUpload from "../components/DesignUpload";
import LinkButton from "../components/LinkButton";
import useClothConfigStore from "../store/clothConfigStore";
import LogoUpdate from "../components/LogoUpdate";
import useUserStore from "../store/userStore";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface updateApiResponse {
  success: boolean;
  message: string;
}

const Customizer: React.FC = () => {
  // cloth configuration from zustand to update and reset database
  const {
    hexColor,
    logo,
    logoPath,
    logoSize,
    logoPositionX,
    logoPositionY,
    logoUrl,
    clothText,
    clothFont,
    clothTextColor,
    clothTextSize,
    clothTextPositionX,
    clothTextPositionY,
    design,
    designPath,
    designScale,
    // updater
    updateHexColor,
    updateLogo,
    updateLogoPath,
    updateLogoSize,
    updateLogoPositionX,
    updateLogoPositionY,
    updateLogoUrl,
    updateClothText,
    updateClothFont,
    updateClothTextColor,
    updateClothTextSize,
    updateClothTextPositionX,
    updateClothTextPositionY,
    updateDesign,
    updateDesignPath,
    updateDesignScale,
    updateClothSize,
    updateClothFabric,
  } = useClothConfigStore();

  // from clerk
  const { isSignedIn } = useAuth();

  const handelSaveButton = async () => {
    if (isSignedIn) {
      updateClothConfig();
    } else {
      console.log("Please Sign in first");
      toast.error("Please Sign in first", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const handleResetButton = async () => {
    // update zustand store with default values
    updateHexColor("#24D6A6");
    updateLogo("");
    updateLogoPath("");
    updateLogoSize(15);
    updateLogoPositionX(0);
    updateLogoPositionY(0);
    updateLogoUrl("");
    updateClothText("");
    updateClothFont("/src/assets/fonts/Poppins-Regular.ttf");
    updateClothTextColor("#ffffff");
    updateClothTextSize(100);
    updateClothTextPositionX(100);
    updateClothTextPositionY(100);
    updateDesign("");
    updateDesignPath("");
    updateDesignScale(0);
    updateClothSize("");
    updateClothFabric("");

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
            logoPositionX,
            logoPositionY,
            logoUrl,
            clothText,
            clothFont,
            clothTextColor,
            clothTextSize,
            clothTextPositionX,
            clothTextPositionY,
            design,
            designPath,
            designScale,
          }),
        }
      );

      if (response.ok) {
        const result: updateApiResponse = await response.json();
        console.log(result.message);
        toast.success(result.message, {
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update cloth config data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <main className="h-[50vh] lg:h-screen w-screen lg:w-[50vw] lg:pt-12 flex flex-col justify-between">
        <section className="max-w-full p-2 md:text-xl">
          <Tabs defaultValue="color">
            <TabsList className="w-full">
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="color">
              <ColorInput />
            </TabsContent>
            <TabsContent value="logo">
              <LogoUpdate />
            </TabsContent>
            <TabsContent value="text">
              <TextInput />
            </TabsContent>
            <TabsContent value="design">
              <DesignUpload />
            </TabsContent>
          </Tabs>
        </section>

        <div className="pb-2 flex justify-evenly">
          <Button variant="outline" onClick={() => handleResetButton()}>
            Reset
          </Button>

          <Button variant="outline" onClick={() => handelSaveButton()}>
            Save
          </Button>

          <LinkButton path="/order" title="Order now" />
        </div>
      </main>
    </>
  );
};

export default Customizer;
