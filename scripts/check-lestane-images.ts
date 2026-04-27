/**
 * Provera slika u Lestane1 folderu - format i tip
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkImages() {
  console.log('🔍 Proveravam slike u Lestane1 folderu...\n');

  const { data: files, error } = await supabase
    .storage
    .from('apartment-images')
    .list('Lestane1', {
      limit: 100,
      offset: 0,
    });

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log(`📊 Pronađeno ${files?.length || 0} fajlova\n`);

  files?.forEach((file, i) => {
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    const icon = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? '✅' : '❌';
    console.log(`${i + 1}. ${icon} ${file.name}`);
    console.log(`   Format: ${ext.toUpperCase()}`);
    console.log(`   Veličina: ${(file.metadata?.size / 1024).toFixed(2)} KB\n`);
  });

  // Proveri i trenutne slike u bazi
  const { data: apartment } = await supabase
    .from('apartments')
    .select('images')
    .like('name', '%Leštane%')
    .single();

  if (apartment?.images) {
    console.log('\n📋 Trenutno u bazi:\n');
    apartment.images.forEach((img, i) => {
      const filename = img.substring(img.lastIndexOf('/') + 1);
      console.log(`${i + 1}. ${decodeURIComponent(filename)}`);
    });
  }
}

checkImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
