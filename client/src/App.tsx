// home page (/) route
import { useAuth } from "@clerk/clerk-react";
import LinkButton from "./components/LinkButton";
import PageTitle from "./components/PageTitle";
import { useEffect } from "react";
import useUserStore from "./store/userStore";
import useClothConfigStore from "./store/clothConfigStore";

function App() {
  // from clerk
  const { isSignedIn, userId } = useAuth();

  // user zustand store
  const { updateIsSignedIn, updateUid } = useUserStore();

  // cloth config zustand store
  const {
    updateHexColor,
    updateLogo,
    updateLogoPath,
    updateLogoSize,
    updateLogoPositionY,
    updateClothText,
    updateDesign,
    updateDesignPath,
    updateDesignScale,
    updateClothSize,
    updateClothFabric,
  } = useClothConfigStore();

  const fetchClothConfig = async () => {
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
        alert(result.message);

        // update zustand store with fetched data
        updateHexColor(result.data.hexColor);
        updateLogo(result.data.logo);
        updateLogoPath(result.data.logoPath);
        updateLogoSize(result.data.logoSize);
        updateLogoPositionY(result.data.logoPositionY);
        updateClothText(result.data.clothText);
        updateDesign(result.data.design);
        updateDesignPath(result.data.designPath);
        updateDesignScale(result.data.designScale);
        updateClothSize(result.data.clothSize);
        updateClothFabric(result.data.clothFabric);
      }
    } catch (error) {
      console.error("Unable to fetch cloth config data by default", error);
      alert("Unable to fetch cloth config data");
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

      <main className="w-screen">
        <section className="lg:w-[50vw] p-2">
          <h1 className="lg:pt-20 text-5xl">Design Your Cloths</h1>

          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            excepturi unde. Quis, tenetur cum id iure odio voluptate blanditiis
            impedit?
          </p>

          <LinkButton path="/customizer" title="Customize it" />
        </section>
      </main>
    </>
  );
}

export default App;
