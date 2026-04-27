/**
 * Ispravljanje detalja Magnolija oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMagnolijaDetails() {
  console.log('🔧 Ispravljam Magnolija oglas...\n');

  const { data, error } = await supabase
    .from('apartments')
    .update({
      price: 550,
      location: 'Voždovac - Magnolija'
    })
    .like('name', '%Magnolija%')
    .select();

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log('✅ Oglas ažuriran!\n');
  console.log('📋 Novi podaci:');
  console.log(`   Lokacija: ${data[0].location}`);
  console.log(`   Cena: €${data[0].price}/mesec\n`);
}

fixMagnolijaDetails()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
