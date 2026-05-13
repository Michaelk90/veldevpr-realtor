import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "../layout/SectionHeading";
import { AGENT } from "../../data/agent";
import { openWhatsApp } from "../../lib/whatsapp";

/**
 * Sección de contacto final + formulario rápido.
 *
 * Form simple (no wizard): nombre + teléfono + interés.
 * Submit → WhatsApp pre-llenado.
 *
 * Why: para el visitante que NO usó valoración ni calculadora, este
 *      form es el último intento de captura antes del footer.
 *      Por eso es corto — solo lo mínimo viable.
 */
export function ContactCTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp([
      "Hola Carlos, tengo una consulta:",
      "",
      `• Nombre: ${name || "—"}`,
      `• Teléfono: ${phone || "—"}`,
      interest ? `• Interés: ${interest}` : "",
      message ? `• Mensaje: ${message}` : "",
      "",
      "Gracias.",
    ].filter(Boolean));
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-navy py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch izquierda */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeading
                eyebrow="Hablemos"
                title={
                  <>
                    <span className="text-paper">Tu próxima casa</span>
                    <br />
                    <span className="italic text-gold">empieza con una llamada.</span>
                  </>
                }
              />

              <ul className="space-y-4 text-base text-paper/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  Respuesta en menos de 4 horas, todos los días.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  Cero presión. Hablamos hasta que estés cómodo.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  Tour virtual de cualquier propiedad si vives fuera de PR.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  Pre-aprobación con bancos asociados sin costo.
                </li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={`tel:${AGENT.phoneRaw}`}
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft"
                >
                  <Phone className="h-4 w-4" />
                  {AGENT.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form derecha */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-paper/15 bg-navy-deep p-6 shadow-2xl md:p-9 lg:col-span-6"
          >
            <h3 className="mb-7 font-display text-2xl font-medium text-paper md:text-3xl">
              Mándame un mensaje
            </h3>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Nombre *
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:bg-paper/10 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Teléfono *
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(787) 555-0000"
                  className="w-full rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:bg-paper/10 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Estoy interesado en
                </span>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper focus:border-gold focus:bg-paper/10 focus:outline-none"
                >
                  <option value="" className="bg-navy-deep">Selecciona...</option>
                  <option className="bg-navy-deep">Comprar una casa</option>
                  <option className="bg-navy-deep">Vender mi casa</option>
                  <option className="bg-navy-deep">Avalúo gratis</option>
                  <option className="bg-navy-deep">Alquilar</option>
                  <option className="bg-navy-deep">Inversión / flip</option>
                  <option className="bg-navy-deep">Vacation rental</option>
                  <option className="bg-navy-deep">Relocation desde EE.UU.</option>
                  <option className="bg-navy-deep">Otra cosa</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Mensaje <span className="text-paper/30">(opcional)</span>
                </span>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntame lo que necesitas..."
                  className="w-full resize-none rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:bg-paper/10 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="group inline-flex w-full min-h-[54px] items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar por WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
