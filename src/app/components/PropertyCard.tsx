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
      className="group bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border-2 border-rose-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-500 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-rose-500/30 dark:hover:shadow-rose-500/40"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {apartment.images.length > 0 ? (
          <img
            src={apartment.images[0]}
            alt={apartment.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <MapPin className="h-16 w-16 text-slate-400 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
            apartment.type === 'sale' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
              : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
          }`}>
            {apartment.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {apartment.name}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{apartment.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            {formatPrice(apartment.price, apartment.type)}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-rose-200 dark:border-slate-700">
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
            <span>{apartment.squareMeters} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
}