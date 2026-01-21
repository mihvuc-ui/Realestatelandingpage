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
      className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-fuchsia-500/40 shadow-lg hover:shadow-2xl hover:shadow-fuchsia-500/30 dark:hover:shadow-fuchsia-600/40 transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-400 dark:hover:border-fuchsia-500"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={apartment.images[0]} 
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Type Badge */}
        <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border-2 ${
          apartment.type === 'sale' 
            ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-fuchsia-500/50' 
            : 'bg-pink-600 text-white border-pink-500 shadow-pink-600/50'
        }`}>
          {apartment.type === 'sale' ? t('card.forSale') : t('card.forRent')}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 bg-white dark:bg-slate-900">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
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
        <div className="text-2xl font-black bg-gradient-to-r from-fuchsia-500 via-pink-600 to-fuchsia-700 dark:from-fuchsia-400 dark:via-pink-500 dark:to-fuchsia-600 bg-clip-text text-transparent">
          €{apartment.price.toLocaleString()}
          {apartment.type === 'rent' && <span className="text-base">/{t('card.month')}</span>}
        </div>
      </div>
    </Link>
  );
}