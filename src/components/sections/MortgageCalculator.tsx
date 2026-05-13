import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calculator, MessageCircle } from "lucide-react";
import { SectionHeading } from "../layout/SectionHeading";
import { formatPrice } from "../../lib/format";
import { openWhatsApp } from "../../lib/whatsapp";

/**
 * Sección: Calculadora de hipoteca interactiva.
 *
 * Inputs:
 * - Precio de la propiedad (slider $100K - $1.5M)
 * - Down payment % (slider 5-30%)
 * - Tasa de interés % (slider 5-9%)
 * - Plazo en años (15, 20, 30)
 *
 * Outputs (calculados en tiempo real):
 * - Pago mensual (principal + interés)
 * - Total de intereses sobre la vida del préstamo
 * - Total a pagar
 * - Loan amount (price - down payment)
 *
 * Formula: M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]
 *   donde P=principal, i=tasa mensual, n=meses
 *
 * Why: 80% de compradores en PR financian — esta herramienta es
 *      mucho más útil que un blog post. Lead gen secundario al final.
 */
export function MortgageCalculator() {
  const [price, setPrice] = useState(385000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(7.0);
  const [termYears, setTermYears] = useState<15 | 20 | 30>(30);

  /** Cálculo del préstamo mensual y totales. */
  const calc = useMemo(() => {
    const downAmount = Math.round(price * (downPct / 100));
    const loan = price - downAmount;
    const months = termYears * 12;
    const monthlyRate = rate / 100 / 12;

    // Si rate es 0 (edge case), evitar división por cero
    const monthly =
      monthlyRate === 0
        ? loan / months
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    const totalPaid = monthly * months;
    const totalInterest = totalPaid - loan;

    return {
      downAmount,
      loan,
      monthly: Math.round(monthly),
      totalInterest: Math.round(totalInterest),
      totalPaid: Math.round(totalPaid + downAmount),
    };
  }, [price, downPct, rate, termYears]);

  const handleShare = () => {
    openWhatsApp([
      "Hola Carlos, estuve usando la calculadora de hipoteca y quiero discutir estos números:",
      "",
      `• Precio de la propiedad: ${formatPrice(price)}`,
      `• Down payment: ${downPct}% (${formatPrice(calc.downAmount)})`,
      `• Préstamo: ${formatPrice(calc.loan)}`,
      `• Tasa estimada: ${rate.toFixed(2)}%`,
      `• Plazo: ${termYears} años`,
      `• Pago mensual estimado: ${formatPrice(calc.monthly)}`,
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
              Tu pago mensual,
              <br />
              <span className="italic text-navy">antes de aplicar.</span>
            </>
          }
          subtitle="Mueve los sliders y calcula al instante el pago mensual de cualquier propiedad. Cuando estés listo, comparte el cálculo conmigo por WhatsApp."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Inputs */}
          <div className="space-y-8 lg:col-span-7">
            {/* Precio */}
            <SliderControl
              label="Precio de la propiedad"
              value={price}
              display={formatPrice(price)}
              min={100000}
              max={1500000}
              step={5000}
              onChange={setPrice}
              ticks={["$100K", "$750K", "$1.5M"]}
            />

            {/* Down payment */}
            <SliderControl
              label="Down payment"
              value={downPct}
              display={`${downPct}% · ${formatPrice(calc.downAmount)}`}
              min={5}
              max={30}
              step={1}
              onChange={setDownPct}
              ticks={["5%", "15%", "30%"]}
            />

            {/* Interest rate */}
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

            {/* Term */}
            <div>
              <label className="mb-3 flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
                <span>Plazo del préstamo</span>
                <span className="font-display text-base text-gold-deep">
                  {termYears} años
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 30].map((y) => {
                  const active = y === termYears;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setTermYears(y as 15 | 20 | 30)}
                      className={`rounded-xl border py-3 text-sm font-medium transition-all ${
                        active
                          ? "border-navy bg-navy text-paper"
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
            <div className="sticky top-28 rounded-3xl border border-paper-line bg-navy p-7 text-paper shadow-xl md:p-9">
              <div className="mb-6 flex items-center gap-3">
                <Calculator className="h-5 w-5 text-gold" strokeWidth={1.8} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Pago mensual estimado
                </span>
              </div>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-2xl text-paper/60">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={calc.monthly}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-6xl font-medium tracking-tight md:text-7xl"
                  >
                    {calc.monthly.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base text-paper/60">/mes</span>
              </div>
              <p className="mb-7 text-xs text-paper/55">
                Solo principal + interés. No incluye seguros, CRIM ni HOA.
              </p>

              <div className="space-y-3 border-y border-paper/15 py-5 text-sm">
                <Row label="Down payment" value={formatPrice(calc.downAmount)} />
                <Row label="Préstamo" value={formatPrice(calc.loan)} />
                <Row label="Intereses totales" value={formatPrice(calc.totalInterest)} accent />
                <Row label="Total a pagar" value={formatPrice(calc.totalPaid)} bold />
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="group mt-6 inline-flex w-full min-h-[54px] items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" />
                Compartir cálculo por WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Control de slider individual con label y display del valor.
 * Aislado como sub-componente porque se reusa 3 veces dentro de esta sección.
 */
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
  bold,
}: {
  label: string;
  value: string;
  accent?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-paper/60">{label}</span>
      <span
        className={`${accent ? "text-gold" : "text-paper"} ${
          bold ? "font-semibold" : "font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
