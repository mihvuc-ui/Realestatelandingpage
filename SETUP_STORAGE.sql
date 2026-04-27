-- SUPABASE STORAGE SETUP ZA SLIKE STANOVA
-- Pokrenite ovo u Supabase SQL Editor

-- 1. Kreiranje Storage Bucket-a
INSERT INTO storage.buckets (id, name, public)
VALUES ('apartment-images', 'apartment-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Politike - Svi mogu da čitaju, svi mogu da upload-uju
CREATE POLICY IF NOT EXISTS "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'apartment-images');

CREATE POLICY IF NOT EXISTS "Public upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'apartment-images');

CREATE POLICY IF NOT EXISTS "Public update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'apartment-images');

CREATE POLICY IF NOT EXISTS "Public delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'apartment-images');
