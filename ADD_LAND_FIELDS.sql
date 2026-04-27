-- DODAVANJE POLJA ZA ZEMLJIŠTE
-- Pokrenite ovo u Supabase SQL Editor

-- 1. Dodaj nova polja
ALTER TABLE apartments
ADD COLUMN land_location TEXT,
ADD COLUMN building_on_land TEXT,
ADD COLUMN land_type TEXT;

-- 2. Ažuriraj plac na Avali
UPDATE apartments
SET
  land_location = 'Avala - Pinosava',
  building_on_land = 'Ne',
  land_type = 'Građevinsko zemljište',
  orientation = NULL
WHERE property_type = 'land';

-- 3. Proveri rezultate
SELECT id, name, land_location, building_on_land, land_type, orientation
FROM apartments
WHERE property_type = 'land';
