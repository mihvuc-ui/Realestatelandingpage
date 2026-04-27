export interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  type: 'sale' | 'rent';
  propertyType?: string; // apartment, house, land, commercial, garage, etc.
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
  landLocation?: string; // Za zemljište - tačna lokacija
  buildingOnLand?: string; // Da li postoji objekat na placu
  landType?: string; // Tip zemljišta - građevinsko, poljoprivredno, itd.
}

// Statički podaci su zamenjeni Supabase bazom podataka
// Svi oglasi se sada učitavaju iz Supabase-a preko useApartments hook-a
export const apartments: Apartment[] = [];