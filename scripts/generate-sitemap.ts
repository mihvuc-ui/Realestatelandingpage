/**
 * Generisanje dinamičkog sitemap.xml sa svim oglasima
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  console.log('🗺️  Generišem sitemap.xml...\n');

  const siteUrl = 'https://stepeniknekretnine.com';
  const today = new Date().toISOString().split('T')[0];

  // Statičke stranice
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/browse', priority: '0.9', changefreq: 'daily' },
    { url: '/kupujem', priority: '0.8', changefreq: 'weekly' },
    { url: '/prodajem', priority: '0.8', changefreq: 'weekly' },
    { url: '/rentiranje', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
  ];

  // Preuzmi sve oglase iz baze
  const { data: apartments, error } = await supabase
    .from('apartments')
    .select('id, name, images, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Greška pri učitavanju oglasa:', error.message);
    return;
  }

  console.log(`✅ Pronađeno ${apartments?.length || 0} oglasa\n`);

  // Kreiraj XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  xml += '\n';

  // Dodaj statičke stranice
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n\n';
  });

  // Dodaj oglase
  apartments?.forEach(apt => {
    const lastmod = new Date(apt.created_at).toISOString().split('T')[0];

    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}/listing/${apt.id}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';

    // Dodaj slike (prvih 5 za svaki oglas)
    if (apt.images && apt.images.length > 0) {
      apt.images.slice(0, 5).forEach((image: string) => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image}</image:loc>\n`;
        xml += `      <image:title>${apt.name}</image:title>\n`;
        xml += '    </image:image>\n';
      });
    }

    xml += '  </url>\n\n';
  });

  xml += '</urlset>\n';

  // Sačuvaj sitemap.xml
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');

  console.log(`✅ Sitemap sačuvan u: ${publicPath}`);
  console.log(`📊 Ukupno URL-ova: ${staticPages.length + (apartments?.length || 0)}`);
  console.log(`📸 Ukupno slika: ${apartments?.reduce((sum, apt) => sum + Math.min(apt.images?.length || 0, 5), 0)}\n`);

  console.log('🚀 Sitemap dostupan na: https://stepeniknekretnine.com/sitemap.xml\n');
}

generateSitemap()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
