/**
 * Preuređivanje slika - druga slika prva, prva i treća poslednje
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function reorderImages() {
  console.log('🔄 Preuređujem slike...\n');

  // Učitaj oglas
  const { data: apartment, error: fetchError } = await supabase
    .from('apartments')
    .select('*')
    .eq('name', 'Dvosoban stan - Vračar, Desanke Maksimović')
    .single();

  if (fetchError || !apartment) {
    console.error('❌ Greška pri učitavanju oglasa:', fetchError?.message);
    return;
  }

  const oldImages = apartment.images || [];
  console.log(`📋 Trenutno ima ${oldImages.length} slika\n`);

  if (oldImages.length < 3) {
    console.log('❌ Nema dovoljno slika za preuređivanje');
    return;
  }

  // Nova logika: druga slika (#1) ide prva, zatim ostale osim prve i treće, pa prva i treća na kraju
  const img0 = oldImages[0]; // prva - ide na kraju
  const img1 = oldImages[1]; // druga - ide na početak
  const img2 = oldImages[2]; // treća - ide na kraju
  const rest = oldImages.slice(3); // ostale slike

  const newImages = [
    img1,           // druga slika je sada prva
    ...rest,        // ostale slike (od 4. pa nadalje)
    img0,           // prva slika ide na kraju
    img2            // treća slika ide na kraju
  ];

  console.log('📊 Stari redosled:');
  oldImages.forEach((img, i) => {
    const shortUrl = img.substring(img.lastIndexOf('/') + 1, img.lastIndexOf('/') + 40);
    console.log(`   ${i + 1}. ${shortUrl}...`);
  });

  console.log('\n📊 Novi redosled:');
  newImages.forEach((img, i) => {
    const shortUrl = img.substring(img.lastIndexOf('/') + 1, img.lastIndexOf('/') + 40);
    console.log(`   ${i + 1}. ${shortUrl}...`);
  });

  // Ažuriraj oglas
  const { error: updateError } = await supabase
    .from('apartments')
    .update({ images: newImages })
    .eq('id', apartment.id);

  if (updateError) {
    console.error('\n❌ Greška pri ažuriranju:', updateError.message);
    return;
  }

  console.log('\n✅ Slike uspešno preuređene!');
  console.log(`   - Druga slika je sada prva`);
  console.log(`   - Prva i treća slika su sada poslednje`);
}

reorderImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
