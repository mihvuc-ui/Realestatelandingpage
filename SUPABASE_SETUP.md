# Supabase Setup Vodič - Nekretnine Stepenik

## 📋 Pregled

Ovaj vodič pokazuje kako da povežete vašu web stranicu sa Supabase bazom podataka za profesionalno upravljanje oglasima nekretnina.

## 🚀 Korak 1: Kreiranje Supabase Projekta

1. Posetite [https://app.supabase.com](https://app.supabase.com)
2. Prijavite se ili kreirajte novi nalog (besplatno)
3. Kliknite na "New Project"
4. Popunite podatke:
   - **Name**: `nekretnine-stepenik`
   - **Database Password**: Napravite jak password (čuvajte ga!)
   - **Region**: Izaberite najbližu regiju (npr. `eu-central-1` za Evropu)
5. Kliknite "Create new project" i sačekajte ~2 minuta

## 🔑 Korak 2: Dobijanje API Kredencijala

1. Kada je projekat kreiran, idite na **Settings** (⚙️) → **API**
2. Pronađite sledeće vrednosti:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Dugačak token koji počinje sa `eyJhbG...`
3. Kopirajte obe vrednosti

## 📝 Korak 3: Konfigurisanje Aplikacije

1. U root direktorijumu projekta, kreirajte fajl `.env`:
   ```bash
   cp .env.example .env
   ```

2. Otvorite `.env` i popunite vaše kredencijale:
   ```env
   VITE_SUPABASE_URL=https://vaš-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=vaš-anon-key
   ```

3. **VAŽNO**: Nikada ne komitujte `.env` fajl u git! (već je dodat u `.gitignore`)

## 🗄️ Korak 4: Kreiranje Baze Podataka

1. U Supabase dashboard-u, idite na **SQL Editor** (lijeva strana)
2. Kliknite "New query"
3. Otvorite fajl `supabase/migrations/001_create_apartments.sql` u vašem projektu
4. Kopirajte **ceo sadržaj** SQL fajla
5. Nalepite u SQL Editor i kliknite "Run" (ili Ctrl+Enter)
6. Ako vidite "Success. No rows returned" - sve je OK! ✅

## 📦 Korak 5: Kreiranje Storage Bucket-a (Opciono - za buduće upload slike)

1. Idite na **Storage** (lijeva strana)
2. Kliknite "Create a new bucket"
3. Popunite:
   - **Name**: `apartments`
   - **Public bucket**: ✅ (čekiraj)
4. Kliknite "Create bucket"

## ✅ Korak 6: Testiranje

1. Restartujte development server:
   ```bash
   pnpm run dev
   ```

2. Otvorite browser konzolu (F12) i osvežite stranicu
3. Ako nema error-a vezanih za Supabase - uspešno ste povezani! 🎉

## 🎛️ Korišćenje Admin Panel-a

### Pristup Admin Panel-u

Admin panel možete otvoriti klikom na **Admin dugme** u header-u sajta (samo kada ste ulogovani kao admin).

### Dodavanje Novog Oglasa

1. Kliknite "Dodaj Novi Oglas"
2. Popunite sva obavezna polja:
   - Osnovni podaci (naziv, lokacija, cena, tip, površina, sobe, kupatila)
   - Dodatne karakteristike (sprat, grejanje, parking, itd.)
   - Opise na svim jezicima (srpski, engleski, ruski, turski)
   - URL-ove slika (jedan po liniji)
3. Kliknite "Dodaj Oglas"

### Primer URL-ova Slika

```
https://i.imgur.com/abc123.jpg
https://i.imgur.com/def456.jpg
https://i.imgur.com/ghi789.jpg
```

### Editovanje Oglasa

1. Pronađite oglas u listi
2. Kliknite na **Edit** (✏️) dugme
3. Izmenite željene podatke
4. Kliknite "Sačuvaj Izmene"

### Brisanje Oglasa

1. Kliknite na **Delete** (🗑️) dugme
2. Potvrdite brisanje

## 🔒 Bezbednost

### Row Level Security (RLS)

Naš setup koristi RLS politike:

- ✅ **Svi mogu da čitaju** oglase (javno dostupno)
- ✅ **Svi mogu da šalju** kontakt forme
- ⚠️ **Trenutno svi mogu da dodaju/edituju** oglase (Admin funkcije)

### Dodavanje Admin Autentifikacije (Preporučeno za produkciju)

Za dodatnu bezbednost, trebate da konfigurirate Supabase Auth:

1. Idite na **Authentication** → **Policies**
2. Kreirajte novu politiku za `apartments` tabelu:
   ```sql
   -- Samo autentifikovani korisnici mogu da menjaju oglase
   ALTER POLICY "Admins can do everything with apartments"
   ON apartments
   USING (auth.uid() IS NOT NULL);
   ```

## 📊 Migracija Postojećih Podataka

Ako imate postojeće oglase u `src/data/apartments.ts`, možete ih ručno dodati kroz Admin Panel ili kreirati migration script.

### Ručno Dodavanje

1. Otvorite Admin Panel
2. Za svaki oglas iz `apartments.ts`:
   - Kliknite "Dodaj Novi Oglas"
   - Kopirajte podatke
   - Submit

### Automatska Migracija (Napredni korisnici)

```typescript
// scripts/migrate-to-supabase.ts
import { supabase } from './utils/supabase/client';
import { apartments } from './src/data/apartments';

async function migrateApartments() {
  for (const apt of apartments) {
    const { error } = await supabase.from('apartments').insert({
      name: apt.name,
      location: apt.location,
      price: apt.price,
      type: apt.type,
      square_meters: apt.squareMeters,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      description_sr: apt.descriptions?.sr || apt.description,
      description_en: apt.descriptions?.en || apt.description,
      description_ru: apt.descriptions?.ru || apt.description,
      description_tr: apt.descriptions?.tr || apt.description,
      images: apt.images,
      featured: apt.featured,
      floor: apt.floor,
      heating: apt.heating,
      parking: apt.parking,
      year_renovated: apt.yearRenovated,
      orientation: apt.orientation,
      furnished: apt.furnished,
      distance_to_river: apt.distanceToRiver,
    });

    if (error) {
      console.error(`Error migrating ${apt.name}:`, error);
    } else {
      console.log(`✅ Migrated: ${apt.name}`);
    }
  }
}

migrateApartments();
```

## 🎯 Prednosti Supabase Integracije

✅ **Samostalno upravljanje** - Dodajete oglase bez programera  
✅ **Real-time ažuriranje** - Promene se odmah vide na sajtu  
✅ **Profesionalni storage** - Slike host-ovane na pouzdanoj infrastrukturi  
✅ **Kontakt forme** - Čuvanje upita u bazi  
✅ **Skalabilnost** - Podržava hiljade oglasa  
✅ **Backup** - Automatski backup podataka  
✅ **Analytics** - Praćenje pregleda i statistike  

## 🆘 Troubleshooting

### "Invalid API key" greška
- Proverite da li ste ispravno kopirali `anon key` iz Supabase dashboard-a
- Proverite da nema dodatnih razmaka u `.env` fajlu

### "relation 'apartments' does not exist"
- SQL skripta nije uspešno izvršena
- Ponovo pokrenite SQL iz koraka 4

### Oglasi se ne učitavaju
- Otvorite browser konzolu (F12) i proverite greške
- Restartujte dev server nakon izmene `.env` fajla

### Slow loading
- Supabase free tier ima limite
- Proverite da li je vaša regija blizu Supabase servera

## 📞 Podrška

Za dodatna pitanja:
- Supabase dokumentacija: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)

---

**Happy managing! 🏢✨**
