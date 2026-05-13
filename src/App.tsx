import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";

/**
 * Shell raíz del sitio.
 *
 * Routes:
 * - `/` → HomePage (single-page con anchors a secciones)
 * - `/propiedades/[slug]` → PropertyDetailPage (página dedicada por propiedad)
 * - `*` → fallback al home (404 soft)
 *
 * Navbar y Footer son globales — viven fuera de <Routes> para que aparezcan
 * en todas las páginas sin duplicación.
 *
 * Why React Router (vs all-in-one home): la página de detalle de propiedad
 * con URL única (`/propiedades/casa-fajardo`) mejora SEO de cada listing
 * y permite compartir el link directo. Sin Router, sería solo un modal
 * o scroll position — no compartible.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/propiedades/:slug" element={<PropertyDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
