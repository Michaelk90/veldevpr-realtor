import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bath,
  BedDouble,
  Calendar,
  Car,
  CheckCircle2,
  Mail,
  MapPin,
  Maximize,
  MessageCircle,
  Phone,
} from "lucide-react";
import { findPropertyBySlug } from "../data/properties";
import { AGENT } from "../data/agent";
import { PropertyGallery } from "../components/property/PropertyGallery";
import { formatArea, formatAreaM2, formatPrice } from "../lib/format";
import { openWhatsApp, WA_PLAIN_URL } from "../lib/whatsapp";

/**
 * Página de detalle de una propiedad: /propiedades/[slug]
 *
 * Layout:
 * - Galería full-width arriba (carousel)
 * - Header con título, precio, ubicación
 * - 2 columnas: detalles izquierda (col-span-8), card de contacto sticky derecha (col-span-4)
 * - Features grid abajo
 * - Mapa
 * - CTA de regreso
 *
 * Error state: si el slug no existe en data, muestra 404 amigable con
 * link de regreso a la lista.
 *
 * SEO: en producción real, el title y meta description se actualizarían
 * con react-helmet-async. Por ahora se confía en el title estático del
 * index.html. TODO: dynamic head para SEO óptimo.
 */
export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? findPropertyBySlug(slug) : undefined;

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState(
    "Estoy interesado en esta propiedad. ¿Cuándo podemos coordinar una visita?",
  );

  // 404: propiedad no existe
  if (!property) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center md:px-10">
        <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-paper-soft text-ink-mute">
          <MapPin className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
          Propiedad no encontrada
        </h1>
        <p className="mt-3 text-base text-ink-mute">
          La propiedad que buscas no existe o ya no está disponible.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-navy-deep"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </main>
    );
  }

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp([
      `Hola Carlos, estoy interesado en la propiedad "${property.title}".`,
      "",
      `• Link: ${window.location.href}`,
      `• Precio: ${formatPrice(property.price)}`,
      `• Ubicación: ${property.city}, ${property.neighborhood}`,
      "",
      `• Mi nombre: ${contactName}`,
      `• Teléfono: ${contactPhone}`,
      "",
      contactMessage,
    ]);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      {/* Breadcrumb */}
      <Link
        to="/#propiedades"
        className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a propiedades
      </Link>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="mb-3 flex items-center gap-2 text-sm text-ink-mute">
          <MapPin className="h-4 w-4 text-gold-deep" strokeWidth={1.8} />
          {property.city} · {property.neighborhood}
        </div>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
            {property.title}
          </h1>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
              Precio
            </div>
            <div className="font-display text-4xl font-medium text-navy md:text-5xl">
              {formatPrice(property.price)}
              {property.priceSuffix && (
                <span className="text-base text-ink-mute">{property.priceSuffix}</span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-lg text-ink-soft md:text-xl">
          {property.tagline}
        </p>
      </motion.div>

      {/* Gallery */}
      <PropertyGallery images={property.gallery} alt={property.title} />

      {/* Main content: 2 columns */}
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: details */}
        <div className="space-y-12 lg:col-span-8">
          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Spec icon={BedDouble} label="Habitaciones" value={String(property.bedrooms)} />
            <Spec icon={Bath} label="Baños" value={String(property.bathrooms)} />
            <Spec icon={Car} label="Parking" value={property.parking > 0 ? String(property.parking) : "—"} />
            <Spec icon={Maximize} label="Área" value={formatArea(property.areaSqft)} sub={formatAreaM2(property.areaSqft)} />
          </div>

          {/* Description */}
          <section>
            <h2 className="mb-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Sobre la propiedad
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
              {property.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="mb-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Lo que la hace especial
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-paper-line bg-paper-soft p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Extra info */}
          {(property.yearBuilt || property.lotSqft) && (
            <section>
              <h2 className="mb-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                Datos adicionales
              </h2>
              <dl className="grid grid-cols-2 gap-y-4 text-sm md:grid-cols-3">
                {property.yearBuilt && (
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                      Año construido
                    </dt>
                    <dd className="mt-1 text-base font-medium text-ink">
                      {property.yearBuilt}
                    </dd>
                  </div>
                )}
                {property.lotSqft && (
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                      Terreno
                    </dt>
                    <dd className="mt-1 text-base font-medium text-ink">
                      {formatArea(property.lotSqft)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
                    Tipo
                  </dt>
                  <dd className="mt-1 text-base font-medium text-ink capitalize">
                    {property.type === "apartment"
                      ? "Apartamento"
                      : property.type === "house"
                        ? "Casa"
                        : property.type === "land"
                          ? "Terreno"
                          : property.type === "commercial"
                            ? "Comercial"
                            : "Vacation"}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {/* Map */}
          {property.coordinates && (
            <section>
              <h2 className="mb-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                Ubicación
              </h2>
              <div className="overflow-hidden rounded-3xl border border-paper-line">
                <iframe
                  title={`Mapa de ${property.title}`}
                  src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
                  loading="lazy"
                  className="h-[400px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {property.address && (
                <p className="mt-3 text-sm text-ink-mute">{property.address}</p>
              )}
            </section>
          )}
        </div>

        {/* Right: contact sticky */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-5">
            {/* Agent card */}
            <div className="rounded-3xl border border-paper-line bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={AGENT.photo}
                  alt={AGENT.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div>
                  <div className="font-display text-lg font-medium text-ink">
                    {AGENT.name}
                  </div>
                  <div className="text-xs text-ink-mute">{AGENT.title}</div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`tel:${AGENT.phoneRaw}`}
                  className="flex items-center gap-3 text-ink hover:text-navy"
                >
                  <Phone className="h-4 w-4 text-gold-deep" strokeWidth={1.8} />
                  {AGENT.phoneDisplay}
                </a>
                <a
                  href={WA_PLAIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-ink hover:text-navy"
                >
                  <MessageCircle className="h-4 w-4 text-gold-deep" strokeWidth={1.8} />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${AGENT.email}`}
                  className="flex items-center gap-3 text-ink hover:text-navy"
                >
                  <Mail className="h-4 w-4 text-gold-deep" strokeWidth={1.8} />
                  {AGENT.email}
                </a>
              </div>
            </div>

            {/* Contact form */}
            <form
              onSubmit={handleContact}
              className="rounded-3xl border border-paper-line bg-white p-6 shadow-sm"
            >
              <h3 className="mb-5 font-display text-xl font-medium text-ink">
                Coordinar visita
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Tu nombre *"
                  className="input-base"
                />
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Tu teléfono *"
                  className="input-base"
                />
                <textarea
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="input-base resize-none"
                />
                <button
                  type="submit"
                  className="group inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-navy-deep"
                >
                  <Calendar className="h-4 w-4" />
                  Coordinar visita
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-paper-line bg-paper-soft p-5">
      <Icon className="mb-3 h-5 w-5 text-gold-deep" strokeWidth={1.8} />
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-medium text-ink">
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-ink-mute">{sub}</div>}
    </div>
  );
}
