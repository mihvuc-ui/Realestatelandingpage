# Google Search Console - Setup Guide

## 🎯 Korak 1: Verifikacija Sajta

Sajt je već verifikovan putem HTML fajla:
- ✅ Fajl: `public/google127f4562652b22dd.html`
- ✅ Meta tag takođe dodat u SEO komponenti

## 📊 Korak 2: Submit Sitemap

1. Idi na [Google Search Console](https://search.google.com/search-console)
2. Izaberi property: `stepeniknekretnine.com`
3. U levom meniju klikni **Sitemaps**
4. U polje "Add a new sitemap" unesi: `sitemap.xml`
5. Klikni **Submit**

**NAPOMENA**: Kada dodaješ nove oglase, regeneriši sitemap:
```bash
node --import tsx scripts/generate-sitemap.ts
```

## 🔍 Korak 3: Request Indexing za Važne Stranice

Odmah zatraži indeksiranje za ključne stranice:

1. U Google Search Console, idi na **URL Inspection**
2. Unesi sledeće URL-ove jedan po jedan i klikni "Request Indexing":
   - `https://stepeniknekretnine.com/`
   - `https://stepeniknekretnine.com/browse`
   - `https://stepeniknekretnine.com/kupujem`
   - `https://stepeniknekretnine.com/prodajem`
   - Sve oglase: `https://stepeniknekretnine.com/listing/[ID]`

## 📈 Korak 4: Praćenje Performance

Posle 7-14 dana, proveri:

### Performance Report
- Klikni **Performance** u levom meniju
- Prati:
  - **Total Clicks**: Koliko ljudi klikne na tvoj sajt sa Google-a
  - **Total Impressions**: Koliko puta se tvoj sajt pojavljuje u rezultatima
  - **Average CTR**: Click-through rate (trebalo bi da bude >2%)
  - **Average Position**: Prosečna pozicija u rezultatima (cilj: <10)

### Top Queries (Ključne Reči)
Proveri za koje ključne reči sajt rangira:
- Očekivane: "nekretnine beograd", "agencija stepenik", "prodaja stanova"
- Optimizuj stranice za top performere

### Coverage Report
- Proveri da li ima grešaka u indeksiranju
- Sve stranice bi trebalo da budu "Valid"

## 🛠️ Korak 5: Fiksiranje Uobičajenih Problema

### Ako stranice nisu indeksirane:
1. Proveri `robots.txt` - mora dozvoljavati pristup
2. Proveri sitemap.xml - mora biti dostupan
3. Request indexing ponovo

### Ako ima duplicate content:
- Canonical URLs su već postavljeni u SEO komponenti
- Google će automatski odabrati canonical verziju

### Ako ima mobile usability issues:
- Sajt je već mobile-responsive
- Ako Google prijavljuje probleme, proveri konkretnu stranicu

## 🎯 Target Keywords - Šta Pratiti

### Mesec 1
- **agencija stepenik** - Cilj: Top 3
- **stepenik nekretnine** - Cilj: Top 3
- **nekretnine stepenik beograd** - Cilj: Top 5

### Mesec 2-3
- **nekretnine beograd** - Cilj: Top 20
- **prodaja stanova beograd** - Cilj: Top 20
- **stanovi na prodaju beograd** - Cilj: Top 30

### Mesec 4-6
- **nekretnine** - Cilj: Top 50
- **stanovi beograd** - Cilj: Top 30
- **agencija za nekretnine beograd** - Cilj: Top 10

## 📧 Email Alerts

Podesi email obaveštenja:
1. U Google Search Console, idi na **Settings**
2. Scroll do **Email notifications**
3. Omogući:
   - ✅ Search Console messages
   - ✅ Manual actions (penalties)
   - ✅ Indexing coverage issues

## 🚀 Advanced Tips

### 1. Internal Linking
- Dodaj linkove između povezanih oglasa
- Link ka relevantnim stranicama iz blog postova (ako dodaš blog)

### 2. Fresh Content
- Redovno dodaj nove oglase (Google voli fresh content)
- Ažuriraj postojeće oglase sa novim informacijama

### 3. Page Speed
- Kompresobuj slike
- Enable caching
- Minimizuj CSS/JS

### 4. Structured Data
- Već implementiran Schema.org markup
- Google će pokazivati rich results (zvezdice, cene, slike)

## 📊 Weekly Checklist

**Svake nedelje proveri:**
- [ ] Organic traffic trend (raste li?)
- [ ] Top 10 keywords - da li se pozicije poboljšavaju?
- [ ] Coverage errors - da li ima novih grešaka?
- [ ] Mobile usability - da li ima novih problema?
- [ ] Core Web Vitals - da li su sve stranice "Good"?

**Svaki mesec:**
- [ ] Submit novi sitemap (ako si dodao nove oglase)
- [ ] Proveri backlinks (ko linkuje ka tebi?)
- [ ] Uporedi sa prethodnim mesecom

## 🎉 Expected Timeline

- **Dan 1-7**: Google indeksira sajt
- **Dan 7-14**: Prva pojava u rezultatima za branded searches ("agencija stepenik")
- **Dan 14-30**: Pojava za niche keywords ("nekretnine zvezdara")
- **Dan 30-90**: Poboljšanje pozicija za competitive keywords ("nekretnine beograd")
- **Dan 90+**: Top 10-20 za main keywords

---

**VAŽNO**: SEO je maraton, ne sprint. Budite strpljivi i fokusirajte se na quality content i user experience.
