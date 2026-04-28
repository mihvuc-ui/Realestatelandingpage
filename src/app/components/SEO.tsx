import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: object;
}

export function SEO({
  title,
  description,
  canonical,
  keywords,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  noindex = false,
  jsonLd
}: SEOProps) {
  const siteUrl = 'https://stepeniknekretnine.com';
  const fullTitle = `${title} | Nekretnine Stepenik - Agencija Stepenik Beograd`;
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const { language } = useLanguage();

  // Language mappings
  const languageMap: { [key: string]: string } = {
    sr: 'sr_RS',
    en: 'en_US',
    ru: 'ru_RU',
    tr: 'tr_TR'
  };

  const locale = languageMap[language] || 'sr_RS';

  return (
    <Helmet>
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="google127f4562652b22dd" />
      
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Robots Meta */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Nekretnine Stepenik - Agencija Stepenik" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:site" content="@NekretnineStepe" />
      <meta name="twitter:creator" content="@NekretnineStepe" />

      {/* Additional SEO */}
      <meta name="author" content="Agencija Stepenik - Nekretnine Stepenik Beograd" />
      <meta name="geo.region" content="RS-00" />
      <meta name="geo.placename" content="Beograd" />
      <meta name="geo.position" content="44.787197;20.457273" />
      <meta name="ICBM" content="44.787197, 20.457273" />

      {/* Language Alternatives - Hreflang */}
      <link rel="alternate" hrefLang="sr" href={`${siteUrl}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="tr" href={`${siteUrl}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${canonical || '/'}`} />

      {/* Structured Data - JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}