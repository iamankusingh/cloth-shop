import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import Customizer from "./pages/Customizer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customizer" element={<Customizer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
