// home page (/) route
import TShirt from "./canvas/TShirt";
import Button from "./components/Button";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <>
      <PageTitle title="Cloth shop - Home" />

      <Header />

      <main className="h-screen w-screen lg:flex lg:flex-row-reverse">
        <section className="h-[50vh] lg:h-screen lg:w-[50vw]">
          <TShirt />
        </section>

        <section className="lg:w-[50vw] p-2">
          <h1 className="py-6 text-4xl">Design Your Cloths</h1>

          <Button path="/customizer" title="Customize it" />
        </section>
      </main>
    </>
  );
}

export default App;
