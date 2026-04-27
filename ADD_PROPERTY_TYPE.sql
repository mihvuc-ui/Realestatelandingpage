-- DODAVANJE POLJA ZA VRSTU NEKRETNINE
-- Pokrenite ovo u Supabase SQL Editor

-- 1. Dodaj novo polje property_type u tabelu apartments
ALTER TABLE apartments
ADD COLUMN property_type TEXT DEFAULT 'apartment';

-- 2. Ažuriraj postojeće oglase
-- Stan na Vračaru
UPDATE apartments
SET property_type = 'apartment'
WHERE name LIKE '%Dvosoban stan%';

-- Plac na Avali
UPDATE apartments
SET property_type = 'land'
WHERE name LIKE '%Plac%';

-- 3. Proveri rezultate
SELECT id, name, type, property_type FROM apartments;
