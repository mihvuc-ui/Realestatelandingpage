/**
 * Ažuriranje redosleda nakon dodavanja Kluz2:
 * 1. Kluz (Zvezdara, Ilindenska) - najnoviji
 * 2. Desanke Maksimović
 * 3. Kluz (Rasadnička)
 * 4. Leštane
 * 5. Plac (poslednji)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateOrder() {
  console.log('🔄 Ažuriram redosled oglasa...\n');

  const now = new Date();

  // 1. Kluz (Zvezdara) - najnoviji
  const kluz2Date = new Date(now.getTime());

  // 2. Desanke - 1 sat ranije
  const desankeDate = new Date(now.getTime() - 1 * 60 * 60 * 1000);

  // 3. Kluz (Rasadnička) - 2 sata ranije
  const kluz1Date = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  // 4. Leštane - 3 sata ranije
  const lestaneDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  // 5. Plac - 4 sata ranije (poslednji)
  const placDate = new Date(now.getTime() - 4 * 60 * 60 * 1000);

  // Ažuriraj
  await supabase.from('apartments').update({ created_at: kluz2Date.toISOString() }).like('location', '%Zvezdara%');
  console.log('✅ 1. Kluz (Zvezdara, Ilindenska)');

  await supabase.from('apartments').update({ created_at: desankeDate.toISOString() }).like('name', '%Desanke%');
  console.log('✅ 2. Desanke Maksimović');

  await supabase.from('apartments').update({ created_at: kluz1Date.toISOString() }).like('location', '%Rasadnička%');
  console.log('✅ 3. Kluz (Rasadnička)');

  await supabase.from('apartments').update({ created_at: lestaneDate.toISOString() }).like('name', '%Leštane%');
  console.log('✅ 4. Leštane');

  await supabase.from('apartments').update({ created_at: placDate.toISOString() }).eq('property_type', 'land');
  console.log('✅ 5. Plac (poslednji)');

  // Proveri
  const { data } = await supabase
    .from('apartments')
    .select('name, location, property_type')
    .order('created_at', { ascending: false });

  console.log('\n📊 Konačan redosled:\n');
  data?.forEach((apt, i) => {
    const icon = apt.property_type === 'land' ? '🌳' : '🏠';
    console.log(`${i + 1}. ${icon} ${apt.name}`);
    console.log(`   📍 ${apt.location}\n`);
  });
}

updateOrder()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
