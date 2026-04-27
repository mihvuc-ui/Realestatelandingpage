/**
 * Provera tačnih imena fajlova u Lestane1
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFiles() {
  console.log('🔍 Proveravam fajlove u Lestane1...\n');

  const { data: files } = await supabase
    .storage
    .from('apartment-images')
    .list('Lestane1', {
      limit: 100,
      offset: 0,
    });

  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];

  console.log('📋 Svi JPG/PNG fajlovi:\n');

  files
    ?.filter(file => {
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      return supportedFormats.includes(ext);
    })
    .forEach((file, i) => {
      console.log(`${i + 1}. ${file.name}`);
    });
}

checkFiles()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
