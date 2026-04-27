-- Kreiranje tabele za stanove/apartmane
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

-- Kreiranje tabele za kontakt forme
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  apartment_id UUID REFERENCES apartments(id) ON DELETE SET NULL
);

-- Indeksi za performanse
CREATE INDEX IF NOT EXISTS idx_apartments_type ON apartments(type);
CREATE INDEX IF NOT EXISTS idx_apartments_price ON apartments(price);
CREATE INDEX IF NOT EXISTS idx_apartments_featured ON apartments(featured);
CREATE INDEX IF NOT EXISTS idx_contact_apartment ON contact_submissions(apartment_id);

-- Row Level Security (RLS)
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Politike - svi mogu da čitaju oglase
CREATE POLICY "Apartments are viewable by everyone"
  ON apartments FOR SELECT
  USING (true);

-- Politike - svi mogu da šalju kontakt forme
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin može da sve (ovo ćete kasnije ograničiti sa autentifikacijom)
CREATE POLICY "Admins can do everything with apartments"
  ON apartments FOR ALL
  USING (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (true);
