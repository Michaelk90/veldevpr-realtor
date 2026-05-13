import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

/**
 * Configuración de Vite para VelDev PR Realtor.
 *
 * Plugins:
 * - `react()`: soporte JSX/TSX + Fast Refresh.
 * - `tailwindcss()`: plugin oficial de Tailwind v4 — procesa @theme e @import dentro de src/styles/index.css.
 *
 * Why: el plugin oficial v4 elimina la necesidad de archivo tailwind.config.js separado;
 *      el tema vive en CSS (`@theme {...}`). Cuidado: si este plugin se pierde, las
 *      utilities NO se generan y todo el sitio renderiza sin estilos.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
});