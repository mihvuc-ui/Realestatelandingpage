-- ═══════════════════════════════════════════════════════════════
-- SUPABASE SETUP - KOMPLETNA KONFIGURACIJA
-- ═══════════════════════════════════════════════════════════════
--
-- UPUTSTVO:
-- 1. Idite na: https://app.supabase.com/project/saoxrazxkagpolfkszek
-- 2. Kliknite "SQL Editor" (leva strana)
-- 3. Kliknite "+ New query"
-- 4. KOPIRAJTE CEO ovaj fajl (Ctrl+A, Ctrl+C)
-- 5. NALEPITE u SQL Editor (Ctrl+V)
-- 6. Kliknite "RUN" dugme (ili Ctrl+Enter)
-- 7. Trebalo bi da vidite: "Success"
--
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ KREIRANJE TABELA
-- ═══════════════════════════════════════════════════════════════

-- Tabela za stanove/apartmane
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

-- Tabela za kontakt forme
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  apartment_id UUID REFERENCES apartments(id) ON DELETE SET NULL
);

-- 2️⃣ INDEKSI ZA PERFORMANSE
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_apartments_type ON apartments(type);
CREATE INDEX IF NOT EXISTS idx_apartments_price ON apartments(price);
CREATE INDEX IF NOT EXISTS idx_apartments_featured ON apartments(featured);
CREATE INDEX IF NOT EXISTS idx_contact_apartment ON contact_submissions(apartment_id);

-- 3️⃣ ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Politike za apartments tabelu
DROP POLICY IF EXISTS "apartments_select_policy" ON apartments;
CREATE POLICY "apartments_select_policy"
  ON apartments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "apartments_insert_policy" ON apartments;
CREATE POLICY "apartments_insert_policy"
  ON apartments FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "apartments_update_policy" ON apartments;
CREATE POLICY "apartments_update_policy"
  ON apartments FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "apartments_delete_policy" ON apartments;
CREATE POLICY "apartments_delete_policy"
  ON apartments FOR DELETE
  USING (true);

-- Politike za contact_submissions tabelu
DROP POLICY IF EXISTS "contact_insert_policy" ON contact_submissions;
CREATE POLICY "contact_insert_policy"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "contact_select_policy" ON contact_submissions;
CREATE POLICY "contact_select_policy"
  ON contact_submissions FOR SELECT
  USING (true);

-- 4️⃣ DODAVANJE PRVOG OGLASA (Nehruova stan)
-- ═══════════════════════════════════════════════════════════════

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
  'Ako tražite stan na lokaciji koja spaja udobnost, odličnu povezanost i sve sadržaje potrebne za savremen život, ovo je prava prilika za vas. U ponudi je dvostrano orijentisan, dvosoban stan sa pripojenom terasom dnevnoj sobi, ukupne građevinske površine 65m² i korisne površine 60m², smešten na 4. spratu u zgradi koja ima ukupno 4 sprata.

Stan je renoviran 2008. godine, kada su urađene sve ključne stvari – postavljena je aluminijumska stolarija koja obezbeđuje dobru izolaciju, ugrađen je kvalitetan jasenov parket, renovirano kupatilo sa potpuno zamenjenim cevima, urađene su nove elektro instalacije, a ugrađeni su i novi radijatori.

Zgrada je bez lifta, ali su stepenice planirane sa dužim odmorištima, čineći uspon i silazak znatno lakšim i prijatnijim.

Grejanje je centralno, a u neposrednoj blizini zgrade nalazi se javni parking, što dodatno olakšava svakodnevni život.

Stan se može kupiti sa ili bez nameštaja, u dogovoru sa vlasnikom, što ostavlja budućem kupcu fleksibilnost da prostor prilagodi sopstvenim potrebama i ukusu.

Posebna vrednost ovog stana je njegova lokacija – Savski kej i šetalište uz reku udaljeni su samo 350m pešaka, pružajući prostor za rekreaciju, vožnju bicikla i opuštajuće šetnje. U okruženju su i brojne gradske atrakcije, kao i kafići i restorani. Infrastruktura je razvijena do maksimuma: na dohvat ruke su škole, vrtići, dom zdravlja, veliki supermarketi i shopping centri, a javni prevoz vas povezuje sa svim delovima Beograda brzo i jednostavno.

Dvostrana orijentacija stana omogućava obilje prirodne svetlosti tokom celog dana, kao i bolju cirkulaciju vazduha, što prostor čini prijatnijim i funkcionalnijim za svakodnevni život.',

  'If you are looking for an apartment in a location that combines comfort, excellent connectivity, and all the amenities needed for modern living, this is the right opportunity for you. We offer a double-oriented, two-bedroom apartment with an attached terrace to the living room, with a total construction area of 65m² and usable area of 60m², located on the 4th floor in a building with a total of 4 floors.

The apartment was renovated in 2008, when all the key things were done - aluminum joinery was installed providing good insulation, quality ash parquet was installed, the bathroom was renovated with completely replaced pipes, new electrical installations were done, and new radiators were installed.

The building has no elevator, but the stairs are designed with longer landings, making the ascent and descent much easier and more pleasant.

The heating is central, and in the immediate vicinity of the building there is public parking, which further facilitates everyday life.

