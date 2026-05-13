# Bitácora de decisiones técnicas — VelDev PR Realtor

> Este archivo documenta el **por qué** detrás de cada decisión técnica.
> El **qué** vive en el código.

---

## 1. Single-tenant vs Multi-tenant

**Decisión:** Single-tenant (un solo agente por deploy).

**Why:**
- El cliente final compra un sitio para SU marca personal — no quiere ser una más en un directorio.
- Personalización: cambiar 3 archivos (`agent.ts`, `properties.ts`, `config.ts`) deja el sitio listo para el siguiente cliente.
- Cero infraestructura de auth/permisos — más rápido y barato de mantener.

**Tradeoff:** cada cliente nuevo necesita su propio Cloudflare project. En la práctica esto se automatiza con un script template-clone (TODO).

---

## 2. Vite vs Next.js

**Decisión:** Vite.

**Why:**
- Sitio estático sin server logic — no se necesitan API routes ni SSR.
- Cloudflare Pages sirve un sitio Vite con bundle de ~430 kB sin problemas. Un sitio Next.js + Prisma + NextAuth pesa 15 MiB+ y no cabe en plan gratis (ver lección del Sistema de Citas).
- HMR de Vite es instantáneo vs Next.js que demora 1-3 segundos.

**Cuándo cambiaría:** si el sitio agregara backend (auth, DB de listings, dashboard del agente). Hoy no aplica.

---

## 3. React Router para detalle de propiedad

**Decisión:** Single-page + 1 ruta dinámica (`/propiedades/[slug]`).

**Why:**
- El home queda como single-page con anchors (mismo patrón que otros demos).
- La página de detalle SÍ necesita URL propia para:
  - SEO: cada listing indexable por Google
  - Compartibilidad: pegar el link en WhatsApp lleva directo a esa casa
  - Back button del navegador funciona naturalmente
- Sin React Router, sería un modal — no compartible y mala UX.

---

## 4. Paleta "Trust Corporate" (marino + dorado)

**Decisión:** `#0e1a2b` (navy) + `#b8964e` (gold) + `#ffffff` (paper).

**Why:**
- El cliente de realtor necesita PERCIBIR confianza antes de llamar. Compass, Engel & Völkers, Sotheby's todas usan esquemas marino + acento dorado.
- Negro+dorado pasa de "lujo" a "barbería"/"club nocturno". Marino es elegante sin ser ostentoso.
- Dorado discreto (no oro brillante) — solo en acentos pequeños (CTAs, badges, dots).

**Alternativas descartadas:**
- Cremas + terracotta → muy editorial/restaurante
- Verde sage → muy wellness/spa
- Negro + rosa → muy boutique femenino

---

## 5. Tipografía: Cormorant Garamond + Inter Tight

**Decisión:** Cormorant Garamond (display, serif elegante) + Inter Tight (body, sans tight).

**Why:**
- Cormorant Garamond tiene italic gorgeous para "tu próxima propiedad" — el italic crea contraste editorial.
- Inter Tight (no Inter regular) para body — más legible y ligeramente más moderno.
- Combo similar a Bvlgari Hotels / Aman Resorts / Sotheby's Realty.

**Tradeoff:** Cormorant Garamond carga 1 archivo woff2 ~120 kB. Se preload en index.html.

---

## 6. Filtros de búsqueda con estado controlado

**Decisión:** `<PropertyFilters>` es stateless; el padre maneja el estado.

**Why:**
- El padre (`<PropertySearch>`) necesita ver el estado para calcular `resultCount` y mostrar mensajes vacíos.
- Stateless component = más fácil de testear y reusar (si quisiéramos agregar filtros en otra página).
- React idiomático.

**Filtros disponibles:**
- `query`: search libre por título, ciudad, neighborhood, features
- `type`: pills con tipos exactos
- `minBedrooms`: 0/1/2/3/4+
- `maxPrice`: slider $100K-$1.5M con step de $25K

---

## 7. Mortgage Calculator con `useMemo`

**Decisión:** El cálculo se memoiza con `useMemo` aunque sea barato.

**Why:**
- El cálculo está en una expresión de animación (`<AnimatePresence>` con `key={monthly}`). Sin memo, cualquier re-render dispararía animación.
- Aunque la fórmula es O(1), Framer Motion detecta cambio de `key` para animar el número — necesitamos que el `key` solo cambie cuando el valor real cambie.

