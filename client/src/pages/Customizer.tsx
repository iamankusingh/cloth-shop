// page appear when have to customize the selected cloth

import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

const Customizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("color");
  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <Header />

      {/* <div className="fixed top-0 z-10">
        <LinkButton path="/" title="Back" />
      </div> */}

      <main className="w-screen lg:w-[50vw] lg:mt-10">
        <div className="border flex items-center justify-around text-xl">
          <button>Colors</button>
          <button>Logo</button>
          <button>Text</button>
          <button>Texture</button>
        </div>

        <section className="lg:w-[50vw] p-2">
          <div className=" flex justify-center">
            {activeTab === "color" ? <ColorPicker /> : ""}
            {activeTab === "logo" ? "logo" : ""}
            {activeTab === "text" ? "text" : ""}
            {activeTab === "texture" ? "texture" : ""}
          </div>
        </section>
      </main>
    </>
  );
};

export default Customizer;
