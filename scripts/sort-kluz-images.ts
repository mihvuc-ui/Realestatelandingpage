/**
 * Sortiranje slika za Kluz oglas po numeričkom redosledu
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function sortKluzImages() {
  console.log('🔄 Sortiram slike za Kluz...\n');

  // Učitaj Kluz oglas
  const { data: apartment, error: fetchError } = await supabase
    .from('apartments')
    .select('*')
    .like('name', '%Kluz%')
    .single();

  if (fetchError || !apartment) {
    console.error('❌ Greška pri učitavanju oglasa:', fetchError?.message);
    return;
  }

  console.log(`📋 Oglas: ${apartment.name}`);
  console.log(`   Trenutno slika: ${apartment.images?.length || 0}\n`);

  if (!apartment.images || apartment.images.length === 0) {
    console.log('❌ Nema slika');
    return;
  }

  // Sortiranje slika numerički po imenu fajla
  const sortedImages = [...apartment.images].sort((a, b) => {
    // Izvuci ime fajla iz URL-a
    const filenameA = a.substring(a.lastIndexOf('/') + 1);
    const filenameB = b.substring(b.lastIndexOf('/') + 1);

    // Izvuci broj iz imena (npr. "1.jpg" -> 1)
    const numA = parseInt(filenameA.match(/(\d+)/)?.[1] || '0');
    const numB = parseInt(filenameB.match(/(\d+)/)?.[1] || '0');

    return numA - numB;
  });

  console.log('📊 Stari redosled:');
  apartment.images.slice(0, 5).forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`   ${i + 1}. ${decodeURIComponent(filename)}`);
  });
  if (apartment.images.length > 5) {
    console.log(`   ... i još ${apartment.images.length - 5} slika`);
  }

  console.log('\n📊 Novi redosled:');
  sortedImages.slice(0, 5).forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`   ${i + 1}. ${decodeURIComponent(filename)}`);
  });
  if (sortedImages.length > 5) {
    console.log(`   ... i još ${sortedImages.length - 5} slika`);
  }

  // Ažuriraj oglas
  const { error: updateError } = await supabase
    .from('apartments')
    .update({ images: sortedImages })
    .eq('id', apartment.id);

  if (updateError) {
    console.error('\n❌ Greška pri ažuriranju:', updateError.message);
    return;
  }

  console.log('\n✅ Slike uspešno sortirane numerički (1.jpg, 2.jpg, 3.jpg...)!');
}

sortKluzImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
