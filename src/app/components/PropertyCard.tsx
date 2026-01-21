import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
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
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{apartment.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{apartment.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{apartment.squareMeters}m²</span>
          </div>
        </div>

        {/* Price */}
        <div className="inline-block px-4 py-2 rounded-lg bg-pink-500/30 border-2 border-pink-700 shadow-[0_0_10px_rgba(236,72,153,0.3)] mt-auto">
          <span className="text-xl font-black text-pink-500 dark:text-pink-500">
            €{apartment.price.toLocaleString()}
            {apartment.type === 'rent' && <span className="text-sm">/{t('card.month')}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
}