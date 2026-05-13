import { motion } from "framer-motion";
import { ArrowUpRight, Award, MapPin, Shield } from "lucide-react";
import { AGENT } from "../../data/agent";
import { getFeaturedProperties } from "../../data/properties";
import { formatPriceCompact } from "../../lib/format";
import { fadeUp, stagger } from "../../lib/animations";
import { Link } from "react-router-dom";

/**
 * Hero principal del home.
 *
 * Decisión: "Listings primero" (vs Persona del agente primero / Lifestyle).
 * Render: headline editorial izquierda + grid de 3 propiedades destacadas
 *         a la derecha, en formato compacto.
 *
 * Why: el visitante típico de un sitio de realtor en PR está BUSCANDO
 *      propiedades. Mostrarlas en hero = lo lleva inmediatamente a su intención.
 *      El agente persona vive en /sobre — no necesita el primer fold.
 *
 * Performance: las imágenes de propiedades destacadas se cargan eager (sin lazy)
 *      porque están above-the-fold.
 */
export function Hero() {
  const featured = getFeaturedProperties();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28"
    >
      {/* Decoración del fondo — pointer-events-none por la lección de salon */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] animate-drift rounded-full bg-navy/8 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] animate-drift rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Headline izquierda */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/8 px-4 py-1.5"
            >
              <Shield className="h-3.5 w-3.5 text-gold-deep" strokeWidth={2.2} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                Realtor licenciado · {AGENT.yearsExperience}+ años en PR
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-display text-[56px] font-medium leading-[1.0] tracking-tight text-ink sm:text-[68px] md:text-[88px] lg:text-[108px]"
            >
              Tu próxima
              <br />
              <span className="italic text-navy">propiedad</span>
              <br />
              <span className="text-gold-deep">en PR.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 max-w-md text-lg leading-relaxed text-ink-mute md:text-xl"
            >
              Más de una década ayudando a familias e inversionistas a comprar,
              vender y rentar en Puerto Rico. Atención uno-a-uno, sin
              intermediarios.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href="#propiedades"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-navy-deep"
              >
                Ver propiedades
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#valoracion"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-ink/20 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:border-navy hover:text-navy"
              >
                Avalúo gratis
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-paper-line pt-7"
            >
              {[
                { value: `${AGENT.yearsExperience}+`, label: "Años en PR" },
                { value: "150+", label: "Cierres" },
                { value: "$48M", label: "Volumen 2025" },
                { value: "ES/EN", label: "Bilingüe" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3">
                  <div className="font-display text-3xl font-medium text-navy md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-mute">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Featured properties grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                Propiedades destacadas
              </h2>
              <a
                href="#propiedades"
                className="text-xs text-ink-mute transition-colors hover:text-navy"
              >
                Ver todas →
              </a>
            </div>

            <div className="space-y-4">
              {featured.slice(0, 3).map((prop) => (
                <Link
                  key={prop.id}
                  to={`/propiedades/${prop.slug}`}
                  className="group flex gap-4 rounded-2xl border border-paper-line bg-white p-3 shadow-sm transition-all hover:border-navy/30 hover:shadow-lg"
                >
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-paper-soft">
                    <img
                      src={prop.gallery[0]}
                      alt={prop.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-mute">
                        <MapPin className="h-3 w-3 text-gold-deep" strokeWidth={2} />
                        {prop.city}
                      </div>
                      <h3 className="mt-1 line-clamp-1 font-display text-base font-medium text-ink md:text-lg">
                        {prop.title}
                      </h3>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-xl font-medium text-navy md:text-2xl">
                        {formatPriceCompact(prop.price)}
                      </span>
                      <span className="text-[10px] text-ink-mute">
                        {prop.bedrooms} hab · {prop.bathrooms} ba
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <Award className="h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.8} />
              <p className="text-xs leading-relaxed text-ink-soft">
                Verificación de financiamiento gratis en menos de 24 horas con
                bancos asociados.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
