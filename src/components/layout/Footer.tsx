import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "../../data/config";
import { AGENT } from "../../data/agent";
import { WA_PLAIN_URL } from "../../lib/whatsapp";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
} from "../icons/SocialIcons";

/**
 * Footer global del sitio.
 *
 * Contiene: branding, navegación rápida, contacto del agente,
 * créditos de VelDev PR y año actual auto-actualizado.
 *
 * Why: la mayoría de visitantes que llegan al final del scroll
 *      están interesados pero indecisos. El footer debe tener TODO
 *      lo que necesita el contacto sin re-scrollear: dirección,
 *      teléfono, WhatsApp, email y horario implícito.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-line bg-paper-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-display text-2xl tracking-tight text-ink md:text-3xl">
              <span className="text-navy">{SITE_CONFIG.brandName}</span>
              <span className="ml-2 text-xs uppercase tracking-[0.18em] text-gold">
                {SITE_CONFIG.brandTagline}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-mute">
              Realtor independiente en Puerto Rico. {AGENT.yearsExperience}+
              años conectando familias y inversionistas con el inmueble correcto.
            </p>
            <div className="mt-3 text-xs text-ink-mute">{AGENT.license}</div>

            <div className="mt-7 flex items-center gap-3">
              {AGENT.social.instagram && (
                <a
                  href={AGENT.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink-mute transition-colors hover:border-navy/40 hover:text-navy"
                  aria-label="Instagram"
                >
                  <IconInstagram className="h-4 w-4" />
                </a>
              )}
              {AGENT.social.facebook && (
                <a
                  href={AGENT.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink-mute transition-colors hover:border-navy/40 hover:text-navy"
                  aria-label="Facebook"
                >
                  <IconFacebook className="h-4 w-4" />
                </a>
              )}
              {AGENT.social.linkedin && (
                <a
                  href={AGENT.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink-mute transition-colors hover:border-navy/40 hover:text-navy"
                  aria-label="LinkedIn"
                >
                  <IconLinkedIn className="h-4 w-4" />
                </a>
              )}
              <a
                href={WA_PLAIN_URL}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink-mute transition-colors hover:border-navy/40 hover:text-navy"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-mute">
              Navegación
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink/75 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-mute">
              Contacto
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={WA_PLAIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-ink/75 hover:text-navy"
                >
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                    strokeWidth={1.8}
                  />
                  WhatsApp · {AGENT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AGENT.email}`}
                  className="flex items-start gap-2 text-ink/75 hover:text-navy"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                    strokeWidth={1.8}
                  />
                  {AGENT.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-ink/75">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                  strokeWidth={1.8}
                />
                {AGENT.phoneDisplay}
              </li>
              <li className="flex items-start gap-2 text-ink/75">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                  strokeWidth={1.8}
                />
                Sirviendo PR completo
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-paper-line pt-8 text-xs text-ink-mute sm:flex-row sm:items-center">
          <span>
            © {year} {SITE_CONFIG.brandName} {SITE_CONFIG.brandTagline}. Todos
            los derechos reservados.
          </span>
          <a
            href="https://veldevpr.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-navy"
          >
            Desarrollado por <span className="font-medium text-ink">VelDev PR</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
