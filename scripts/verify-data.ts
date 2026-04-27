/**
 * Verifikacija - da li je oglas u bazi?
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('🔍 Proveravam bazu...\n');

  const { data, error, count } = await supabase
    .from('apartments')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('❌ Greška:', error.message);
    console.log('\n⚠️  Možda tabela nije kreirana ili nema pristup.');
    return;
  }

  console.log(`📊 Ukupno oglasa u bazi: ${count}`);

  if (!data || data.length === 0) {
    console.log('\n📭 Baza je prazna!');
    console.log('\n💡 Mogući razlozi:');
    console.log('   1. Oglas nije uspešno dodat');
    console.log('   2. Pogrešan bucket ili tabla\n');
    return;
  }

  console.log('\n✅ Oglasi u bazi:\n');
  data.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Cena: €${apt.price}`);
    console.log(`   Slike: ${apt.images?.length || 0}`);
    console.log(`   ID: ${apt.id}\n`);
  });

  console.log('🎯 Baza sadrži podatke!\n');
  console.log('💡 Ako sajt ne prikazuje oglase, problem je u frontend-u.\n');
}

verify()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
