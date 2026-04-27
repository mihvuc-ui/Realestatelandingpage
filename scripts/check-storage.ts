/**
 * Provera šta je u Storage bucket-u
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log('📂 Proveravam Supabase Storage...\n');

  const { data: files, error } = await supabase.storage
    .from('apartment-images')
    .list('apartments', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' }
    });

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  if (!files || files.length === 0) {
    console.log('📭 Nema upload-ovanih slika u storage bucket-u.\n');
    console.log('💡 SLEDEĆI KORAK:');
    console.log('   1. Idite na Admin Panel (⚙️)');
    console.log('   2. Kliknite "Dodaj Novi Oglas"');
    console.log('   3. Kliknite "Upload Slike"');
    console.log('   4. Izaberite slike iz foldera "Desanke Maksimovic1"');
    console.log('   5. Sačekajte da se upload završi\n');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova:\n`);

  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file.name}`);
    const url = `${supabaseUrl}/storage/v1/object/public/apartment-images/apartments/${file.name}`;
    console.log(`   URL: ${url}\n`);
  });
}

checkStorage()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
