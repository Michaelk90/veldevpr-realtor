/**
 * Configuración global del sitio.
 *
 * Single source of truth para constantes que se repiten en varios componentes.
 * Cambiar aquí = cambiar en todo el sitio.
 */

export const SITE_CONFIG = {
  /** Nombre comercial mostrado en navbar y footer. */
  brandName: "Carlos Rivera",
  brandSuffix: "Realtor PR",

  /** URL canónica de producción. */
  productionUrl: "https://realtor.veldevpr.com",

  /** Tagline corto, usado en SEO. */
  tagline: "Realtor profesional en Puerto Rico",
} as const;

/**
 * Links de navegación principal.
 * Todos apuntan a anchors de la home (single-page con secciones).
 * La página /propiedades/[slug] es separada via React Router.
 */
export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Propiedades", href: "/#propiedades" },
  { label: "Calculadora", href: "/#calculadora" },
  { label: "Valoración", href: "/#valoracion" },
  { label: "Sobre mí", href: "/#sobre" },
  { label: "Contacto", href: "/#contacto" },
] as const;
