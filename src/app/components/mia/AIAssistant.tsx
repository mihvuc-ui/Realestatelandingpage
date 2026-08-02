import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import type { Apartment } from '@/data/apartments';
import { useApartments } from '@/app/hooks/useApartments';
import { ScheduleViewingModal } from '@/app/components/ScheduleViewingModal';
import { RichText } from './RichText';
import { MiaPropertyCard } from './MiaPropertyCard';
import { MortgageCard, CurrencyCard } from './ToolCards';
import {
  UI,
  KB,
  CONTACT,
  QUICK_ACTIONS,
  type Lang,
  type QuickAction,
} from './miaContent';
import {
  detectLang,
  filterApartments,
  parseCurrency,
  saveLead,
  type SearchFilters,
  type Lead,
} from './miaUtils';
import { trackEvent, reportLead, reportBooking } from '@/app/utils/track';

type MsgKind = 'text' | 'properties' | 'contact' | 'mortgage' | 'currency';

interface Message {
  id: string;
  role: 'user' | 'mia';
  time: number;
  kind: MsgKind;
  text?: string;
  properties?: Apartment[];
  quick?: QuickAction[];
  toolPrice?: number;
}

type Flow =
  | { name: 'search'; step: string; filters: SearchFilters }
  | { name: 'booking'; step: string; data: Record<string, string>; apt?: Apartment }
  | { name: 'lead'; step: string; data: Lead }
  | null;

