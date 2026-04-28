import { PropertyCard } from '@/app/components/PropertyCard';
import { Link } from 'react-router-dom';
import { useApartments } from '@/app/hooks/useApartments';

export function FeaturedListings() {
  const { apartments, loading } = useApartments();

  // Get featured apartments or first 3 apartments
  const featuredApartments = apartments
    .filter(apt => apt.featured)
    .sort((a, b) => {
      // Desanke Maksimović uvek prvi
      const aIsDesanke = a.name.toLowerCase().includes('desanke');
      const bIsDesanke = b.name.toLowerCase().includes('desanke');

      if (aIsDesanke && !bIsDesanke) return -1;
      if (!aIsDesanke && bIsDesanke) return 1;

      // Prvo prodaja, zatim izdavanje
      if (a.type === 'sale' && b.type === 'rent') return -1;
      if (a.type === 'rent' && b.type === 'sale') return 1;

      return 0;
    })
    .slice(0, 3);

  // If no featured apartments, show first 3 with same sorting
  const displayApartments = featuredApartments.length > 0
    ? featuredApartments
    : apartments.slice(0, 3);

  if (loading) {
    return <div className="text-center py-12">Učitavam oglase...</div>;
  }

  return (
    <div>
      {/* Mobile: Horizontal Scroll, Desktop: Grid */}
      <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
        {displayApartments.map((apartment) => (
          <div key={apartment.id} className="flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none">
            <PropertyCard apartment={apartment} />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/browse"
          className="inline-block bg-pink-500/40 sm:bg-pink-500/40 hover:bg-pink-500/60 active:bg-pink-500/70 text-white px-6 py-2.5 rounded-lg font-black transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] active:shadow-[0_0_50px_rgba(236,72,153,1)] hover:scale-105 active:scale-105 hover:border-2 hover:border-pink-700 active:border-2 active:border-pink-700 text-sm touch-manipulation"
        >
          Pogledajte Sve Nekretnine
        </Link>
      </div>
    </div>
  );
}