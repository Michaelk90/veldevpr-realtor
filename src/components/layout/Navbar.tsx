import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";
import { NAV_LINKS, SITE_CONFIG } from "../../data/config";

/**
 * Navbar principal — fixed top, glassmorphism al hacer scroll.
 *
 * Behavior:
 * - Inicia transparente (sobre el hero). Cuando scrollY > 16px se vuelve
 *   sólida con backdrop-blur y border-bottom.
 * - En mobile colapsa a hamburger drawer animado.
 * - Los nav links son anchors a secciones del home (formato `/#seccion`).
 *   Si el usuario está en otra ruta (ej. /propiedades/[slug]) los links
 *   resuelven correctamente porque incluyen `/` al inicio.
 *
 * Accesibilidad:
 * - `<button aria-label>` en el toggle mobile.
 * - `<header>` semántico, `<nav>` adentro.
 */
export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || !isHome
          ? "bg-paper/85 backdrop-blur-xl border-b border-paper-line/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link
          to="/"
          className="flex items-baseline gap-2 font-display text-2xl tracking-tight text-ink md:text-[28px]"
          aria-label={`${SITE_CONFIG.brandName} — inicio`}
        >
          <span className="text-navy">{SITE_CONFIG.brandName}</span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-gold sm:inline">
            {SITE_CONFIG.brandSuffix}
          </span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-ink-soft transition-colors hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contacto"
          className="hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition-all hover:bg-navy-deep md:inline-flex"
        >
          Hablemos
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-paper-line bg-paper/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-ink hover:bg-paper-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <a
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper"
            >
              Hablemos
              <ChevronRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}
