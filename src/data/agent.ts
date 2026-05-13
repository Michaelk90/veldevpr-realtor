import type { Agent, Testimonial, Service } from "../types";

/**
 * Agente principal de PR Realty.
 *
 * Why: el sitio es single-agent bajo marca "PR Realty". Toda la voz
 *      gira alrededor de UNA persona — más confianza, más conversión.
 *
 * En producción real, el realtor cliente sustituye estos valores.
 * Para el demo, usamos un agente ficticio cuyo número apunta al real
 * de Michael para que cualquier inquiry durante demo le llegue a él.
 */
export const AGENT: Agent = {
  name: "María Soto",
  title: "Realtor Asociada · PR Realty",
  license: "Lic. C-24593",
  photo:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85&auto=format&fit=crop",
  bio:
    "Más de una década en bienes raíces en Puerto Rico. Conozco cada " +
    "municipio, cada barrio y cada oportunidad. Mi compromiso es que " +
    "encuentres no solo una propiedad, sino tu HOGAR.",
  yearsExperience: 12,
  specialties: [
    "Residencial premium",
    "Vacation rentals (Rincón, Vieques, Culebra)",
    "Inversión y flips",
    "Compradores primerizos",
    "Relocation desde EE.UU.",
  ],
  languages: ["Español", "English"],
  email: "info@prrealty.com",
  phoneDisplay: "(787) 528-1627",
  phoneRaw: "+17875281627",
  whatsapp: "https://wa.me/17875281627",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

/**
 * 4 servicios principales del agente.
 * Format del spec: una frase corta + descripción que reduzca ansiedad.
 */
export const SERVICES: Service[] = [
  {
    title: "Búsqueda Personalizada",
    description:
      "Encuentro propiedades que se ajustan a tu presupuesto, estilo de vida y ubicación preferida. Tour virtual disponible si vives fuera de PR.",
  },
  {
    title: "Evaluación de Propiedad",
    description:
      "Análisis comparativo de mercado para que sepas el valor real de tu propiedad antes de comprar o vender. Sin compromiso, en 48 horas.",
  },
  {
    title: "Negociación y Cierre",
    description:
      "Negocio el mejor precio por ti y manejo todo el papeleo legal hasta el cierre. Cero estrés, máximo resultado.",
  },
  {
    title: "Asesoría Financiera",
    description:
      "Te conecto con bancos y opciones de financiamiento que se ajusten a tu situación: FHA, convencional, VA, USDA y rurales.",
  },
];

/**
 * Stats de credibilidad — mostrados en sección "Por qué yo".
 * Cifras realistas para un realtor con 12 años en PR.
 */
export const AGENT_STATS = [
  { value: "12+", label: "Años de experiencia" },
  { value: "200+", label: "Propiedades vendidas" },
  { value: "98%", label: "Satisfacción de clientes" },
  { value: "$50M+", label: "En transacciones" },
] as const;

/** Testimonios de clientes pasados — format del spec. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Juan y María Rodríguez",
    role: "Compradores · Luquillo",
    rating: 5,
    text:
      "María nos ayudó a encontrar nuestra casa soñada en Luquillo. El proceso fue transparente y sin estrés. ¡100% recomendada!",
    propertyContext: "Casa Playa · $550K",
  },
  {
    name: "Carlos Santiago",
    role: "Vendedor · Fajardo",
    rating: 5,
    text:
      "Vendí mi propiedad en Fajardo en menos de 30 días y por encima del precio que esperaba. Profesionalismo de principio a fin.",
    propertyContext: "Villa Palmas · $285K",
  },
  {
    name: "Ana López",
    role: "Compradora primera vez · Humacao",
    rating: 5,
    text:
      "Como primera vez comprando, tenía muchas dudas. Me explicó todo paso a paso y me conectó con el financiamiento perfecto para mi situación.",
    propertyContext: "Penthouse Marina · $425K",
  },
  {
    name: "Robert Chen",
    role: "Relocation desde NYC",
    rating: 5,
    text:
      "Mudarme de Nueva York a PR fue posible gracias a María. Me hizo tours virtuales, me explicó la Ley 60 y cerró todo desde mi laptop.",
    propertyContext: "Casa en Río Grande · $350K",
  },
  {
    name: "Sofía Méndez",
    role: "Inversionista · Vacation rental",
    rating: 5,
    text:
      "Compré dos propiedades para vacation rental con su asesoría. ROI superó las expectativas en el primer año. Sigo trabajando con ella.",
    propertyContext: "2 propiedades en Rincón",
  },
];

/**
 * Pasos del proceso de compra — para sección Timeline.
 * 5 pasos del spec, copy en primera persona inclusiva.
 */
export const BUYING_STEPS = [
  {
    number: "01",
    title: "Consulta gratis",
    description:
      "Conversamos sobre lo que buscas, tu presupuesto, y tus preferencias. Cero presión.",
  },
  {
    number: "02",
    title: "Búsqueda",
    description:
      "Te presento propiedades que cumplen tus criterios. Visitamos juntos.",
  },
  {
    number: "03",
    title: "Oferta",
    description:
      "Preparamos y negociamos la mejor oferta por tu propiedad ideal.",
  },
  {
    number: "04",
    title: "Inspección y financiamiento",
    description:
      "Coordinamos inspección, tasación, y el proceso con el banco.",
  },
  {
    number: "05",
    title: "¡Las llaves son tuyas!",
    description:
      "Cerramos la transacción y celebramos. Bienvenido a tu nuevo hogar.",
  },
] as const;
