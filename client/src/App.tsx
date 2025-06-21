import Button from "./components/Button";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <>
      <PageTitle title="Cloth shop - Home" />

      <main className="p-2">
        <h1>Cloth shop</h1>

        <h1>Customize your Cloths</h1>

        <Button path="/customizer" title="Customize it" />
      </main>
    </>
  );
}

export default App;
