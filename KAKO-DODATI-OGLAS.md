# 📝 Kako Dodati Novi Oglas

## Bezbednost

**VAŽNO**: Admin panel je uklonjen sa sajta iz bezbednosnih razloga. Svi oglasi se dodaju direktno u bazu putem script-ova.

---

## Korak po Korak

### 1. Upload Slika u Supabase Storage

1. Idi na [Supabase Dashboard](https://supabase.com/dashboard)
2. Izaberi projekat: `saoxrazxkagpolfkszek`
3. U levom meniju klikni **Storage**
4. Izaberi bucket: `apartment-images`
5. Kreiraj novi folder za oglas (npr. `StanVracar`, `ZemljisteAvala`, itd.)
6. Upload sve slike za oglas u taj folder
7. **Imenuj slike numerički**: `1.jpg`, `2.jpg`, `3.jpg`, itd. (tako se automatski sortiraju)

**Podržani formati**: JPG, JPEG, PNG, WebP, GIF
**NIJE podržano**: HEIC (iPhone format - mora se konvertovati u JPEG)

---

### 2. Kreiraj Script za Novi Oglas

Kopiraj jedan od postojećih script-ova kao template:

**Za prodaju:**
```bash
cp scripts/add-kluz-apartment.ts scripts/add-NAZIV-prodaja.ts
```

**Za izdavanje:**
```bash
cp scripts/add-magnolija-izdavanje.ts scripts/add-NAZIV-izdavanje.ts
```

---

### 3. Izmeni Script

Otvori kreirani script i izmeni sledeće:

#### A. Folder sa slikama
```typescript
const { data: files } = await supabase
  .storage
  .from('apartment-images')
  .list('NAZIV_FOLDERA', {  // ← Promeni ovo
    limit: 100,
    offset: 0,
  });
```

#### B. Osnovne informacije
```typescript
const newApartment = {
  name: 'Dvosoban stan - Vračar',
  location: 'Vračar - Centar / Krunska',
  price: 150000,  // Za prodaju u EUR, za izdavanje mesečno u EUR
  type: 'sale',   // 'sale' ili 'rent'
  property_type: 'apartment',  // 'apartment', 'house', 'land', 'commercial'
  square_meters: 65,
  bedrooms: 2,
  bathrooms: 1,
  // ... ostalo
```

#### C. Opisi (4 jezika)
```typescript
const descriptionSr = `Srpski opis...`;
const descriptionEn = `English description...`;
const descriptionRu = `Русское описание...`;
const descriptionTr = `Türkçe açıklama...`;
```

#### D. Dodatni podaci
```typescript
  floor: '3/5',
  heating: 'Centralno grejanje',
  parking: 'Garaža u zgradi',
  year_renovated: '2023',
  orientation: 'Jug',
  furnished: 'Namešten',
  // ...
```

**Za zemljište (land):**
```typescript
  property_type: 'land',
  land_location: 'Avala - Pinosava',
  building_on_land: 'Nema objekta',
  land_type: 'Građevinsko zemljište',
  orientation: null,  // Ne koristi se za zemljište
  furnished: null,    // Ne koristi se za zemljište
```

---

### 4. Pokreni Script

```bash
node --import tsx scripts/add-NAZIV-prodaja.ts
```

Proverava sledeće:
- ✅ Da li folder sa slikama postoji
- ✅ Da li su slike u podržanom formatu
- ✅ Sortira slike numerički
- ✅ Kreira URL-ove za slike
- ✅ Dodaje oglas u bazu
- ✅ Prikazuje ID novog oglasa

---

### 5. Regeneriši Sitemap (Za SEO)

Posle dodavanja novog oglasa, **OBAVEZNO** regeneriši sitemap:

```bash
pnpm run seo
# ili
node --import tsx scripts/generate-sitemap.ts
```

Ovo ažurira `public/sitemap.xml` sa novim oglasom za Google indeksiranje.

---

### 6. Provera

Proveri da li je oglas dodat:

```bash
node --import tsx scripts/check-all-listings.ts
```

Ili direktno na sajtu:
- Prodaja: `/browse`
- Izdavanje: `/rentiranje`

---

## Postojeći Script-ovi

### Dodavanje Oglasa
- `scripts/add-desanke-apartment.ts` - Prodaja stan Vračar
- `scripts/add-kluz-apartment.ts` - Prodaja stan Kluz
- `scripts/add-lestane-apartment.ts` - Prodaja stan Leštane
- `scripts/add-avala-plac.ts` - Prodaja zemljište Avala
- `scripts/add-kluz2-apartment.ts` - Prodaja stan Kluz (drugi)
- `scripts/add-magnolija-izdavanje.ts` - Izdavanje stan Magnolija
- `scripts/add-zelenobrdo-izdavanje.ts` - Izdavanje stan Zeleno Brdo

### Pomoćni Script-ovi
- `scripts/check-all-listings.ts` - Provera svih oglasa
- `scripts/generate-sitemap.ts` - Generisanje sitemap.xml
- `scripts/fix-magnolija-details.ts` - Primer ažuriranja oglasa
- `scripts/set-desanke-first.ts` - Postavljanje redosleda oglasa

---

## Tipovi Nekretnina

### apartment (Stan)
```typescript
property_type: 'apartment',
bedrooms: 2,
bathrooms: 1,
orientation: 'Jug',
furnished: 'Namešten',
```

### house (Kuća)
```typescript
property_type: 'house',
bedrooms: 4,
bathrooms: 2,
orientation: 'Istok',
furnished: 'Delimično namešten',
```

### land (Zemljište)
```typescript
property_type: 'land',
land_location: 'Avala - Pinosava',
building_on_land: 'Nema objekta',
land_type: 'Građevinsko zemljište',
orientation: null,  // Ne koristi se
furnished: null,    // Ne koristi se
bedrooms: 0,        // Ne koristi se
bathrooms: 0,       // Ne koristi se
```

---

## Redosled Oglasa

Oglasi se prikazuju po `created_at` polju (od najnovijeg ka najstarijem).

**Važno**: Zemljišta se UVEK prikazuju na kraju liste.

### Promena Redosleda

Ako želiš da promeniš redosled:

```typescript
// Primer: Postavi Desanke kao prvi oglas
await supabase
  .from('apartments')
  .update({ created_at: new Date().toISOString() })
  .like('name', '%Desanke%');
```

Ili koristi postojeće script-ove:
- `scripts/set-desanke-first.ts`
- `scripts/set-final-order.ts`

---

## Ažuriranje Postojećeg Oglasa

Kreiraj novi script:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

async function updateApartment() {
  const { data, error } = await supabase
    .from('apartments')
    .update({
      price: 160000,  // Nova cena
      // Ostala polja koja želiš da promeniš
    })
    .like('name', '%Naziv Oglasa%')
    .select();

  console.log('✅ Oglas ažuriran:', data);
}

updateApartment().then(() => process.exit(0));
```

---

## Brisanje Oglasa

```typescript
await supabase
  .from('apartments')
  .delete()
  .like('name', '%Naziv Oglasa%');
```

**PAŽNJA**: Brisanje je TRAJNO! Uvek prvo proveri sa:
```bash
node --import tsx scripts/check-all-listings.ts
```

---

## Česte Greške

### 1. "Folder je prazan"
- Proveri da li si upload-ovao slike u Supabase Storage
- Proveri da li je naziv foldera tačan u script-u

### 2. "Format nije podržan"
- HEIC format (iPhone) nije podržan - konvertuj u JPEG
- Podržani: JPG, JPEG, PNG, WebP, GIF

### 3. "Slike nisu sortirane"
- Imenuj slike numerički: `1.jpg`, `2.jpg`, `3.jpg`
- Script automatski sortira numerički

### 4. "Oglas se ne prikazuje"
- Proveri da li je `type` tačno postavljen: `'sale'` ili `'rent'`
- Proveri da li je `property_type` tačno: `'apartment'`, `'house'`, `'land'`
- Refresh stranicu sa Ctrl+F5 (hard refresh)

---

## Supabase Pristupni Podaci

**URL**: `https://saoxrazxkagpolfkszek.supabase.co`  
**Anon Key**: Postoji u svim script-ovima  
**Dashboard**: https://supabase.com/dashboard/project/saoxrazxkagpolfkszek

---

## Quick Reference

```bash
# Dodaj novi oglas
node --import tsx scripts/add-NAZIV.ts

# Proveri sve oglase
node --import tsx scripts/check-all-listings.ts

# Regeneriši sitemap
pnpm run seo

# Proveri slike u folderu
node --import tsx scripts/check-lestane-files.ts  # prilagodi folder
```

---

**Saveti:**
- ✅ Uvek numerički imenuj slike (1.jpg, 2.jpg, 3.jpg...)
- ✅ Konvertuj HEIC → JPEG pre upload-a
- ✅ Regeneriši sitemap posle svakog novog oglasa
- ✅ Proveri oglas na sajtu pre nego što najavljuješ
- ✅ Backup bazu redovno (Supabase automatski čuva backup)

Za pomoć ili probleme: agencijastepenik@gmail.com
