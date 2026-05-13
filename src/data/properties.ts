import type { Property } from "../types";

/**
 * Catálogo de propiedades — VelDev PR Realtor (DEMO MOCK)
 *
 * Why: en producción real esto vendría de un CMS o API de MLS.
 *      Para el demo, mock data tipada permite que la UI funcione sin backend.
 *      Sustituir este archivo es la única integración necesaria con cualquier
 *      fuente real de listings.
 *
 * Distribución geográfica: cubre las regiones donde el agente especializa
 * (Este de la isla, San Juan metro, costa oeste y vacation rentals).
 *
 * IMPORTANTE: las imágenes de Unsplash usadas aquí están validadas — si
 * Unsplash retira una, la card mostrará alt text. Ver docs/DECISIONS.md.
 */
export const PROPERTIES: Property[] = [
  {
    id: "p-001",
    slug: "casa-familiar-fajardo-las-mareas",
    title: "Casa Familiar · Las Mareas",
    tagline:
      "Tres habitaciones con piscina y vista parcial al mar, a 5 minutos del centro.",
    description:
      "Casa de un nivel en urbanización privada de Las Mareas, Fajardo. Recién remodelada en cocina y baños, piso de porcelanato, A/C inverter en todos los cuartos.\n\nPatio interior con piscina de fibra, área de BBQ techada y caseta de generador completa de 22kW. Vista parcial al mar desde la terraza segundo nivel.\n\nLista para mudarse. Excelente para familias con niños o vacation rental de fin de semana.",
    type: "house",
    status: "for-sale",
    price: 385000,
    city: "Fajardo",
    neighborhood: "Las Mareas",
    coordinates: { lat: 18.3258, lng: -65.6526 },
    areaSqft: 2100,
    lotSqft: 6500,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    yearBuilt: 2016,
    features: [
      "Piscina",
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
    slug: "apto-luxury-old-san-juan",
    title: "Apto Histórico · Old San Juan",
    tagline:
      "Penthouse restaurado en edificio del 1920 con balcón a la Plaza Colón.",
    description:
      "Penthouse de dos habitaciones en un edificio colonial completamente restaurado en el corazón histórico. Techos de 14 pies con vigas originales, pisos de madera reclamada, cocina italiana con isla de mármol.\n\nBalcón privado de 200 sqft con vista directa a Plaza Colón. Acceso al rooftop comunitario con vista a la bahía.\n\nUbicación premium: caminando a Calle Fortaleza, Catedral, y zona de restaurantes.",
    type: "apartment",
    status: "for-sale",
    price: 675000,
    city: "San Juan",
    neighborhood: "Viejo San Juan",
    coordinates: { lat: 18.4663, lng: -66.1167 },
    areaSqft: 1450,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    yearBuilt: 1920,
    features: [
      "Edificio histórico",
      "Techos 14 ft",
      "Balcón Plaza Colón",
      "Rooftop con vista",
      "Cocina italiana",
      "Restaurado 2023",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-003",
    slug: "casa-playa-dorado-beach",
    title: "Casa Frente al Mar · Dorado Beach",
    tagline:
      "Cinco habitaciones, acceso privado a la playa, dentro de Dorado Beach Resort.",
    description:
      "Residencia de lujo en Dorado Beach Resort. Cinco habitaciones, ocho baños, gym privado, sala de cine, piscina infinity con vista al océano.\n\nMembresía completa al East Beach Club incluida en el cierre. Servicio de concierge 24/7, golf en campo Robert Trent Jones, restaurantes del Ritz-Carlton.\n\nPropiedad ideal para inversión, vacation home, o relocation con Ley 60.",
    type: "house",
    status: "for-sale",
    price: 1200000,
    city: "Dorado",
    neighborhood: "Dorado Beach Resort",
    coordinates: { lat: 18.4719, lng: -66.2734 },
    areaSqft: 5800,
    lotSqft: 14500,
    bedrooms: 5,
    bathrooms: 8,
    parking: 3,
    yearBuilt: 2019,
    features: [
      "Frente al mar",
      "Piscina infinity",
      "Gym privado",
      "Sala de cine",
      "Membresía East Beach",
      "Concierge 24/7",
      "Acceso golf RTJ",
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
    id: "p-004",
    slug: "apto-condado-vista-mar",
    title: "Apto Condado · Vista al Atlántico",
    tagline:
      "Piso alto en torre frente al mar con balcón corrido y todas las amenidades.",
    description:
      "Apartamento de dos habitaciones en piso 14 de torre premium en Condado. Vista directa al Atlántico desde sala, master y balcón corrido.\n\nEl edificio incluye piscina rooftop, gym 24/7, salón de eventos, gerencia de propiedad y seguridad. A pasos de restaurantes, La Concha, playa pública.\n\nIdeal para uso personal, alquiler tradicional o vacation rental (el edificio permite Airbnb).",
    type: "apartment",
    status: "for-sale",
    price: 425000,
    city: "San Juan",
    neighborhood: "Condado",
    coordinates: { lat: 18.4595, lng: -66.0758 },
    areaSqft: 1180,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    yearBuilt: 2008,
    features: [
      "Vista al mar",
      "Piso 14",
      "Piscina rooftop",
      "Gym 24/7",
      "Permite Airbnb",
      "Frente a playa",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=85&auto=format&fit=crop",
    ],
  },
  {
    id: "p-005",
    slug: "casa-familiar-caguas-bairoa",
    title: "Casa Familiar · Bairoa",
    tagline:
      "Tres habitaciones con marquesina techada, en barrio tranquilo y cerca de escuelas.",
    description:
      "Casa de un nivel en Bairoa, Caguas. Tres habitaciones, dos baños, sala-comedor en planta abierta, cocina con isla central. Patio trasero amplio con verja de seguridad.\n\nMarquesina techada para dos autos, lavadero exterior, cisterna de 800 galones. A 5 min de la Plaza, hospitales y escuelas privadas.\n\nLista para mudarse, ideal para familia primera vez o inversión.",
    type: "house",
    status: "for-sale",
    price: 295000,
    city: "Caguas",
    neighborhood: "Bairoa",
    coordinates: { lat: 18.232, lng: -66.0354 },
    areaSqft: 1650,
    lotSqft: 4800,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    yearBuilt: 2002,
    features: [
      "Marquesina techada",
      "Cisterna 800 gal",
      "Cerca de escuelas",
      "Patio amplio",
      "Lista para mudarse",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85&auto=format&fit=crop",
    ],
  },
  {
    id: "p-006",
    slug: "casa-vista-mar-rincon",
    title: "Casa Vista al Mar · Rincón",
    tagline:
      "Cuatro habitaciones en colina, vista panorámica al atardecer caribeño.",
    description:
      "Casa de dos niveles en Barrio Puntas, Rincón. Vista panorámica al Pasaje de la Mona, atardecer caribeño todos los días.\n\nCuatro habitaciones, tres baños y medio, terraza techada de 600 sqft. Cocina renovada con encimera de cuarzo. Piscina con jacuzzi y zona de fogata.\n\nIngresos anuales históricos como vacation rental: $58K-$72K. Perfecta para inversión o residencia permanente.",
    type: "house",
    status: "for-sale",
    price: 550000,
    city: "Rincón",
    neighborhood: "Puntas",
    coordinates: { lat: 18.3805, lng: -67.2421 },
    areaSqft: 2400,
    lotSqft: 8200,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    yearBuilt: 2014,
    features: [
      "Vista panorámica mar",
      "Piscina + jacuzzi",
      "Vacation rental establecido",
      "Terraza 600 sqft",
      "Zona surf",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=85&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "p-007",
    slug: "apto-hato-rey-moderno",
    title: "Apto Moderno · Hato Rey",
    tagline:
      "Estudio amplio con balcón, en edificio nuevo del Distrito Tecnológico.",
    description:
      "Apartamento tipo estudio amplio (1 hab convertible) en edificio del 2022 en Hato Rey. Cocina americana con appliances Bosch, baño completo con ducha walk-in, piso de porcelanato.\n\nEdificio incluye gym, business center, sky lounge, parking asignado, seguridad 24/7. Caminable a estaciones del Tren Urbano, restaurantes y oficinas.\n\nIdeal para profesional joven, inversión para renta a tech workers o uso ejecutivo.",
    type: "apartment",
    status: "for-sale",
    price: 240000,
    city: "San Juan",
    neighborhood: "Hato Rey",
    coordinates: { lat: 18.4185, lng: -66.0589 },
    areaSqft: 720,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    yearBuilt: 2022,
    features: [
      "Edificio nuevo (2022)",
      "Gym + sky lounge",
      "Cerca Tren Urbano",
      "Appliances Bosch",
      "Distrito Tecnológico",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85&auto=format&fit=crop",
    ],
  },
  {
    id: "p-008",
    slug: "casa-guaynabo-gated",
    title: "Casa Gated · Guaynabo",
    tagline:
      "Cuatro habitaciones en urbanización con seguridad 24/7, piscina y club house.",
    description:
      "Casa señorial en Garden Hills Sur, Guaynabo. Cuatro habitaciones, cuatro baños y medio, family room, oficina/study, walk-in closet en master.\n\nLa comunidad cuenta con seguridad 24/7, piscina comunal, club house, gym y áreas verdes. Lote esquinero de 9,200 sqft con jardinería madura.\n\nA minutos de Plaza Las Américas, hospital Auxilio Mutuo, escuelas privadas top de PR.",
    type: "house",
    status: "for-sale",
    price: 785000,
    city: "Guaynabo",
    neighborhood: "Garden Hills Sur",
    coordinates: { lat: 18.3978, lng: -66.111 },
    areaSqft: 3800,
    lotSqft: 9200,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    yearBuilt: 2010,
    features: [
      "Comunidad cerrada",
      "Seguridad 24/7",
      "Lote esquinero",
      "Family room + oficina",
      "Cerca colegios privados",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85&auto=format&fit=crop",
    ],
  },
  {
    id: "p-009",
    slug: "terreno-vieques-desarrollo",
    title: "Terreno · Vieques",
    tagline:
      "Lote de 1.2 acres con permisos, vista al mar Caribe y acceso pavimentado.",
    description:
      "Terreno de 1.2 acres en Barrio Florida, Vieques. Topografía favorable, vista al mar Caribe al sur, acceso por carretera pavimentada.\n\nPermisos de uso residencial unifamiliar y de construcción base ya aprobados (ahorra 8-12 meses de trámite). Servicios de agua y electricidad en la lindera.\n\nIdeal para casa de retiro, vacation rental o desarrollo de 2-3 unidades.",
    type: "land",
    status: "for-sale",
    price: 185000,
    city: "Vieques",
    neighborhood: "Florida",
    coordinates: { lat: 18.1209, lng: -65.4407 },
    areaSqft: 52272,
    lotSqft: 52272,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    features: [
      "1.2 acres",
      "Permisos aprobados",
      "Vista al Caribe",
      "Acceso pavimentado",
      "Servicios en lindera",
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
 *
 * @param slug - URL slug, kebab-case
 * @returns Property o undefined si no existe
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
