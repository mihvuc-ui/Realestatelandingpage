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
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-border overflow-hidden">
            <div className="aspect-[4/3] bg-secondary animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-2/3 bg-secondary animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-secondary animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: Horizontal Scroll, Desktop: Grid */}
      <div className="flex md:grid overflow-x-auto hide-scrollbar md:overflow-x-visible md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
        {displayApartments.map((apartment) => (
          <div key={apartment.id} className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none">
            <PropertyCard apartment={apartment} />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 border border-border bg-card hover:bg-secondary text-foreground px-7 py-3 rounded-full font-semibold transition-colors"
        >
          Pogledajte sve nekretnine
        </Link>
      </div>
    </div>
  );
}