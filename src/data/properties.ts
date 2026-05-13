import type { Property } from "../types";

/**
 * Catálogo de propiedades — PR Realty (DEMO MOCK)
 *
 * 6 propiedades del spec, distribuidas por el este de Puerto Rico
 * (Fajardo, Humacao, Río Grande, San Juan, Luquillo, Naguabo).
 *
 * Why: en producción real esto vendría de un CMS o API de MLS.
 *      Para el demo, mock data tipada permite que la UI funcione sin backend.
 *      Sustituir este archivo es la única integración necesaria con cualquier
 *      fuente real de listings.
 */
export const PROPERTIES: Property[] = [
  {
    id: "p-001",
    slug: "villa-palmas-fajardo",
    title: "Villa Palmas",
    tagline:
      "Casa con patio amplio, marquesina techada y vista parcial al mar en Fajardo.",
    description:
      "Casa de un nivel en urbanización privada de Las Mareas, Fajardo. Recién remodelada en cocina y baños, piso de porcelanato, A/C inverter en todos los cuartos.\n\nPatio interior con zona de BBQ techada y caseta de generador completa de 22kW. Vista parcial al mar desde la terraza segundo nivel.\n\nLista para mudarse. Excelente para familias con niños o vacation rental de fin de semana.",
    type: "house",
    status: "for-sale",
    price: 285000,
    city: "Fajardo",
    neighborhood: "Las Mareas",
    coordinates: { lat: 18.3258, lng: -65.6526 },
    areaSqft: 1800,
    lotSqft: 6500,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    yearBuilt: 2016,
    features: [
      "Patio con BBQ",
      "Marquesina techada",
      "Generador 22kW",
      "Cisterna",
      "Vista parcial mar",
      "A/C inverter",
      "Urbanización privada",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-002",
    slug: "penthouse-marina-humacao",
    title: "Penthouse Marina",
    tagline:
      "Apartamento frente al mar en Palmas del Mar, Humacao. Vista directa al Atlántico.",
    description:
      "Penthouse de dos habitaciones en torre frente al mar en Palmas del Mar, Humacao. Vista directa al Atlántico desde sala, master y balcón corrido.\n\nEl edificio incluye piscina, gym 24/7, seguridad y acceso al beach club. A pasos de marinas, golf y restaurantes.\n\nIdeal para uso personal, alquiler tradicional o vacation rental (el edificio permite Airbnb).",
    type: "apartment",
    status: "for-sale",
    price: 425000,
    city: "Humacao",
    neighborhood: "Palmas del Mar",
    coordinates: { lat: 18.0703, lng: -65.8055 },
    areaSqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    yearBuilt: 2010,
    features: [
      "Frente al mar",
      "Vista al Atlántico",
      "Balcón corrido",
      "Beach club",
      "Permite Airbnb",
      "Golf en Palmas",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-003",
    slug: "finca-el-yunque-rio-grande",
    title: "Finca El Yunque",
    tagline:
      "Casa de campo con 2 acres, montaña y cercanía al Bosque Nacional.",
    description:
      "Casa de dos niveles en finca de 2 acres, Río Grande. Vista a montañas y proximidad directa al Bosque Nacional El Yunque.\n\nCuatro habitaciones, tres baños, kitchen abierto, terraza techada con vista. Cisterna de 2,000 galones, paneles solares (sistema 6kW), generador automático.\n\nIdeal para vacation rental boutique, retreat, o vida tranquila lejos del bullicio urbano.",
    type: "house",
    status: "for-sale",
    price: 350000,
    city: "Río Grande",
    neighborhood: "El Yunque",
    coordinates: { lat: 18.3286, lng: -65.7825 },
    areaSqft: 2500,
    lotSqft: 87120,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    yearBuilt: 2008,
    features: [
      "2 acres de terreno",
      "Vista a montañas",
      "Cerca de El Yunque",
      "Paneles solares 6kW",
      "Generador automático",
      "Cisterna 2,000 gal",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-004",
    slug: "apt-condado-san-juan",
    title: "Apt Condado",
    tagline:
      "Estudio moderno renovado a pasos de la playa pública de Condado.",
    description:
      "Apartamento tipo estudio amplio (1 hab convertible) en edificio de Condado, San Juan. Renovado en 2023: cocina americana con appliances Bosch, baño completo con ducha walk-in, piso de porcelanato.\n\nA caminar de restaurantes, La Concha, playa pública. Ideal para profesional joven, inversión para renta vacacional o uso ejecutivo.",
    type: "apartment",
    status: "for-sale",
    price: 195000,
    city: "San Juan",
    neighborhood: "Condado",
    coordinates: { lat: 18.4595, lng: -66.0758 },
    areaSqft: 750,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    yearBuilt: 1985,
    features: [
      "Renovado 2023",
      "Cerca de playa",
      "Caminable a Condado",
      "Appliances Bosch",
      "Ideal vacation rental",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85&auto=format&fit=crop",
    ],
  },
  {
    id: "p-005",
    slug: "casa-playa-luquillo",
    title: "Casa Playa",
    tagline:
      "Beachfront en Luquillo con acceso privado a la arena y piscina con vista.",
    description:
      "Casa beachfront en Luquillo. Tres habitaciones, tres baños, acceso privado a la playa por jardín trasero.\n\nPiscina con vista al océano, terraza techada de 800 sqft, cocina renovada con encimera de cuarzo. Áreas amplias, ventilación cruzada natural.\n\nIngresos anuales históricos como vacation rental: $65K-$85K. Perfecta para inversión o residencia permanente.",
    type: "house",
    status: "for-sale",
    price: 550000,
    city: "Luquillo",
    neighborhood: "La Pared",
    coordinates: { lat: 18.3719, lng: -65.7158 },
    areaSqft: 2000,
    lotSqft: 7800,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    yearBuilt: 2014,
    features: [
      "Beachfront",
      "Acceso privado a playa",
      "Piscina vista mar",
      "Terraza 800 sqft",
      "Vacation rental establecido",
      "Cocina renovada",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-006",
    slug: "terreno-naguabo",
    title: "Terreno · Naguabo",
    tagline:
      "1 cuerda lista para construir, con permisos y servicios en la lindera.",
    description:
      "Terreno de 1 cuerda (3,930 m²) en Naguabo. Topografía favorable, acceso por carretera pavimentada.\n\nPermisos de uso residencial unifamiliar y de construcción base ya aprobados (ahorra 8-12 meses de trámite). Servicios de agua y electricidad en la lindera.\n\nIdeal para casa de retiro, vacation rental o desarrollo de 2 unidades.",
    type: "land",
    status: "for-sale",
    price: 75000,
    city: "Naguabo",
    neighborhood: "Maizales",
    coordinates: { lat: 18.2113, lng: -65.7363 },
    areaSqft: 42292,
    lotSqft: 42292,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    features: [
      "1 cuerda",
      "Permisos aprobados",
      "Acceso pavimentado",
      "Servicios en lindera",
      "Topografía favorable",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551410224-699683e15636?w=1200&q=85&auto=format&fit=crop",
    ],
  },
];

/**
 * Helper: encuentra una propiedad por slug.
 * Usado en la página de detalle `/propiedades/[slug]`.
 */
export function findPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

/**
 * Helper: lista solo las propiedades destacadas (featured: true).
 * Usado en el hero/home para mostrar las top 3.
 */
export function getFeaturedProperties(): Property[] {
  return PROPERTIES.filter((p) => p.featured);
}
