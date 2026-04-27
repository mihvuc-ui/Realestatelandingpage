# Nekretnine Stepenik - Supabase Integracija ✅

## 🎯 Šta je Urađeno?

Vaša web stranica sada ima **kompletnu Supabase integraciju** za profesionalno upravljanje oglasima nekretnina!

### ✅ Implementovano

1. **Supabase Struktura**
   - `utils/supabase/client.ts` - Klijent za povezivanje
   - `utils/supabase/types.ts` - TypeScript tipovi
   - `supabase/migrations/001_create_apartments.sql` - Database schema

2. **Admin Panel** (`src/components/admin/ApartmentManager.tsx`)
   - ✅ Dodavanje novih oglasa
   - ✅ Editovanje postojećih oglasa
   - ✅ Brisanje oglasa
   - ✅ Multi-jezik podrška (SR/EN/RU/TR)
   - ✅ Upload slika preko URL-ova
   - ✅ Featured toggle
   - ✅ Sve karakteristike nekretnina

3. **Auto-Loading Hook** (`src/hooks/useApartments.ts`)
   - Automatski učitava iz Supabase ako je konfigurisan
   - Fallback na statičke podatke ako Supabase nije dostupan
   - Integrisano u sve stranice

4. **Database Tabele**
   - `apartments` - Svi podaci o stanovima
   - `contact_submissions` - Upiti sa kontakt forme
   - Row Level Security (RLS) politike
   - Performance indeksi

5. **Migration Script** (`scripts/migrate-apartments.ts`)
   - Automatski prenosi postojeće oglase u Supabase
   - Komanda: `pnpm migrate-apartments`

6. **Dokumentacija**
   - `SUPABASE_QUICKSTART.md` - Brzi start (5 minuta)
   - `SUPABASE_SETUP.md` - Detaljno uputstvo
   - `.env.example` - Environment template

---

## 🚀 Quick Start (2 Koraka)

### 1. Kreirajte Database Tabele

```bash
# U Supabase SQL Editor:
# Kopirajte i pokrenite supabase/migrations/001_create_apartments.sql
```

### 2. Dodajte Oglase

**Opcija A: Admin Panel (Preporučeno)**
- Klik na ⚙️ ikonu u header-u
- "Dodaj Novi Oglas"
- Popunite formu i submit

**Opcija B: Migrirajte Postojeće**
```bash
# Konfiguriši .env sa credentials
pnpm migrate-apartments
```

---

## 📁 Struktura Fajlova

```
├── supabase/
│   └── migrations/
│       └── 001_create_apartments.sql     # Database schema
├── utils/supabase/
│   ├── client.ts                         # Supabase client
│   └── types.ts                          # Database types
├── src/
│   ├── components/admin/
│   │   └── ApartmentManager.tsx          # Admin Panel
│   ├── hooks/
│   │   └── useApartments.ts              # Data loading hook
│   └── data/
│       └── apartments.ts                 # Fallback static data
├── scripts/
│   └── migrate-apartments.ts             # Migration script
├── .env.example                          # Environment template
├── SUPABASE_QUICKSTART.md                # Quick start guide
└── SUPABASE_SETUP.md                     # Detailed setup
```

---

## 🎨 Admin Panel Features

### Dodavanje Oglasa
- Svi osnovni podaci (naziv, lokacija, cena, tip)
- Karakteristike (kvadratura, sobe, kupatila)
- Dodatne info (sprat, grejanje, parking, renovacija)
- Multi-jezik opisi (4 jezika)
- Imgur slike (copy-paste URL-ovi)
- Featured toggle

### Editovanje
- Real-time izmene
- Svi podaci editabilni
- Preview thumbnails

### Brisanje
- Potvrda pre brisanja
- Instant uklanjanje sa sajta

---

## 🌐 Environment Variables

```env
# .env fajl
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Dobijanje kredencijala:**
1. https://app.supabase.com → Vaš projekat
2. Settings → API
3. Kopirajte Project URL i anon key

---

## 📊 Database Schema

### apartments tabela
```sql
- id (uuid)
- created_at (timestamp)
- name (text)
- location (text)
- price (numeric)
- type (sale/rent)
- square_meters (numeric)
- bedrooms (int)
- bathrooms (int)
- description_sr/en/ru/tr (text)
- images (text[])
- featured (boolean)
- floor, heating, parking, etc. (text)
```

### contact_submissions tabela
```sql
- id (uuid)
- created_at (timestamp)
- name, email, phone (text)
- message (text)
- apartment_id (uuid, optional)
```

---

## 🔒 Security (RLS Policies)

- ✅ Svi mogu da **čitaju** oglase (public)
- ✅ Svi mogu da **šalju** kontakt forme
- ⚠️ Trenutno svi mogu da **edituju** oglase (Admin)

**Za produkciju**, trebate dodati Supabase Auth:
```sql
ALTER POLICY "Admins can do everything"
ON apartments
USING (auth.uid() IS NOT NULL);
```

---

## 🎯 Prednosti Supabase Pristupa

| Bez Supabase | Sa Supabase |
|--------------|-------------|
| Šaljete podatke developeru | Dodajete sami kroz Admin Panel |
| Čekate deploy | Instant live update |
| Statički podaci | Real-time database |
| Imgur hosting | Profesionalni storage |
| Bez backup-a | Automatski backup |
| Bez analytics | Tracking i statistika |

---

## 📱 Kako Dodati Oglas?

### Primer: Stan na Zelenom brdu

1. **Klik na ⚙️ → "Dodaj Novi Oglas"**

2. **Popunite formu:**
   ```
   Naziv: Premium stan na Zelenom brdu - Ilindenska
   Lokacija: Zeleno brdo - Ilindenska ulica
   Cena: 365000
   Tip: Prodaja
   Kvadratura: 97 (70 + 27 terasa)
   Sobe: 2
   Kupatila: 2
   Sprat: 3/5
   ... itd
   ```

3. **Slike (Imgur linkovi):**
   ```
   https://i.imgur.com/abc123.jpg
   https://i.imgur.com/def456.jpg
   https://i.imgur.com/ghi789.jpg
   ```

4. **Klik "Dodaj Oglas"** → Instant live! 🚀

---

## 🆘 Troubleshooting

### Oglasi se ne učitavaju?
1. Check browser console (F12)
2. Proverite `.env` credentials
3. Restartujte dev server

### SQL greška?
- Pokrenite migration: `supabase/migrations/001_create_apartments.sql`
- U Supabase SQL Editor

### Admin Panel ne radi?
- Environment varijable nisu podešene
- Supabase connection problem (check console)

---

## 📚 Dokumentacija

- **Quick Start**: `SUPABASE_QUICKSTART.md` (5 min setup)
- **Detaljno**: `SUPABASE_SETUP.md` (full guide)
- **Migration**: `scripts/migrate-apartments.ts`
- **Supabase Docs**: https://supabase.com/docs

---

## 🎉 Status

✅ **Supabase Connected!**  
✅ **Admin Panel Ready!**  
⏳ **Database Setup Needed** (run SQL migration)  
⏳ **Add First Listing**  

**Next:** Otvorite `SUPABASE_QUICKSTART.md` za sledeće korake!

---

**Made with ❤️ for Nekretnine Stepenik**
