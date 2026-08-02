import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const PREFIX = "/make-server-091aad8a";

// WhatsApp broj primaoca dnevnog izveštaja
const REPORT_PHONE = "+381691140010";

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ---- Pomoćne funkcije ----

// Datum u vremenskoj zoni Beograda (YYYY-MM-DD)
function belgradeDate(d: Date = new Date()): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(d); // en-CA daje YYYY-MM-DD
}

function belgradeTime(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("sr-RS", {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

// Uvećanje brojača (nizak saobraćaj, prihvatljivo)
async function bump(key: string, by = 1): Promise<void> {
  const cur = (await kv.get(key)) as number | null;
  await kv.set(key, (typeof cur === "number" ? cur : 0) + by);
}

// Health check
app.get(`${PREFIX}/health`, (c) => c.json({ status: "ok" }));

// ---- Beleženje lead-a (ostavljen kontakt) ----
app.post(`${PREFIX}/leads`, async (c) => {
  try {
    const body = await c.req.json();
    const now = new Date();
    const date = belgradeDate(now);
    const ts = now.getTime();
    const record = {
      type: "lead",
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      contactMethod: body.contactMethod || "",
      bestTime: body.bestTime || "",
      note: body.note || "",
      createdAt: ts,
      time: belgradeTime(now),
      date,
    };
    await kv.set(`lead:${date}:${ts}`, record);
    await bump(`stat:${date}:leads`);
    return c.json({ ok: true });
  } catch (err) {
    console.log(`Greška pri čuvanju lead-a: ${err}`);
    return c.json({ ok: false, error: String(err) }, 500);
  }
});

// ---- Beleženje rezervacije gledanja ----
app.post(`${PREFIX}/bookings`, async (c) => {
  try {
    const body = await c.req.json();
    const now = new Date();
    const date = belgradeDate(now);
    const ts = now.getTime();
    const record = {
      type: "booking",
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      apartment: body.apartment || "",
      apartmentId: body.apartmentId || "",
      viewingDate: body.viewingDate || body.date || "",
      viewingTime: body.viewingTime || body.time || "",
      createdAt: ts,
      time: belgradeTime(now),
      date,
    };
    await kv.set(`booking:${date}:${ts}`, record);
    await bump(`stat:${date}:bookings`);
    return c.json({ ok: true });
  } catch (err) {
    console.log(`Greška pri čuvanju rezervacije: ${err}`);
    return c.json({ ok: false, error: String(err) }, 500);
  }
});

// ---- Beleženje statistike korišćenja ----
app.post(`${PREFIX}/analytics/track`, async (c) => {
  try {
    const body = await c.req.json();
    const event = String(body.event || "").slice(0, 40);
    if (!event) return c.json({ ok: false, error: "missing event" }, 400);
    const date = belgradeDate();
    await bump(`stat:${date}:event:${event}`);
    if (event === "listing_view" && body.id) {
      await bump(`stat:${date}:listing:${String(body.id).slice(0, 80)}`);
    }
    return c.json({ ok: true });
  } catch (err) {
    console.log(`Greška pri praćenju statistike: ${err}`);
    return c.json({ ok: false, error: String(err) }, 500);
  }
});

// ---- Sastavljanje tekstualnog izveštaja za dati datum ----
async function buildReport(date: string): Promise<string> {
  const leads = ((await kv.getByPrefix(`lead:${date}:`)) as any[]) || [];
  const bookings = ((await kv.getByPrefix(`booking:${date}:`)) as any[]) || [];

  const pageviews = (await kv.get(`stat:${date}:event:pageview`)) || 0;
  const miaOpens = (await kv.get(`stat:${date}:event:mia_open`)) || 0;
  const listingViews = (await kv.get(`stat:${date}:event:listing_view`)) || 0;

  leads.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  bookings.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

  const L: string[] = [];
  L.push(`📊 Nekretnine Stepenik — Dnevni izveštaj`);
  L.push(`🗓️ ${date}`);
  L.push("");

  // Kontakti / leadovi
  L.push(`📇 Ostavljeni kontakti: ${leads.length}`);
  leads.forEach((l, i) => {
    const parts = [l.name || "—"];
    if (l.phone) parts.push(`📞 ${l.phone}`);
    if (l.email) parts.push(`✉️ ${l.email}`);
    L.push(`  ${i + 1}. ${parts.join(" | ")} (${l.time || ""})`);
  });
  L.push("");

  // Rezervacije gledanja
  L.push(`📅 Rezervacije gledanja: ${bookings.length}`);
  bookings.forEach((b, i) => {
    const parts = [b.name || "—"];
    if (b.phone) parts.push(`📞 ${b.phone}`);
    if (b.apartment) parts.push(`🏠 ${b.apartment}`);
    const when = [b.viewingDate, b.viewingTime].filter(Boolean).join(" ");
    if (when) parts.push(`🕒 ${when}`);
    L.push(`  ${i + 1}. ${parts.join(" | ")} (prijava ${b.time || ""})`);
  });
  L.push("");

  // Statistika
  L.push(`📈 Statistika sajta:`);
  L.push(`  • Pregledi stranica: ${pageviews}`);
  L.push(`  • Pregledi oglasa: ${listingViews}`);
  L.push(`  • Otvaranja Mia asistenta: ${miaOpens}`);

  return L.join("\n");
}

// ---- Slanje izveštaja na WhatsApp preko CallMeBot ----
async function sendWhatsApp(text: string): Promise<{ ok: boolean; detail: string }> {
  const apikey = Deno.env.get("CALLMEBOT_APIKEY");
  if (!apikey) {
    return { ok: false, detail: "CALLMEBOT_APIKEY nije podešen" };
  }
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(REPORT_PHONE)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
  const res = await fetch(url);
  const detail = await res.text();
  return { ok: res.ok, detail };
}

// ---- Pregled izveštaja (bez slanja) ----
app.get(`${PREFIX}/daily-report/preview`, async (c) => {
  const date = c.req.query("date") || belgradeDate();
  const report = await buildReport(date);
  return c.json({ ok: true, date, report });
});

// ---- Okidanje dnevnog izveštaja (poziva ga eksterni cron u 18:00) ----
app.get(`${PREFIX}/daily-report`, async (c) => {
  try {
    const date = c.req.query("date") || belgradeDate();
    const report = await buildReport(date);
    const sent = await sendWhatsApp(report);
    console.log(`Daily report send result: ${JSON.stringify(sent)}`);
    return c.json({ ok: sent.ok, date, report, whatsapp: sent.detail });
  } catch (err) {
    console.log(`Greška pri slanju dnevnog izveštaja: ${err}`);
    return c.json({ ok: false, error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);
