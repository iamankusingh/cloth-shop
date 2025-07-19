// home page (/) route
import { useEffect, useState } from "react";
import LinkButton from "./components/LinkButton";
import PageTitle from "./components/PageTitle";
import { useAuth } from "@clerk/clerk-react";
import useClothConfigStore from "./store/clothConfigStore";

function App() {
  const {
    updateColor,
    updateLogoPath,
    updateImageSize,
    updatePositionY,
    updateClothText,
    updateDesignImgPath,
    updateDesignScale,
  } = useClothConfigStore();

  // from clerk
  const { isSignedIn, userId } = useAuth();

  // to store userId
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(userId || "");
  }, [userId]);

  // fetch cloth configuration (everytime)
  const fetchClothConfig = async (): Promise<void> => {
    console.log("Fetching cloth config data for uid", uid);

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

        updateColor(result.data.hexColor);
        updateLogoPath(result.data.logoPath);
        updateImageSize(result.data.imageSize);
        updatePositionY(result.data.positionY);
        updateClothText(result.data.clothText);
        updateDesignImgPath(result.data.designImgPath);
        updateDesignScale(result.data.designScale);
      }
    } catch (error) {
      console.error("Unable to fetch cloth config data by default", error);
      alert("Unable to fetch cloth config data");
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchClothConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, uid]);

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
