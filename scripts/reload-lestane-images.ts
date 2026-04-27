/**
 * Reload slika za Leštane oglas
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function reloadLestaneImages() {
  console.log('📂 Reload slika za Leštane...\n');

  // 1. Lista fajlova iz foldera
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('Lestane1', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška:', listError.message);
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova\n`);

  // 2. Filtriraj samo podržane formate i sortiraj
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

  const imageUrls = files
    .filter(file => {
      if (file.name.includes('.emptyFolderPlaceholder')) return false;
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      const isSupported = supportedFormats.includes(ext);

      if (!isSupported) {
        console.log(`⚠️  Preskačem ${file.name} - format ${ext.toUpperCase()} nije podržan u browser-u`);
      }

      return isSupported;
    })
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/Lestane1/${file.name}`;
    })
    .sort((a, b) => {
      const filenameA = a.substring(a.lastIndexOf('/') + 1);
      const filenameB = b.substring(b.lastIndexOf('/') + 1);
      const numA = parseInt(filenameA.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(filenameB.match(/(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`\n📸 Kreirano ${imageUrls.length} validnih URL-ova\n`);

  if (imageUrls.length === 0) {
    console.log('❌ Nema validnih slika (JPG/PNG/WEBP) u folderu!');
    console.log('💡 Konvertujte HEIC slike u JPEG format.\n');
    return;
  }

  console.log('📊 Validne slike:\n');
  imageUrls.forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`   ${i + 1}. ✅ ${decodeURIComponent(filename)}`);
  });

  // 3. Ažuriraj oglas
  const { error: updateError } = await supabase
    .from('apartments')
    .update({ images: imageUrls })
    .like('name', '%Leštane%');

  if (updateError) {
    console.error('\n❌ Greška pri ažuriranju:', updateError.message);
    return;
  }

  console.log('\n✅ Leštane oglas ažuriran!');
  console.log(`📊 Broj slika: ${imageUrls.length}`);
}

reloadLestaneImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
