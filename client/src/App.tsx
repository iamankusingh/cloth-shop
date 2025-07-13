// home page (/) route
import LinkButton from "./components/LinkButton";
import PageTitle from "./components/PageTitle";

function App() {
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
