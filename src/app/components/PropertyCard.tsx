import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import type { Apartment } from '@/data/apartments';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface PropertyCardProps {
  apartment: Apartment;
}

export function PropertyCard({ apartment }: PropertyCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/listing/${apartment.id}`}
      className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={apartment.images[0]}
          alt={`${apartment.name} — ${apartment.location} — ${apartment.type === 'sale' ? 'Prodaja' : 'Izdavanje'} ${apartment.propertyType === 'land' ? 'Zemljište' : 'Stan'} ${apartment.squareMeters}m² — Nekretnine Beograd`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Type Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            apartment.type === 'sale'
              ? 'bg-primary text-primary-foreground'
              : 'bg-stone-900/80 text-white'
          }`}
        >
          {apartment.type === 'sale' ? t('card.forSale') : t('card.forRent')}
        </span>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-stone-900/90 backdrop-blur-sm text-foreground font-semibold shadow-sm">
            €{apartment.price.toLocaleString()}
            {apartment.type === 'rent' && (
              <span className="text-xs font-normal text-muted-foreground">/{t('card.month')}</span>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
          {apartment.name}
        </h3>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="text-sm truncate">{apartment.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-foreground/80 mt-auto pt-4 border-t border-border">
          {apartment.propertyType === 'land' ? (
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-muted-foreground" />
              <span>{(apartment.squareMeters / 100).toFixed(2)} ari</span>
            </div>
          ) : (
            <>
              {apartment.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{apartment.bedrooms}</span>
                </div>
              )}
              {apartment.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{apartment.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-muted-foreground" />
                <span>{apartment.squareMeters} m²</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
