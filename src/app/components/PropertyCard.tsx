import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import type { Apartment } from '@/data/apartments';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface PropertyCardProps {
  apartment: Apartment;
}

export function PropertyCard({ apartment }: PropertyCardProps) {
  const { t } = useLanguage();
  
  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `€${price.toLocaleString()}/${t('listing.perMonth')}`;
    }
    return `€${price.toLocaleString()}`;
  };

  return (
    <Link 
      to={`/listing/${apartment.id}`}
      className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-pink-700 shadow-lg hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] transition-all duration-300 hover:-translate-y-2 hover:border-pink-700 dark:hover:border-pink-700 flex flex-col h-[400px]"
    >
      {/* Image - Extended */}
      <div className="h-[220px] overflow-hidden relative flex-shrink-0">
        <img 
          src={apartment.images[0]} 
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Type Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border-2 ${
          apartment.type === 'sale' 
            ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-fuchsia-500/50' 
            : 'bg-pink-600 text-white border-pink-500 shadow-pink-600/50'
        }`}>
          {apartment.type === 'sale' ? t('card.forSale') : t('card.forRent')}
        </span>

        {/* View Details Button - Only visible on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="inline-flex items-center space-x-2 bg-pink-500/90 hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-black shadow-lg shadow-pink-500/50 border-2 border-pink-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span>{t('card.viewDetails')}</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content - Compact at bottom */}
      <div className="p-5 bg-white dark:bg-slate-900 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors line-clamp-1">
          {apartment.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-fuchsia-300 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{apartment.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 mb-4 text-sm">
          {apartment.propertyType === 'land' ? (
            // Zemljište - samo površina u arima
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{(apartment.squareMeters / 100).toFixed(2)} ari</span>
            </div>
          ) : (
            // Stan/Kuća - sobe, kupatila, m²
            <>
              {apartment.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{apartment.bedrooms}</span>
                </div>
              )}
              {apartment.bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{apartment.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{apartment.squareMeters}m²</span>
              </div>
            </>
          )}
        </div>

        {/* Price - Minimal style, enhanced on hover */}
        <div className="inline-block px-3 py-1.5 rounded-lg bg-transparent group-hover:bg-pink-500/30 border border-gray-300 dark:border-pink-700/50 group-hover:border-pink-700 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all duration-300 mt-auto">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-pink-500 dark:group-hover:text-pink-500 group-hover:font-black transition-all">
            €{apartment.price.toLocaleString()}
            {apartment.type === 'rent' && <span className="text-xs">/{t('card.month')}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
}