/**
 * Prikaži SVE oglase u bazi sa kompletnim detaljima
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function showAll() {
  console.log('🔍 Proveravam SVE oglase u bazi...\n');

  const { data, error, count } = await supabase
    .from('apartments')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log(`📊 UKUPNO OGLASA U BAZI: ${count}\n`);
  console.log('='.repeat(80));

  if (!data || data.length === 0) {
    console.log('\n📭 Baza je PRAZNA!\n');
    return;
  }

  data.forEach((apt, i) => {
    console.log(`\n${i + 1}. OGLAS:`);
    console.log(`   Naziv: ${apt.name}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Tip: ${apt.type}`);
    console.log(`   Cena: €${apt.price}`);
    console.log(`   Površina: ${apt.square_meters}m²`);
    console.log(`   Sobe: ${apt.bedrooms}`);
    console.log(`   Broj slika: ${apt.images?.length || 0}`);
    console.log(`   ID: ${apt.id}`);
    console.log(`   Kreiran: ${apt.created_at}`);
    if (apt.images && apt.images.length > 0) {
      console.log(`   Prva slika:`);
      const firstImg = apt.images[0];
      const imgName = firstImg.substring(firstImg.lastIndexOf('/') + 1);
      console.log(`     ${decodeURIComponent(imgName)}`);
    }
    console.log('-'.repeat(80));
  });

  console.log('\n✅ Provera završena!\n');
}

showAll()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
