/**
 * Provera svih oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllListings() {
  console.log('🔍 Proveravam sve oglase...\n');

  const { data } = await supabase
    .from('apartments')
    .select('*')
    .order('created_at', { ascending: false });

  console.log('📊 PRODAJA:\n');
  data?.filter(apt => apt.type === 'sale').forEach((apt, i) => {
    const icon = apt.property_type === 'land' ? '🌳' : '🏠';
    console.log(`${i + 1}. ${icon} ${apt.name}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Cena: €${apt.price.toLocaleString()}`);
    console.log(`   Kvadrata: ${apt.square_meters}m²`);
    console.log(`   Created: ${apt.created_at}\n`);
  });

  console.log('\n📊 IZDAVANJE:\n');
  data?.filter(apt => apt.type === 'rent').forEach((apt, i) => {
    console.log(`${i + 1}. 🏠 ${apt.name}`);
    console.log(`   Lokacija: ${apt.location}`);
    console.log(`   Cena: €${apt.price}/mesec`);
    console.log(`   Kvadrata: ${apt.square_meters}m²`);
    console.log(`   Created: ${apt.created_at}\n`);
  });

  console.log(`\n📈 Ukupno oglasa: ${data?.length || 0}`);
  console.log(`   - Prodaja: ${data?.filter(apt => apt.type === 'sale').length || 0}`);
  console.log(`   - Izdavanje: ${data?.filter(apt => apt.type === 'rent').length || 0}`);
}

checkAllListings()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
