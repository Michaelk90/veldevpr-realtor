import { useState } from "react";
import { Search } from "lucide-react";
import { PR_CITIES, PRICE_RANGES } from "../../data/config";
import type { PropertyType } from "../../types";

export type QuickSearchValue = {
  city: string;
  type: PropertyType | "all";
  priceRangeIndex: number;
};

type HeroSearchBarProps = {
  /** Callback al hacer click en "Buscar". El padre debe scrollear a #propiedades. */
  onSubmit: (value: QuickSearchValue) => void;
};

/**
 * Search bar rápido del hero — 3 dropdowns + botón Buscar.
 *
 * Why: el visitante de un sitio de realtor está BUSCANDO. Mostrarle un
 *      search bar en el hero captura su intent inmediato. Al hacer
 *      submit, scrolleamos a la sección de propiedades con filtros pre-aplicados.
 *
 * Filtros disponibles:
 * - Municipio: dropdown con los 15 más comunes en PR
 * - Tipo: Casa / Apartamento / Terreno / Comercial / Cualquiera
 * - Precio: 5 rangos predefinidos
 *
 * Diseño: card flotante con esquinas redondeadas, glass blur sobre el hero,
 *         sombra suave. Botón "Buscar" en verde (accent de growth/success).
 */
export function HeroSearchBar({ onSubmit }: HeroSearchBarProps) {
  const [city, setCity] = useState("");
  const [type, setType] = useState<PropertyType | "all">("all");
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ city, type, priceRangeIndex });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/15 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:p-4"
      role="search"
      aria-label="Búsqueda rápida de propiedades"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1fr_1.3fr_auto] md:items-stretch">
        {/* Municipio */}
        <DropdownField label="Municipio" icon="📍">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-full w-full appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none"
            aria-label="Selecciona municipio"
          >
            <option value="">Todos los municipios</option>
            {PR_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </DropdownField>

        {/* Tipo */}
        <DropdownField label="Tipo" icon="🏠">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "all")}
            className="h-full w-full appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none"
            aria-label="Selecciona tipo de propiedad"
          >
            <option value="all">Cualquier tipo</option>
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="land">Terreno</option>
            <option value="commercial">Comercial</option>
            <option value="vacation">Vacation rental</option>
          </select>
        </DropdownField>

        {/* Precio */}
        <DropdownField label="Precio" icon="💰">
          <select
            value={priceRangeIndex}
            onChange={(e) => setPriceRangeIndex(Number(e.target.value))}
            className="h-full w-full appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none"
            aria-label="Selecciona rango de precio"
          >
            {PRICE_RANGES.map((r, i) => (
              <option key={i} value={i}>
                {r.label}
              </option>
            ))}
          </select>
        </DropdownField>

        {/* Botón */}
        <button
          type="submit"
          className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-green px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-green-deep hover:shadow-lg"
        >
          <Search className="h-4 w-4" strokeWidth={2.4} />
          Buscar
        </button>
      </div>
    </form>
  );
}

/** Container con label arriba y el campo abajo. */
function DropdownField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-xl bg-paper-soft px-4 py-3 transition-colors focus-within:bg-paper-mute md:py-3.5">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
        <span className="text-sm">{icon}</span>
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
