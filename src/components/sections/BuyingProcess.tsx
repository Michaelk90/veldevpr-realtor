import { motion } from "framer-motion";
import { BUYING_STEPS } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";

/**
 * Sección: Proceso de compra en 5 pasos.
 *
 * Layout: timeline vertical (mobile) → horizontal con conectores (desktop).
 *
 * Why: reducir la incertidumbre. Mostrar los 5 pasos hace que el
 *      proceso parezca MANEJABLE, no intimidante. Cialdini sobre
 *      compromiso/coherencia — una vez visualizado el camino, el
 *      visitante se siente más cómodo iniciando contacto.
 *
 * Animación: cada paso aparece con stagger al scroll. La línea
 *      conectora aparece con scale-x animation desde 0 → 1.
 */
export function BuyingProcess() {
  return (
    <section id="proceso" className="relative bg-paper-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Proceso"
          title={
            <>
              Comprar tu casa
              <br />
              <span className="italic text-navy">en 5 pasos.</span>
            </>
          }
          subtitle="Sin sorpresas. Sin papeleo intimidante. Te explico cada paso antes de que pase."
        />

        {/* Desktop: horizontal timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative hidden md:block"
        >
          {/* Línea conectora */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            className="absolute left-0 right-0 top-7 h-px origin-left bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          />

          <div className="relative grid grid-cols-5 gap-6">
            {BUYING_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-paper-soft text-gold-deep shadow-lg">
                  <span className="font-display text-lg font-semibold">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-6 md:hidden"
        >
          {BUYING_STEPS.map((step, i) => {
            const isLast = i === BUYING_STEPS.length - 1;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="relative flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-white text-gold-deep shadow">
                    <span className="font-display text-base font-semibold">
                      {step.number}
                    </span>
                  </div>
                  {!isLast && (
                    <div className="my-2 h-full min-h-[40px] w-px bg-gradient-to-b from-gold/40 to-transparent" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
