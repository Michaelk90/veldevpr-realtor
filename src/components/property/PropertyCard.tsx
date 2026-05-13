import { Link } from "react-router-dom";
import { ArrowUpRight, Bath, BedDouble, Car, MapPin, Maximize } from "lucide-react";
import type { Property } from "../../types";
import { formatArea, formatPrice } from "../../lib/format";

type PropertyCardProps = {
  property: Property;
  /** Layout variant. "default" para grids, "wide" para featured. */
  variant?: "default" | "wide";
};

/**
 * Card individual de propiedad.
 *
 * Behavior:
 * - Hover: foto hace scale-105, overlay con CTA aparece, sombra crece.
 * - Click: navega a `/propiedades/[slug]` con React Router.
 * - El precio se muestra en formato compacto en la card; el formato completo
 *   se usa en la página de detalle.
 *
 * Status badges:
 * - for-sale: chip dorado "En venta"
 * - for-rent: chip dorado "En alquiler"
 * - sold: chip gris "Vendida"
 * - pending: chip azul "En proceso"
 */
export function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const isWide = variant === "wide";

  return (
    <Link
      to={`/propiedades/${property.slug}`}
      className={`group block overflow-hidden rounded-3xl border border-paper-line bg-white shadow-sm transition-all hover:border-navy/30 hover:shadow-2xl ${
        isWide ? "md:col-span-2" : ""
      }`}
      aria-label={`Ver detalles de ${property.title}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-paper-soft ${isWide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <img
          src={property.gallery[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status badge */}
        <div className="absolute left-4 top-4">
          <StatusBadge status={property.status} />
        </div>

        {/* Price overlay (visible siempre, no solo en hover) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-4 md:p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="font-display text-2xl font-medium text-paper md:text-3xl">
              {formatPrice(property.price)}
              {property.priceSuffix && (
                <span className="text-sm text-paper/80">{property.priceSuffix}</span>
              )}
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink backdrop-blur transition-colors group-hover:bg-gold group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <div className="mb-2 flex items-center gap-2 text-xs text-ink-mute">
          <MapPin className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.8} />
          {property.city} · {property.neighborhood}
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
          {property.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-ink-mute">
          {property.tagline}
        </p>

        {/* Specs row */}
        <div className="mt-5 flex items-center gap-4 border-t border-paper-line pt-4 text-xs text-ink-mute">
          {property.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" strokeWidth={1.8} />
              {property.bedrooms} hab
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4" strokeWidth={1.8} />
              {property.bathrooms} ba
            </span>
          )}
          {property.parking > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-4 w-4" strokeWidth={1.8} />
              {property.parking}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5">
            <Maximize className="h-4 w-4" strokeWidth={1.8} />
            {formatArea(property.areaSqft)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: Property["status"] }) {
  const config: Record<Property["status"], { label: string; className: string }> = {
    "for-sale": {
      label: "En venta",
      className: "bg-gold text-ink",
    },
    "for-rent": {
      label: "En alquiler",
      className: "bg-navy text-paper",
    },
    sold: {
      label: "Vendida",
      className: "bg-ink-mute text-paper",
    },
    pending: {
      label: "En proceso",
      className: "bg-navy-soft text-paper",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {label}
    </span>
  );
}
