import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../lib/animations";

type SectionHeadingProps = {
  /** Texto pequeño en mayúsculas que va arriba del título. */
  eyebrow: string;
  /** Título principal. Acepta nodes para permitir <span italic> en parte. */
  title: ReactNode;
  /** Texto secundario opcional debajo del título. */
  subtitle?: string;
  /** Alineación. Default "left". */
  align?: "left" | "center";
};

/**
 * Encabezado consistente para todas las secciones del sitio.
 *
 * Anatomy:
 *   ─── EYEBROW
 *   Título grande
 *   (con un span italic para variación)
 *   Subtítulo opcional debajo.
 *
 * Why: re-definir el encabezado de cada sección manualmente lleva a
 *      inconsistencias de tipografía, color y spacing. Este componente
 *      es el único permitido para empezar una sección.
 *
 * Animación: stagger interno — eyebrow fade primero, título después, subtítulo último.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`mb-14 max-w-3xl md:mb-20 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-5 inline-flex items-center gap-3"
      >
        <span className="h-px w-10 bg-gold" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-mute md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
