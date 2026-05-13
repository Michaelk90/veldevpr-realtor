import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Home, MessageCircle } from "lucide-react";
import { SectionHeading } from "../layout/SectionHeading";
import { openWhatsApp } from "../../lib/whatsapp";

/**
 * Sección: Wizard de "¿Cuánto vale tu casa?" — lead gen para sellers.
 *
 * Multi-step form (4 pasos):
 * 1. Tipo de propiedad + ubicación (ciudad)
 * 2. Specs físicas (habitaciones, baños, área, parking)
 * 3. Condición + año aproximado + features
 * 4. Datos del owner (nombre, contacto, mejor hora)
 *
 * Validación por step:
 * - Step 1: type + city requeridos
 * - Step 2: bedrooms + areaSqft requeridos
 * - Step 3: condition + (no requeridos los demás)
 * - Step 4: name + (email OR phone)
 *
 * Submit → arma mensaje WhatsApp con TODO el brief estructurado.
 *
 * Why: el lead de un seller es 5-10x más valioso que el de un buyer (cierre
 *      promedio 3x más rápido). Este form llena información que el agente
 *      normalmente recolecta en 30 min de llamada — pre-cualifica al lead.
 */

type ValuationData = {
  propertyType: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  areaSqft: string;
  parking: string;
  condition: string;
  yearBuilt: string;
  features: string;
  ownerName: string;
  email: string;
  phone: string;
  bestTimeToCall: string;
};

const initialData: ValuationData = {
  propertyType: "",
  city: "",
  bedrooms: "",
  bathrooms: "",
  areaSqft: "",
  parking: "",
  condition: "",
  yearBuilt: "",
  features: "",
  ownerName: "",
  email: "",
  phone: "",
  bestTimeToCall: "",
};

const PROPERTY_TYPES = [
  "Casa unifamiliar",
  "Apartamento / condominio",
  "Townhouse",
  "Terreno",
  "Multifamiliar (duplex+)",
  "Comercial",
];

const CONDITIONS = [
  "Excelente — recién remodelada",
  "Muy buena — pocos detalles",
  "Buena — habitable, ajustes menores",
  "Regular — necesita trabajo",
  "Para remodelación / fixer-upper",
];

const TOTAL_STEPS = 4;

