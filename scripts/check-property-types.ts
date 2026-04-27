/**
 * Provera property_type polja
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPropertyTypes() {
  console.log('🔍 Proveravam property_type...\n');

  const { data, error } = await supabase
    .from('apartments')
    .select('id, name, type, property_type');

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log(`📊 Ukupno oglasa: ${data?.length || 0}\n`);

  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   type: ${apt.type}`);
    console.log(`   property_type: ${apt.property_type || 'NULL'}`);
    console.log(`   ID: ${apt.id}\n`);
  });
}

checkPropertyTypes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
