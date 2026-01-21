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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayApartments.map((apartment) => (
          <PropertyCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link
          to="/browse"
          className="inline-block bg-pink-500/30 hover:bg-pink-500/60 text-white px-6 py-2.5 rounded-lg font-black transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-pink-700 text-sm"
        >
          Pogledajte Sve Nekretnine
        </Link>
      </div>
    </div>
  );
}