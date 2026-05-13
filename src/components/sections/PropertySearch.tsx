import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { PROPERTIES } from "../../data/properties";
import {
  PropertyFilters,
  type FilterState,
} from "../property/PropertyFilters";
import { PropertyCard } from "../property/PropertyCard";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, slowStagger } from "../../lib/animations";

/**
 * Sección de búsqueda + grid de propiedades.
 *
 * Estado:
 * - `filters` — controlado por <PropertyFilters>. Cambios disparan
 *   re-cómputo del grid filtrado.
 * - `filtered` — derivado memoizado de PROPERTIES + filters.
 *
 * Filtros activos:
 * 1. query: busca en title, city, neighborhood, features (case-insensitive)
 * 2. type: filtra por categoría exacta o "all"
 * 3. minBedrooms: descarta propiedades con menos habitaciones
 * 4. maxPrice: descarta propiedades con precio mayor
 *
 * Empty state: si no hay resultados, muestra mensaje con CTA a limpiar filtros.
 */
export function PropertySearch() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    type: "all",
    minBedrooms: 0,
    maxPrice: 1500000,
  });

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return PROPERTIES.filter((p) => {
      // Filtro 1: query libre
      if (q.length > 0) {
        const haystack = [
          p.title,
          p.city,
          p.neighborhood,
          p.tagline,
          ...p.features,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Filtro 2: tipo
      if (filters.type !== "all" && p.type !== filters.type) return false;
      // Filtro 3: habitaciones mínimas
      if (p.bedrooms < filters.minBedrooms) return false;
      // Filtro 4: precio máximo
      if (p.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  const resetFilters = () =>
    setFilters({ query: "", type: "all", minBedrooms: 0, maxPrice: 1500000 });

  return (
    <section
      id="propiedades"
      className="relative bg-paper-soft py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Propiedades"
          title={
            <>
              Encuentra tu próximo
              <br />
              <span className="italic text-navy">hogar.</span>
            </>
          }
          subtitle="9 propiedades activas en todo Puerto Rico. Filtra por tipo, presupuesto y habitaciones — la lista se actualiza al instante."
        />

        {/* Filters */}
        <div className="mb-10 md:mb-14">
          <PropertyFilters
            value={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            key={JSON.stringify(filters)}
            initial="hidden"
            animate="visible"
            variants={slowStagger}
            className="grid gap-6 md:grid-cols-2 lg:gap-8"
          >
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-paper-line bg-white p-12 text-center md:p-16">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-paper-soft text-ink-mute">
              <SearchX className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl text-ink md:text-3xl">
              No hay resultados
            </h3>
            <p className="mt-2 text-sm text-ink-mute">
              Prueba relajar los filtros — quizás haya algo que te encante.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-navy-deep"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
