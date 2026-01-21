import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  keywords,
  ogImage = '/og-default.jpg',
  ogType = 'website'
}: SEOProps) {
  const siteUrl = 'https://nekretnine-stepenik.rs';
  const fullTitle = `${title} | Nekretnine Stepenik`;
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:locale" content="sr_RS" />
      <meta property="og:site_name" content="Nekretnine Stepenik" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Nekretnine Stepenik" />
      <meta name="geo.region" content="RS-00" />
      <meta name="geo.placename" content="Beograd" />
    </Helmet>
  );
}
