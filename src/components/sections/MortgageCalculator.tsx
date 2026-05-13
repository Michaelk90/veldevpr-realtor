import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calculator, MessageCircle } from "lucide-react";
import { SectionHeading } from "../layout/SectionHeading";
import { formatPrice } from "../../lib/format";
import { openWhatsApp } from "../../lib/whatsapp";

/**
 * Sección: Calculadora de hipoteca interactiva — PR-specific.
 *
 * Diferencia vs calculadora típica gringa: incluye estimados de
 * **seguro** y **CRIM** (impuesto municipal a la propiedad PR)
 * que son contextos relevantes en la isla.
 *
 * Inputs:
 * - Precio de la propiedad (slider $50K - $1.5M)
 * - Down payment % (slider 5-30%)
 * - Tasa de interés % (slider 5-9%)
 * - Plazo en años (15, 20, 25, 30)
 *
 * Outputs (calculados en tiempo real):
 * - Principal + interés (la fórmula clásica de amortización)
 * - Seguro estimado (0.5% anual del precio ÷ 12)
 * - CRIM estimado (impuesto municipal aproximado — 0.2% anual ÷ 12)
 * - Total mensual estimado (P+I + Seguro + CRIM)
 *
 * Formula amortización: M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]
 *   donde P=principal, i=tasa mensual, n=meses
 *
 * Why: 80% de compradores en PR financian — esta herramienta es
 *      mucho más útil que un blog post. Incluir CRIM hace que se vea
 *      "local" y no genérica.
 */
export function MortgageCalculator() {
  const [price, setPrice] = useState(285000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState<15 | 20 | 25 | 30>(30);

  /** Cálculo del préstamo y los costos adicionales PR. */
  const calc = useMemo(() => {
    const downAmount = Math.round(price * (downPct / 100));
    const loan = price - downAmount;
    const months = termYears * 12;
    const monthlyRate = rate / 100 / 12;

    // Pago principal + interés (amortización clásica)
    const principalInterest =
      monthlyRate === 0
        ? loan / months
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    // Seguro estimado: 0.5% anual del precio / 12
    const insurance = (price * 0.005) / 12;
    // CRIM PR: ~0.2% anual del valor catastral (usamos precio como proxy)
    const crim = (price * 0.002) / 12;

    const monthlyTotal = principalInterest + insurance + crim;

    const totalPaid = principalInterest * months;
    const totalInterest = totalPaid - loan;

    return {
      downAmount,
      loan,
      principalInterest: Math.round(principalInterest),
      insurance: Math.round(insurance),
      crim: Math.round(crim),
      monthlyTotal: Math.round(monthlyTotal),
      totalInterest: Math.round(totalInterest),
      totalPaid: Math.round(totalPaid + downAmount),
    };
  }, [price, downPct, rate, termYears]);

  const handleShare = () => {
    openWhatsApp([
      "Hola, estuve usando la calculadora de hipoteca y quiero discutir estos números:",
      "",
      `• Precio de la propiedad: ${formatPrice(price)}`,
      `• Pronto: ${downPct}% (${formatPrice(calc.downAmount)})`,
      `• Préstamo: ${formatPrice(calc.loan)}`,
      `• Tasa estimada: ${rate.toFixed(2)}%`,
      `• Plazo: ${termYears} años`,
      "",
      `• Principal + Interés: ${formatPrice(calc.principalInterest)}`,
      `• Seguro estimado: ${formatPrice(calc.insurance)}`,
      `• CRIM estimado: ${formatPrice(calc.crim)}`,
      `• Pago mensual total: ${formatPrice(calc.monthlyTotal)}`,
      "",
      "¿Podemos hablar?",
    ]);
  };

  return (
    <section
      id="calculadora"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -right-32 top-0 h-[400px] w-[400px] animate-drift rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Calculadora"
          title={
            <>
              ¿Cuánto sería tu
              <br />
              <span className="italic text-navy">pago mensual?</span>
            </>
          }
          subtitle="Mueve los sliders y calcula al instante. Incluye estimado de seguro y CRIM — los costos reales de tener propiedad en PR. Cuando estés listo, comparte el cálculo conmigo por WhatsApp."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Inputs */}
          <div className="space-y-8 lg:col-span-7">
            <SliderControl
              label="Precio de la propiedad"
              value={price}
              display={formatPrice(price)}
              min={50000}
              max={1500000}
              step={5000}
              onChange={setPrice}
              ticks={["$50K", "$750K", "$1.5M"]}
            />

            <SliderControl
              label="Pronto (down payment)"
              value={downPct}
              display={`${downPct}% · ${formatPrice(calc.downAmount)}`}
              min={5}
              max={30}
              step={1}
              onChange={setDownPct}
              ticks={["5%", "15%", "30%"]}
            />

            <SliderControl
              label="Tasa de interés anual"
              value={rate}
              display={`${rate.toFixed(2)}%`}
              min={5}
              max={9}
              step={0.125}
              onChange={setRate}
              ticks={["5%", "7%", "9%"]}
              footer="Tasa estimada — la real depende del banco y tu perfil crediticio."
            />

            <div>
              <label className="mb-3 flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
                <span>Plazo del préstamo</span>
                <span className="font-display text-base text-gold-deep">
                  {termYears} años
                </span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([15, 20, 25, 30] as const).map((y) => {
                  const active = y === termYears;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTermYears(y)}
                      className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-paper-line bg-white text-ink hover:border-navy/40"
                      }`}
                    >
                      {y} años
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-paper-line bg-navy p-7 text-white shadow-xl md:p-9">
              <div className="mb-6 flex items-center gap-3">
                <Calculator className="h-5 w-5 text-gold" strokeWidth={1.8} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Pago mensual estimado
                </span>
              </div>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-2xl text-white/60">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={calc.monthlyTotal}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-6xl font-medium tracking-tight md:text-7xl"
                  >
                    {calc.monthlyTotal.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base text-white/60">/mes</span>
              </div>
              <p className="mb-7 text-xs text-white/55">
                Estimado total. Tasas y condiciones reales varían.
              </p>

              <div className="space-y-3 border-y border-white/15 py-5 text-sm">
                <Row label="Principal + Interés" value={formatPrice(calc.principalInterest)} />
                <Row label="Seguro estimado" value={formatPrice(calc.insurance)} />
                <Row label="CRIM estimado" value={formatPrice(calc.crim)} />
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <Row label="Pronto" value={formatPrice(calc.downAmount)} muted />
                <Row label="Préstamo total" value={formatPrice(calc.loan)} muted />
                <Row label="Intereses totales" value={formatPrice(calc.totalInterest)} accent />
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="group mt-6 inline-flex w-full min-h-[54px] items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" />
                Habla con un experto
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderControl({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  ticks,
  footer,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  ticks: [string, string, string];
  footer?: string;
}) {
  return (
    <div>
      <label className="mb-3 flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
        <span>{label}</span>
        <span className="font-display text-base text-gold-deep">{display}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-base"
        aria-label={label}
      />
      <div className="mt-2 flex justify-between text-[10px] text-ink-mute">
        <span>{ticks[0]}</span>
        <span>{ticks[1]}</span>
        <span>{ticks[2]}</span>
      </div>
      {footer && <p className="mt-2 text-xs text-ink-mute">{footer}</p>}
    </div>
  );
}

function Row({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-white/40" : "text-white/65"}>{label}</span>
      <span
        className={`font-medium ${
          accent ? "text-gold" : muted ? "text-white/65" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