let idc = 0;
const nid = () => `m${Date.now()}-${idc++}`;

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('sr');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [flow, setFlow] = useState<Flow>(null);
  const [scheduleApt, setScheduleApt] = useState<Apartment | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const { apartments } = useApartments();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const flowRef = useRef<Flow>(null);
  flowRef.current = flow;

  const t = UI[lang];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && messages.length === 0) {
      pushMia({ kind: 'text', text: UI[lang].empty, quick: QUICK_ACTIONS[lang] });
    }
    if (open) {
      trackEvent('mia_open');
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function pushMia(m: Omit<Message, 'id' | 'role' | 'time'>) {
    setMessages((prev) => [...prev, { ...m, id: nid(), role: 'mia', time: Date.now() }]);
  }
  function pushUser(text: string) {
    setMessages((prev) => [...prev, { id: nid(), role: 'user', time: Date.now(), kind: 'text', text }]);
  }

  function miaSay(msgs: Omit<Message, 'id' | 'role' | 'time'>[], delay = 650) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      msgs.forEach((m) => pushMia(m));
    }, delay);
  }

  const fmtTime = (ts: number) =>
    new Date(ts).toLocaleTimeString(lang === 'sr' ? 'sr-RS' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  // ---------- Intent helpers ----------
  const has = (s: string, words: string[]) => words.some((w) => s.includes(w));

  function resetChat() {
    setFlow(null);
    setMessages([]);
    setTimeout(() => pushMia({ kind: 'text', text: UI[lang].empty, quick: QUICK_ACTIONS[lang] }), 50);
  }

  // ---------- Search flow ----------
  function startSearch(preset: Partial<SearchFilters>, l: Lang) {
    const filters: SearchFilters = { transaction: 'sale', ...preset };
    // Odredi prvi korak koji nedostaje
    const f: Extract<Flow, { name: 'search' }> = { name: 'search', step: '', filters };
    askSearchStep(f, l);
  }

  function askSearchStep(f: Extract<Flow, { name: 'search' }>, l: Lang) {
    const q = SEARCH_Q[l];
    if (!f.filters.propertyType) {
      f.step = 'propertyType';
      setFlow(f);
      miaSay([{ kind: 'text', text: q.type, quick: q.typeOpts }]);
      return;
    }
    if (f.filters.budget === undefined) {
      f.step = 'budget';
      setFlow(f);
      miaSay([{ kind: 'text', text: q.budget, quick: q.budgetOpts }]);
      return;
    }
    if (f.filters.location === undefined) {
      f.step = 'location';
      setFlow(f);
      miaSay([{ kind: 'text', text: q.location, quick: q.locationOpts }]);
      return;
    }
    if (f.filters.bedrooms === undefined && f.filters.propertyType !== 'land') {
      f.step = 'bedrooms';
      setFlow(f);
      miaSay([{ kind: 'text', text: q.bedrooms, quick: q.bedroomOpts }]);
      return;
    }
    finishSearch(f, l);
  }

  function finishSearch(f: Extract<Flow, { name: 'search' }>, l: Lang) {
    setFlow(null);
    let results = filterApartments(apartments, f.filters);
    const q = SEARCH_Q[l];
    if (results.length === 0) {
      // Ublaži filtere: samo tip + transakcija
      results = filterApartments(apartments, {
        transaction: f.filters.transaction,
        propertyType: f.filters.propertyType,
      });
    }
    if (results.length === 0) {
      results = apartments.slice(0, 3);
      miaSay([
        { kind: 'text', text: q.noExact },
        { kind: 'properties', properties: results },
        { kind: 'text', text: q.afterResults, quick: q.afterOpts },
      ]);
      return;
    }
    miaSay([
      { kind: 'text', text: q.results(results.length) },
      { kind: 'properties', properties: results.slice(0, 4) },
      { kind: 'text', text: q.afterResults, quick: q.afterOpts },
    ]);
  }

  // ---------- Booking flow ----------
  function startBooking(apt: Apartment | undefined, l: Lang) {
    const f: Flow = { name: 'booking', step: 'date', data: {}, apt };
    setFlow(f);
    miaSay([{ kind: 'text', text: BOOK_Q[l].date, quick: dateOptions(l) }]);
  }

  // ---------- Lead flow ----------
  function startLead(l: Lang) {
    const f: Flow = { name: 'lead', step: 'name', data: { createdAt: Date.now() } };
    setFlow(f);
    miaSay([{ kind: 'text', text: LEAD_Q[l].name }]);
  }

  // ---------- Main input handler ----------
  function handleSend(raw: string) {
    const text = raw.trim();
    if (!text) return;
    pushUser(text);
    setInput('');
    const l = detectLang(text, lang);
    if (l !== lang) setLang(l);

    const active = flowRef.current;
    if (active) {
      handleFlowInput(text, l, active);
      return;
    }
    routeIntent(text.toLowerCase(), l);
  }

  function handleFlowInput(text: string, l: Lang, active: NonNullable<Flow>) {
    if (active.name === 'search') {
      const f = { ...active, filters: { ...active.filters } };
      if (f.step === 'propertyType') f.filters.propertyType = mapType(text) || 'apartment';
      else if (f.step === 'budget') {
        const n = parseInt(text.replace(/[^\d]/g, ''), 10);
        f.filters.budget = isNaN(n) ? 0 : n;
      } else if (f.step === 'location') f.filters.location = /svejedno|any|bilo/i.test(text) ? '' : text;
      else if (f.step === 'bedrooms') {
        const n = parseInt(text.replace(/[^\d]/g, ''), 10);
        f.filters.bedrooms = isNaN(n) ? 0 : n;
      }
      askSearchStep(f, l);
      return;
    }
    if (active.name === 'booking') {
      const f = { ...active, data: { ...active.data } };
      const b = BOOK_Q[l];
      if (f.step === 'date') {
        f.data.date = text;
        f.step = 'time';
        setFlow(f);
        miaSay([{ kind: 'text', text: b.time, quick: timeOptions() }]);
      } else if (f.step === 'time') {
        f.data.time = text;
        f.step = 'name';
        setFlow(f);
        miaSay([{ kind: 'text', text: b.name }]);
      } else if (f.step === 'name') {
        f.data.name = text;
        f.step = 'phone';
        setFlow(f);
        miaSay([{ kind: 'text', text: b.phone }]);
      } else if (f.step === 'phone') {
        f.data.phone = text;
        setFlow(null);
        saveLead({ name: f.data.name, phone: f.data.phone, createdAt: Date.now() });
        reportBooking({
          name: f.data.name,
          phone: f.data.phone,
          apartment: f.apt?.name || '',
          apartmentId: f.apt?.id || '',
          viewingDate: f.data.date || '',
          viewingTime: f.data.time || '',
        });
        miaSay([
          { kind: 'text', text: b.confirm(f.data, f.apt?.name) },
          { kind: 'contact', text: b.contactHint },
        ]);
      }
      return;
    }
    if (active.name === 'lead') {
      const f = { ...active, data: { ...active.data } };
      const q = LEAD_Q[l];
      if (f.step === 'name') {
        f.data.name = text;
        f.step = 'phone';
        setFlow(f);
        miaSay([{ kind: 'text', text: q.phone }]);
      } else if (f.step === 'phone') {
        f.data.phone = text;
        f.step = 'email';
        setFlow(f);
        miaSay([{ kind: 'text', text: q.email }]);
      } else if (f.step === 'email') {
        f.data.email = /preskoci|skip|-/i.test(text) ? '' : text;
        setFlow(null);
        saveLead(f.data);
        reportLead({ name: f.data.name, phone: f.data.phone, email: f.data.email });
        miaSay([
          { kind: 'text', text: q.done(f.data.name || '') },
          { kind: 'contact', text: q.contactHint },
        ]);
      }
      return;
    }
  }

  function routeIntent(s: string, l: Lang) {
    // Konverter (inline parsiranje iznosa)
    const cur = parseCurrency(s);
    if (cur && has(s, ['konv', 'convert', 'pretvor', 'dinar', 'rsd', 'kurs', 'valut', 'currency'])) {
      miaSay([{ kind: 'currency', toolPrice: cur.amount, text: cur.from }]);
      return;
    }
    if (has(s, ['kalkulator', 'kredit', 'rata', 'mortgage', 'calculator', 'loan', 'instalment'])) {
      miaSay([{ kind: 'text', text: FIN_INTRO[l] }, { kind: 'mortgage' }]);
      return;
    }
    if (has(s, ['konv', 'convert', 'valut', 'currency', 'dinar', 'rsd', 'kurs'])) {
      miaSay([{ kind: 'currency' }]);
      return;
    }
    if (has(s, ['zakaz', 'zakaži', 'razgled', 'schedule', 'viewing', 'obilaz', 'termin'])) {
      startBooking(undefined, l);
      return;
    }
    if (has(s, ['dokument', 'papir', 'document', 'paperwork'])) {
      miaSay([{ kind: 'text', text: KB.documentation[l], quick: afterInfoQuick(l) }]);
      return;
    }
    if (has(s, ['porez', 'pdv', 'tax', 'vat'])) {
      miaSay([{ kind: 'text', text: KB.taxes[l], quick: afterInfoQuick(l) }]);
      return;
    }
    if (has(s, ['pravn', 'legal', 'ugovor', 'notar', 'beležnik', 'belaznik', 'contract'])) {
      miaSay([{ kind: 'text', text: KB.legal[l], quick: afterInfoQuick(l) }]);
      return;
    }
    if (has(s, ['finans', 'financ', 'banka', 'bank'])) {
      miaSay([{ kind: 'text', text: KB.financing[l] }, { kind: 'mortgage' }]);
      return;
    }
    if (has(s, ['prodaj', 'prodat', 'sell', 'selling'])) {
      miaSay([{ kind: 'text', text: KB.selling[l], quick: sellQuick(l) }]);
      return;
    }
    if (has(s, ['izdav', 'renta', 'rentir', 'zakup', 'rent', 'lease'])) {
      startSearch({ transaction: 'rent' }, l);
      return;
    }
    if (has(s, ['kupov', 'kupit', 'kupujem', 'buy', 'buying', 'purchase'])) {
      miaSay([{ kind: 'text', text: KB.buying[l], quick: buyQuick(l) }]);
      return;
    }
    if (has(s, ['kontakt', 'agent', 'contact', 'pozov', 'call', 'broj', 'telefon'])) {
      miaSay([{ kind: 'contact', text: CONTACT_INTRO[l], quick: leadQuick(l) }]);
      return;
    }
    if (has(s, ['garaz', 'garaž', 'garage'])) {
      startSearch({ propertyType: 'garage' }, l);
      return;
    }
    if (has(s, ['plac', 'zemlj', 'land', 'parcel'])) {
      startSearch({ propertyType: 'land' }, l);
      return;
    }
    if (has(s, ['kuc', 'kuć', 'house', 'villa', 'vila'])) {
      startSearch({ propertyType: 'house' }, l);
      return;
    }
    if (has(s, ['stan', 'apartment', 'apartman', 'flat'])) {
      startSearch({ propertyType: 'apartment' }, l);
      return;
    }
    if (has(s, ['investic', 'invest', 'prinos', 'yield'])) {
      startSearch({ transaction: 'sale', propertyType: 'apartment' }, l);
      return;
    }
    if (has(s, ['zdravo', 'cao', 'ćao', 'hello', 'hi', 'hey', 'pozdrav'])) {
      miaSay([{ kind: 'text', text: GREET[l], quick: QUICK_ACTIONS[l] }]);
      return;
    }
    // Fallback
    miaSay([{ kind: 'text', text: FALLBACK[l], quick: QUICK_ACTIONS[l] }]);
  }

  // ---------- Quick action click ----------
  function handleQuick(q: QuickAction) {
    const l = lang;
    const active = flowRef.current;

    if (q.id.startsWith('set:')) {
      const [, field, valueRaw] = q.id.split(':');
      const value = valueRaw;
      pushUser(q.label);
      if (active && active.name === 'search') {
        const f = { ...active, filters: { ...active.filters } };
        if (field === 'propertyType') f.filters.propertyType = value;
        if (field === 'budget') f.filters.budget = parseInt(value, 10);
        if (field === 'location') f.filters.location = value === 'any' ? '' : value;
        if (field === 'bedrooms') f.filters.bedrooms = parseInt(value, 10);
        askSearchStep(f, l);
      }
      return;
    }
    if (q.id.startsWith('book:')) {
      const value = q.id.slice(5);
      pushUser(q.label);
      if (active && active.name === 'booking') {
        handleFlowInput(value, l, active);
      }
      return;
    }

    // Top-level akcije
    pushUser(q.label);
    switch (q.id) {
      case 'apartments':
        startSearch({ propertyType: 'apartment' }, l);
        break;
      case 'houses':
        startSearch({ propertyType: 'house' }, l);
        break;
      case 'investment':
        startSearch({ transaction: 'sale', propertyType: 'apartment' }, l);
        break;
      case 'luxury':
      case 'new':
        startSearch({ propertyType: 'apartment', newBuild: q.id === 'new' }, l);
        break;
      case 'schedule':
        startBooking(undefined, l);
        break;
      case 'sell':
        miaSay([{ kind: 'text', text: KB.selling[l], quick: sellQuick(l) }]);
        break;
      case 'mortgage':
        miaSay([{ kind: 'text', text: FIN_INTRO[l] }, { kind: 'mortgage' }]);
        break;
      case 'agent':
        miaSay([{ kind: 'contact', text: CONTACT_INTRO[l], quick: leadQuick(l) }]);
        break;
      case 'lead':
        startLead(l);
        break;
      case 'search-again':
        startSearch({ propertyType: 'apartment' }, l);
        break;
      default:
        routeIntent(q.label.toLowerCase(), l);
    }
  }

  function openSchedule(apt: Apartment) {
    setScheduleApt(apt);
    setScheduleOpen(true);
  }

  // ---------- Render ----------
  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            onClick={() => setOpen(true)}
            aria-label="Mia AI"
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 pl-3 pr-4 py-3 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
            </span>
            <span className="hidden sm:block text-sm font-semibold">Mia</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed z-[60] inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px] flex flex-col
              h-[85vh] sm:h-[640px] sm:max-h-[85vh]
              bg-background/85 backdrop-blur-2xl border border-border sm:rounded-3xl rounded-t-3xl
              shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card/60 backdrop-blur-xl">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-brand-400 flex items-center justify-center text-white font-display font-semibold shadow-sm">
                  M
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-card" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight">{t.title}</p>
                <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t.online}
                </p>
              </div>
              {/* Language switch */}
              <div className="flex items-center gap-0.5 bg-secondary rounded-full p-0.5">
                <button
                  onClick={() => setLang('sr')}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    lang === 'sr' ? 'bg-card shadow-sm' : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label="Srpski"
                >
                  🇷🇸
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    lang === 'en' ? 'bg-card shadow-sm' : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label="English"
                >
                  🇬🇧
                </button>
              </div>
              <button
                onClick={resetChat}
                aria-label={t.newChat}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  m={m}
                  lang={lang}
                  fmtTime={fmtTime}
                  onQuick={handleQuick}
                  onSchedule={openSchedule}
                  onClose={() => setOpen(false)}
                />
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-brand-400 flex items-center justify-center text-white text-xs font-semibold">
                    M
                  </div>
                  <div className="flex items-center gap-1 bg-card border border-border rounded-2xl rounded-tl-sm px-3 py-2.5">
                    <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card/60 backdrop-blur-xl px-3 pt-2.5 pb-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  aria-label={t.send}
                  disabled={!input.trim()}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-center text-[10px] text-muted-foreground mt-1.5">{t.footer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScheduleViewingModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        apartmentName={scheduleApt?.name}
      />
    </>
  );
}

