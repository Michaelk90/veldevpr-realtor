import { useEffect } from "react";
import { Hero } from "../components/sections/Hero";
import { PropertySearch } from "../components/sections/PropertySearch";
import { MortgageCalculator } from "../components/sections/MortgageCalculator";
import { HomeValuation } from "../components/sections/HomeValuation";
import { About } from "../components/sections/About";
import { Testimonials } from "../components/sections/Testimonials";
import { ContactCTA } from "../components/sections/ContactCTA";

/**
 * Página principal — single-page con anchors.
 *
 * Orden estratégico de secciones:
 * 1. Hero — captura intent inmediato (listings primero)
 * 2. PropertySearch — listings con filtros (donde llegan los buyers)
 * 3. MortgageCalculator — tool útil + lead gen secundario
 * 4. HomeValuation — wizard de lead gen para sellers
 * 5. About — bio del agente, construir trust antes de pedir contacto
 * 6. Testimonials — social proof
 * 7. ContactCTA — último intento de captura
 *
 * Why este orden: alterna información (search, calc) con conversión
 *      (valuation, contact). El visitante puede salir en cualquier punto
 *      con un lead capturado.
 *
 * Effect: hash scroll-to-anchor manual. Cuando el usuario navega desde
 *      otra página con `/#seccion`, React Router carga / pero no scrollea
 *      al hash automáticamente — este effect lo arregla.
 */
export function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    // Scroll al elemento después de un tick para que el DOM esté pintado
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Hero />
      <PropertySearch />
      <MortgageCalculator />
      <HomeValuation />
      <About />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