The apartment can be purchased with or without furniture, in agreement with the owner, which gives the future buyer the flexibility to adapt the space to their own needs and taste.

The special value of this apartment is its location - Savski kej and the promenade along the river are only 350m away on foot, providing space for recreation, cycling and relaxing walks. In the surroundings there are numerous city attractions, as well as cafes and restaurants. The infrastructure is developed to the maximum: schools, kindergartens, health centers, large supermarkets and shopping centers are within reach, and public transport connects you with all parts of Belgrade quickly and easily.

The double orientation of the apartment allows plenty of natural light throughout the day, as well as better air circulation, which makes the space more pleasant and functional for everyday life.',

  'Если вы ищете квартиру в месте, которое сочетает в себе комфорт, отличную транспортную доступность и все удобства, необходимые для современной жизни, это правильная возможность для вас. Мы предлагаем двухстороннюю двухкомнатную квартиру с пристроенной террасой к гостиной, общей строительной площадью 65м² и полезной площадью 60м², расположенную на 4-м этаже здания с общим количеством 4 этажей.

Квартира была отремонтирована в 2008 году, когда были сделаны все ключевые вещи - установлены алюминиевые окна, обеспечивающие хорошую изоляцию, уложен качественный паркет из ясеня, отремонтирована ванная комната с полностью замененными трубами, сделаны новые электрические установки и установлены новые радиаторы.

В здании нет лифта, но лестницы спроектированы с более длинными площадками, что делает подъем и спуск намного легче и приятнее.

Отопление центральное, а в непосредственной близости от здания есть общественная парковка, что дополнительно облегчает повседневную жизнь.

Квартира может быть приобретена с мебелью или без нее, по договоренности с владельцем, что дает будущему покупателю гибкость адаптировать пространство к своим собственным потребностям и вкусу.

Особая ценность этой квартиры - ее расположение - Савский кей и набережная вдоль реки находятся всего в 350 м пешком, предоставляя место для отдыха, велосипедных прогулок и расслабляющих прогулок. В окрестностях находятся многочисленные городские достопримечательности, а также кафе и рестораны. Инфраструктура развита по максимуму: школы, детские сады, медицинские центры, крупные супермаркеты и торговые центры находятся в пределах досягаемости, а общественный транспорт соединяет вас со всеми частями Белграда быстро и легко.

Двухсторонняя ориентация квартиры обеспечивает много естественного света в течение дня, а также лучшую циркуляцию воздуха, что делает пространство более приятным и функциональным для повседневной жизни.',

  'Modern yaşam için gereken konfor, mükemmel bağlantı ve tüm olanakları bir araya getiren bir konumda daire arıyorsanız, bu sizin için doğru fırsattır. Toplam inşaat alanı 65m² ve kullanılabilir alanı 60m² olan, 4 katlı bir binanın 4. katında bulunan, oturma odasına bitişik teraslı, iki yönlü, iki yatak odalı bir daire sunuyoruz.

Daire 2008 yılında yenilenmiş, tüm önemli işler yapılmış - iyi yalıtım sağlayan alüminyum doğramalar takılmış, kaliteli dişbudak parke döşenmiş, tamamen değiştirilmiş borularla banyo yenilenmiş, yeni elektrik tesisatları yapılmış ve yeni radyatörler takılmıştır.

Binada asansör yok, ancak merdivenler daha uzun sahanlıklarla tasarlanmış, bu da inişi ve çıkışı çok daha kolay ve hoş hale getiriyor.

Isıtma merkezi, binanın yakınında halka açık otopark var, bu da günlük yaşamı daha da kolaylaştırıyor.

Daire, mal sahibi ile anlaşmaya bağlı olarak mobilyalı veya mobilyasız satın alınabilir, bu da gelecekteki alıcıya alanı kendi ihtiyaçlarına ve zevkine göre uyarlama esnekliği sağlar.

Bu dairenin özel değeri konumudur - Savski kej ve nehir boyunca yürüyüş yolu sadece 350m uzakta, rekreasyon, bisiklet sürme ve rahatlatıcı yürüyüşler için alan sağlıyor. Çevrede çok sayıda şehir cazibesi, kafeler ve restoranlar var. Altyapı maksimuma geliştirilmiş: okullar, anaokulları, sağlık merkezleri, büyük süpermarketler ve alışveriş merkezleri erişilebilir mesafede ve toplu taşıma sizi Belgrat''ın tüm bölümlerine hızlı ve kolay bir şekilde bağlar.

Dairenin iki yönlü oryantasyonu gün boyunca bol doğal ışık sağlar, ayrıca daha iyi hava sirkülasyonu sağlar, bu da alanı günlük yaşam için daha hoş ve işlevsel hale getirir.',

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

-- ═══════════════════════════════════════════════════════════════
-- ✅ GOTOVO!
-- ═══════════════════════════════════════════════════════════════
--
-- Ako vidite "Success" - sve je OK!
--
-- SLEDEĆI KORAK:
-- 1. Refreshujte Admin Panel na vašem sajtu (⚙️ ikona)
-- 2. Trebalo bi da vidite "Dvosoban stan - Nehruova" oglas
-- 3. Sada možete dodavati nove oglase kroz Admin Panel!
--
-- ═══════════════════════════════════════════════════════════════