**Formula:** `M = P × [r(1+r)^n] / [(1+r)^n - 1]`
- P = principal (price - down payment)
- r = tasa mensual (anual/12)
- n = meses (años × 12)
- Edge case: `r = 0` → división simple `P/n`

---

## 8. Wizard de Valoración: validación por step

**Decisión:** `canNext` evalúa requirements del step actual antes de habilitar "Siguiente".

**Why:**
- UX: el usuario nunca llega al final con un form a medias.
- Cada step tiene sus campos críticos:
  - Step 1: `propertyType` + `city`
  - Step 2: `bedrooms` + `areaSqft`
  - Step 3: `condition`
  - Step 4: `ownerName` + (email OR phone)
- Validación es a través de `useMemo` derivado de `data` y `step` — sin re-renders innecesarios.

---

## 9. WhatsApp como único canal de submit

**Decisión:** Todos los forms (calc, valoración, contacto) abren `wa.me` con mensaje pre-armado.

**Why:**
- En Puerto Rico, WhatsApp es el canal de comunicación dominante (>90% adopción).
- No requiere backend para procesar formularios — cero costo, cero spam.
- El agente recibe el lead directamente en su WhatsApp con contexto completo.
- Builder centralizado en `src/lib/whatsapp.ts` evita duplicar `encodeURIComponent`.

**Tradeoff:** no hay analytics de conversión. Si el cliente real lo pide, agregar tracking con PostHog/Plausible.

---

## 10. Lección heredada: `pointer-events-none` en backgrounds absolutos

**Decisión:** Todos los `<div className="absolute inset-0">` decorativos llevan `pointer-events-none`.

**Why (lección dolorosa del demo Salón Bella):**
- Un div `absolute inset-0` con `opacity-*` crea un stacking context.
- Sin z-index válido (`-z-0` no existe en Tailwind), el div queda por encima del contenido en hit-testing.
- Resultado: formularios "se ven" pero NO reciben clicks. Síntoma: el usuario no puede escribir.
- Solución: `pointer-events-none` en el bg decorativo + `relative` en el contenedor de contenido.

Aplicado consistentemente en: `Hero`, `MortgageCalculator`, `HomeValuation`, `ContactCTA`.

---

## 11. `optionalDependencies` en package.json

**Decisión:** Incluir explícitamente `@emnapi/core`, `@emnapi/runtime` y los binarios `lightningcss-linux-*` como `optionalDependencies`.

**Why (lección dolorosa de Cloudflare Pages):**
- `npm install` en Windows NO incluye los binarios de Linux en el `package-lock.json` por defecto.
- Cloudflare Pages corre `npm ci` (estricto) en Linux → falla con `Missing: @emnapi/core@1.10.0`.
- Solución: declararlos como optional en `package.json` para que npm SIEMPRE los incluya en el lock.

**Si el problema vuelve:**
```bash
rm -rf node_modules package-lock.json
npm install --include=optional
```

---

## 12. Mock data vs API real

**Decisión:** Las 9 propiedades viven hardcoded en `src/data/properties.ts`.

**Why:**
- Es un demo — el cliente que lo compre sustituirá con sus propios listings.
- Sin backend = sin latencia, sin costo, sin downtime.
- Tipado fuerte (`Property` type) asegura que si sustituyen mal, TypeScript se queja antes del build.

**Cuándo cambiaría:**
- Si el agente quiere editar listings sin tocar código → agregar CMS (Sanity, Contentful) o Google Sheets como fuente.
- Si el agente tiene >50 propiedades → paginación + base de datos (Postgres + tRPC).

---

## TODOs explícitos

- [ ] Dynamic `<title>` y meta description en PropertyDetailPage (`react-helmet-async`)
- [ ] `sitemap.xml` generado automáticamente desde `PROPERTIES`
- [ ] Schema.org JSON-LD para cada listing (Google Rich Results)
- [ ] Plausible/PostHog para tracking de conversión
- [ ] Image optimization: actualmente todas las imágenes son Unsplash URLs externas
- [ ] Service worker para offline / PWA installable
- [ ] Tests E2E con Playwright en flow crítico: filtrar → ver detalle → contactar

Sin urgencia. El sitio funciona y vende como está.
