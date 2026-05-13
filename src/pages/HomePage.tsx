import { useEffect, useState } from "react";
import { Hero } from "../components/sections/Hero";
import { PropertySearch } from "../components/sections/PropertySearch";
import { Services } from "../components/sections/Services";
import { WhyMe } from "../components/sections/WhyMe";
import { Testimonials } from "../components/sections/Testimonials";
import { BuyingProcess } from "../components/sections/BuyingProcess";
import { MortgageCalculator } from "../components/sections/MortgageCalculator";
import { HomeValuation } from "../components/sections/HomeValuation";
import { ContactCTA } from "../components/sections/ContactCTA";
import {
  DEFAULT_FILTERS,
  type FilterState,
} from "../components/property/PropertyFilters";
import { PRICE_RANGES } from "../data/config";
import type { QuickSearchValue } from "../components/sections/HeroSearchBar";

/**
 * Página principal — single-page con anchors.
 *
 * State manejado aquí:
 * - `filters` — sincronizado entre HeroSearchBar y PropertySearch.
 *   Al buscar en el hero, este componente actualiza filters Y scrollea
 *   a #propiedades. PropertySearch lo recibe ya con los filtros aplicados.
 *
 * Orden de secciones (según spec):
 * 1. Hero (con search bar)
 * 2. Propiedades destacadas (grid con filtros)
 * 3. Servicios (4 cards)
 * 4. Por qué yo (split foto + stats)
 * 5. Proceso (timeline 5 pasos)
 * 6. Calculadora de hipoteca
 * 7. Valoración de tu casa (wizard sellers)
 * 8. Testimonios (carousel)
 * 9. CTA final
 *
 * Why este orden: alterna información (props, calc) con conversión
 *      (services, valuation, contact). El visitante puede salir en
 *      cualquier punto con un lead capturado.
 *
 * Effect: hash scroll-to-anchor manual al cargar la página con #hash.
 */
export function HomePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Hash scroll on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    const t = window.setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, []);

  /**
   * Handler del search bar del hero.
   * Convierte el quick search a FilterState completo y scrollea a #propiedades.
   */
  const handleQuickSearch = (value: QuickSearchValue) => {
    const priceRange = PRICE_RANGES[value.priceRangeIndex];
    setFilters({
      query: value.city, // Usar el municipio como query (busca en city + neighborhood)
      type: value.type,
      minBedrooms: 0,
      maxPrice: priceRange.max,
    });

    // Scroll a propiedades con pequeño delay para que el state pinte primero
    requestAnimationFrame(() => {
      document
        .getElementById("propiedades")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Hero onQuickSearch={handleQuickSearch} />
      <PropertySearch filters={filters} onFiltersChange={setFilters} />
      <Services />
      <WhyMe />
      <BuyingProcess />
      <MortgageCalculator />
      <HomeValuation />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
