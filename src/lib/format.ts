/**
 * Formateadores compartidos.
 *
 * Centralizar formato evita inconsistencias entre componentes
 * (un componente muestra "$385,000" y otro "$385K").
 */

/**
 * Formatea un precio en USD para display.
 *
 * Estilo: $385,000 (sin decimales para precios mayores a $1000).
 * Si el valor es menor a $1000, retorna $123 (pago mensual de hipoteca, etc.)
 *
 * @example
 *   formatPrice(385000) // → "$385,000"
 *   formatPrice(1245.67) // → "$1,246"
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formato compacto para precios altos: "$1.2M", "$675K".
 * Útil en cards pequeñas donde "$1,200,000" no cabe.
 */
export function formatPriceCompact(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }
  return formatPrice(value);
}

/**
 * Formatea un área en pies cuadrados con separador de miles.
 *
 * @example formatArea(2100) // → "2,100 sqft"
 */
export function formatArea(sqft: number): string {
  return `${new Intl.NumberFormat("en-US").format(sqft)} sqft`;
}

/**
 * Convierte sqft a metros cuadrados (1 sqft = 0.092903 m²) y formatea.
 *
 * @example formatAreaM2(2100) // → "195 m²"
 */
export function formatAreaM2(sqft: number): string {
  const m2 = Math.round(sqft * 0.092903);
  return `${new Intl.NumberFormat("en-US").format(m2)} m²`;
}
