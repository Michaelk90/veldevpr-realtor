import { motion } from "framer-motion";
import { Award, CheckCircle2, Globe, MessageCircle } from "lucide-react";
import { AGENT, SERVICES } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";
import { WA_PLAIN_URL } from "../../lib/whatsapp";

/**
 * Sección "Sobre" — bio del agente + grid de servicios.
 *
 * Layout:
 * - Mobile: foto encima, texto abajo.
 * - Desktop: foto izquierda (col-span-5), texto derecha (col-span-7).
 *
 * Why: la decisión "agente independiente con marca personal" pone
 *      la foto del agente como el centro de confianza. Sin foto = sin venta.
 */
export function About() {
  return (
    <section id="sobre" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Sobre Carlos"
          title={
            <>
              Más de una década
              <br />
              <span className="italic text-navy">cerrando casas en PR.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-paper-line bg-paper-soft shadow-xl">
              <img
                src={AGENT.photo}
                alt={`${AGENT.name}, Realtor en PR`}
                className="h-full w-full object-cover"
              />
              {/* Badge sobre foto */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-paper-line bg-white/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold-deep">
                    <Award className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gold-deep">
                      {AGENT.license}
                    </div>
                    <div className="text-sm font-semibold text-ink">
                      Realtor licenciado en PR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:col-span-7"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-base leading-relaxed text-ink-soft md:text-lg"
            >
              {AGENT.bio}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-8 grid grid-cols-2 gap-5"
            >
              <div className="rounded-2xl border border-paper-line bg-paper-soft p-5">
                <Globe className="mb-3 h-5 w-5 text-gold-deep" strokeWidth={1.8} />
                <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                  Idiomas
                </div>
                <div className="mt-1 text-sm font-medium text-ink">
                  {AGENT.languages.join(" · ")}
                </div>
              </div>
              <div className="rounded-2xl border border-paper-line bg-paper-soft p-5">
                <CheckCircle2
                  className="mb-3 h-5 w-5 text-gold-deep"
                  strokeWidth={1.8}
                />
                <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                  Especialidades
                </div>
                <div className="mt-1 text-sm font-medium text-ink">
                  {AGENT.specialties.length} áreas de práctica
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {AGENT.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-paper-line bg-white px-3.5 py-1.5 text-xs text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              href={WA_PLAIN_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-navy-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Conversemos por WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Services grid abajo */}
        <div className="mt-24 md:mt-32">
          <h3 className="mb-10 font-display text-2xl text-ink md:text-3xl">
            <span className="text-gold-deep">/</span> Servicios
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-paper-line bg-paper-soft p-7 transition-all hover:border-navy/30 hover:bg-white hover:shadow-md md:p-8"
              >
                <h4 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {service.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
