/**
 * UPOZORENJE: Ova skripta ne može dodati kolonu u bazu!
 *
 * Supabase ne dozvoljava ALTER TABLE preko Supabase klijenta.
 * Morate RUČNO pokrenuti SQL u Supabase SQL Editor:
 *
 * ALTER TABLE apartments
 * ADD COLUMN property_type TEXT DEFAULT 'apartment';
 *
 * Nakon toga možete pokrenuti skriptu za ažuriranje podataka.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updatePropertyTypes() {
  console.log('🔄 Ažuriram property_type polje...\n');

  // Ažuriraj stan na Vračaru
  const { error: error1 } = await supabase
    .from('apartments')
    .update({ property_type: 'apartment' })
    .like('name', '%Dvosoban stan%');

  if (error1) {
    console.error('❌ Greška za stan:', error1.message);
  } else {
    console.log('✅ Stan - property_type = apartment');
  }

  // Ažuriraj plac na Avali
  const { error: error2 } = await supabase
    .from('apartments')
    .update({ property_type: 'land' })
    .like('name', '%Plac%');

  if (error2) {
    console.error('❌ Greška za plac:', error2.message);
  } else {
    console.log('✅ Plac - property_type = land');
  }

  // Proveri rezultate
  const { data, error: error3 } = await supabase
    .from('apartments')
    .select('id, name, type, property_type');

  if (error3) {
    console.error('❌ Greška pri proveri:', error3.message);
  } else {
    console.log('\n📋 Rezultati:\n');
    data?.forEach(apt => {
      console.log(`   ${apt.name}`);
      console.log(`      type: ${apt.type}`);
      console.log(`      property_type: ${apt.property_type || 'NULL'}\n`);
    });
  }
}

console.log('⚠️  VAŽNO: Prvo pokrenite SQL u Supabase SQL Editor:\n');
console.log('ALTER TABLE apartments');
console.log('ADD COLUMN property_type TEXT DEFAULT \'apartment\';\n');
console.log('Pritisnite Ctrl+C da prekinete ili Enter da nastavite...\n');

// Wait for user confirmation
process.stdin.once('data', () => {
  updatePropertyTypes()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('💥 Greška:', err);
      process.exit(1);
    });
});
