/**
 * Debug - šta se učitava iz baze
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  console.log('🔍 Debug filtera...\n');

  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log(`📊 Ukupno oglasa u bazi: ${data?.length || 0}\n`);

  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   type: "${apt.type}"`);
    console.log(`   property_type: "${apt.property_type}"`);
    console.log(`   bedrooms: ${apt.bedrooms}`);
    console.log(`   bathrooms: ${apt.bathrooms}`);
    console.log(`   square_meters: ${apt.square_meters}`);

    // Simuliraj filter logiku
    const passesTypeFilter = apt.type === 'sale';
    const passesPropertyTypeFilter = true; // all

    console.log(`\n   ✅ Filter provere:`);
    console.log(`      - type === 'sale': ${passesTypeFilter}`);
    console.log(`      - property_type filter (all): ${passesPropertyTypeFilter}`);
    console.log(`      - PROĆI ĆE FILTER: ${passesTypeFilter && passesPropertyTypeFilter}\n`);
  });
}

debug()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
