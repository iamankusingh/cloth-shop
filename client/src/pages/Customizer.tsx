// page appear when have to customize the selected cloth

import Button from "../components/Button";
import ColorPicker from "../components/ColorPicker";
import PageTitle from "../components/PageTitle";

const Customizer: React.FC = () => {
  return (
    <>
      <PageTitle title="Cloth shop - Customize" />

      <main className="w-screen">
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
