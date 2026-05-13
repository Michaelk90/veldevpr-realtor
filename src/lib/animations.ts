/**
 * Variants reutilizables de Framer Motion.
 *
 * Why: todos los demos usan los mismos patrones (fade-up + stagger).
 *      Centralizarlos evita re-definirlos en cada sección y mantiene
 *      consistencia temporal en todo el sitio.
 */

/** Fade + sube 28px. Default para items dentro de un stagger. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** Fade ligero, sin movimiento — para overlays/badges. */
export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Contenedor que cascadea entrada de sus children.
 *
 * Usage:
 *   <motion.div variants={stagger} initial="hidden" whileInView="visible">
 *     <motion.div variants={fadeUp}>...</motion.div>
 *   </motion.div>
 */
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Stagger más lento, para listings con muchos items. */
export const slowStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};
