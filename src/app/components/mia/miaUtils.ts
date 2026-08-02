import type { Apartment } from '@/data/apartments';
import type { Lang } from './miaContent';

// ---- Detekcija jezika ----
const SR_HINTS = [
  'stan',
  'kuca',
  'kuća',
  'placa',
  'plac',
  'garaza',
  'garaža',
  'zemlj',
  'prodaja',
  'kupovina',
  'izdavanje',
  'zdravo',
  'cena',
  'hocu',
  'hoću',
  'koliko',
  'gde',
  'trazim',
  'tražim',
  'zakazi',
  'zakaži',
  'razgledanje',
  'kredit',
  'porez',
  'nekretnin',
  'zelim',
  'želim',
  'da li',
];
const EN_HINTS = [
  'apartment',
  'house',
  'garage',
  'land',
  'buy',
  'sell',
  'rent',
  'hello',
  'hi ',
  'price',
  'looking',
  'want',
  'how much',
  'where',
  'schedule',
  'viewing',
  'mortgage',
  'tax',
  'property',
];

export function detectLang(text: string, fallback: Lang): Lang {
  const s = ` ${text.toLowerCase()} `;
  if (/[čćžšđ]/i.test(text)) return 'sr';
  const sr = SR_HINTS.filter((w) => s.includes(w)).length;
  const en = EN_HINTS.filter((w) => s.includes(w)).length;
  if (sr > en) return 'sr';
  if (en > sr) return 'en';
  return fallback;
}

// ---- Omiljene nekretnine (localStorage) ----
const FAV_KEY = 'mia_favorites';

export function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}
export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
export function toggleFavorite(id: string): boolean {
  const favs = getFavorites();
  const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
  localStorage.setItem(FAV_KEY, JSON.stringify(next));
  return next.includes(id);
}

// ---- Leadovi (localStorage) ----
export interface Lead {
  name?: string;
  phone?: string;
  email?: string;
  contactMethod?: string;
  bestTime?: string;
  createdAt: number;
}
export function saveLead(lead: Lead) {
  try {
    const list: Lead[] = JSON.parse(localStorage.getItem('mia_leads') || '[]');
    list.push(lead);
    localStorage.setItem('mia_leads', JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

// ---- Filtriranje nekretnina ----
export interface SearchFilters {
  transaction?: 'sale' | 'rent';
  propertyType?: string;
  budget?: number;
  location?: string;
  bedrooms?: number;
  minSize?: number;
  newBuild?: boolean;
}

export function filterApartments(all: Apartment[], f: SearchFilters): Apartment[] {
  let list = all.slice();
  if (f.transaction) list = list.filter((a) => a.type === f.transaction);
  if (f.propertyType) list = list.filter((a) => (a.propertyType || 'apartment') === f.propertyType);
  if (f.budget) list = list.filter((a) => a.price <= f.budget! * 1.08);
  if (f.location) {
    const q = f.location.toLowerCase();
    list = list.filter((a) => a.location.toLowerCase().includes(q) || a.name.toLowerCase().includes(q));
  }
  if (f.bedrooms) list = list.filter((a) => a.bedrooms >= f.bedrooms!);
  if (f.minSize) list = list.filter((a) => a.squareMeters >= f.minSize!);
  if (f.newBuild) list = list.filter((a) => /novogradnj/i.test(a.name + (a.floor || '')));

  // Sortiraj po ceni rastuće
  list.sort((a, b) => a.price - b.price);
  return list;
}

// ---- Konverter valuta ----
export function parseCurrency(text: string): { amount: number; from: 'EUR' | 'RSD' } | null {
  const m = text.replace(/\./g, '').match(/(\d[\d\s]*)\s*(eur|€|evra|dinara|rsd|din)/i);
  if (!m) return null;
  const amount = parseFloat(m[1].replace(/\s/g, ''));
  if (isNaN(amount)) return null;
  const unit = m[2].toLowerCase();
  const from = unit === 'rsd' || unit === 'din' || unit === 'dinara' ? 'RSD' : 'EUR';
  return { amount, from };
}
