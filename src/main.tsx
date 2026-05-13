import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";

/**
 * Entrada principal de la app.
 *
 * Composición:
 * - StrictMode: detecta side-effects no idempotentes en desarrollo.
 * - BrowserRouter: routing client-side. Las páginas viven en src/pages.
 *
 * Why el orden: BrowserRouter envuelve a App porque App declara las rutas con <Routes>.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
