/**
 * Brisanje prve slike iz oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeFirstImage() {
  console.log('🗑️  Brišem prvu sliku...\n');

  // Učitaj oglas Desanke Maksimović
  const { data: apartment, error: fetchError } = await supabase
    .from('apartments')
    .select('*')
    .eq('name', 'Dvosoban stan - Vračar, Desanke Maksimović')
    .single();

  if (fetchError || !apartment) {
    console.error('❌ Greška pri učitavanju oglasa:', fetchError?.message);
    return;
  }

  console.log(`📋 Oglas: ${apartment.name}`);
  console.log(`   Trenutno slika: ${apartment.images?.length || 0}`);

  if (!apartment.images || apartment.images.length === 0) {
    console.log('❌ Nema slika za brisanje');
    return;
  }

  console.log(`   Prva slika: ${apartment.images[0]}\n`);

  // Ukloni prvu sliku
  const newImages = apartment.images.slice(1);

  console.log(`🔄 Nova lista slika: ${newImages.length} slika\n`);

  // Ažuriraj oglas
  const { error: updateError } = await supabase
    .from('apartments')
    .update({ images: newImages })
    .eq('id', apartment.id);

  if (updateError) {
    console.error('❌ Greška pri ažuriranju:', updateError.message);
    return;
  }

  console.log('✅ Prva slika uspešno obrisana!');
  console.log(`📊 Novi broj slika: ${newImages.length}`);
}

removeFirstImage()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
