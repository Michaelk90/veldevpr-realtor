import type { PropertyType } from "../../types";
import { Search } from "lucide-react";

export type FilterState = {
  query: string;
  type: PropertyType | "all";
  minBedrooms: number;
  maxPrice: number;
};

/** Estado inicial canónico — exportado para que padres lo usen como default. */
export const DEFAULT_FILTERS: FilterState = {
  query: "",
  type: "all",
  minBedrooms: 0,
  maxPrice: 1500000,
};

type PropertyFiltersProps = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  /** Total de propiedades disponibles (para mostrar "X resultados"). */
  resultCount: number;
};

const TYPE_OPTIONS: Array<{ value: PropertyType | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "house", label: "Casa" },
  { value: "apartment", label: "Apto" },
  { value: "land", label: "Terreno" },
  { value: "commercial", label: "Comercial" },
  { value: "vacation", label: "Vacation" },
];

/**
 * Barra de filtros para el grid de propiedades.
 *
 * Componente CONTROLADO — el padre (HomePage) mantiene el estado.
 * Sincroniza con HeroSearchBar: cuando el usuario busca en el hero,
 * HomePage llama `setFilters()` y este componente refleja el cambio.
 *
 * Why controlado: la página de listings necesita el estado para filtrar
 *      el array y mostrar `resultCount`. Patrón estándar de React.
 *
 * Filtros disponibles:
 * - query: search por título, ciudad, neighborhood, features
 * - type: pill buttons (casa / apto / etc)
 * - minBedrooms: 0+, 1+, 2+, 3+, 4+
 * - maxPrice: slider 50K - 1.5M
 */
export function PropertyFilters({
  value,
  onChange,
  resultCount,
}: PropertyFiltersProps) {
  return (
    <div className="rounded-3xl border border-paper-line bg-white p-5 shadow-sm md:p-7">
      {/* Search bar */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute"
          strokeWidth={1.8}
        />
        <input
          type="search"
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          placeholder="Buscar por ciudad, barrio o característica..."
          className="input-base !pl-11"
          aria-label="Buscar propiedades"
        />
      </div>

      {/* Type pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) => {
          const active = value.type === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...value, type: opt.value })}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-paper-line bg-paper-soft text-ink hover:border-navy/40"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Bedrooms + Price */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-7">
        <div>
          <label className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
            <span>Habitaciones mínimas</span>
            <span className="text-gold-deep">
              {value.minBedrooms === 0 ? "Cualquiera" : `${value.minBedrooms}+`}
            </span>
          </label>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((n) => {
              const active = value.minBedrooms === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...value, minBedrooms: n })}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-paper-line bg-white text-ink hover:border-navy/40"
                  }`}
                >
                  {n === 0 ? "Todos" : `${n}+`}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
            <span>Precio máximo</span>
            <span className="font-display text-base text-gold-deep">
              ${Math.round(value.maxPrice / 1000).toLocaleString()}K
            </span>
          </label>
          <input
            type="range"
            min={50000}
            max={1500000}
            step={25000}
            value={value.maxPrice}
            onChange={(e) =>
              onChange({ ...value, maxPrice: Number(e.target.value) })
            }
            className="slider-base"
            aria-label="Precio máximo"
          />
          <div className="mt-2 flex justify-between text-[10px] text-ink-mute">
            <span>$50K</span>
            <span>$750K</span>
            <span>$1.5M</span>
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 border-t border-paper-line pt-5 text-sm text-ink-mute">
        Mostrando{" "}
        <span className="font-semibold text-ink">{resultCount}</span>{" "}
        {resultCount === 1 ? "propiedad" : "propiedades"} disponibles
      </div>
    </div>
  );
}
