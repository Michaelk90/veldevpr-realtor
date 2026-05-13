import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/agent";
import { SectionHeading } from "../layout/SectionHeading";

/**
 * Sección de testimonios — slider con animación.
 *
 * Behavior:
 * - 1 testimonio visible a la vez (centrado, prominente)
 * - Dots de navegación abajo
 * - Flechas prev/next a los lados
 * - Animación slide al cambiar (sale a la izq, entra desde la der)
 *
 * Why slider vs grid: 1 testimonio focalizado tiene más impacto emocional
 *      que 3 en grid. La gente lee UNO completo en lugar de scanear tres.
 *      Cialdini #3 (prueba social) funciona mejor cuando uno se ve enfocado.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  const t = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] animate-drift rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] animate-drift rounded-full bg-green/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Testimonios"
          title={
            <span className="text-white">
              Lo que dicen
              <br />
              <span className="italic text-gold">nuestros clientes.</span>
            </span>
          }
          align="center"
        />

        <div className="relative">
          {/* Flechas (desktop) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Testimonio anterior"
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/20 md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Testimonio siguiente"
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/20 md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Slide */}
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm md:p-12"
              >
                <Quote className="mb-6 h-10 w-10 text-gold" strokeWidth={1.5} />

                <blockquote className="font-display text-2xl font-medium leading-snug text-white md:text-3xl lg:text-[34px]">
                  "{t.text}"
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/60">{t.role}</div>
                    {t.propertyContext && (
                      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                        {t.propertyContext}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star
                        key={k}
                        className="h-4 w-4 fill-gold text-gold"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {TESTIMONIALS.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  aria-current={active}
                  className={`h-1.5 rounded-full transition-all ${
                    active ? "w-8 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile arrows */}
          <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-white/60">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
