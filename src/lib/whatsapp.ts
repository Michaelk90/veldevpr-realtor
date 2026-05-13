import { AGENT } from "../data/agent";

/**
 * Builder de enlaces WhatsApp.
 *
 * Why: todos los CTAs del sitio abren chat de WhatsApp con texto pre-armado.
 *      Centralizar la construcción evita duplicar `encodeURIComponent` por
 *      todos los formularios y permite cambiar el número en un solo lugar.
 */

/** Número en formato `wa.me/{number}`, sin signo `+`. */
const WA_NUMBER = AGENT.phoneRaw.replace(/^\+/, "");

/**
 * Construye un link wa.me con texto pre-llenado.
 *
 * @param lines - Líneas del mensaje. Se unen con \n.
 * @returns URL https://wa.me/...?text=...
 */
export function buildWhatsAppUrl(lines: string[]): string {
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

/**
 * Abre WhatsApp en nueva pestaña con el mensaje pre-armado.
 *
 * @param lines - Líneas del mensaje.
 */
export function openWhatsApp(lines: string[]): void {
  const url = buildWhatsAppUrl(lines);
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Link a WhatsApp sin texto (para botones genéricos "Hablemos"). */
export const WA_PLAIN_URL = `https://wa.me/${WA_NUMBER}`;
