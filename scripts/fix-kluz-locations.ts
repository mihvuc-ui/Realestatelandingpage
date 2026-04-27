/**
 * Ispravljanje lokacija Kluz oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixKluzLocations() {
  console.log('🔧 Ispravljam lokacije Kluz oglasa...\n');

  // Stari Kluz (€365,000, 19 slika) - Rasadnička
  await supabase
    .from('apartments')
    .update({
      location: 'Zvezdara - Kluz / Rasadnička',
      name: 'Trosoban stan - Zvezdara, Kluz (Rasadnička)'
    })
    .eq('price', 365000);

  console.log('✅ Ažuriran stari Kluz oglas (Rasadnička)');

  // Proveri
  const { data } = await supabase
    .from('apartments')
    .select('name, location, price, square_meters')
    .like('name', '%Kluz%')
    .order('price', { ascending: false });

  console.log('\n📊 Kluz oglasi:\n');
  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Cena: €${apt.price.toLocaleString()}`);
    console.log(`   Površina: ${apt.square_meters}m²\n`);
  });
}

fixKluzLocations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
