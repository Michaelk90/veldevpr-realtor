import type { Agent, Testimonial, Service } from "../types";

/**
 * Agente principal del sitio.
 *
 * Why: el sitio es single-agent (no broker firm), así que toda la voz/foto
 *      gira alrededor de UNA persona — más confianza, más conversión.
 *
 * En producción real, el agente cliente sustituye estos valores.
 * Para mostrar el demo, usamos un agente ficticio "Carlos Rivera"
 * pero el número de teléfono apunta al número real de Michael para que
 * cualquier inquiry durante la demo le llegue a él.
 */
export const AGENT: Agent = {
  name: "Carlos Rivera",
  title: "Realtor Asociado · Licenciado en PR",
  license: "Lic. C-23847",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85&auto=format&fit=crop",
  bio:
    "Más de una década conectando familias puertorriqueñas con su próximo hogar. " +
    "Especializado en residencial premium, vacation rentals e inversión inmobiliaria " +
    "en la región Este de la isla. Atención uno-a-uno, sin intermediarios.",
  yearsExperience: 12,
  specialties: [
    "Residencial premium",
    "Vacation rentals (Rincón, Vieques, Culebra)",
    "Inversión y flips",
    "Compradores primerizos",
    "Relocation desde EE.UU.",
  ],
  languages: ["Español", "English"],
  email: "carlos@realtor.veldevpr.com",
  phoneDisplay: "(787) 528-1627",
  phoneRaw: "+17875281627",
  whatsapp: "https://wa.me/17875281627",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

/** Servicios que ofrece el agente. */
export const SERVICES: Service[] = [
  {
    title: "Compra de propiedad",
    description:
      "Te acompaño desde la pre-aprobación hasta el cierre. Negociación, inspección, due diligence y enlaces con bancos.",
  },
  {
    title: "Venta de tu propiedad",
    description:
      "Estrategia de precio basada en mercado real, fotografía profesional, listing en MLS y exposición agresiva.",
  },
  {
    title: "Avalúo gratuito",
    description:
      "Análisis comparativo de mercado de tu propiedad. Sin compromiso, en menos de 48 horas.",
  },
  {
    title: "Inversión inmobiliaria",
    description:
      "Búsqueda de oportunidades para flip o renta, análisis de ROI proyectado y conexiones con contratistas confiables.",
  },
  {
    title: "Vacation rentals",
    description:
      "Compra y manejo de propiedades para Airbnb. Mercado especializado en Rincón, Vieques, Culebra y Old San Juan.",
  },
  {
    title: "Relocation",
    description:
      "Asistencia para clientes que se mudan desde EE.UU. continental. Tour virtual, recomendaciones de barrio, soporte legal.",
  },
];

/** Testimonios de clientes pasados. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carmen y Luis Ramírez",
    role: "Compradores · Dorado",
    rating: 5,
    text:
      "Llevábamos un año buscando con dos agentes distintos. Carlos nos encontró la casa en tres semanas y nos guió en todo el proceso de financiamiento. Cero estrés.",
    propertyContext: "Casa en Dorado · $1.2M",
  },
  {
    name: "Sofía Méndez",
    role: "Vendedora · Condado",
    rating: 5,
    text:
      "Vendí mi apartamento en 18 días al precio que pedí. La estrategia de marketing y las fotos hicieron la diferencia. Lo recomiendo sin pensar.",
    propertyContext: "Apto Condado · $425K",
  },
  {
    name: "Robert Chen",
    role: "Inversionista · Relocation desde NYC",
    rating: 5,
    text:
      "Mudarme de Nueva York a PR fue posible gracias a Carlos. Me hizo tours virtuales, me explicó la Ley 60 y cerró todo desde mi laptop. Profesional de verdad.",
    propertyContext: "Casa en Guaynabo · $785K",
  },
];
