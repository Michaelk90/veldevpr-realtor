import { motion } from "framer-motion";
import { Banknote, FileText, Handshake, Search as SearchIcon } from "lucide-react";
import { SERVICES } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";

/**
 * Sección: 4 servicios principales del realtor.
 *
 * Why: el visitante quiere saber "¿qué EXACTAMENTE haces por mí?".
 *      Listar servicios reduce ansiedad de compra:
 *      "no estás solo en esto, yo manejo X, Y, Z".
 *
 * Iconos:
 * - Búsqueda Personalizada → Search
 * - Evaluación de Propiedad → FileText
 * - Negociación y Cierre → Handshake
 * - Asesoría Financiera → Banknote
 */
const ICONS = [SearchIcon, FileText, Handshake, Banknote];

export function Services() {
  return (
    <section id="servicios" className="relative bg-paper-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Te acompaño en
              <br />
              <span className="italic text-navy">cada paso.</span>
            </>
          }
          subtitle="Comprar o vender propiedad no tiene que ser complicado. Yo manejo todo el proceso."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? SearchIcon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="group rounded-3xl border border-paper-line bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl md:p-9"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute md:text-[15px]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
