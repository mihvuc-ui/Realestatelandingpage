/**
 * Pronalaženje slika iz Desanke Maksimovic1 foldera
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function findImages() {
  console.log('🔍 Tražim slike u Supabase Storage...\n');

  // Prvo proverimo root folder
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from('apartment-images')
    .list('', { limit: 1000 });

  if (rootError) {
    console.error('❌ Greška pri čitanju root foldera:', rootError.message);
  } else {
    console.log('📂 Root folder:');
    rootFiles?.forEach(item => {
      console.log(`  ${item.name} ${item.id ? '(folder)' : '(file)'}`);
    });
    console.log('');
  }

  // Proverimo "apartments" folder
  const { data: apartmentsFiles, error: aptError } = await supabase.storage
    .from('apartment-images')
    .list('apartments', { limit: 1000 });

  if (!aptError && apartmentsFiles && apartmentsFiles.length > 0) {
    console.log(`📂 apartments/ folder (${apartmentsFiles.length} fajlova):`);
    apartmentsFiles.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file.name}`);
    });
    console.log('');
  }

  // Proverimo da li postoji "Desanke Maksimovic1" folder
  const { data: desankeFiles, error: desankeError } = await supabase.storage
    .from('apartment-images')
    .list('Desanke Maksimovic1', { limit: 1000 });

  if (!desankeError && desankeFiles && desankeFiles.length > 0) {
    console.log(`✅ Pronađen "Desanke Maksimovic1" folder (${desankeFiles.length} fajlova):`);

    const imageUrls: string[] = [];

    desankeFiles.forEach((file, i) => {
      const { data } = supabase.storage
        .from('apartment-images')
        .getPublicUrl(`Desanke Maksimovic1/${file.name}`);

      console.log(`  ${i + 1}. ${file.name}`);
      console.log(`     URL: ${data.publicUrl}`);
      imageUrls.push(data.publicUrl);
    });

    console.log(`\n📸 Ukupno ${imageUrls.length} slika pronađeno!`);
    console.log('\n🎯 Mogu sada da kreiram oglas sa ovim slikama!');

    return imageUrls;
  } else {
    console.log('❌ "Desanke Maksimovic1" folder nije pronađen.');

    // Provera mogućih alternativnih imena
    const variants = [
      'desanke maksimovic1',
      'DesankeMaksimovic1',
      'Desanke_Maksimovic1',
      'desanke-maksimovic1'
    ];

    for (const variant of variants) {
      const { data, error } = await supabase.storage
        .from('apartment-images')
        .list(variant, { limit: 10 });

      if (!error && data && data.length > 0) {
        console.log(`\n✅ Pronađen folder: "${variant}" (${data.length} fajlova)`);
        return;
      }
    }

    console.log('\n💡 Slike nisu pronađene. Molim vas:');
    console.log('   1. Proverite u Supabase Dashboard → Storage → apartment-images');
    console.log('   2. Ili upload-ujte slike kroz Admin Panel na sajtu');
  }

  return [];
}

findImages()
  .then((urls) => {
    if (urls && urls.length > 0) {
      console.log('\n✅ Spremno za kreiranje oglasa!');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
