import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, IndianRupee, Loader2 } from "lucide-react";

// Approximate fallback rates (1 INR = X currency). Live rates fetched from open API.
const FALLBACK: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  SGD: 0.016,
  AUD: 0.018,
  JPY: 1.85,
  CAD: 0.016,
  CNY: 0.087,
};

const CURRENCIES = Object.keys(FALLBACK);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    // Free, no-key API — base INR
    fetch("https://open.er-api.com/v6/latest/INR")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d?.rates) return;
        const next: Record<string, number> = { INR: 1 };
        CURRENCIES.forEach((c) => {
          if (d.rates[c]) next[c] = d.rates[c];
        });
        setRates(next);
        setUpdatedAt(new Date().toLocaleString("en-IN"));
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const result = useMemo(() => {
    const n = parseFloat(amount) || 0;
    // Convert n FROM -> INR -> TO
    const inInr = n / (rates[from] || 1);
    return inInr * (rates[to] || 1);
  }, [amount, from, to, rates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">
            <IndianRupee size={14} className="inline mr-1" /> Travel Tools
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Currency Converter
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            Live exchange rates to plan your India trip budget.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none"
                />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={swap}
              className="self-end sm:self-end mx-auto p-2 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Swap currencies"
              title="Swap"
            >
              <ArrowLeftRight size={18} />
            </button>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Converted to</label>
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border font-semibold">
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    result.toLocaleString("en-IN", { maximumFractionDigits: 2 })
                  )}
                </div>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            1 {from} = {((rates[to] || 1) / (rates[from] || 1)).toFixed(4)} {to}
            {updatedAt && <span className="ml-2">· Updated {updatedAt}</span>}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
