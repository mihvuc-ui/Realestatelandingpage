/**
 * Postavljanje konačnog redosleda:
 * 1. Desanke Maksimović
 * 2. Kluz
 * 3. Leštane
 * 4. Plac (poslednji)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setFinalOrder() {
  console.log('🔄 Postavljam konačan redosled...\n');

  const now = new Date();

  // 1. Desanke - najnoviji
  const desankeDate = new Date(now.getTime());

  // 2. Kluz - 1 sat ranije
  const kluzDate = new Date(now.getTime() - 1 * 60 * 60 * 1000);

  // 3. Leštane - 2 sata ranije
  const lestaneDate = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  // 4. Plac - 3 sata ranije (poslednji)
  const placDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  // Ažuriraj
  await supabase.from('apartments').update({ created_at: desankeDate.toISOString() }).like('name', '%Desanke%');
  console.log('✅ 1. Desanke Maksimović');

  await supabase.from('apartments').update({ created_at: kluzDate.toISOString() }).like('name', '%Kluz%');
  console.log('✅ 2. Kluz');

  await supabase.from('apartments').update({ created_at: lestaneDate.toISOString() }).like('name', '%Leštane%');
  console.log('✅ 3. Leštane');

  await supabase.from('apartments').update({ created_at: placDate.toISOString() }).eq('property_type', 'land');
  console.log('✅ 4. Plac (poslednji)');

  // Proveri
  const { data } = await supabase
    .from('apartments')
    .select('name, property_type')
    .order('created_at', { ascending: false });

  console.log('\n📊 Konačan redosled:\n');
  data?.forEach((apt, i) => {
    const icon = apt.property_type === 'land' ? '🌳' : '🏠';
    console.log(`${i + 1}. ${icon} ${apt.name}`);
  });
}

setFinalOrder()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
