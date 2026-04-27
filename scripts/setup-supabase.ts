/**
 * Supabase Setup Script
 * Kreira tabele i dodaje prvi oglas
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Greška: Supabase credentials nisu podešeni');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Započinjem Supabase setup...\n');

  // Kreiranje tabele za apartments
  console.log('📦 Kreiram apartments tabelu...');

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS apartments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      price NUMERIC NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
      square_meters NUMERIC NOT NULL,
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      description_sr TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_ru TEXT NOT NULL,
      description_tr TEXT NOT NULL,
      images TEXT[] DEFAULT '{}',
      featured BOOLEAN DEFAULT FALSE,
      floor TEXT,
      heating TEXT,
      parking TEXT,
      year_renovated TEXT,
      orientation TEXT,
      furnished TEXT,
      distance_to_river TEXT
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      apartment_id UUID REFERENCES apartments(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_apartments_type ON apartments(type);
    CREATE INDEX IF NOT EXISTS idx_apartments_price ON apartments(price);
    CREATE INDEX IF NOT EXISTS idx_apartments_featured ON apartments(featured);

    ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
    ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "apartments_select_policy" ON apartments;
    CREATE POLICY "apartments_select_policy" ON apartments FOR SELECT USING (true);

    DROP POLICY IF EXISTS "apartments_all_policy" ON apartments;
    CREATE POLICY "apartments_all_policy" ON apartments FOR ALL USING (true);

    DROP POLICY IF EXISTS "contact_insert_policy" ON contact_submissions;
    CREATE POLICY "contact_insert_policy" ON contact_submissions FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "contact_select_policy" ON contact_submissions;
    CREATE POLICY "contact_select_policy" ON contact_submissions FOR SELECT USING (true);
  `;

  const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });

  if (createError) {
    console.log('   ⚠️  Koristim alternativnu metodu za kreiranje tabela...');
    // Ako RPC ne radi, korisnik mora ručno pokrenuti SQL
    console.log('\n❌ Nisam mogao da kreiram tabele automatski.');
    console.log('\n📋 MOLIM VAS DA POKRENETE OVAJ SQL RUČNO U SUPABASE SQL EDITOR:\n');
    console.log('=' .repeat(70));
    console.log(createTableSQL);
    console.log('=' .repeat(70));
    console.log('\nNakon što pokrenete SQL, pokrenite ponovo: pnpm migrate-apartments\n');
    process.exit(1);
  }

  console.log('   ✅ Tabele kreirane!\n');

  // Dodavanje prvog oglasa
  console.log('📦 Dodajem test oglas (Nehruova)...');

  const { error: insertError } = await supabase.from('apartments').insert({
    name: 'Dvosoban stan - Nehruova, Savski blokovi',
    location: 'Novi Beograd - Nehruova, Savski blokovi',
    price: 175000,
    type: 'sale',
    square_meters: 65,
    bedrooms: 2,
    bathrooms: 1,
    description_sr: 'Ako tražite stan na lokaciji koja spaja udobnost, odličnu povezanost i sve sadržaje potrebne za savremen život, ovo je prava prilika za vas. U ponudi je dvostrano orijentisan, dvosoban stan sa pripojenom terasom dnevnoj sobi, ukupne građevinske površine 65m² i korisne površine 60m², smešten na 4. spratu u zgradi koja ima ukupno 4 sprata.\n\nStan je renoviran 2008. godine, kada su urađene sve ključne stvari – postavljena je aluminijumska stolarija koja obezbeđuje dobru izolaciju, ugrađen je kvalitetan jasenov parket, renovirano kupatilo sa potpuno zamenjenim cevima, urađene su nove elektro instalacije, a ugrađeni su i novi radijatori.',
    description_en: 'If you are looking for an apartment in a location that combines comfort, excellent connectivity, and all the amenities needed for modern living, this is the right opportunity for you. We offer a double-oriented, two-bedroom apartment with an attached terrace to the living room, with a total construction area of 65m² and usable area of 60m², located on the 4th floor in a building with a total of 4 floors.\n\nThe apartment was renovated in 2008, when all the key things were done - aluminum joinery was installed providing good insulation, quality ash parquet was installed, the bathroom was renovated with completely replaced pipes, new electrical installations were done, and new radiators were installed.',
    description_ru: 'Если вы ищете квартиру в месте, которое сочетает в себе комфорт, отличную транспортную доступность и все удобства, необходимые для современной жизни, это правильная возможность для вас. Мы предлагаем двухстороннюю двухкомнатную квартиру с пристроенной террасой к гостиной, общей строительной площадью 65м² и полезной площадью 60м², расположенную на 4-м этаже здания с общим количеством 4 этажей.\n\nКвартира была отремонтирована в 2008 году, когда были сделаны все ключевые вещи - установлены алюминиевые окна, обеспечивающие хорошую изоляцию, уложен качественный паркет из ясеня, отремонтирована ванная комната с полностью замененными трубами, сделаны новые электрические установки и установлены новые радиаторы.',
    description_tr: 'Modern yaşam için gereken konfor, mükemmel bağlantı ve tüm olanakları bir araya getiren bir konumda daire arıyorsanız, bu sizin için doğru fırsattır. Toplam inşaat alanı 65m² ve kullanılabilir alanı 60m² olan, 4 katlı bir binanın 4. katında bulunan, oturma odasına bitişik teraslı, iki yönlü, iki yatak odalı bir daire sunuyoruz.\n\nDaire 2008 yılında yenilenmiş, tüm önemli işler yapılmış - iyi yalıtım sağlayan alüminyum doğramalar takılmış, kaliteli dişbudak parke döşenmiş, tamamen değiştirilmiş borularla banyo yenilenmiş, yeni elektrik tesisatları yapılmış ve yeni radyatörler takılmıştır.',
    images: [
      'https://i.imgur.com/rhk2C8oh.jpg',
      'https://i.imgur.com/srqdJnBh.jpg',
      'https://i.imgur.com/nQxcF7Mh.jpg',
      'https://i.imgur.com/l3eyZ2oh.jpg',
      'https://i.imgur.com/lL8e1xxh.jpg',
      'https://i.imgur.com/AVnXiPlh.jpg',
      'https://i.imgur.com/P5DSIpCh.jpg',
      'https://i.imgur.com/0I3SQAQh.jpg',
      'https://i.imgur.com/E4cR7ICh.jpg',
      'https://i.imgur.com/B24eQRZh.jpg',
      'https://i.imgur.com/fYAApDHh.jpg',
      'https://i.imgur.com/EmaLgNlh.jpg'
    ],
    featured: true,
    floor: '4/4',
    heating: 'Centralno',
    parking: 'Javni parking ispred zgrade',
    year_renovated: '2008',
    orientation: 'Dvostrano orijentisan',
    furnished: 'Sa ili bez nameštaja (po dogovoru)',
    distance_to_river: '350m'
  });

  if (insertError) {
    console.error('   ❌ Greška pri dodavanju oglasa:', insertError.message);
  } else {
    console.log('   ✅ Oglas uspešno dodat!\n');
  }

  console.log('🎉 Setup završen! Refreshujte Admin Panel na sajtu.\n');
}

setupDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Greška:', error);
    process.exit(1);
  });
