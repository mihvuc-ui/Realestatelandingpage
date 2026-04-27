# 🚀 SEO Optimizacija - Kompletna Dokumentacija

## ✅ Implementovane Optimizacije

Sajt **Nekretnine Stepenik** je sada u potpunosti SEO optimizovan za Google i druge search engines.

---

## 📋 Brzi Pregled

### ✅ Tehničke Optimizacije
- [x] Meta tagovi (title, description, keywords)
- [x] Open Graph tagovi za društvene mreže
- [x] Twitter Card tagovi
- [x] Canonical URLs
- [x] Robots.txt
- [x] Sitemap.xml (dinamički)
- [x] Structured Data (Schema.org JSON-LD)
- [x] Alt text na slikama
- [x] Mobile-responsive
- [x] Fast loading times
- [x] Semantic HTML (H1, H2, H3)

### ✅ Schema Markup (Rich Results)
- [x] RealEstateAgent
- [x] LocalBusiness
- [x] WebSite (with SearchAction)
- [x] Apartment (za svaki oglas)
- [x] ItemList (lista oglasa)
- [x] BreadcrumbList
- [x] FAQPage
- [x] Organization

---

## 🎯 Target Ključne Reči

### Primarne (Branded)
- ✅ **agencija stepenik**
- ✅ **stepenik nekretnine**
- ✅ **nekretnine stepenik beograd**

### Sekundarne (Local)
- ✅ **nekretnine beograd**
- ✅ **prodaja stanova beograd**
- ✅ **stanovi na prodaju**
- ✅ **nekretnine zvezdara**
- ✅ **nekretnine vračar**
- ✅ **nekretnine grocka**

### Terciarne (Competitive)
- ✅ **nekretnine**
- ✅ **stanovi beograd**
- ✅ **agencija za nekretnine**
- ✅ **kupovina stana**
- ✅ **izdavanje stanova**

---

## 📁 Fajlovi i Lokacije

### SEO Komponente
```
src/app/components/
├── SEO.tsx                  # Glavna SEO komponenta
├── SchemaMarkup.tsx         # Structured data komponente
└── Breadcrumbs.tsx          # Navigacija

src/app/pages/
├── Home.tsx                 # SEO: Homepage
├── BrowseListings.tsx       # SEO: Listing page
├── ListingDetail.tsx        # SEO: Property details
├── Kupujem.tsx              # SEO: Buying guide
├── Prodajem.tsx             # SEO: Selling guide
└── About.tsx                # SEO: About page
```

### Public Fajlovi
```
public/
├── robots.txt               # Search engine directives
├── sitemap.xml              # Auto-generated sitemap
└── google127...html         # Google verification
```

### Scripts
```
scripts/
├── generate-sitemap.ts      # Sitemap generator
└── migrate-apartments.ts    # Database scripts
```

---

## 🛠️ Kako Koristiti

### 1. Dodavanje Novog Oglasa

Kada dodaješ novi oglas, **obavezno regeneriši sitemap**:

```bash
# Metod 1: Preko npm script-a
pnpm run seo

# Metod 2: Direktno
node --import tsx scripts/generate-sitemap.ts
```

To će:
- ✅ Kreirati nove URL-ove u sitemap.xml
- ✅ Dodati slike oglasa u image sitemap
- ✅ Ažurirati lastmod datume
- ✅ Obavestiti Google da ima novih stranica

### 2. Submit na Google Search Console

Posle regenerisanja sitemapa:

