# VelDev PR · Realtor

Sitio premium para realtor independiente en Puerto Rico. Demo del estudio VelDev PR para vender el servicio a agentes inmobiliarios.

> **Dominio en producción:** `realtor.veldevpr.com`
> **Repositorio:** `Michaelk90/veldevpr-realtor`
> **Stack:** React 19 · TypeScript · Vite 8 · Tailwind v4 · React Router 7 · Framer Motion · Lucide

---

## Tabla de contenido

- [Quick start](#quick-start)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Stack y decisiones](#stack-y-decisiones)
- [Personalización para cliente](#personalización-para-cliente)
- [Scripts disponibles](#scripts-disponibles)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
npm install --include=optional   # importante: --include=optional
npm run dev                       # arranca dev server en localhost:5173
npm run build                     # build producción → dist/
npm run preview                   # sirve el build localmente
```

**Importante:** usar `--include=optional` en cada install. Sin esto, los binarios de Linux para `lightningcss` (Tailwind v4) no se incluyen en el `package-lock.json` y Cloudflare/Vercel fallan al hacer `npm ci`. Ver `docs/DECISIONS.md`.

---

## Estructura del proyecto

```
veldevpr-realtor/
├── public/                       # Assets servidos as-is
│   ├── favicon.svg               # Logo: casa minimalista navy + gold
│   └── robots.txt                # SEO
│
├── src/
│   ├── components/
│   │   ├── icons/                # SVGs inline (Instagram, Facebook, LinkedIn)
│   │   ├── layout/               # Componentes globales del shell
│   │   │   ├── Navbar.tsx        # Nav fixed con glassmorphism al scroll
│   │   │   ├── Footer.tsx        # Footer con contacto + créditos
│   │   │   └── SectionHeading.tsx # Encabezado consistente de cada sección
│   │   ├── property/             # Componentes específicos de propiedades
│   │   │   ├── PropertyCard.tsx  # Card en grids
│   │   │   ├── PropertyFilters.tsx # Filtros: search + type + bedrooms + price
│   │   │   └── PropertyGallery.tsx # Galería del detalle con thumbnails
│   │   └── sections/             # Secciones del home (una por bloque visual)
│   │       ├── Hero.tsx          # Hero: headline + 3 propiedades destacadas
│   │       ├── PropertySearch.tsx # Grid de listings con filtros funcionales
│   │       ├── MortgageCalculator.tsx # Slider-based calc en tiempo real
│   │       ├── HomeValuation.tsx # Wizard 4-step para sellers
│   │       ├── About.tsx         # Bio del agente + grid de servicios
│   │       ├── Testimonials.tsx  # 3 cards de social proof
│   │       └── ContactCTA.tsx    # Form de contacto final + CTA al teléfono
│   │
│   ├── data/                     # Single source of truth
│   │   ├── config.ts             # Constantes globales (brand, nav links)
│   │   ├── agent.ts              # Info del agente + servicios + testimonios
│   │   └── properties.ts         # 9 propiedades mock + helpers
│   │
│   ├── hooks/                    # Custom hooks reutilizables
│   │   ├── useIsDesktop.ts       # Detecta viewport ≥ 1024px
│   │   └── useScrolled.ts        # Para navbar glass-on-scroll
│   │
│   ├── lib/                      # Funciones puras / helpers
│   │   ├── animations.ts         # Variants de Framer Motion
│   │   ├── format.ts             # Formatters (precio, área, sqft → m²)
│   │   └── whatsapp.ts           # Builder de enlaces wa.me con mensaje
│   │
│   ├── pages/                    # Top-level routes
│   │   ├── HomePage.tsx          # Composición de secciones del home
│   │   └── PropertyDetailPage.tsx # /propiedades/[slug] con form
│   │
│   ├── styles/
│   │   └── index.css             # Tailwind v4 @theme + globals
│   │
│   ├── types/
│   │   └── index.ts              # Tipos del dominio (Property, Agent, etc.)
│   │
│   ├── App.tsx                   # Router + shell global
│   └── main.tsx                  # Entry point con BrowserRouter
│
├── docs/
│   └── DECISIONS.md              # Bitácora de decisiones técnicas
│
├── index.html                    # SEO meta + Google Fonts
├── vite.config.ts                # Vite + plugin Tailwind v4
└── tsconfig.json
```

---

## Stack y decisiones

| Tech | Por qué |
|---|---|
| **Vite 8** | Build instantáneo, HMR rápido. Más liviano que Next.js para landing pages. |
| **React 19** | Última estable. Server Components no usados — todo client. |
| **TypeScript estricto** | `strict: true` en tsconfig — atrapa errores antes de runtime. |
| **Tailwind v4 (plugin Vite)** | Sin archivo de config separado. Tema vive en CSS (`@theme`). |
| **React Router 7** | Solo para `/propiedades/[slug]` — el resto es single-page. |
| **Framer Motion** | Variants reutilizables en `src/lib/animations.ts`. |
| **Lucide React** | Iconos consistentes. Brand icons (Instagram, etc.) son SVG inline. |
| **Cormorant Garamond + Inter Tight** | Display editorial trust + sans moderno. |

Para detalle completo, ver [`docs/DECISIONS.md`](docs/DECISIONS.md).

---

## Personalización para cliente

Cuando este sitio se vende a un cliente real (un agente), los archivos a tocar son **solo estos 3**:

### 1. `src/data/agent.ts`
- `AGENT.name` → nombre real
- `AGENT.license` → número de licencia
- `AGENT.photo` → URL de foto profesional
- `AGENT.email`, `AGENT.phoneRaw`, `AGENT.phoneDisplay` → contacto
- `AGENT.bio`, `AGENT.specialties` → personalización de copy
- `SERVICES` → lista de servicios ofrecidos
- `TESTIMONIALS` → reseñas reales

### 2. `src/data/properties.ts`
- Reemplazar `PROPERTIES` con listings reales del agente
- Cada propiedad debe tener `slug` único (kebab-case, sin espacios)
- Las imágenes pueden ser URLs externas o assets locales
- `featured: true` en las 3 que aparecen en el hero

### 3. `src/data/config.ts`
- `SITE_CONFIG.brandName` → nombre del realtor
- `SITE_CONFIG.brandSuffix` → "Realtor PR" o variante

**Cero código React a tocar.** El sitio entero se personaliza editando 3 archivos de datos.

---

## Scripts disponibles

```bash
npm run dev         # Dev server en localhost:5173 con HMR
npm run build       # Build producción → dist/
npm run preview     # Sirve dist/ localmente para validar
npm run lint        # ESLint sobre src/
```

---

## Deploy

Configurado para Cloudflare Pages (Workers Static Assets).

1. Push a `main` en GitHub
2. Cloudflare Pages auto-deploya en ~1.5 min
3. Custom domain: `realtor.veldevpr.com`

Build config en Cloudflare:
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+

---

## Troubleshooting

### "npm ci falla con `@emnapi/core` missing"
El lock-file no tiene los binarios de Linux. Solución:
```bash
rm -rf node_modules package-lock.json
npm install --include=optional
git add package-lock.json
git commit -m "fix: regenerar lock con binarios linux"
git push
```

### Las clases de Tailwind no aplican
Verifica que `vite.config.ts` tenga el plugin `@tailwindcss/vite`:
```ts
import tailwindcss from "@tailwindcss/vite";
plugins: [react(), tailwindcss()]
```

### El formulario no permite escribir
Verificar que ningún `<div className="absolute inset-0">` decorativo esté capturando clicks. Solución: agregar `pointer-events-none` al div decorativo y `relative` al contenedor del form.

---

## Créditos

Construido por [VelDev PR](https://veldevpr.com) · Michael Velázquez Figueroa
