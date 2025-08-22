// home page (/) route
import { useAuth } from "@clerk/clerk-react";
import LinkButton from "./components/LinkButton";
import PageTitle from "./components/PageTitle";
import { useEffect } from "react";
import useUserStore from "./store/userStore";
import useClothConfigStore from "./store/clothConfigStore";
import { toast } from "sonner";

function App() {
  // from clerk
  const { isSignedIn, userId } = useAuth();

  const { hexColor } = useClothConfigStore();

  // user zustand store
  const { updateIsSignedIn, updateUid } = useUserStore();

  // cloth config zustand store
  const {
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

  const fetchClothConfig = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("fetch cloth config data ", result);
        toast.success(result.message, {
          // description: "Just fetched your cloth config data from dtabase",
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });

        // update zustand store with fetched data
        updateHexColor(result.data.hexColor);
        updateLogo(result.data.logo);
        updateLogoPath(result.data.logoPath);
        updateLogoSize(result.data.logoSize);
        updateLogoPositionX(result.data.logoPositionX);
        updateLogoPositionY(result.data.logoPositionY);
        updateLogoUrl(result.data.logoUrl);
        updateClothText(result.data.clothText);
        updateClothFont(result.data.clothFont);
        updateClothTextColor(result.data.clothTextColor);
        updateClothTextSize(result.data.clothTextSize);
        updateClothTextPositionX(result.data.clothTextPositionX);
        updateClothTextPositionY(result.data.clothTextPositionY);
        updateDesign(result.data.design);
        updateDesignPath(result.data.designPath);
        updateDesignScale(result.data.designScale);
        updateClothSize(result.data.clothSize);
        updateClothFabric(result.data.clothFabric);
      }
    } catch (error) {
      console.error("Unable to fetch cloth config data by default", error);
      toast.error("Unable to fetch cloth config data", {
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      updateIsSignedIn(true);
      updateUid(userId || "");
      fetchClothConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <>
      <PageTitle title="Cloth shop - Home" />

      <main className="h-[50vh] lg:h-screen w-screen lg:w-[50vw] flex items-center justify-center">
        <section className="p-2">
          <h1 className="lg:pt-20 text-5xl md:text-7xl font-bold">
            Design Your <span style={{ color: hexColor }}>Clothes</span>
          </h1>

          <p className="py-6 text-xl">
            Here you can customize your clothes with your own designs, logos,
            and text. You can also choose the color, size, and fabric of your
            clothes.
          </p>

          <div className="flex gap-4">
            <LinkButton path="/customizer" title="Customize" />
            <LinkButton path="/your-orders" title="Your orders" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
