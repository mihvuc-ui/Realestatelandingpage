/**
 * Provera Kluz oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkKluzApartments() {
  console.log('🔍 Proveravam Kluz oglase...\n');

  const { data } = await supabase
    .from('apartments')
    .select('*')
    .like('name', '%Kluz%')
    .order('created_at', { ascending: false });

  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   ID: ${apt.id}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Kvadrata: ${apt.square_meters}m²`);
    console.log(`   Cena: €${apt.price.toLocaleString()}`);
    console.log(`   Broj slika: ${apt.images?.length || 0}`);
    console.log(`   Created: ${apt.created_at}\n`);
  });
}

checkKluzApartments()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
