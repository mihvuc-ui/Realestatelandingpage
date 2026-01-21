# Nekretnine Stepenik - Profesionalna Agencija za Nekretnine

Premium web sajt za agenciju za nekretnine "Nekretnine Stepenik" sa modernim dizajnom i kompletnom funkcionalnošću.

## 🏢 O Agenciji

**Nekretnine Stepenik** - osnovana 2021. godine
- ✅ Preko 150 uspešno završenih poslova
- ✅ Pratimo klijente od početka do kraja
- ✅ Sopstveni advokatski timovi za pravne poslove

**Glavni agent:** Branka Gojković  
**Telefon:** +381 62 671 155

## 🚀 Deployment Instrukcije

### Opcija 1: Vercel (Preporučeno)

1. **Kreirajte Vercel nalog:**
   - Idite na [vercel.com](https://vercel.com)
   - Registrujte se besplatno

2. **Postavite projekat:**
   - Kliknite "Add New Project"
   - Uvezite GitHub repo ili upload-ujte kod
   - Vercel automatski prepoznaje Vite projekat
   - Kliknite "Deploy"

3. **Povežite domen stepeniknekretnine.com:**
   - U Vercel projektu idite na "Settings" → "Domains"
   - Dodajte: `stepeniknekretnine.com`
   - Vercel će vam dati DNS instrukcije

4. **Ažurirajte DNS kod registrara domena:**
   ```
   A Record:     @     →  76.76.21.21
   CNAME Record: www   →  cname.vercel-dns.com
   ```
   (Tačne IP adrese će vam dati Vercel)

### Opcija 2: Netlify

1. **Kreirajte Netlify nalog:**
   - Idite na [netlify.com](https://netlify.com)
   - Registrujte se besplatno

2. **Deploy:**
   - Drag & drop projekat folder ili povežite GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Dodajte custom domen:**
   - "Domain Settings" → "Add custom domain"
   - Unesite: `stepeniknekretnine.com`
   - Pratite DNS instrukcije

### Opcija 3: Cloudflare Pages

1. **Kreirajte Cloudflare nalog:**
   - Idite na [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Deploy:**
   - "Create a project"
   - Upload ili povežite Git
   - Build command: `npm run build`
   - Build output: `dist`

3. **Custom domen:**
   - "Custom domains" → dodajte stepeniknekretnine.com

## 🛠️ Tehnologije

- ⚛️ React 18
- 🎨 Tailwind CSS v4
- 🚀 Vite
- 📱 Potpuno responzivan
- 🌓 Light/Dark mode
- 🎯 React Router
- 🖼️ Lightbox galerija

## 📋 Funkcionalnosti

- ✨ Moderna hero sekcija
- 🏠 Istaknuti oglasi
- 🔍 Filtriranje po lokaciji, ceni, kvadraturi
- 📸 Galerije slika sa lightbox-om
- 📞 Kontakt modal sa informacijama agenta
- 📄 About stranica
- 🎨 Premium dizajn

## 📞 Kontakt

Za sva pitanja i dodatne informacije:
- Agent: Branka Gojković
- Telefon: +381 62 671 155
- Website: stepeniknekretnine.com

---

**Napravljen sa ❤️ za Nekretnine Stepenik**
