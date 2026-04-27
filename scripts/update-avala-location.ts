/**
 * Ažuriranje lokacije za Avala plac
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLocation() {
  console.log('📝 Ažuriram lokaciju za Avala plac...\n');

  const { error } = await supabase
    .from('apartments')
    .update({
      location: 'Avala - Pinosava',
      name: 'Plac - Avala, Pinosava'
    })
    .eq('property_type', 'land');

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log('✅ Lokacija ažurirana na: Avala - Pinosava\n');

  // Proveri
  const { data } = await supabase
    .from('apartments')
    .select('name, location, property_type')
    .eq('property_type', 'land')
    .single();

  if (data) {
    console.log('📋 Provera:');
    console.log(`   Naziv: ${data.name}`);
    console.log(`   Lokacija: ${data.location}`);
  }
}

updateLocation()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
