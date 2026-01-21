import { Helmet } from 'react-helmet-async';

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nekretnine Stepenik",
    "url": "https://nekretnine-stepenik.rs",
    "logo": "https://nekretnine-stepenik.rs/logo.png",
    "description": "Profesionalna agencija za nekretnine u Beogradu. Prodaja i izdavanje stanova, kuća i poslovnih prostora.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beograd",
      "addressCountry": "RS"
    },
    "telephone": "+38162671155",
    "email": "agencijastepenik@gmail.com",
    "priceRange": "€€",
    "areaServed": {
      "@type": "City",
      "name": "Beograd"
    },
    "foundingDate": "2021",
    "slogan": "Pravi stepenik između ponude i promišljene odluke"
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
  url 
}: PropertySchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": name,
    "url": url,
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
