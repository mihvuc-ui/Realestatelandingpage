# Supabase Quick Start - 5 Minuta Setup 🚀

## Trenutni Status

✅ **Supabase je povezan preko Figma Make!**

Vaš sajt je spreman za korišćenje Supabase baze podataka. Sada možete:
- Dodavati oglase direktno kroz Admin Panel
- Upravljati svim oglasima bez developera
- Imati real-time ažuriranje sajta

---

## 🎯 Šta Dalje?

### Opcija 1: Koristite Figma Make (Preporučeno - 0 min setup)

**Vaš projekat je već povezan sa Supabase kroz Figma Make!**

1. **Kreirajte bazu podataka:**
   - Idite na vaš Supabase projekat: https://app.supabase.com
   - Idite na **SQL Editor**
   - Kopirajte sadržaj fajla `supabase/migrations/001_create_apartments.sql`
   - Nalepite u SQL Editor i kliknite **Run** (Ctrl+Enter)

2. **Dodajte oglase:**
   - Otvorite sajt
   - Kliknite na ⚙️ (Settings) ikonu u header-u
   - Kliknite "Dodaj Novi Oglas"
   - Popunite formu i submit!

### Opcija 2: Lokalni Development (Za testiranje lokalno)

1. **Dobijte Supabase kredencijale:**
   - https://app.supabase.com → Vaš projekat
   - **Settings** → **API**
   - Kopirajte **Project URL** i **anon public key**

2. **Popunite `.env` fajl:**
   ```bash
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```

3. **Migrirajte postojeće oglase (opciono):**
   ```bash
   pnpm migrate-apartments
   ```

---

## 📱 Kako da Dodajem Oglase?

### Metod 1: Admin Panel (GUI)

1. Klik na ⚙️ ikonu u navigation bar-u
2. "Dodaj Novi Oglas"
3. Popunite sva polja:
   - Osnovni podaci (naziv, lokacija, cena, tip)
   - Karakteristike (kvadratura, broj soba, kupatila)
   - Dodatne info (sprat, grejanje, parking, itd.)
   - Opisi na 4 jezika (SR, EN, RU, TR)
   - Imgur linkove slika (jedan po liniji)

### Metod 2: SQL Insert (Napredni korisnici)

```sql
INSERT INTO apartments (
  name, location, price, type, square_meters, 
  bedrooms, bathrooms,
  description_sr, description_en, description_ru, description_tr,
  images, featured
) VALUES (
  'Stan na Zelenom brdu',
  'Zeleno brdo - Ilindenska',
  365000,
  'sale',
  97,
  2,
  2,
  'Opis na srpskom...',
  'Description in English...',
  'Описание на русском...',
  'Türkçe açıklama...',
  ARRAY[
    'https://i.imgur.com/abc123.jpg',
    'https://i.imgur.com/def456.jpg'
  ],
  true
);
```

---

## 🖼️ Dodavanje Slika

### Trenutno: Imgur Linkovi

Admin panel prihvata Imgur URL-ove (jedan po liniji):
```
https://i.imgur.com/abc123.jpg
https://i.imgur.com/def456.jpg
https://i.imgur.com/ghi789.jpg
```

**Kako da dobijete direktne linkove:**
1. Otvorite vaš Imgur album
2. Za svaku sliku: Desni klik → **"Copy image address"**
3. Nalepite svaki link u novu liniju u Admin Panel-u

### Budućnost: Supabase Storage (Coming Soon)

- Direct upload iz Admin Panel-a
- Automatska optimizacija slika
- Različite veličine za mobile/desktop
- CDN delivery

---

## 🔧 Troubleshooting

### "Invalid API key" greška
- Proverite da li ste ispravno kopirali `VITE_SUPABASE_ANON_KEY`
- Bez dodatnih razmaka u `.env` fajlu
- Restartujte dev server nakon izmene `.env`

### "relation 'apartments' does not exist"
- SQL skripta nije izvršena u Supabase
- Pokrenite SQL iz `supabase/migrations/001_create_apartments.sql`

### Oglasi se ne pojavljuju
- Otvorite Browser Console (F12)
- Proverite greške
- Proverite da li imate oglase u Supabase (SQL Editor → `SELECT * FROM apartments;`)

### Admin Panel ne radi
- Proverite da li su environment varijable podešene
- Proverite Supabase connection u konzoli

---

## 📚 Dodatni Resursi

- **Detaljno uputstvo**: `SUPABASE_SETUP.md`
- **SQL migracija**: `supabase/migrations/001_create_apartments.sql`
- **Migration script**: `scripts/migrate-apartments.ts`
- **Supabase Docs**: https://supabase.com/docs

---

## 🎉 Sledeći Koraci

1. ✅ Povežite Supabase (Već urađeno!)
2. ⏳ Pokrenite SQL migraciju
3. ⏳ Dodajte prvi oglas kroz Admin Panel
4. 🚀 Uživajte u samostalnom upravljanju oglasima!

**Pitanja?** Pogledajte `SUPABASE_SETUP.md` za detaljnije uputstvo.
