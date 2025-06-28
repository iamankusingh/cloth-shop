// page appear when have to customize the selected cloth

import CanvasModel from "../canvas";
import Button from "../components/Button";
import ColorPicker from "../components/ColorPicker";
import PageTitle from "../components/PageTitle";

const Customizer: React.FC = () => {
  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <main className="h-screen w-screen lg:flex lg:flex-row-reverse">
        <section className="h-[50vh] lg:h-screen lg:w-[50vw]">
          <CanvasModel />
        </section>

        <section className="lg:w-[50vw] p-2">
          <div className="fixed top-0 z-10">
            <Button path="/" title="Back" />
          </div>

          <ColorPicker />
        </section>
      </main>
    </>
  );
};

export default Customizer;