1. Idi na [Google Search Console](https://search.google.com/search-console)
2. Klikni **Sitemaps** u levom meniju
3. Unesi `sitemap.xml`
4. Klikni **Submit**

### 3. Request Indexing za Novi Oglas

Za brže indeksiranje:

1. U Google Search Console, klikni **URL Inspection**
2. Unesi URL novog oglasa: `https://stepeniknekretnine.com/listing/[ID]`
3. Klikni **Request Indexing**

Google će obično indeksirati stranicu za 1-3 dana.

---

## 📊 Praćenje Performance

### Google Search Console

**Nedeljno proveri:**
- Total Clicks (broj klikova sa Google-a)
- Total Impressions (broj puta kada se sajt pojavljuje)
- Average CTR (Click-through rate - cilj: >2%)
- Average Position (pozicija u rezultatima - cilj: <10)

**Mesečno proveri:**
- Top performing queries (najbolje ključne reči)
- Pages with most impressions
- Coverage issues (greške u indeksiranju)

### Google Analytics

Prati:
- Organic traffic trend
- Bounce rate (cilj: <60%)
- Average session duration (cilj: >2 min)
- Pages per session (cilj: >2)
- Goal completions (kontakt forma, telefon)

---

## 🎯 Očekivani Rezultati

### Nedelja 1-2
- ✅ Google indeksira sve stranice
- ✅ Pojava za branded searches ("agencija stepenik")
- Impressions: 50-100/dan
- Clicks: 5-10/dan

### Mesec 1
- ✅ Pojava za local searches ("nekretnine zvezdara")
- Impressions: 200-500/dan
- Clicks: 20-50/dan
- Pozicija za "stepenik nekretnine": Top 3

### Mesec 2-3
- ✅ Pojava za competitive keywords ("nekretnine beograd")
- Impressions: 500-1000/dan
- Clicks: 50-100/dan
- Pozicija za "nekretnine beograd": Top 20-30

### Mesec 4-6
- ✅ Stabilna pozicija za main keywords
- Impressions: 1000-2000/dan
- Clicks: 100-200/dan
- Pozicija za "nekretnine beograd": Top 10-15

---

## 🚀 Quick Wins - Odmah Uradi

### 1. Google My Business (⏱️ 30 min)
- [ ] Kreiraj profil na [Google My Business](https://www.google.com/business/)
- [ ] Dodaj logo, slike, radno vreme
- [ ] Dodaj opis agencije
- [ ] Omogući recenzije

**Impact**: Pojava u Google Maps i local search results

### 2. Submit Sitemap (⏱️ 5 min)
- [ ] Idi na [Google Search Console](https://search.google.com/search-console)
- [ ] Submit `sitemap.xml`
- [ ] Request indexing za homepage

**Impact**: Brže indeksiranje, bolja vidljivost

### 3. Registracija na 4zida.rs (⏱️ 15 min)
- [ ] Registruj agenciju
- [ ] Postavi oglase sa linkovima ka sajtu
- [ ] Dodaj logo i kontakt

**Impact**: Backlinks, dodatni traffic

### 4. Registracija na Cityexpert (⏱️ 15 min)
- [ ] Kreiraj agencijski profil
- [ ] Dodaj oglase
- [ ] Link ka website-u

**Impact**: Backlinks, kredibilitet

### 5. Traži Recenzije (⏱️ ongoing)
- [ ] Pošalji email sa zadovoljnim klijentima
- [ ] Zamoli ih da ostave recenziju na Google-u
- [ ] Nuditi mali popust/benefit za recenziju

**Impact**: Social proof, bolji ranking

---

## 📈 Advanced Optimizacije (Za Budućnost)

### Blog Sekcija
Dodaj blog sa člancima:
- "Kako kupiti stan u Beogradu - Kompletan vodič"
- "Top 10 lokacija za život u Beogradu"
- "Kako prodati stan brzo i po dobroj ceni"
- "Dokumentacija za kupovinu nekretnine"

**SEO benefit**: Fresh content, long-tail keywords, internal linking

### Video Marketing
- Snimaj video tureje nekretnina
- Postavljaj na YouTube sa linkovima
- Embed na sajt

**SEO benefit**: YouTube SEO, backlinks, engagement

### Landing Pages po Lokacijama
Kreiraj separate stranice:
- `/nekretnine-zvezdara`
- `/nekretnine-vracar`
- `/nekretnine-grocka`
- itd.

**SEO benefit**: Target local keywords, better UX

---

## 🔧 Troubleshooting

### Problem: Stranice nisu indeksirane
**Rešenje:**
1. Proveri `robots.txt` - mora dozvoljavati
2. Submit sitemap ponovo
3. Request indexing u Google Search Console
4. Sačekaj 7-14 dana

### Problem: Niska pozicija za "nekretnine beograd"
**Rešenje:**
1. To je normalno - jako kompetitivna ključna reč
2. Fokusiraj se na long-tail: "nekretnine vračar", "stanovi zvezdara"
3. Gradi backlinks
4. Dodaj više content-a (blog)

### Problem: Visok bounce rate
**Rešenje:**
1. Poboljšaj speed (kompresuj slike)
2. Dodaj CTA buttons (kontakt, razgledanje)
3. Internal linking (linkuj ka sličnim oglasima)

### Problem: Nema organskog traffica
**Rešenje:**
1. Proveri da li je sajt indeksiran (site:stepeniknekretnine.com u Google-u)
2. Proveri Google Search Console za greške
3. Sačekaj bar 30 dana za inicijalne rezultate

---

## 📞 Kontakt & Support

Ako imaš pitanja o SEO optimizaciji:
- Email: agencijastepenik@gmail.com
- Telefon: +381 62 671 155

---

## 📚 Dodatni Resursi

### Dokumentacija
- [SEO-OPTIMIZACIJA.md](./SEO-OPTIMIZACIJA.md) - Detaljna lista optimizacija
- [GOOGLE-SEARCH-CONSOLE.md](./GOOGLE-SEARCH-CONSOLE.md) - GSC setup guide

### Google Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Google My Business](https://www.google.com/business/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Learning Resources
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

---

**Poslednje ažuriranje**: April 27, 2026  
**Status**: ✅ Production Ready
