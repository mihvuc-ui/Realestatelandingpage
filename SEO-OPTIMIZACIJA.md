# SEO Optimizacija - Nekretnine Stepenik

## ✅ Implementirane SEO Optimizacije

### 1. **Meta Tagovi**
- ✅ Optimizovani title tagovi sa ključnim rečima "nekretnine", "nekretnine beograd", "prodaja stanova"
- ✅ Meta descriptions sa pozivioma na akciju i kontakt brojem
- ✅ Keywords targeting: "nekretnine", "nekretnine beograd", "agencija stepenik", "prodaja stanova"
- ✅ Open Graph tagovi za deljenje na društvenim mrežama
- ✅ Twitter Card meta tagovi
- ✅ Canonical URLs za svaku stranicu

### 2. **Structured Data (Schema.org)**
Implementirani sledećimarkup tipovi:
- ✅ **RealEstateAgent** - Informacije o agenciji
- ✅ **LocalBusiness** - Lokalni biznis podaci
- ✅ **WebSite** - Search box za Google
- ✅ **Apartment** - Pojedinačni oglasi
- ✅ **ItemList** - Lista nekretnina
- ✅ **BreadcrumbList** - Navigaciona putanja
- ✅ **FAQPage** - Često postavljana pitanja
- ✅ **Organization** - Kompanijske informacije

### 3. **Sitemap.xml**
- ✅ Dinamički sitemap sa svim oglasima
- ✅ Image sitemap za sve slike nekretnina
- ✅ Automatsko ažuriranje sa lastmod datumima
- ✅ Prioriteti stranica: Homepage (1.0) > Browse (0.9) > Listings (0.8)

**Kako ažurirati sitemap nakon dodavanja novih oglasa:**
```bash
node --import tsx scripts/generate-sitemap.ts
```

### 4. **robots.txt**
- ✅ Dozvoljeno indeksiranje svih javnih stranica
- ✅ Blokirani admin folderi
- ✅ Crawl-delay za botove
- ✅ Sitemap referenca

### 5. **Ključne Reči - Targeting**

**Primarne ključne reči:**
- nekretnine
- nekretnine beograd
- agencija stepenik
- stepenik nekretnine
- prodaja stanova beograd
- stanovi beograd

**Sekundarne ključne reči:**
- izdavanje stanova
- kupovina stana
- nekretnine zvezdara
- nekretnine vračar
- nekretnine grocka
- nekretnine novi beograd
- real estate belgrade
- apartments for sale belgrade

**Long-tail ključne reči:**
- agencija stepenik beograd
- stepenik nekretnine beograd
- stanovi na prodaju beograd
- kupovina nekretnine beograd
- agencija za nekretnine beograd

### 6. **On-Page SEO**
- ✅ H1 tagovi na svakoj stranici
- ✅ Semantička HTML struktura
- ✅ Alt text na slikama (gde je moguće)
- ✅ Internal linking (navigacija između stranica)
- ✅ Mobile-responsive dizajn
- ✅ Brzo učitavanje stranica

### 7. **Geo-targeting**
- ✅ Meta geo tagovi za Beograd
- ✅ Schema.org GeoCoordinates
- ✅ Lokalne ključne reči u meta tagovima
- ✅ Adresa i geografski podaci u LocalBusiness schema

### 8. **Multi-language Support**
- ✅ Hreflang tagovi za SR, EN, RU, TR
- ✅ Language switcher
- ✅ Locale-specific Open Graph tagovi

---

## 🚀 Dodatne Preporuke za Poboljšanje Rangiranja

### Google Search Console
1. Dodati sajt na Google Search Console
2. Submit sitemap.xml: `https://stepeniknekretnine.com/sitemap.xml`
3. Pratiti indeksiranje i performance

### Google My Business
1. Kreirati Google My Business profil za "Agencija Stepenik"
2. Dodati adresu, radno vreme, slike
3. Redovno odgovarati na recenzije

### Backlinks & Citations
1. Registrovati agenciju na:
   - 4zida.rs
   - Cityexpert.rs
   - Halooglasi.com
   - Kupujem prodajem nekretnine
2. Kreirati profil na društvenim mrežama (već postoje Facebook, Instagram)
3. Tražiti backlinks od lokalnih blogova i portala

### Content Marketing
1. Dodati blog sekciju sa sadržajem:
   - "Kako kupiti stan u Beogradu?"
   - "Dokumentacija potrebna za prodaju nekretnine"
   - "Najbolje lokacije za život u Beogradu"
   - "Vodič kroz proces kupovine nekretnine"
2. Kreirati video tureje nekretnina (YouTube)
3. Objavljivati Case studies uspešnih prodaja

### Performance Optimizacije
1. Kompresovati slike (WebP format)
2. Lazy loading za slike
3. Minifikacija CSS/JS
4. CDN za staticke resurse
5. Caching strategija

### Local SEO
1. Nabaviti recenzije na Google-u
2. Consistent NAP (Name, Address, Phone) na svim platformama
3. Kreirati lokalne landing pages (npr. "Nekretnine Zvezdara", "Nekretnine Vračar")

---

## 📊 Monitoring & Analytics

### Google Analytics
- Pratiti organsku posetljivost
- Konverzije (kontakt forma, pozivi)
- Bounce rate
- Page load times

### Google Search Console
- Impressions i clicks po ključnim rečima
- Average position za "nekretnine" i varijacije
- Click-through rate (CTR)
- Core Web Vitals

### Ključne Metrike za Praćenje
- Organic traffic growth
- Keyword rankings za "nekretnine beograd"
- Backlink quality i quantity
- Domain Authority (Moz/Ahrefs)
- Page Speed score (Google PageSpeed Insights)

---

## ⚡ Quick Win Tasks

1. **Submit na Google**: Odmah submitovati sitemap.xml na Google Search Console
2. **Google My Business**: Kreirati profil u narednih 24h
3. **4zida & Cityexpert**: Registrovati agenciju i postavljati oglase
4. **Recenzije**: Tražiti od zadovoljnih klijenata da ostave recenziju na Google-u
5. **Social Media**: Redovno postavljati oglase na Facebook i Instagram sa linkovima ka sajtu

---

## 📝 Kako Ažurirati SEO

### Kada dodajete novi oglas:
```bash
# 1. Dodajte oglas u bazu (već imate script-ove)
node --import tsx scripts/add-<naziv>-apartment.ts

# 2. Regenerišite sitemap
node --import tsx scripts/generate-sitemap.ts

# 3. (Opciono) Submit na Google Search Console da odmah indeksira
```

### Kada menjate SEO tagove:
- Editujte fajlove u `src/app/pages/` (Home.tsx, BrowseListings.tsx, itd.)
- SEO komponenta je u `src/app/components/SEO.tsx`
- Schema markup u `src/app/components/SchemaMarkup.tsx`

---

## 🎯 Očekivani Rezultati

Sa ovim optimizacijama, očekujete:
- **1-2 nedelje**: Google indeksira sve stranice
- **1 mesec**: Pojava na 3-5 strani za "nekretnine beograd"
- **2-3 meseca**: Pojava na 1-2 strani za "nekretnine beograd" i "agencija stepenik"
- **3-6 meseci**: Top 5 pozicija za "stepenik nekretnine", "agencija stepenik beograd"

**VAŽNO**: SEO je dugoročan proces. Redovno ažurirajte sadržaj, dodajte nove oglase, prikupljajte recenzije i gradite backlinks.
