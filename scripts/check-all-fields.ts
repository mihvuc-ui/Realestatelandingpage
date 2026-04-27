/**
 * Provera svih polja u oglasu
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFields() {
  console.log('🔍 Proveravam sva polja...\n');

  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .single();

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log('📋 SVI PODACI IZ BAZE:\n');
  console.log(JSON.stringify(data, null, 2));
}

checkFields()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
