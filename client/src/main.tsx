import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import Customizer from "./pages/Customizer.tsx";
import CanvasModel from "./canvas/index.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        {/* canvas model is here to prevent it from unmounting and re-mounting  */}
        <CanvasModel />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/customizer" element={<Customizer />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
