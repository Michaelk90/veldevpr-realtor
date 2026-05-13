import { useMemo } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { PROPERTIES } from "../../data/properties";
import {
  PropertyFilters,
  DEFAULT_FILTERS,
  type FilterState,
} from "../property/PropertyFilters";
import { PropertyCard } from "../property/PropertyCard";
import { SectionHeading } from "../layout/SectionHeading";
import { fadeUp, slowStagger } from "../../lib/animations";

type PropertySearchProps = {
  /** Filtros controlados por el padre (sync con HeroSearchBar). */
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
};

/**
 * Sección de búsqueda + grid de propiedades.
 *
 * Componente CONTROLADO — los filtros viven en HomePage para sincronizar
 * con HeroSearchBar (al buscar en el hero, este grid se actualiza).
 *
 * Filtros aplicados:
 * 1. query: busca en title, city, neighborhood, features (case-insensitive)
 * 2. type: filtra por categoría exacta o "all"
 * 3. minBedrooms: descarta propiedades con menos habitaciones
 * 4. maxPrice: descarta propiedades con precio mayor
 *
 * Empty state: si no hay resultados, muestra mensaje con CTA a limpiar filtros.
 */
export function PropertySearch({
  filters,
  onFiltersChange,
}: PropertySearchProps) {
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return PROPERTIES.filter((p) => {
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
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (p.bedrooms < filters.minBedrooms) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  const resetFilters = () => onFiltersChange(DEFAULT_FILTERS);

  return (
    <section id="propiedades" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Propiedades destacadas"
          title={
            <>
              Descubre tu
              <br />
              <span className="italic text-navy">próxima propiedad.</span>
            </>
          }
          subtitle="Selección curada de las mejores propiedades disponibles en el este de Puerto Rico y zona metro."
        />

        {/* Filters */}
        <div className="mb-10 md:mb-14">
          <PropertyFilters
            value={filters}
            onChange={onFiltersChange}
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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
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
          <div className="rounded-3xl border border-paper-line bg-paper-soft p-12 text-center md:p-16">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-white text-ink-mute">
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
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-navy-deep"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
