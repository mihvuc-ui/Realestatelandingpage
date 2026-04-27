/**
 * Brisanje Nehruova oglasa
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/utils/supabase/types.js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function deleteNehruova() {
  console.log('🗑️  Brišem Nehruova oglas...\n');

  // Prvo pokažimo sve oglase
  const { data: allApartments } = await supabase
    .from('apartments')
    .select('id, name, location');

  console.log('📋 Trenutni oglasi u bazi:');
  allApartments?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name} (${apt.location})`);
    console.log(`   ID: ${apt.id}\n`);
  });

  // Brišemo Nehruova
  const { error } = await supabase
    .from('apartments')
    .delete()
    .ilike('name', '%Nehruova%');

  if (error) {
    console.error('❌ Greška:', error.message);
    process.exit(1);
  }

  console.log('✅ Nehruova oglas obrisan!\n');

  // Proveravamo šta je ostalo
  const { data: remaining } = await supabase
    .from('apartments')
    .select('name');

  console.log(`📊 Preostali oglasi: ${remaining?.length || 0}`);
  remaining?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
  });

  console.log('\n🎉 Baza je spremna za novi oglas!\n');
}

deleteNehruova()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
