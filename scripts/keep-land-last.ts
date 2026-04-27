/**
 * Ažurira sve placeve da budu poslednji u listi
 * Pokrenite ovu skriptu nakon dodavanja novih stanova
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepLandLast() {
  console.log('🔄 Postavljam placeve na kraj liste...\n');

  // Nađi najstariji datum među stanovima/kućama (ne zemljištima)
  const { data: nonLandApts } = await supabase
    .from('apartments')
    .select('created_at')
    .neq('property_type', 'land')
    .order('created_at', { ascending: true })
    .limit(1);

  if (!nonLandApts || nonLandApts.length === 0) {
    console.log('⚠️  Nema stanova u bazi, samo zemljišta');
    return;
  }

  const oldestNonLandDate = new Date(nonLandApts[0].created_at);

  // Postavi sva zemljišta da budu sat vremena starija od najstarijeg stana
  const landDate = new Date(oldestNonLandDate.getTime() - 60 * 60 * 1000);

  const { error } = await supabase
    .from('apartments')
    .update({ created_at: landDate.toISOString() })
    .eq('property_type', 'land');

  if (error) {
    console.error('❌ Greška:', error.message);
    return;
  }

  console.log('✅ Sva zemljišta pomerena na kraj liste\n');

  // Proveri konačan redosled
  const { data } = await supabase
    .from('apartments')
    .select('name, property_type, created_at')
    .order('created_at', { ascending: false });

  console.log('📊 Redosled oglasa:\n');
  data?.forEach((apt, i) => {
    const icon = apt.property_type === 'land' ? '🌳' : '🏠';
    console.log(`${i + 1}. ${icon} ${apt.name}`);
  });
}

keepLandLast()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
