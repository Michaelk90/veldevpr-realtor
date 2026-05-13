import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropertyGalleryProps = {
  images: string[];
  alt: string;
};

/**
 * Galería de fotos de una propiedad (página de detalle).
 *
 * Layout: 1 foto hero grande + 2 thumbnails al lado en desktop.
 * Click en cualquier thumbnail la mueve a hero.
 * En mobile: solo hero con flechas prev/next.
 *
 * Accesibilidad:
 * - aria-label en flechas
 * - keyboard navigation (Enter/Space en thumbnails)
 */
export function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hero = images[activeIdx] ?? images[0];
  const thumbs = images.slice(0, 4);

  const next = () => setActiveIdx((i) => (i + 1) % images.length);
  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-3">
      {/* Hero image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-paper-soft">
        <img
          src={hero}
          alt={alt}
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-lg backdrop-blur transition-all hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-lg backdrop-blur transition-all hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-paper backdrop-blur">
              {activeIdx + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {thumbs.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {thumbs.map((src, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={active}
                className={`aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                  active
                    ? "border-gold opacity-100"
                    : "border-paper-line opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`${alt} — foto ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
