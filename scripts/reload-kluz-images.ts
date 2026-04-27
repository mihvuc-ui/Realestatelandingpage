/**
 * Ponovno učitavanje svih slika iz Kluz1 foldera (uključujući 1.jpg)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function reloadKluzImages() {
  console.log('📂 Ponovno učitavam sve slike iz Kluz1 foldera...\n');

  // 1. Lista svih slika iz foldera
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('Kluz1', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder Kluz1 je prazan!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova u folderu\n`);

  // 2. Kreiraj URL-ove i sortiraj numerički
  const imageUrls = files
    .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/Kluz1/${file.name}`;
    })
    .sort((a, b) => {
      // Izvuci ime fajla
      const filenameA = a.substring(a.lastIndexOf('/') + 1);
      const filenameB = b.substring(b.lastIndexOf('/') + 1);

      // Izvuci broj (npr. "1.jpg" -> 1)
      const numA = parseInt(filenameA.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(filenameB.match(/(\d+)/)?.[1] || '0');

      return numA - numB;
    });

  console.log(`📸 Kreirao ${imageUrls.length} URL-ova za slike\n`);

  console.log('📊 Redosled slika:');
  imageUrls.forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`   ${i + 1}. ${decodeURIComponent(filename)}`);
  });

  // 3. Ažuriraj oglas
  const { error: updateError } = await supabase
    .from('apartments')
    .update({ images: imageUrls })
    .like('name', '%Kluz%');

  if (updateError) {
    console.error('\n❌ Greška pri ažuriranju:', updateError.message);
    return;
  }

  console.log('\n✅ Kluz oglas ažuriran sa svim slikama (uključujući 1.jpg)!');
  console.log(`📊 Ukupno slika: ${imageUrls.length}`);
}

reloadKluzImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
