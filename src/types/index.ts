/**
 * Tipos del dominio — VelDev PR Realtor
 *
 * Esta capa define los contratos que todo el resto del código consume.
 * Cualquier cambio aquí impacta data/properties.ts y los componentes
 * que renderizan listings.
 */

/** Estado comercial de una propiedad. */
export type PropertyStatus =
  | "for-sale"      // En venta
  | "for-rent"      // En alquiler
  | "sold"          // Vendida (histórico para social proof)
  | "pending";      // En proceso de cierre

/** Categoría de la propiedad. */
export type PropertyType =
  | "house"         // Casa
  | "apartment"     // Apartamento / condominio
  | "land"          // Terreno
  | "commercial"    // Local comercial
  | "vacation";     // Vacation rental / Airbnb

/** Coordenadas geográficas (para mapas). */
export type LatLng = {
  lat: number;
  lng: number;
};

/** Una propiedad individual. */
export type Property = {
  /** ID único interno. */
  id: string;
  /** Slug usado en URL: /propiedades/[slug]. Estable, kebab-case. */
  slug: string;
  /** Título corto, mostrado en cards. */
  title: string;
  /** Una sola frase de gancho. */
  tagline: string;
  /** Descripción larga, párrafos separados por \n\n. */
  description: string;

  type: PropertyType;
  status: PropertyStatus;

  /** Precio en USD. Si es alquiler, este es el precio mensual. */
  price: number;
  /** "/mes" si es alquiler; undefined si es venta. */
  priceSuffix?: string;

  /** Ciudad / municipio en PR. */
  city: string;
  /** Barrio o sector dentro de la ciudad. */
  neighborhood: string;
  /** Dirección postal (puede ser parcial por privacidad). */
  address?: string;
  coordinates?: LatLng;

  /** Área en pies cuadrados (estándar PR). */
  areaSqft: number;
  /** Área del terreno si aplica (casas y terrenos). */
  lotSqft?: number;
  bedrooms: number;
  bathrooms: number;
  /** Número de espacios de estacionamiento. 0 si no tiene. */
  parking: number;
  /** Año de construcción. */
  yearBuilt?: number;

  /** Features destacadas, mostradas como badges. */
  features: string[];

  /** URLs de imágenes (Unsplash). Primera es la principal. */
  gallery: string[];

  /** Featured: aparece en el hero/destacados del home. */
  featured?: boolean;
};

/** Información del agente realtor (single-tenant — un solo agente). */
export type Agent = {
  name: string;
  title: string;
  license: string;
  photo: string;
  bio: string;
  yearsExperience: number;
  specialties: string[];
  languages: string[];
  email: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsapp: string;
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
};

/** Reseña de un cliente. */
export type Testimonial = {
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  propertyContext?: string;
};

/** Servicio que el agente ofrece. */
export type Service = {
  title: string;
  description: string;
};
