import { useEffect, useState } from "react";

/**
 * Hook: detecta si la página fue scrolleada más de `threshold` píxeles.
 *
 * Usado por Navbar para aplicar fondo + blur cuando el usuario hace scroll
 * (la nav arranca transparente y se solidifica al bajar).
 *
 * @param threshold - Píxeles de scroll que disparan el estado. Default 16.
 * @returns true si scrollY > threshold.
 */
export function useScrolled(threshold = 16): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
