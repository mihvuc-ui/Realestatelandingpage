/**
 * Promena redosleda oglasa
 * 1. Desanke Maksimović (prvo)
 * 2. Kluz (drugo)
 * 3. Plac Avala (poslednji - uvek poslednji)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function reorderListings() {
  console.log('🔄 Menjam redosled oglasa...\n');

  // Postavi datume tako da redosled bude:
  // 1. Desanke (najnoviji datum - prikazuje se prvi)
  // 2. Kluz (srednji datum - prikazuje se drugi)
  // 3. Plac (najstariji datum - prikazuje se poslednji)

  const now = new Date();

  // Desanke - najnoviji (prikazuje se prvi)
  const desankeDate = new Date(now.getTime());

  // Kluz - 1 sat ranije (prikazuje se drugi)
  const kluzDate = new Date(now.getTime() - 60 * 60 * 1000);

  // Plac - 2 sata ranije (prikazuje se poslednji)
  const placDate = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  // Ažuriraj Desanke
  const { error: error1 } = await supabase
    .from('apartments')
    .update({ created_at: desankeDate.toISOString() })
    .like('name', '%Desanke%');

  if (error1) {
    console.error('❌ Greška za Desanke:', error1.message);
  } else {
    console.log('✅ Desanke - pozicija 1 (najnoviji)');
  }

  // Ažuriraj Kluz
  const { error: error2 } = await supabase
    .from('apartments')
    .update({ created_at: kluzDate.toISOString() })
    .like('name', '%Kluz%');

  if (error2) {
    console.error('❌ Greška za Kluz:', error2.message);
  } else {
    console.log('✅ Kluz - pozicija 2');
  }

  // Ažuriraj Plac
  const { error: error3 } = await supabase
    .from('apartments')
    .update({ created_at: placDate.toISOString() })
    .eq('property_type', 'land');

  if (error3) {
    console.error('❌ Greška za Plac:', error3.message);
  } else {
    console.log('✅ Plac - pozicija 3 (najstariji - uvek poslednji)');
  }

  // Proveri redosled
  const { data } = await supabase
    .from('apartments')
    .select('id, name, created_at')
    .order('created_at', { ascending: false });

  console.log('\n📊 Novi redosled:\n');
  data?.forEach((apt, i) => {
    console.log(`${i + 1}. ${apt.name}`);
    console.log(`   created_at: ${apt.created_at}\n`);
  });
}

reorderListings()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
