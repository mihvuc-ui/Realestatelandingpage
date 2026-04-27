/**
 * Postavljanje Desanke Maksimović kao prvog oglasa
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setDesankeFirst() {
  console.log('🔄 Postavljam Desanke Maksimović kao prvi oglas...\n');

  const now = new Date();

  // 1. Desanke - najnoviji (prvi)
  const desankeDate = new Date(now.getTime());

  // 2. Kluz (Ilindenska, €240k) - 1 sat ranije
  const kluzIlindenskaDate = new Date(now.getTime() - 1 * 60 * 60 * 1000);

  // 3. Kluz (Rasadnička, €365k) - 2 sata ranije
  const kluzRasadnickaDate = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  // 4. Leštane - 3 sata ranije
  const lestaneDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  // 5. Plac - 4 sata ranije (poslednji)
  const placDate = new Date(now.getTime() - 4 * 60 * 60 * 1000);

  // Ažuriraj
  await supabase.from('apartments').update({ created_at: desankeDate.toISOString() }).like('name', '%Desanke%');
  console.log('✅ 1. Desanke Maksimović');

  await supabase.from('apartments').update({ created_at: kluzIlindenskaDate.toISOString() }).eq('price', 240000).like('location', '%Kluz%');
  console.log('✅ 2. Kluz (Ilindenska, €240k)');

  await supabase.from('apartments').update({ created_at: kluzRasadnickaDate.toISOString() }).eq('price', 365000).like('location', '%Kluz%');
  console.log('✅ 3. Kluz (Rasadnička, €365k)');

  await supabase.from('apartments').update({ created_at: lestaneDate.toISOString() }).like('name', '%Leštane%');
  console.log('✅ 4. Leštane');

  await supabase.from('apartments').update({ created_at: placDate.toISOString() }).eq('property_type', 'land');
  console.log('✅ 5. Plac (poslednji)');

  // Proveri konačan redosled
  const { data } = await supabase
    .from('apartments')
    .select('name, location, price, property_type')
    .order('created_at', { ascending: false });

  console.log('\n📊 Konačan redosled:\n');
  data?.forEach((apt, i) => {
    const icon = apt.property_type === 'land' ? '🌳' : '🏠';
    console.log(`${i + 1}. ${icon} ${apt.name} - €${apt.price.toLocaleString()}`);
    console.log(`   📍 ${apt.location}\n`);
  });
}

setDesankeFirst()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
