import { useEffect, useState } from "react";

/**
 * Hook: detecta si la viewport actual es desktop (≥ 1024px).
 *
 * Why: ciertos efectos visuales (parallax, hover-only) deben desactivarse
 *      en mobile porque crean problemas (overlap, taps accidentales).
 *      Lección aprendida del demo La Isla — el parallax invadía los stats en mobile.
 *
 * Cómo usarlo:
 *   const isDesktop = useIsDesktop();
 *   <motion.div style={isDesktop ? { y: parallaxY } : undefined}>
 *
 * @returns true si window >= 1024px, false en otro caso (o si SSR).
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
