# 🔍 GOOGLE SEARCH CONSOLE - SETUP VODIČ

Kompletan step-by-step vodič za podešavanje Google Search Console i submitovanje sitemap-a.

---

## 🎯 ŠTA JE GOOGLE SEARCH CONSOLE?

Google Search Console (GSC) je **besplatan tool** koji ti omogućava da:
- ✅ Submituješ sitemap i ubrzaš indexing
- ✅ Vidiš kako Google vidi tvoj sajt
- ✅ Praatiš search performance (klikovi, impressions, CTR)
- ✅ Otkriješ i popravljaš greške
- ✅ Praatiš Core Web Vitals
- ✅ Vidiš koji keywords donose traffic

**VAŽNO:** Ovo je OBAVEZNO za svaki ozbiljan sajt! 🚀

---

## 📋 STEP-BY-STEP SETUP

### STEP 1: Kreiraj Google Account (ako nemaš)

1. Idi na: https://accounts.google.com/signup
2. Registruj se sa email-om koji ćeš koristiti za biznis
3. Verifikuj email

---

### STEP 2: Pristup Google Search Console

1. Idi na: **https://search.google.com/search-console**
2. Klikni **"Start now"** dugme
3. Prijavi se sa Google account-om

---

### STEP 3: Dodaj Property (sajt)

U Google Search Console ima **2 tipa properties:**

#### **Opcija A: Domain Property** (Preporučeno)
✅ Pokriva **SVE** verzije domena:
- https://nekretnine-stepenik.rs
- http://nekretnine-stepenik.rs
- https://www.nekretnine-stepenik.rs
- Sve subdomain-e

**Verifikacija metod:** DNS record (TXT)

#### **Opcija B: URL Prefix Property**
✅ Pokriva **samo jedan** URL:
- https://nekretnine-stepenik.rs (bez www)

**Verifikacija metodi:** HTML file, HTML tag, Google Analytics, Google Tag Manager

---

### 🏆 PREPORUČENI NAČIN: Domain Property

**Koraci:**

