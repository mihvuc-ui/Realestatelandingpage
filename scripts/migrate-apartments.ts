/**
 * Migration Script - Prebacivanje postojećih oglasa u Supabase
 *
 * Ovaj script kopira sve oglase iz src/data/apartments.ts u Supabase bazu.
 *
 * Korišćenje:
 * 1. Uverite se da je .env fajl konfigurisan sa Supabase credentials
 * 2. Pokrenite: pnpm migrate-apartments
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { apartments } from '../src/data/apartments.js';
import type { Database } from '../src/utils/supabase/types.js';

// Učitavanje environment varijabli iz .env fajla
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Greška: VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY moraju biti podešeni u .env fajlu');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function migrateApartments() {
  console.log('🚀 Započinjem migraciju oglasa u Supabase...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const apt of apartments) {
    try {
      console.log(`📦 Migriram: ${apt.name}...`);

      const { error } = await supabase.from('apartments').insert({
        name: apt.name,
        location: apt.location,
        price: apt.price,
        type: apt.type,
        square_meters: apt.squareMeters,
        bedrooms: apt.bedrooms,
        bathrooms: apt.bathrooms,
        description_sr: apt.descriptions?.sr || apt.description,
        description_en: apt.descriptions?.en || apt.description,
        description_ru: apt.descriptions?.ru || apt.description,
        description_tr: apt.descriptions?.tr || apt.description,
        images: apt.images,
        featured: apt.featured || false,
        floor: apt.floor || null,
        heating: apt.heating || null,
        parking: apt.parking || null,
        year_renovated: apt.yearRenovated || null,
        orientation: apt.orientation || null,
        furnished: apt.furnished || null,
        distance_to_river: apt.distanceToRiver || null,
      });

      if (error) {
        console.error(`   ❌ Greška: ${error.message}`);
        errorCount++;
      } else {
        console.log(`   ✅ Uspešno!`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ Neočekivana greška:`, err);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Uspešno migrirano: ${successCount} oglasa`);
  if (errorCount > 0) {
    console.log(`❌ Greške: ${errorCount} oglasa`);
  }
  console.log('='.repeat(50));
}

// Pokretanje migracije
migrateApartments()
  .then(() => {
    console.log('\n🎉 Migracija završena!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatalna greška:', error);
    process.exit(1);
  });