// ---------- Sub-components ----------
function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}

function MessageBubble({
  m,
  lang,
  fmtTime,
  onQuick,
  onSchedule,
  onClose,
}: {
  m: Message;
  lang: Lang;
  fmtTime: (t: number) => string;
  onQuick: (q: QuickAction) => void;
  onSchedule: (a: Apartment) => void;
  onClose: () => void;
}) {
  const isUser = m.role === 'user';

  if (isUser) {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm">
          {m.text}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1 mr-1">{fmtTime(m.time)}</span>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-primary to-brand-400 flex items-center justify-center text-white text-xs font-semibold mt-0.5">
        M
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        {m.text && m.kind === 'text' && (
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm">
            <RichText text={m.text} />
          </div>
        )}

        {m.kind === 'properties' && m.properties && (
          <div className="space-y-2.5">
            {m.properties.map((apt) => (
              <MiaPropertyCard
                key={apt.id}
                apartment={apt}
                lang={lang}
                onSchedule={onSchedule}
                onClose={onClose}
              />
            ))}
          </div>
        )}

        {m.kind === 'contact' && <ContactCard lang={lang} intro={m.text} />}
        {m.kind === 'mortgage' && <MortgageCard lang={lang} initialPrice={m.toolPrice} />}
        {m.kind === 'currency' && (
          <CurrencyCard
            lang={lang}
            initialAmount={m.toolPrice}
            initialFrom={(m.text as 'EUR' | 'RSD') || 'EUR'}
          />
        )}

        {m.quick && m.quick.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {m.quick.map((q) => (
              <button
                key={q.id}
                onClick={() => onQuick(q)}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card/70 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        <span className="text-[10px] text-muted-foreground ml-1 block">{fmtTime(m.time)}</span>
      </div>
    </div>
  );
}

function ContactCard({ lang, intro }: { lang: Lang; intro?: string }) {
  const t = UI[lang];
  const waMsg = encodeURIComponent(
    lang === 'sr' ? 'Zdravo, imam pitanje o nekretnini' : "Hello, I have a question about a property",
  );
  const actions = [
    { href: `tel:${CONTACT.phone}`, icon: Phone, label: t.call, cls: 'bg-primary text-primary-foreground' },
    {
      href: `https://wa.me/${CONTACT.whatsapp}?text=${waMsg}`,
      icon: MessageCircle,
      label: t.whatsapp,
      cls: 'bg-[#25D366] text-white',
      ext: true,
    },
    { href: `mailto:${CONTACT.email}`, icon: Mail, label: t.email, cls: 'bg-secondary text-foreground border border-border' },
    { href: CONTACT.maps, icon: MapPin, label: t.location, cls: 'bg-secondary text-foreground border border-border', ext: true },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-3.5 shadow-sm">
      {intro && <p className="text-sm text-foreground/90 mb-3">{intro}</p>}
      <div className="rounded-xl bg-secondary p-3 mb-3 text-center">
        <p className="text-[11px] text-muted-foreground">{lang === 'sr' ? 'Vaš agent' : 'Your agent'}</p>
        <p className="text-sm font-semibold text-foreground">{CONTACT.agent}</p>
        <p className="text-xs text-foreground/80">{CONTACT.phoneFormatted}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 ${a.cls}`}
          >
            <a.icon className="h-4 w-4" />
            {a.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------- Text banks ----------
const GREET: Record<Lang, string> = {
  sr: 'Zdravo! 😊 Kako vam mogu pomoći danas? Mogu da pronađem nekretninu, objasnim procedure ili zakažem razgledanje.',
  en: 'Hello! 😊 How can I help you today? I can find a property, explain procedures, or schedule a viewing.',
};
const FALLBACK: Record<Lang, string> = {
  sr: 'Tu sam da pomognem oko nekretnina 🏠 Izaberite opciju ili mi napišite šta tražite (npr. „dvosoban stan na Zvezdari do 120.000 €").',
  en: 'I\'m here to help with real estate 🏠 Pick an option or tell me what you\'re looking for (e.g. "two-bedroom on Zvezdara up to €120,000").',
};
const FIN_INTRO: Record<Lang, string> = {
  sr: 'Evo kalkulatora za okvirnu mesečnu ratu 🧮 Prilagodite vrednosti:',
  en: 'Here is a calculator for an approximate monthly instalment 🧮 Adjust the values:',
};
const CONTACT_INTRO: Record<Lang, string> = {
  sr: 'Naravno! Evo kako da nas kontaktirate 👇',
  en: 'Of course! Here is how to reach us 👇',
};

// ---------- Quick builders ----------
const buyQuick = (l: Lang): QuickAction[] =>
  l === 'sr'
    ? [
        { id: 'apartments', label: '🏢 Pogledaj stanove' },
        { id: 'mortgage', label: '🧮 Izračunaj ratu' },
        { id: 'agent', label: '👤 Kontakt' },
      ]
    : [
        { id: 'apartments', label: '🏢 Browse apartments' },
        { id: 'mortgage', label: '🧮 Estimate instalment' },
        { id: 'agent', label: '👤 Contact' },
      ];
const sellQuick = (l: Lang): QuickAction[] =>
  l === 'sr'
    ? [{ id: 'lead', label: '📝 Ostavi podatke' }, { id: 'agent', label: '👤 Kontakt agent' }]
    : [{ id: 'lead', label: '📝 Leave details' }, { id: 'agent', label: '👤 Contact agent' }];
const leadQuick = (l: Lang): QuickAction[] =>
  l === 'sr'
    ? [{ id: 'lead', label: '📝 Ostavi podatke' }, { id: 'schedule', label: '📅 Zakaži razgledanje' }]
    : [{ id: 'lead', label: '📝 Leave details' }, { id: 'schedule', label: '📅 Schedule viewing' }];
const afterInfoQuick = (l: Lang): QuickAction[] =>
  l === 'sr'
    ? [
        { id: 'apartments', label: '🏢 Nekretnine' },
        { id: 'agent', label: '👤 Kontakt' },
        { id: 'schedule', label: '📅 Razgledanje' },
      ]
    : [
        { id: 'apartments', label: '🏢 Properties' },
        { id: 'agent', label: '👤 Contact' },
        { id: 'schedule', label: '📅 Viewing' },
      ];

// ---------- Search questions ----------
const SEARCH_Q = {
  sr: {
    type: 'Odlično! Koji tip nekretnine tražite? 🏠',
    typeOpts: [
      { id: 'set:propertyType:apartment', label: 'Stan' },
      { id: 'set:propertyType:house', label: 'Kuća' },
      { id: 'set:propertyType:land', label: 'Plac' },
      { id: 'set:propertyType:garage', label: 'Garaža' },
    ] as QuickAction[],
    budget: 'Koji je vaš okvirni budžet? 💶',
    budgetOpts: [
      { id: 'set:budget:60000', label: 'do 60.000 €' },
      { id: 'set:budget:100000', label: 'do 100.000 €' },
      { id: 'set:budget:150000', label: 'do 150.000 €' },
      { id: 'set:budget:1000000', label: '150.000 €+' },
    ] as QuickAction[],
    location: 'Koja lokacija vam odgovara? 📍',
    locationOpts: [
      { id: 'set:location:Zvezdara', label: 'Zvezdara' },
      { id: 'set:location:Vračar', label: 'Vračar' },
      { id: 'set:location:Palilula', label: 'Palilula' },
      { id: 'set:location:any', label: 'Svejedno' },
    ] as QuickAction[],
    bedrooms: 'Koliko spavaćih soba? 🛏️',
    bedroomOpts: [
      { id: 'set:bedrooms:1', label: '1+' },
      { id: 'set:bedrooms:2', label: '2+' },
      { id: 'set:bedrooms:3', label: '3+' },
      { id: 'set:bedrooms:0', label: 'Svejedno' },
    ] as QuickAction[],
    results: (n: number) =>
      `Pronašla sam ${n} ${n === 1 ? 'nekretninu' : 'nekretnine/a'} koje odgovaraju vašim željama 🎉`,
    noExact: 'Trenutno nemam potpuno poklapanje, ali evo najbližih predloga 👇',
    afterResults: 'Želite li da zakažete razgledanje ili da vas poveže sa agentom?',
    afterOpts: [
      { id: 'schedule', label: '📅 Zakaži razgledanje' },
      { id: 'agent', label: '👤 Kontakt agent' },
      { id: 'search-again', label: '🔎 Nova pretraga' },
    ] as QuickAction[],
  },
  en: {
    type: 'Great! What type of property are you looking for? 🏠',
    typeOpts: [
      { id: 'set:propertyType:apartment', label: 'Apartment' },
      { id: 'set:propertyType:house', label: 'House' },
      { id: 'set:propertyType:land', label: 'Land' },
      { id: 'set:propertyType:garage', label: 'Garage' },
    ] as QuickAction[],
    budget: "What's your approximate budget? 💶",
    budgetOpts: [
      { id: 'set:budget:60000', label: 'up to €60k' },
      { id: 'set:budget:100000', label: 'up to €100k' },
      { id: 'set:budget:150000', label: 'up to €150k' },
      { id: 'set:budget:1000000', label: '€150k+' },
    ] as QuickAction[],
    location: 'Which location suits you? 📍',
    locationOpts: [
      { id: 'set:location:Zvezdara', label: 'Zvezdara' },
      { id: 'set:location:Vračar', label: 'Vračar' },
      { id: 'set:location:Palilula', label: 'Palilula' },
      { id: 'set:location:any', label: 'Any' },
    ] as QuickAction[],
    bedrooms: 'How many bedrooms? 🛏️',
    bedroomOpts: [
      { id: 'set:bedrooms:1', label: '1+' },
      { id: 'set:bedrooms:2', label: '2+' },
      { id: 'set:bedrooms:3', label: '3+' },
      { id: 'set:bedrooms:0', label: 'Any' },
    ] as QuickAction[],
    results: (n: number) => `I found ${n} propert${n === 1 ? 'y' : 'ies'} matching your wishes 🎉`,
    noExact: "I don't have an exact match right now, but here are the closest options 👇",
    afterResults: 'Would you like to schedule a viewing or be connected with an agent?',
    afterOpts: [
      { id: 'schedule', label: '📅 Schedule viewing' },
      { id: 'agent', label: '👤 Contact agent' },
      { id: 'search-again', label: '🔎 New search' },
    ] as QuickAction[],
  },
} as const;

// ---------- Booking questions ----------
const BOOK_Q = {
  sr: {
    date: 'Rado ću zakazati razgledanje 📅 Koji dan vam odgovara?',
    time: 'Odlično! U koje vreme? ⏰',
    name: 'Kako se zovete? 🙂',
    phone: 'Vaš broj telefona? 📞',
    confirm: (d: Record<string, string>, apt?: string) =>
      `Hvala, ${d.name}! ✅ Zabeležila sam vaš zahtev za razgledanje${
        apt ? ` — ${apt}` : ''
      } za ${d.date} u ${d.time}. Naš agent (${CONTACT.agent}) će vas kontaktirati na ${d.phone} radi potvrde.`,
    contactHint: 'Možete nas i direktno kontaktirati:',
  },
  en: {
    date: "I'd be happy to schedule a viewing 📅 Which day works for you?",
    time: 'Great! What time? ⏰',
    name: "What's your name? 🙂",
    phone: 'Your phone number? 📞',
    confirm: (d: Record<string, string>, apt?: string) =>
      `Thank you, ${d.name}! ✅ I've noted your viewing request${
        apt ? ` — ${apt}` : ''
      } for ${d.date} at ${d.time}. Our agent (${CONTACT.agent}) will contact you at ${d.phone} to confirm.`,
    contactHint: 'You can also reach us directly:',
  },
} as const;

// ---------- Lead questions ----------
const LEAD_Q = {
  sr: {
    name: 'Naravno! Kako se zovete? 🙂',
    phone: 'Hvala! Na koji broj telefona da vas kontaktiramo? 📞',
    email: 'I email adresa (ili napišite „preskoči")? ✉️',
    done: (n: string) =>
      `Hvala${n ? `, ${n}` : ''}! ✅ Prosledila sam vaše podatke agentu ${CONTACT.agent}. Javićemo vam se uskoro!`,
    contactHint: 'U međuvremenu, tu smo za vas:',
  },
  en: {
    name: 'Of course! What is your name? 🙂',
    phone: 'Thanks! What phone number should we reach you at? 📞',
    email: 'And your email (or type "skip")? ✉️',
    done: (n: string) =>
      `Thank you${n ? `, ${n}` : ''}! ✅ I've forwarded your details to our agent ${CONTACT.agent}. We'll be in touch soon!`,
    contactHint: "In the meantime, we're here for you:",
  },
} as const;

// ---------- Option helpers ----------
function dateOptions(l: Lang): QuickAction[] {
  const out: QuickAction[] = [];
  const now = new Date();
  const locale = l === 'sr' ? 'sr-RS' : 'en-GB';
  for (let i = 1; i <= 4; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const label = d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
    out.push({ id: `book:${label}`, label });
  }
  return out;
}
function timeOptions(): QuickAction[] {
  return ['10:00', '12:00', '14:00', '16:00', '18:00'].map((tt) => ({ id: `book:${tt}`, label: tt }));
}

function mapType(text: string): string | null {
  const s = text.toLowerCase();
  if (/stan|apartment|apartman|flat/.test(s)) return 'apartment';
  if (/kuc|kuć|house|villa|vila/.test(s)) return 'house';
  if (/plac|zemlj|land/.test(s)) return 'land';
  if (/garaz|garaž|garage/.test(s)) return 'garage';
  return null;
}