export function HomeValuation() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ValuationData>(initialData);

  const update = <K extends keyof ValuationData>(key: K, value: ValuationData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  /** Si el step actual está completo y permite avanzar. */
  const canNext = useMemo(() => {
    if (step === 1) return data.propertyType !== "" && data.city.trim() !== "";
    if (step === 2)
      return data.bedrooms !== "" && data.areaSqft.trim() !== "";
    if (step === 3) return data.condition !== "";
    return (
      data.ownerName.trim() !== "" &&
      (data.email.trim() !== "" || data.phone.trim() !== "")
    );
  }, [step, data]);

  const handleSubmit = () => {
    openWhatsApp([
      "Hola Carlos, quiero un avalúo gratuito de mi propiedad.",
      "",
      "── Propiedad ──",
      `• Tipo: ${data.propertyType}`,
      `• Ciudad: ${data.city}`,
      `• Habitaciones: ${data.bedrooms}`,
      data.bathrooms ? `• Baños: ${data.bathrooms}` : "",
      `• Área: ${data.areaSqft} sqft`,
      data.parking ? `• Parking: ${data.parking}` : "",
      "",
      "── Estado ──",
      `• Condición: ${data.condition}`,
      data.yearBuilt ? `• Año aprox: ${data.yearBuilt}` : "",
      data.features ? `• Features: ${data.features}` : "",
      "",
      "── Contacto ──",
      `• Nombre: ${data.ownerName}`,
      data.email ? `• Email: ${data.email}` : "",
      data.phone ? `• Teléfono: ${data.phone}` : "",
      data.bestTimeToCall ? `• Mejor hora para llamar: ${data.bestTimeToCall}` : "",
      "",
      "Gracias.",
    ].filter(Boolean));
  };

  return (
    <section
      id="valoracion"
      className="relative overflow-hidden bg-paper-soft py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] animate-drift rounded-full bg-navy/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Valoración gratis"
          title={
            <>
              ¿Cuánto vale
              <br />
              <span className="italic text-navy">tu casa?</span>
            </>
          }
          subtitle="Análisis comparativo de mercado sin compromiso. Respuesta en 48 horas con rango realista basado en comparables de tu zona."
          align="center"
        />

        <div className="rounded-3xl border border-paper-line bg-white p-6 shadow-lg md:p-10">
          {/* Progress bars */}
          <div className="mb-8 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full transition-all ${
                  n <= step ? "bg-navy" : "bg-paper-mute"
                }`}
              />
            ))}
          </div>

          <div className="mb-8 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-mute">
              Paso {step} de {TOTAL_STEPS}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
              {step === 1 && "Sobre tu propiedad"}
              {step === 2 && "Specs físicas"}
              {step === 3 && "Estado actual"}
              {step === 4 && "Cómo te contacto"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepWrap key="s1">
                <Heading icon={Home}>Cuéntame de tu propiedad</Heading>

                <Field label="Tipo de propiedad *">
                  <select
                    required
                    value={data.propertyType}
                    onChange={(e) => update("propertyType", e.target.value)}
                    className="input-base appearance-none"
                  >
                    <option value="">Selecciona...</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Ciudad / municipio *">
                  <input
                    type="text"
                    required
                    value={data.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Ej: Fajardo, San Juan, Caguas"
                    className="input-base"
                  />
                </Field>
              </StepWrap>
            )}

            {step === 2 && (
              <StepWrap key="s2">
                <Heading icon={Home}>Specs físicas</Heading>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Habitaciones *">
                    <select
                      required
                      value={data.bedrooms}
                      onChange={(e) => update("bedrooms", e.target.value)}
                      className="input-base appearance-none"
                    >
                      <option value="">Selecciona...</option>
                      {["0", "1", "2", "3", "4", "5", "6+"].map((b) => (
                        <option key={b} value={b}>
                          {b === "0" ? "Sin habitaciones (estudio/terreno)" : b}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Baños">
                    <select
                      value={data.bathrooms}
                      onChange={(e) => update("bathrooms", e.target.value)}
                      className="input-base appearance-none"
                    >
                      <option value="">Selecciona...</option>
                      {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Área en pies cuadrados *">
                  <input
                    type="number"
                    required
                    min={100}
                    value={data.areaSqft}
                    onChange={(e) => update("areaSqft", e.target.value)}
                    placeholder="Ej: 1800"
                    className="input-base"
                  />
                </Field>

                <Field label="Parking (espacios)">
                  <select
                    value={data.parking}
                    onChange={(e) => update("parking", e.target.value)}
                    className="input-base appearance-none"
                  >
                    <option value="">Selecciona...</option>
                    {["Ninguno", "1", "2", "3+"].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
              </StepWrap>
            )}

            {step === 3 && (
              <StepWrap key="s3">
                <Heading icon={Home}>Estado actual</Heading>

                <Field label="Condición general *">
                  <select
                    required
                    value={data.condition}
                    onChange={(e) => update("condition", e.target.value)}
                    className="input-base appearance-none"
                  >
                    <option value="">Selecciona...</option>
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Año aproximado de construcción">
                  <input
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    value={data.yearBuilt}
                    onChange={(e) => update("yearBuilt", e.target.value)}
                    placeholder="Ej: 2008"
                    className="input-base"
                  />
                </Field>

                <Field
                  label="Features destacados"
                  hint="Piscina, vista al mar, generador, paneles solares, etc."
                >
                  <textarea
                    rows={3}
                    value={data.features}
                    onChange={(e) => update("features", e.target.value)}
                    placeholder="Cuéntame qué hace especial tu propiedad..."
                    className="input-base resize-none"
                  />
                </Field>
              </StepWrap>
            )}

            {step === 4 && (
              <StepWrap key="s4">
                <Heading icon={Home}>¿Cómo te contacto?</Heading>

                <Field label="Tu nombre *">
                  <input
                    type="text"
                    required
                    value={data.ownerName}
                    onChange={(e) => update("ownerName", e.target.value)}
                    placeholder="Tu nombre completo"
                    className="input-base"
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email">
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="tu@email.com"
                      className="input-base"
                    />
                  </Field>
                  <Field label="Teléfono">
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(787) 555-0000"
                      className="input-base"
                    />
                  </Field>
                </div>
                <p className="text-xs text-ink-mute">
                  * Email o teléfono — al menos uno para que pueda
                  responderte.
                </p>

                <Field label="Mejor hora para llamar (opcional)">
                  <input
                    type="text"
                    value={data.bestTimeToCall}
                    onChange={(e) => update("bestTimeToCall", e.target.value)}
                    placeholder="Mañanas, después de las 5, fines de semana..."
                    className="input-base"
                  />
                </Field>
              </StepWrap>
            )}
          </AnimatePresence>

          {/* Botones de navegación */}
          <div className="mt-10 flex items-center justify-between gap-3 border-t border-paper-line pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-ink disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                disabled={!canNext}
                className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle className="h-4 w-4" />
                Pedir avalúo
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Wrapper de step con animación de slide. */
function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {children}
    </motion.div>
  );
}

function Heading({
  icon: Icon,
  children,
}: {
  icon: typeof Home;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-2 flex items-center gap-3 font-display text-2xl tracking-tight text-ink md:text-3xl">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy/10 text-navy">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      {children}
    </h3>
  );
}

/** Field con label, hint opcional y el children como input. */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
        {label}
      </span>
      {children}
      {hint && <p className="mt-2 text-xs text-ink-mute">{hint}</p>}
    </div>
  );
}