1. U GSC, klikni **"Add property"**
2. Izaberi **"Domain"** tab
3. Unesi: `nekretnine-stepenik.rs` (bez https://)
4. Klikni **"Continue"**

**Dobićeš TXT DNS record:**
```
google-site-verification=ABC123XYZ456789
```

5. **Kopiraj ovaj TXT record**

---

### STEP 4: DNS Verifikacija

**Gde dodati TXT record zavisi od hosting provajdera:**

#### **Ako koristiš cPanel:**
1. Login na cPanel
2. Idi na **"Zone Editor"**
3. Pronađi domen `nekretnine-stepenik.rs`
4. Klikni **"Manage"**
5. Klikni **"Add Record"** → **"TXT"**
6. Popuni:
   - **Name:** `@` (ili ostavi prazno)
   - **TTL:** `3600` (default)
   - **Record:** `google-site-verification=ABC123XYZ456789`
7. Klikni **"Save"**

#### **Ako koristiš Cloudflare:**
1. Login na Cloudflare
2. Idi na **DNS** tab
3. Klikni **"Add record"**
4. Popuni:
   - **Type:** `TXT`
   - **Name:** `@`
   - **Content:** `google-site-verification=ABC123XYZ456789`
   - **TTL:** Auto
5. Klikni **"Save"**

#### **Ako koristiš drugi hosting:**
Kontaktiraj hosting support za pomoć sa dodavanjem TXT DNS record-a.

---

### STEP 5: Verifikuj u Google Search Console

1. Sačekaj **2-5 minuta** (DNS propagacija)
2. Vrati se u Google Search Console
3. Klikni **"Verify"**

**Rezultat:**
```
✅ Ownership verified
```

**Ako ne uspe:**
- Sačekaj još 10-15 minuta (DNS može biti spor)
- Proveri da si kopirao TXT record tačno
- Proveri da nema razmaka na kraju TXT record-a

---

### 🎯 ALTERNATIVNI NAČIN: HTML Tag Verifikacija

**Ako ne možeš pristupiti DNS setings-ima:**

1. Izaberi **"URL prefix"** property type
2. Unesi: `https://nekretnine-stepenik.rs`
3. Izaberi **"HTML tag"** metod
4. Kopiraj meta tag:
```html
<meta name="google-site-verification" content="ABC123XYZ456789" />
```

5. Otvori fajl: `/src/app/components/SEO.tsx`
6. Pronađi liniju 30:
```typescript
<meta name="google-site-verification" content="google127f4562652b22dd" />
```

7. Zameni sa:
```typescript
<meta name="google-site-verification" content="ABC123XYZ456789" />
```

8. **Deploy sajt** (push na hosting)
9. Sačekaj 2-3 minuta
10. Klikni **"Verify"** u Google Search Console

---

## 📤 SUBMITOVANJE SITEMAP-A

### STEP 6: Submit sitemap.xml

**Posle verifikacije:**

1. U Google Search Console levi meni, klikni **"Sitemaps"**
2. Pod "Add a new sitemap", unesi: `sitemap.xml`
3. Klikni **"Submit"**

**Rezultat:**
```
✅ Sitemap submitted successfully
Status: Success
Discovered URLs: 8
```

**Šta Google radi:**
- Crawl-uje sitemap odmah
- Dodaje URL-ove u queue za indexing
- Redovno re-crawl-uje (svaki dan do mesec dana)

---

### STEP 7: Proveri Status

1. Idi na **"Sitemaps"** u levom meniju
2. Vidi status:
   - **Success** ✅ - Sitemap je prihvaćen
   - **Couldn't fetch** ❌ - Proveri URL
   - **Sitemap is HTML page** ⚠️ - Pogrešan format

3. Klikni na sitemap URL da vidiš detalje:
   - **Discovered:** Broj pronađenih URL-ova
   - **Indexed:** Broj indeksiranih URL-ova (0 na početku, raste vremenom)

---

## 📊 MONITORING & REPORTS

### Coverage Report

**Što praviš:**
1. Klikni **"Coverage"** u levom meniju
2. Vidi 4 kategorije:
   - ✅ **Valid** - Indeksirane stranice (cilj: sve)
   - ⚠️ **Valid with warnings** - Indeksirane ali sa problemima
   - ❌ **Error** - Nisu indeksirane zbog greške
   - 🚫 **Excluded** - Намерно isključene (noindex)

**Action Items:**
- Popravi sve **Error** stranice
- Istraži **Excluded** stranice (da nema grešaka)

---

### Performance Report

**Što praviš:**
1. Klikni **"Performance"** u levom meniju
2. Vidi metrics:
   - **Total clicks** - Koliko puta su kliknuli na sajt u search results
   - **Total impressions** - Koliko puta se sajt pojavio u search results
   - **Average CTR** - Click-Through Rate (cilj: >3%)
   - **Average position** - Prosečna pozicija u search results (cilj: <10)

**Filters:**
- **Date range:** Poslednjih 28 dana, 3 meseca, 12 meseci
- **Search type:** Web, Image, Video, News
- **Pages:** Vidi best performing stranice
- **Queries:** Vidi koji keywords donose traffic

---

### URL Inspection Tool

**Što praviš:**
1. Klikni **search icon** gore
2. Unesi URL (npr. `https://nekretnine-stepenik.rs/`)
3. Klikni **Enter**

**Dobiješ:**
- **Coverage:** Da li je URL indexiran
- **Crawling:** Kad je Google poslednji put crawl-ovao
- **Indexing:** Status indexing-a
- **Mobile usability:** Da li je mobile-friendly

**Action:**
- Ako nije indexiran, klikni **"Request indexing"**
- Google će prioritetno crawl-ovati taj URL

---

### Mobile Usability

**Što praviš:**
1. Klikni **"Mobile Usability"** u levom meniju
2. Vidi greške:
   - Text too small
   - Clickable elements too close
   - Content wider than screen
   - Viewport not set

**Action:**
- Popravi sve greške (naš sajt već ima responsive dizajn ✅)

---

### Core Web Vitals

**Što praviš:**
1. Klikni **"Core Web Vitals"** u levom meniju
2. Vidi metrics:
   - **LCP** (Largest Contentful Paint) - Cilj: <2.5s
   - **FID** (First Input Delay) - Cilj: <100ms
   - **CLS** (Cumulative Layout Shift) - Cilj: <0.1

**Action:**
- Optimizuj slike (lazy loading, compression)
- Ukloni render-blocking resources
- Minimizuj JavaScript

---

## 🎯 POST-SUBMISSION ACTION ITEMS

### First 7 Days:
- [ ] Proveri Coverage Report svaki dan
- [ ] Request indexing za najvažnije stranice (Homepage, Browse)
- [ ] Monitor errors u Coverage

### First 30 Days:
- [ ] Proveri Performance Report nedeljno
- [ ] Vidi koji keywords počinju donositi traffic
- [ ] Optimizuj low CTR stranice (poboljšaj title/description)

### Monthly:
- [ ] Full review svih reports
- [ ] Prati ranking changes
- [ ] Optimizuj na osnovu podataka

---

## 🔧 ADVANCED SETTINGS

### Settings → Users and Permissions

**Dodaj članove tima:**
1. Idi na **"Settings"** (gear icon gore desno)
2. Klikni **"Users and permissions"**
3. Klikni **"Add user"**
4. Unesi email i dodeli permission level:
   - **Owner** - Full access
   - **Full** - Sve osim dodavanje vlasnika
   - **Restricted** - Read-only

---

### Settings → Crawl Stats

**Vidi crawling activity:**
- **Total crawl requests** - Koliko puta je Google crawl-ovao sajt
- **Total download size** - Koliko podataka je preuzeto
- **Average response time** - Brzina odgovora servera

**Cilj:** Response time < 500ms

---

### Settings → Change of Address

**Ako menjate domen:**
1. Verifikuj novi domen
2. Submit sitemap na novi domen
3. Postavi 301 redirects sa starog na novi domen
4. Koristi "Change of Address" tool
5. GSC će preneti sav SEO "link juice"

---

## 🚨 TROUBLESHOOTING

### Problem: "Sitemap could not be read"

**Uzrok:** robots.txt blokira sitemap

**Rešenje:**
1. Proveri `/public/robots.txt`
2. Dodaj:
```
Allow: /
Sitemap: https://nekretnine-stepenik.rs/sitemap.xml
```

---

### Problem: "Sitemap is an HTML page"

**Uzrok:** Server vraća HTML umesto XML

**Rešenje:**
1. Proveri da je fajl `/public/sitemap.xml` (ne `.html`)
2. Proveri URL direktno: https://nekretnine-stepenik.rs/sitemap.xml
3. Proveri da server vraća `Content-Type: application/xml`

---

### Problem: "Submitted URL not found (404)"

**Uzrok:** URL-ovi u sitemap-u ne postoje

**Rešenje:**
1. Proveri da svi URL-ovi iz sitemap-a rade
2. Otvori svaki URL i proveri da vraća 200 (ne 404)
3. Ukloni nepostojeće URL-ove iz sitemap-a
4. Re-submituj sitemap

---

### Problem: "Redirect error"

**Uzrok:** URL-ovi u sitemap-u redirectuju

**Rešenje:**
1. Sitemap treba sadržati **final** URL-ove (nakon redirect-a)
2. Ne stavljaj URL-ove koji redirectuju (301, 302)
3. Ažuriraj sitemap sa finalnim URL-ovima

---

### Problem: "Coverage: Discovered - currently not indexed"

**Uzrok:** Google je otkrio URL ali još nije indexirao

**Rešenje:**
- **Normalno** - Treba vremena (7-30 dana)
- Request indexing preko URL Inspection tool
- Poboljšaj content quality
- Dodaj internal links ka toj stranici

---

## 📈 EXPECTED TIMELINE

### Day 1-3:
- ✅ Sitemap submitovan
- ✅ Google počinje crawling
- ⏳ URLs: Discovered (još nisu indexed)

### Day 4-14:
- ✅ Prvih nekoliko stranica indexed
- ✅ Coverage Report pokazuje progress
- ⏳ Još nema traffic-a (normalno)

### Day 15-30:
- ✅ Većina stranica indexed
- ✅ Prve impressions u Performance Report
- ✅ Možda prvi klikovi (zavisi od keyword competition)

### Day 30-90:
- ✅ Sve stranice indexed
- ✅ Redovan organic traffic
- ✅ Pozicije se stabilizuju
- 🚀 Vreme za optimizaciju (on-page, backlinks)

---

## 🎁 BONUS: OTHER SEARCH ENGINES

### Bing Webmaster Tools

**Setup:**
1. Idi na: https://www.bing.com/webmasters
2. Sign in sa Microsoft account-om
3. Add site: `https://nekretnine-stepenik.rs`
4. Verifikuj (HTML tag ili XML file)
5. Submit sitemap: `sitemap.xml`

**Bonus:** Bing Webmaster ima **Import from GSC** feature!
- Automatic sync sa Google Search Console
- Submituj jednom, works za oba

---

### Yandex Webmaster (za ruske korisnike)

**Setup:**
1. Idi na: https://webmaster.yandex.com
2. Kreiraj Yandex account
3. Add site: `https://nekretnine-stepenik.rs`
4. Verifikuj (HTML file ili meta tag)
5. Submit sitemap: `sitemap.xml`

**VAŽNO za ruske korisnike!** Yandex je #1 search engine u Rusiji.

---

## 📊 SUCCESS METRICS

### Month 1:
- [ ] 100% stranica indexed
- [ ] 0 coverage errors
- [ ] >100 impressions

### Month 3:
- [ ] >1000 impressions
- [ ] >30 clicks
- [ ] CTR > 2%
- [ ] Average position < 20

### Month 6:
- [ ] >5000 impressions
- [ ] >150 clicks
- [ ] CTR > 3%
- [ ] Average position < 10
- [ ] Top 3 za neki branded keyword

### Month 12:
- [ ] >20000 impressions
- [ ] >600 clicks
- [ ] CTR > 3-5%
- [ ] Top 3 za 3+ non-branded keywords
- [ ] Organic traffic = primarna traffic source

---

## ✅ FINAL CHECKLIST

Pre nego što submituje sitemap:

- [ ] robots.txt dozvolјava crawling
- [ ] sitemap.xml je accessible (otvori u browser-u)
- [ ] Svi URL-ovi u sitemap-u rade (200 status)
- [ ] Nema duplicate URL-ova
- [ ] Nema redirect URL-ova
- [ ] XML format je validan
- [ ] Sajt je verifikovan u GSC
- [ ] Google verification tag je u `<head>`

---

**🎉 GOTOVO!**

Sajt je spreman za Google indexing! Sad samo sačekaj 7-30 dana i prati rezultate u Google Search Console. 🚀📈

**Sledeći korak:** Kreiraj kvalitetan content i gradi backlinks! 💪

---

*Last updated: 2026-03-31*
