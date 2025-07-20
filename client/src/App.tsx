// home page (/) route
import { useEffect } from "react";
import LinkButton from "./components/LinkButton";
import PageTitle from "./components/PageTitle";
import useClothConfigStore from "./store/clothConfigStore";

function App() {
  // uid and updater function form zustand to update store from database
  const {
    uid,
    updateColor,
    updateLogoImg,
    updateLogoPath,
    updateLogoImageSize,
    updateLogoPositionY,
    updateClothText,
    updateDesignImg,
    updateDesignImgPath,
    updateDesignImageScale,
  } = useClothConfigStore();

  // fetch cloth configuration if loged in (everytime)
  const fetchClothConfig = async (): Promise<void> => {
    console.log("Fetching cloth config data for uid in homepage", uid);

    try {
      const response: Response = await fetch(
        `http://localhost:3000/api/v1/cloth-config?uid=${uid}`,
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
        updateColor(result.data.hexColor);
        updateLogoImg(result.data.logoImg);
        updateLogoPath(result.data.logoPath);
        updateLogoImageSize(result.data.imageSize);
        updateLogoPositionY(result.data.positionY);
        updateClothText(result.data.clothText);
        updateDesignImg(result.data.designImg);
        updateDesignImgPath(result.data.designImgPath);
        updateDesignImageScale(result.data.designScale);
      }
    } catch (error) {
      console.error("Unable to fetch cloth config data by default", error);
      alert("Unable to fetch cloth config data");
    }
  };

  useEffect(() => {
    if (uid) {
      fetchClothConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

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
