// page appear when have to customize the selected cloth

import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import ImageUpload from "../components/ImageUpload";
import TextInput from "../components/TextInput";

const Customizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("color");
  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <Header />

      <main className="w-screen lg:w-[50vw] lg:pt-16">
        <div className="max-w-full p-2 text-white bg-gray-500 rounded-lg flex items-center justify-around md:text-xl">
          <button
            className={`inline-block px-4 py-2 font-semibold border-2 border-blue-600  rounded-lg ${
              activeTab === "color" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("color")}
          >
            Colors
          </button>
          <button
            className={`inline-block px-4 py-2 font-semibold border-2 border-blue-600 rounded-lg ${
              activeTab === "logo" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("logo")}
          >
            Logo
          </button>
          <button
            className={`inline-block px-4 py-2 font-semibold border-2 border-blue-600 rounded-lg ${
              activeTab === "text" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("text")}
          >
            Text
          </button>
          <button
            className={`inline-block px-4 py-2 font-semibold border-2 border-blue-600 rounded-lg ${
              activeTab === "design" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("design")}
          >
            Design
          </button>
        </div>

        <section className="lg:w-[50vw] p-2">
          <div className="flex justify-center">
            {activeTab === "color" ? <ColorPicker /> : ""}
            {activeTab === "logo" ? <ImageUpload /> : ""}
            {activeTab === "text" ? <TextInput /> : ""}
            {activeTab === "design" ? "design" : ""}
          </div>
        </section>
      </main>
    </>
  );
};

export default Customizer;
