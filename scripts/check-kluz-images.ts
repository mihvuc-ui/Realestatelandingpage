/**
 * Provera svih slika za Kluz oglas
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkKluzImages() {
  console.log('🔍 Proveravam sve slike za Kluz...\n');

  const { data: apartment, error } = await supabase
    .from('apartments')
    .select('images')
    .like('name', '%Kluz%')
    .single();

  if (error || !apartment) {
    console.error('❌ Greška:', error?.message);
    return;
  }

  console.log(`📋 Ukupno slika: ${apartment.images?.length || 0}\n`);

  apartment.images?.forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`${i + 1}. ${decodeURIComponent(filename)}`);
  });
}

checkKluzImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
