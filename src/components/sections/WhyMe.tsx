import { motion } from "framer-motion";
import { Award, MessageCircle } from "lucide-react";
import { AGENT, AGENT_STATS } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";
import { WA_PLAIN_URL } from "../../lib/whatsapp";

/**
 * Sección "Por qué yo" — diferenciadores del agente.
 *
 * Layout split:
 * - Mobile: foto encima, texto abajo
 * - Desktop: foto izquierda (col-span-5), texto derecha (col-span-7)
 *
 * Why: la decisión "agente independiente con marca personal" pone
 *      la foto del agente como el centro de confianza. Cialdini #5 (autoridad):
 *      los números grandes (12+ años, 200+ propiedades, $50M+) generan
 *      credibilidad antes de pedir contacto.
 */
export function WhyMe() {
  return (
    <section id="porque-yo" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Por qué yo"
          title={
            <>
              Experiencia que
              <br />
              <span className="italic text-navy">genera resultados.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-paper-line bg-paper-soft shadow-2xl">
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
                      {AGENT.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Texto + stats */}
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
              Con más de {AGENT.yearsExperience} años en bienes raíces en Puerto
              Rico, conozco cada municipio, cada barrio y cada oportunidad. Mi
              compromiso es que encuentres no solo una propiedad, sino tu HOGAR.
            </motion.p>

            {/* Stats grid 2x2 grande */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 grid grid-cols-2 gap-5"
            >
              {AGENT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-paper-line bg-paper-soft p-6 md:p-7"
                >
                  <div className="font-display text-4xl font-medium text-navy md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-mute md:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 flex flex-wrap gap-2"
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
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all hover:bg-navy-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Conversemos por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
