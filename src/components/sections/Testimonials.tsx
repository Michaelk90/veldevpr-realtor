import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";

/**
 * Sección de testimonios — social proof.
 *
 * Why: en realtor, los testimonios son el #1 factor de conversión.
 *      Cada testimonio incluye `propertyContext` (la propiedad asociada)
 *      para que el visitante vea "este testimonio NO es genérico".
 */
export function Testimonials() {
  return (
    <section className="relative bg-paper-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Testimonios"
          title={
            <>
              Familias que ya
              <br />
              <span className="italic text-navy">encontraron casa.</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="flex h-full flex-col rounded-3xl border border-paper-line bg-white p-8 shadow-sm md:p-9"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star
                    key={k}
                    className="h-4 w-4 fill-gold text-gold"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-base leading-relaxed text-ink-soft md:text-lg">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-7 border-t border-paper-line pt-5">
                <div className="text-sm font-semibold text-ink">{t.name}</div>
                <div className="text-xs text-ink-mute">{t.role}</div>
                {t.propertyContext && (
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-gold-deep">
                    {t.propertyContext}
                  </div>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
