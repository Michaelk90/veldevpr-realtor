import { motion } from "framer-motion";
import { Star, Users, Home } from "lucide-react";
import { fadeUp, stagger } from "../../lib/animations";
import { HeroSearchBar, type QuickSearchValue } from "./HeroSearchBar";

type HeroProps = {
  /** Callback al submit del search bar — el padre maneja scroll + filter sync. */
  onQuickSearch: (value: QuickSearchValue) => void;
};

/**
 * Hero principal del home.
 *
 * Decisión: full-viewport con foto de fondo (casa de lujo PR) +
 *           search bar prominente sobre la foto.
 *
 * Why: el visitante típico de un sitio de realtor está BUSCANDO
 *      propiedades. Hero con search bar = captura intent inmediato.
 *
 * Layout:
 * - Imagen full-bleed con gradient overlay (oscuro izq, transparente der)
 * - Tag pequeño + headline display + subtítulo
 * - Search bar con 3 filtros + botón verde
 * - 3 stats cards debajo
 *
 * Performance: imagen del hero es la única que se carga eager
 *      (el resto lazy). Es above-the-fold.
 *
 * Lección aplicada: el overlay `absolute inset-0` tiene `pointer-events-none`
 *      para no bloquear clicks en el search bar.
 */
export function Hero({ onQuickSearch }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] overflow-hidden pt-24 md:min-h-screen md:pt-28"
    >
      {/* Imagen de fondo full-bleed */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2400&q=90&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay oscuro a la izquierda, transparente a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy/55 to-navy/25" />
        {/* Gradient bottom para que el search bar destaque */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/60 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 py-16 md:min-h-[88vh] md:px-10 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/15 px-4 py-1.5 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Tu agente de confianza en Puerto Rico
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-display text-[44px] font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            Encuentra tu hogar
            <br />
            <span className="italic text-gold-soft">perfecto</span>
            <span className="text-white"> en Puerto Rico</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            Te guío en cada paso del camino — desde la primera visita hasta las
            llaves en tu mano. Más de 12 años conectando familias con su próximo
            hogar.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10"
          >
            <HeroSearchBar onSubmit={onQuickSearch} />
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 grid grid-cols-3 gap-3 md:mt-10 md:gap-4"
          >
            <StatCard icon={Home} value="150+" label="Propiedades" />
            <StatCard icon={Star} value="4.9" label="Rating" />
            <StatCard icon={Users} value="200+" label="Familias felices" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Desliza</span>
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Home;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur md:px-5 md:py-4 md:text-left">
      <div className="hidden md:block">
        <Icon className="mb-2 h-5 w-5 text-gold-soft" strokeWidth={1.8} />
      </div>
      <div className="font-display text-2xl font-medium text-white md:text-3xl">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 md:text-xs">
        {label}
      </div>
    </div>
  );
}
