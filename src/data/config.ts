/**
 * Configuración global del sitio — PR Realty.
 *
 * Single source of truth para constantes que se repiten en varios componentes.
 * Cambiar aquí = cambiar en todo el sitio.
 *
 * Personalización: cuando el demo se venda a un realtor real, edita
 * `brandName` y `brandTagline` y se actualiza en navbar, footer y SEO.
 */

export const SITE_CONFIG = {
  /** Nombre comercial mostrado en navbar y footer. */
  brandName: "PR Realty",
  /** Tagline corto bajo el logo. */
  brandTagline: "Bienes Raíces · Puerto Rico",

  /** Tagline largo usado en footer + SEO. */
  longTagline: "Tu agente de confianza en Puerto Rico",

  /** URL canónica de producción. */
  productionUrl: "https://realtor.veldevpr.com",
} as const;

/**
 * Links de navegación principal.
 * Todos apuntan a anchors de la home (single-page con secciones).
 * La página /propiedades/[slug] es separada via React Router.
 */
export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Propiedades", href: "/#propiedades" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Por qué yo", href: "/#porque-yo" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Calculadora", href: "/#calculadora" },
  { label: "Contacto", href: "/#contacto" },
] as const;

/**
 * Municipios de PR disponibles en el filtro de búsqueda del hero.
 * Ordenados por los más comunes en el target del agente.
 */
export const PR_CITIES = [
  "Fajardo",
  "Luquillo",
  "Humacao",
  "Río Grande",
  "San Juan",
  "Dorado",
  "Caguas",
  "Guaynabo",
  "Bayamón",
  "Isabela",
  "Rincón",
  "Vieques",
  "Culebra",
  "Naguabo",
  "Carolina",
] as const;

/** Rangos de precio para el filtro rápido del hero. */
export const PRICE_RANGES = [
  { label: "Cualquier precio", min: 0, max: 1500000 },
  { label: "$50K - $100K", min: 50000, max: 100000 },
  { label: "$100K - $200K", min: 100000, max: 200000 },
  { label: "$200K - $500K", min: 200000, max: 500000 },
  { label: "$500K+", min: 500000, max: 1500000 },
] as const;
