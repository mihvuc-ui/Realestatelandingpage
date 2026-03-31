import { Helmet } from 'react-helmet-async';

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nekretnine Stepenik",
    "alternateName": "Agencija Stepenik",
    "url": "https://nekretnine-stepenik.rs",
    "logo": "https://nekretnine-stepenik.rs/logo.png",
    "image": "https://nekretnine-stepenik.rs/og-default.jpg",
    "description": "Profesionalna agencija za nekretnine u Beogradu. Prodaja i izdavanje stanova, kuća i poslovnih prostora.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beograd",
      "addressRegion": "Beograd",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.787197",
      "longitude": "20.457273"
    },
    "telephone": "+38162671155",
    "email": "agencijastepenik@gmail.com",
    "priceRange": "€€",
    "areaServed": [
      {
        "@type": "City",
        "name": "Beograd"
      },
      {
        "@type": "Country",
        "name": "Srbija"
      }
    ],
    "foundingDate": "2021",
    "slogan": "Pravi stepenik između ponude i promišljene odluke",
    "sameAs": [
      "https://www.facebook.com/NekretnineStepenikBeograd",
      "https://www.instagram.com/nekretnine_stepenik",
      "https://www.linkedin.com/company/nekretnine-stepenik"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+38162671155",
      "contactType": "customer service",
      "email": "agencijastepenik@gmail.com",
      "availableLanguage": ["Serbian", "English", "Russian", "Turkish"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// LocalBusiness Schema - Detaljniji za lokalno SEO
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nekretnine Stepenik",
    "image": "https://nekretnine-stepenik.rs/og-default.jpg",
    "@id": "https://nekretnine-stepenik.rs",
    "url": "https://nekretnine-stepenik.rs",
    "telephone": "+38162671155",
    "email": "agencijastepenik@gmail.com",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Beograd",
      "addressLocality": "Beograd",
      "postalCode": "11000",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.787197,
      "longitude": 20.457273
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/NekretnineStepenikBeograd",
      "https://www.instagram.com/nekretnine_stepenik"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Property Listing Schema
interface PropertySchemaProps {
  name: string;
  price: number;
  location: string;
  area: number;
  type: 'sale' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  image?: string;
  url: string;
  description?: string;
}

export function PropertySchema({ 
  name, 
  price, 
  location, 
  area, 
  type,
  bedrooms,
  bathrooms,
  image,
  url,
  description
}: PropertySchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": name,
    "url": url,
    ...(description && { "description": description }),
    ...(image && { "image": image }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressCountry": "RS"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": area,
      "unitCode": "MTK"
    },
    ...(bedrooms && { "numberOfRooms": bedrooms }),
    ...(bathrooms && { "numberOfBathroomsTotal": bathrooms }),
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": price,
        "priceCurrency": "EUR",
        ...(type === 'rent' && { "unitText": "MONTH" })
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// WebSite Schema - Za search box u Google-u
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nekretnine Stepenik",
    "url": "https://nekretnine-stepenik.rs",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nekretnine-stepenik.rs/browse?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// ItemList Schema - Lista nekretnina
interface ItemListSchemaProps {
  items: Array<{
    name: string;
    url: string;
    image?: string;
    price: number;
  }>;
}

export function ItemListSchema({ items }: ItemListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "url": item.url,
        ...(item.image && { "image": item.image }),
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "EUR"
        }
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}