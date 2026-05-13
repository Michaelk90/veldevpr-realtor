import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { AGENT } from "../../data/agent";
import { openWhatsApp } from "../../lib/whatsapp";

/**
 * CTA final con gradient navy + 2 acciones grandes.
 *
 * Decisión vs versión anterior:
 * - Más impactante visualmente (gradient + halo + scale grande)
 * - 2 caminos claros: WhatsApp directo (rápido) o Form (más data)
 * - Form simple (nombre + tel + interés + presupuesto + municipio)
 *
 * Why el contraste navy: el sitio respira en paper crema; el CTA final
 *      en navy crea un "moment" que rompe el rítmo y captura atención
 *      antes del footer.
 */
export function ContactCTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Comprar");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      [
        "Hola, vi tu página y me interesa información sobre propiedades en Puerto Rico.",
        "",
        `• Nombre: ${name || "—"}`,
        `• Teléfono: ${phone || "—"}`,
        email ? `• Email: ${email}` : "",
        `• ¿Qué busco?: ${interest}`,
        city ? `• Municipio de interés: ${city}` : "",
        budget ? `• Presupuesto aproximado: ${budget}` : "",
        "",
        "Gracias.",
      ].filter(Boolean),
    );
  };

  const handleQuickWhatsApp = () => {
    openWhatsApp([
      "Hola, vi tu página y me interesa información sobre propiedades en Puerto Rico.",
    ]);
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep py-24 text-white md:py-32"
    >
      {/* Decoración */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] animate-drift rounded-full bg-gold/15 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] animate-drift rounded-full bg-green/15 blur-[120px]" />
      </div>

      {/* Grain texture sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Pitch izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-soft">
                Consulta gratis
              </span>
            </div>

            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px]">
              ¿Listo para encontrar
              <br />
              <span className="italic text-gold-soft">tu hogar</span> en PR?
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
              El mercado está activo y las mejores propiedades no duran. Agenda
              tu consulta GRATIS hoy y empezamos a buscar lo tuyo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                className="group inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-green px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition-all hover:bg-green-deep hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Directo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href={`tel:${AGENT.phoneRaw}`}
                className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition-all hover:border-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {AGENT.phoneDisplay}
              </a>
            </div>
          </motion.div>

          {/* Form derecha */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-9 lg:col-span-6"
          >
            <h3 className="mb-6 font-display text-2xl font-medium text-white md:text-3xl">
              O envía un mensaje detallado
            </h3>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  label="Nombre *"
                  type="text"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="Tu nombre"
                />
                <FormInput
                  label="Teléfono *"
                  type="tel"
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="(787) 555-0000"
                />
              </div>

              <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="tu@email.com"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  label="¿Qué buscas?"
                  value={interest}
                  onChange={setInterest}
                  options={["Comprar", "Vender", "Ambos", "Solo curiosidad"]}
                />
                <FormInput
                  label="Municipio"
                  type="text"
                  value={city}
                  onChange={setCity}
                  placeholder="Fajardo, San Juan..."
                />
              </div>

              <FormInput
                label="Presupuesto aproximado"
                type="text"
                value={budget}
                onChange={setBudget}
                placeholder="$150K - $300K"
              />

              <button
                type="submit"
                className="group mt-2 inline-flex w-full min-h-[54px] items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft"
              >
                Enviar consulta GRATIS
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="text-center text-xs text-white/55">
                Al enviar, abrimos WhatsApp con tu pedido pre-escrito.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* --------- Sub-componentes de form --------- */

function FormInput({
  label,
  type,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-gold focus:bg-white/10 focus:outline-none"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-gold focus:bg-white/10 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-deep">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
