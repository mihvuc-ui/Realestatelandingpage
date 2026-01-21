import { apartments } from '@/data/apartments';
import { PropertyCard } from '@/app/components/PropertyCard';
import { Link } from 'react-router-dom';

export function FeaturedListings() {
  // Get featured apartments or first 3 apartments
  const featuredApartments = apartments
    .filter(apt => apt.featured)
    .slice(0, 3);
  
  // If no featured apartments, show first 3
  const displayApartments = featuredApartments.length > 0 
    ? featuredApartments 
    : apartments.slice(0, 3);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayApartments.map((apartment) => (
          <PropertyCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
      
      <div className="text-center">
        <Link
          to="/browse"
          className="inline-block bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-700 hover:to-fuchsia-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-fuchsia-500/50 dark:shadow-cyan-500/30"
        >
          Pogledajte Sve Nekretnine
        </Link>
      </div>
    </div>
  );
}