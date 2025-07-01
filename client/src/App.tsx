// home page (/) route
import LinkButton from "./components/LinkButton";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <>
      <PageTitle title="Cloth shop - Home" />

      <Header />

      <main className="h-dvh w-screen">
        <section className="lg:w-[50vw] p-2">
          <h1 className="py-6 text-4xl">Design Your Cloths</h1>

          <LinkButton path="/customizer" title="Customize it" />
        </section>
      </main>
    </>
  );
}

export default App;
