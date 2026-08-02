import { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { EUR_RSD, type Lang } from './miaContent';

const label = {
  sr: {
    mortgage: 'Kalkulator kredita',
    price: 'Cena (€)',
    down: 'Učešće (%)',
    years: 'Rok (god.)',
    rate: 'Kamata (%)',
    monthly: 'Mesečna rata',
    loan: 'Iznos kredita',
    calc: 'Izračunaj',
    converter: 'Konverter valuta',
    amount: 'Iznos',
    result: 'Rezultat',
  },
  en: {
    mortgage: 'Mortgage calculator',
    price: 'Price (€)',
    down: 'Down payment (%)',
    years: 'Term (yrs)',
    rate: 'Rate (%)',
    monthly: 'Monthly payment',
    loan: 'Loan amount',
    calc: 'Calculate',
    converter: 'Currency converter',
    amount: 'Amount',
    result: 'Result',
  },
} as const;

const inputCls =
  'w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring';

export function MortgageCard({ lang, initialPrice = 100000 }: { lang: Lang; initialPrice?: number }) {
  const t = label[lang];
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(5.5);

  const loan = Math.max(0, price * (1 - down / 100));
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-primary flex items-center justify-center">
          <Calculator className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-foreground">{t.mortgage}</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <label className="text-xs text-muted-foreground">
          {t.price}
          <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} className={inputCls} />
        </label>
        <label className="text-xs text-muted-foreground">
          {t.down}
          <input type="number" value={down} onChange={(e) => setDown(+e.target.value)} className={inputCls} />
        </label>
        <label className="text-xs text-muted-foreground">
          {t.years}
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className={inputCls} />
        </label>
        <label className="text-xs text-muted-foreground">
          {t.rate}
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className={inputCls} />
        </label>
      </div>
      <div className="mt-3 rounded-xl bg-secondary p-3 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">{t.loan}</p>
          <p className="text-sm font-semibold text-foreground">€{Math.round(loan).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground">{t.monthly}</p>
          <p className="text-xl font-bold text-primary">
            €{isFinite(monthly) ? Math.round(monthly).toLocaleString() : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CurrencyCard({
  lang,
  initialAmount = 100000,
  initialFrom = 'EUR',
}: {
  lang: Lang;
  initialAmount?: number;
  initialFrom?: 'EUR' | 'RSD';
}) {
  const t = label[lang];
  const [amount, setAmount] = useState(initialAmount);
  const [from, setFrom] = useState<'EUR' | 'RSD'>(initialFrom);

  const converted = from === 'EUR' ? amount * EUR_RSD : amount / EUR_RSD;
  const to = from === 'EUR' ? 'RSD' : 'EUR';

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-primary flex items-center justify-center">
          <ArrowRightLeft className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-foreground">{t.converter}</span>
      </div>
      <div className="flex items-end gap-2">
        <label className="flex-1 text-xs text-muted-foreground">
          {t.amount}
          <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className={inputCls} />
        </label>
        <button
          onClick={() => setFrom(from === 'EUR' ? 'RSD' : 'EUR')}
          className="mb-0.5 px-3 py-2 rounded-lg border border-border bg-secondary text-sm font-semibold text-foreground hover:bg-secondary/70 transition-colors"
        >
          {from} → {to}
        </button>
      </div>
      <div className="mt-3 rounded-xl bg-secondary p-3">
        <p className="text-[11px] text-muted-foreground">{t.result}</p>
        <p className="text-xl font-bold text-primary">
          {Math.round(converted).toLocaleString()} {to}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">1 EUR ≈ {EUR_RSD} RSD</p>
      </div>
    </div>
  );
}
