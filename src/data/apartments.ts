export interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  type: 'sale' | 'rent';
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  description: string; // Kept for backward compatibility
  descriptions?: {
    sr: string;
    en: string;
    ru: string;
    tr: string;
  };
  images: string[];
  featured?: boolean;
  floor?: string;
  heating?: string;
  parking?: string;
  yearRenovated?: string;
  orientation?: string;
  furnished?: string;
  distanceToRiver?: string;
}

// Statički podaci su zamenjeni Supabase bazom podataka
// Svi oglasi se sada učitavaju iz Supabase-a preko useApartments hook-a
export const apartments: Apartment[] = [];