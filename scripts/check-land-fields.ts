/**
 * Provera novih polja za zemljište
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLandFields() {
  console.log('🔍 Proveravam polja za zemljište...\n');

  const { data, error } = await supabase
    .from('apartments')
    .select('id, name, property_type, land_location, building_on_land, land_type, orientation')
    .eq('property_type', 'land');

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log(`📊 Pronađeno ${data?.length || 0} zemljišta\n`);

  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   property_type: ${apt.property_type}`);
    console.log(`   land_location: ${apt.land_location}`);
    console.log(`   building_on_land: ${apt.building_on_land}`);
    console.log(`   land_type: ${apt.land_type}`);
    console.log(`   orientation: ${apt.orientation} (treba da bude NULL)\n`);
  });
}

checkLandFields()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
