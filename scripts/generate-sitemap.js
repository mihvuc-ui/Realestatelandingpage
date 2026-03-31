/**
 * SITEMAP GENERATOR ZA NEKRETNINE STEPENIK
 * 
 * Ovaj script automatski generiše sitemap.xml na osnovu nekretnina u bazi.
 * 
 * Kako koristiti:
 * 1. node scripts/generate-sitemap.js
 * 2. Sitemap će biti kreiran u /public/sitemap.xml
 * 3. Submituj ga na Google Search Console
 */

const fs = require('fs');
const path = require('path');

// Učitaj nekretnine iz data fajla
// NAPOMENA: Ako koristiš TypeScript, ovaj import će možda trebati prilagođavanje
// const apartments = require('../src/data/apartments').apartments;

// Za sada, kreiraj manual primer - kasnije ćeš povezati sa bazom
const apartments = [
  {
    id: '1',
    name: 'Dvosoban stan - Nehruova, Savski blokovi',
    location: 'Novi Beograd - Nehruova, Savski blokovi',
    price: 175000,
    type: 'sale',
    squareMeters: 65,
    images: [
      'https://i.imgur.com/rhk2C8oh.jpg',
      'https://i.imgur.com/srqdJnBh.jpg',
      'https://i.imgur.com/nQxcF7Mh.jpg',
      'https://i.imgur.com/l3eyZ2oh.jpg',
      'https://i.imgur.com/lL8e1xxh.jpg',
    ]
  },
  // Dodaj ostale nekretnine ovde kada ih budeš imao
];

const SITE_URL = 'https://nekretnine-stepenik.rs';
const TODAY = new Date().toISOString().split('T')[0];

// Statičke stranice
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/browse', priority: '0.9', changefreq: 'daily' },
  { url: '/kupujem', priority: '0.8', changefreq: 'weekly' },
  { url: '/prodajem', priority: '0.8', changefreq: 'weekly' },
  { url: '/rentiranje', priority: '0.8', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// Jezici
const languages = ['sr', 'en', 'ru', 'tr'];

// Generiši XML header
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Dodaj statičke stranice
staticPages.forEach(page => {
  sitemap += `
  <!-- ${page.url === '/' ? 'Homepage' : page.url.substring(1)} -->
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
  
  // Dodaj hreflang za svaki jezik
  languages.forEach(lang => {
    sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${page.url}" />`;
  });
  sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.url}" />
  </url>
`;
});

// Dodaj nekretnine
sitemap += `
  <!-- NEKRETNINE - Dinamički generisane -->`;

apartments.forEach((apartment, index) => {
  const propertyUrl = `/property/${apartment.id}`;
  
  sitemap += `
  <!-- Nekretnina ID: ${apartment.id} - ${apartment.name} -->
  <url>
    <loc>${SITE_URL}${propertyUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
  
  // Dodaj hreflang za svaki jezik
  languages.forEach(lang => {
    sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${propertyUrl}" />`;
  });
  sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${propertyUrl}" />`;
  
  // Dodaj slike (image sitemap extension)
  sitemap += `
    
    <!-- Image Sitemap Extension - Slike nekretnine -->`;
  
  apartment.images.slice(0, 5).forEach((image, imgIndex) => {
    sitemap += `
    <image:image>
      <image:loc>${image}</image:loc>
      <image:title>${apartment.name} - Slika ${imgIndex + 1}</image:title>
      <image:caption>${apartment.squareMeters}m² ${apartment.type === 'sale' ? 'stan na prodaju' : 'stan za izdavanje'} u ${apartment.location}</image:caption>
    </image:image>`;
  });
  
  sitemap += `
  </url>
`;
});

// Zatvori XML
sitemap += `
</urlset>`;

// Sačuvaj sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log('✅ Sitemap uspešno generisan!');
console.log(`📍 Lokacija: ${sitemapPath}`);
console.log(`📊 Ukupno URL-ova: ${staticPages.length + apartments.length}`);
console.log(`   - Statičke stranice: ${staticPages.length}`);
console.log(`   - Nekretnine: ${apartments.length}`);
console.log('');
console.log('🚀 Sledeći koraci:');
console.log('1. Otvori Google Search Console: https://search.google.com/search-console');
console.log('2. Dodaj/verifikuj svoj sajt: nekretnine-stepenik.rs');
console.log('3. Idi na "Sitemaps" u levom meniju');
console.log('4. Submituj: https://nekretnine-stepenik.rs/sitemap.xml');
console.log('');
console.log('💡 Napomena: Ponovo pokreni ovaj script svaki put kada dodaš novu nekretninu!');
