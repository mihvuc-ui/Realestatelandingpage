-- QUICK SETUP: Kreiranje apartments tabele i dodavanje test oglasa
-- Kopirajte CEO ovaj fajl u Supabase SQL Editor i kliknite RUN

-- 1. Kreiraj tabelu za stanove
CREATE TABLE IF NOT EXISTS apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Osnovni podaci
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  square_meters NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,

  -- Opisi na različitim jezicima
  description_sr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_tr TEXT NOT NULL,

  -- Slike (array URL-ova)
  images TEXT[] DEFAULT '{}',

  -- Dodatne karakteristike
  featured BOOLEAN DEFAULT FALSE,
  floor TEXT,
  heating TEXT,
  parking TEXT,
  year_renovated TEXT,
  orientation TEXT,
  furnished TEXT,
  distance_to_river TEXT
);

-- 2. Kreiraj tabelu za kontakt forme
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  apartment_id UUID REFERENCES apartments(id) ON DELETE SET NULL
);

-- 3. Indeksi za performanse
CREATE INDEX IF NOT EXISTS idx_apartments_type ON apartments(type);
CREATE INDEX IF NOT EXISTS idx_apartments_price ON apartments(price);
CREATE INDEX IF NOT EXISTS idx_apartments_featured ON apartments(featured);

-- 4. Row Level Security
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 5. Politike - svi mogu da čitaju
DROP POLICY IF EXISTS "apartments_select_policy" ON apartments;
CREATE POLICY "apartments_select_policy"
  ON apartments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "apartments_all_policy" ON apartments;
CREATE POLICY "apartments_all_policy"
  ON apartments FOR ALL
  USING (true);

DROP POLICY IF EXISTS "contact_insert_policy" ON contact_submissions;
CREATE POLICY "contact_insert_policy"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "contact_select_policy" ON contact_submissions;
CREATE POLICY "contact_select_policy"
  ON contact_submissions FOR SELECT
  USING (true);

-- 6. DODAJ TEST OGLAS (Nehruova stan iz apartments.ts)
INSERT INTO apartments (
  name,
  location,
  price,
  type,
  square_meters,
  bedrooms,
  bathrooms,
  description_sr,
  description_en,
  description_ru,
  description_tr,
  images,
  featured,
  floor,
  heating,
  parking,
  year_renovated,
  orientation,
  furnished,
  distance_to_river
) VALUES (
  'Dvosoban stan - Nehruova, Savski blokovi',
  'Novi Beograd - Nehruova, Savski blokovi',
  175000,
  'sale',
  65,
  2,
  1,
  'Ako tražite stan na lokaciji koja spaja udobnost, odličnu povezanost i sve sadržaje potrebne za savremen život, ovo je prava prilika za vas. U ponudi je dvostrano orijentisan, dvosoban stan sa pripojenom terasom dnevnoj sobi, ukupne građevinske površine 65m² i korisne površine 60m², smešten na 4. spratu u zgradi koja ima ukupno 4 sprata.',
  'If you are looking for an apartment in a location that combines comfort, excellent connectivity, and all the amenities needed for modern living, this is the right opportunity for you. We offer a double-oriented, two-bedroom apartment with an attached terrace to the living room, with a total construction area of 65m² and usable area of 60m², located on the 4th floor in a building with a total of 4 floors.',
  'Если вы ищете квартиру в месте, которое сочетает в себе комфорт, отличную транспортную доступность и все удобства, необходимые для современной жизни, это правильная возможность для вас. Мы предлагаем двухстороннюю двухкомнатную квартиру с пристроенной террасой к гостиной, общей строительной площадью 65м² и полезной площадью 60м², расположенную на 4-м этаже здания с общим количеством 4 этажей.',
  'Modern yaşam için gereken konfor, mükemmel bağlantı ve tüm olanakları bir araya getiren bir konumda daire arıyorsanız, bu sizin için doğru fırsattır. Toplam inşaat alanı 65m² ve kullanılabilir alanı 60m² olan, 4 katlı bir binanın 4. katında bulunan, oturma odasına bitişik teraslı, iki yönlü, iki yatak odalı bir daire sunuyoruz.',
  ARRAY[
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
  true,
  '4/4',
  'Centralno',
  'Javni parking ispred zgrade',
  '2008',
  'Dvostrano orijentisan',
  'Sa ili bez nameštaja (po dogovoru)',
  '350m'
);

-- GOTOVO! Kliknite RUN dugme.
