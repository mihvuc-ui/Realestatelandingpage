import { apartments } from '@/data/apartments';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/app/components/PropertyCard';

export function BrowseListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [sqmRange, setSqmRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const uniqueLocations = useMemo(() => {
    const locations = apartments.map(apt => apt.location);
    return ['all', ...Array.from(new Set(locations))];
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setTypeFilter('all');
    setPriceRange([0, 600000]);
    setSqmRange([0, 200]);
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' || 
           locationFilter !== 'all' || 
           typeFilter !== 'all' || 
           priceRange[0] !== 0 || 
           priceRange[1] !== 600000 || 
           sqmRange[0] !== 0 || 
           sqmRange[1] !== 200;
  }, [searchQuery, locationFilter, typeFilter, priceRange, sqmRange]);

  const filteredApartments = useMemo(() => {
    let filtered = apartments.filter(apt => {
      // Search query
      if (searchQuery && !apt.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !apt.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && apt.location !== locationFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && apt.type !== typeFilter) {
        return false;
      }

      // Price range
      if (apt.price < priceRange[0] || apt.price > priceRange[1]) {
        return false;
      }

      // Square meters range
      if (apt.squareMeters < sqmRange[0] || apt.squareMeters > sqmRange[1]) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'sqm-desc':
          return b.squareMeters - a.squareMeters;
        case 'newest':
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, locationFilter, typeFilter, priceRange, sqmRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Naša Ponuda</h1>
          <p className="text-gray-600 dark:text-gray-400">Istražite našu pažljivo odabranu kolekciju nekretnina</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border border-rose-200 dark:border-slate-800 shadow-md transition-colors">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pretražite po nazivu ili lokaciji..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filteri</span>
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="newest">Najnovije</option>
                <option value="price-asc">Cena: Od najniže</option>
                <option value="price-desc">Cena: Od najviše</option>
                <option value="sqm-desc">Površina: Najveća prvo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filters (Desktop always shown, Mobile toggleable) */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-rose-200 dark:border-slate-800 ${showFilters ? '' : 'hidden lg:grid'}`}>
            {/* Location */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Lokacija</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                size={1}
                onMouseEnter={(e) => {
                  const select = e.currentTarget;
                  select.size = Math.min(uniqueLocations.length, 8);
                }}
                onMouseLeave={(e) => {
                  const select = e.currentTarget;
                  select.size = 1;
                }}
                onClick={(e) => {
                  const select = e.currentTarget;
                  if (select.size === 1) {
                    select.size = Math.min(uniqueLocations.length, 8);
                  }
                }}
                onBlur={(e) => {
                  const select = e.currentTarget;
                  select.size = 1;
                }}
                className="w-full bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-rose-500 overflow-y-auto cursor-pointer"
              >
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'Sve lokacije' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Tip</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-rose-500"
              >
                <option value="all">Svi tipovi</option>
                <option value="sale">Prodaja</option>
                <option value="rent">Izdavanje</option>
              </select>
            </div>

            {/* Price Range Max */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Maks. Cena: €{priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="600000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Square Meters Min */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Min. Površina: {sqmRange[0]} m²
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={sqmRange[0]}
                onChange={(e) => setSqmRange([parseInt(e.target.value), sqmRange[1]])}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Square Meters Max */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Maks. Površina: {sqmRange[1]} m²
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={sqmRange[1]}
                onChange={(e) => setSqmRange([sqmRange[0], parseInt(e.target.value)])}
                className="w-full accent-blue-500"
              />
            </div>
          </div>

          {/* Reset Filters Button - Always visible when filters are active */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-2 text-sm bg-gray-100 dark:bg-slate-800 hover:bg-red-600 text-gray-900 dark:text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors border border-red-500/30 hover:border-red-500"
              >
                <X className="h-4 w-4 text-red-400" />
                <span>Obriši sve filtere</span>
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 text-gray-400">
          Prikazuje se {filteredApartments.length} {filteredApartments.length === 1 ? 'nekretnina' : 'nekretnina'}
        </div>

        {/* Listings Grid */}
        {filteredApartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map(apartment => (
              <PropertyCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nema nekretnina koje odgovaraju vašim kriterijumima.</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Obriši sve filtere
            </button>
          </div>
        )}
      </div>
    </div>
  );
}