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

      <main className="p-2">
        <TShirt />

        <h1>Customize your Cloths</h1>

        <Button path="/customizer" title="Customize it" />
      </main>
    </>
  );
}

export default App;
