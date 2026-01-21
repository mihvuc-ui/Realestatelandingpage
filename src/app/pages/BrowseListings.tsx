import { apartments } from '@/data/apartments';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/app/components/PropertyCard';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function BrowseListings() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(600000);
  const [sqmFrom, setSqmFrom] = useState(0);
  const [sqmTo, setSqmTo] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState('all'); // all, cash, credit
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Kompletna lista beogradskih lokacija i okolnih opština/sela
  const allBelgradeLocations = [
    // Opštine Beograda
    'Barajevo',
    'Voždovac',
    'Voždovac - Autokomanda',
    'Voždovac - Banjica',
    'Voždovac - Kumodraž',
    'Voždovac - Šumice',
    'Voždovac - Konjarnik',
    'Vračar',
    'Vračar - Centar',
    'Vračar - Hram',
    'Vračar - Karađorđev Park',
    'Vračar - Neimar',
    'Vračar - Crveni Krst',
    'Grocka',
    'Zvezdara',
    'Zvezdara - Centar',
    'Zvezdara - Đeram',
    'Zvezdara - Veliki Mokri Lug',
    'Zvezdara - Mali Mokri Lug',
    'Zvezdara - Mirijevo',
    'Zvezdara - Vukov Spomenik',
    'Zemun',
    'Zemun - Centar',
    'Zemun - Gornji Grad',
    'Zemun - Donji Grad',
    'Zemun - Gardoš',
    'Zemun - Kalvarija',
    'Zemun - Sava Kovačević',
    'Zemun - Novi Grad',
    'Zemun - Batajnica',
    'Zemun - Zemun Polje',
    'Lazarevac',
    'Mladenovac',
    'Novi Beograd',
    'Novi Beograd - Blok 61',
    'Novi Beograd - Blok 62',
    'Novi Beograd - Blok 63',
    'Novi Beograd - Blok 64',
    'Novi Beograd - Blok 70',
    'Novi Beograd - Blok 70a',
    'Novi Beograd - Blok 11a',
    'Novi Beograd - Blok 19',
    'Novi Beograd - Blok 20',
    'Novi Beograd - Blok 21',
    'Novi Beograd - Blok 22',
    'Novi Beograd - Blok 23',
    'Novi Beograd - Blok 28',
    'Novi Beograd - Blok 29',
    'Novi Beograd - Blok 30',
    'Novi Beograd - Fontana',
    'Novi Beograd - Geneks',
    'Novi Beograd - Airport City',
    'Novi Beograd - Belville',
    'Novi Beograd - Delta City',
    'Novi Beograd - Paviljoni',
    'Novi Beograd - Sava Centar',
    'Novi Beograd - Tošin Bunar',
    'Obrenovac',
    'Palilula',
    'Palilula - Karaburma',
    'Palilula - Višnjička Banja',
    'Palilula - Hadžipopovac',
    'Palilula - Krnjača',
    'Palilula - Kotež',
    'Palilula - Bogoslovija',
    'Palilula - Borča',
    'Palilula - Ovča',
    'Rakovica',
    'Rakovica - Miljakovac',
    'Rakovica - Kneževac',
    'Rakovica - Labudovo Brdo',
    'Rakovica - Košutnjak',
    'Savski Venac',
    'Savski Venac - Centar',
    'Savski Venac - Dedinje',
    'Savski Venac - Senjak',
    'Savski Venac - Vračar',
    'Savski Venac - Topčidersko Brdo',
    'Sopot',
    'Stari Grad',
    'Stari Grad - Centar',
    'Stari Grad - Dorćol',
    'Stari Grad - London',
    'Stari Grad - Skadarlija',
    'Stari Grad - Jalija',
    'Surčin',
    'Surčin - Bečmen',
    'Surčin - Dobanovci',
    'Surčin - Jakovo',
    'Surčin - Petrovčić',
    'Čukarica',
    'Čukarica - Ada Ciganlija',
    'Čukarica - Banovo Brdo',
    'Čukarica - Žarkovo',
    'Čukarica - Julino Brdo',
    'Čukarica - Filmski Grad',
    'Čukarica - Kumodraž',
    'Čukarica - Makiš',
    'Čukarica - Požeška',
    'Čukarica - Skojevsko Naselje',
    // Okolne opštine i naselja
    'Bežanijska Kosa',
    'Borča',
    'Višnjica',
    'Vrčin',
    'Jabučki Rit',
    'Jajinci',
    'Kaluđerica',
    'Kitka',
    'Krnjača',
    'Leštane',
    'Ovča',
    'Padinska Skela',
    'Pinosava',
    'Resnik',
    'Ripanj',
    'Rušanj',
    'Sremčica',
    'Ugrinovci',
    'Umka',
    'Veliki Mokri Lug',
    'Vinča',
    'Zuce',
    'Železnik'
  ];

  const uniqueLocations = useMemo(() => {
    return ['all', ...allBelgradeLocations.sort()];
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setTypeFilter('all');
    setPriceFrom(0);
    setPriceTo(600000);
    setSqmFrom(0);
    setSqmTo(200);
    setPaymentMethod('all');
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' || 
           locationFilter !== 'all' || 
           typeFilter !== 'all' || 
           priceFrom !== 0 || 
           priceTo !== 600000 || 
           sqmFrom !== 0 || 
           sqmTo !== 200 ||
           paymentMethod !== 'all';
  }, [searchQuery, locationFilter, typeFilter, priceFrom, priceTo, sqmFrom, sqmTo, paymentMethod]);

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
      if (apt.price < priceFrom || apt.price > priceTo) {
        return false;
      }

      // Square meters range
      if (apt.squareMeters < sqmFrom || apt.squareMeters > sqmTo) {
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
  }, [searchQuery, locationFilter, typeFilter, priceFrom, priceTo, sqmFrom, sqmTo, sortBy]);

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

          {/* Filters Panel - Nova struktura */}
          <div className={`mt-6 pt-6 border-t border-rose-200 dark:border-slate-800 ${showFilters ? '' : 'hidden lg:block'}`}>
            <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 rounded-2xl p-6 shadow-2xl border border-rose-200 dark:border-slate-700 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* Lokacija */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Lokacija</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full bg-white dark:bg-slate-700/50 border-2 border-rose-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all cursor-pointer hover:bg-rose-50 dark:hover:bg-slate-700"
                  >
                    <option value="all">Sve lokacije</option>
                    {uniqueLocations.filter(loc => loc !== 'all').map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Tip */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Tip</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full bg-white dark:bg-slate-700/50 border-2 border-rose-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all cursor-pointer hover:bg-rose-50 dark:hover:bg-slate-700"
                  >
                    <option value="all">{t('filters.allTypes')}</option>
                    <option value="sale">{t('filters.sale')}</option>
                    <option value="rent">{t('filters.rent')}</option>
                  </select>
                </div>

                {/* Cena OD */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Cena od: €{priceFrom.toLocaleString()}
                  </label>
                  <div className="relative pt-1">
                    <div className="absolute w-full h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full top-1/2 -translate-y-1/2 border-2 border-gray-800 shadow-inner"></div>
                    {/* Progress fill */}
                    <div 
                      className="absolute h-2 rounded-full top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/50"
                      style={{ width: `${(priceFrom / 600000) * 100}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="600000"
                      step="10000"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(parseInt(e.target.value))}
                      className="relative w-full z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        background: 'transparent',
                        height: '24px'
                      }}
                    />
                  </div>
                </div>

                {/* Cena DO */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Cena do: €{priceTo.toLocaleString()}
                  </label>
                  <div className="relative pt-1">
                    <div className="absolute w-full h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full top-1/2 -translate-y-1/2 border-2 border-gray-800 shadow-inner"></div>
                    {/* Progress fill */}
                    <div 
                      className="absolute h-2 rounded-full top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/50"
                      style={{ width: `${(priceTo / 600000) * 100}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="600000"
                      step="10000"
                      value={priceTo}
                      onChange={(e) => setPriceTo(parseInt(e.target.value))}
                      className="relative w-full z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        background: 'transparent',
                        height: '24px'
                      }}
                    />
                  </div>
                </div>

                {/* m² */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Površina od: {sqmFrom} m²
                  </label>
                  <div className="relative pt-1">
                    <div className="absolute w-full h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full top-1/2 -translate-y-1/2 border-2 border-gray-800 shadow-inner"></div>
                    {/* Progress fill */}
                    <div 
                      className="absolute h-2 rounded-full top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/50"
                      style={{ width: `${(sqmFrom / 200) * 100}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={sqmFrom}
                      onChange={(e) => setSqmFrom(parseInt(e.target.value))}
                      className="relative w-full z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        background: 'transparent',
                        height: '24px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Način plaćanja - Cela nova sekcija */}
              <div className="mt-6 pt-6 border-t border-rose-200 dark:border-slate-700">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-4">Način plaćanja</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setPaymentMethod('all')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      paymentMethod === 'all'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-500/50'
                        : 'bg-white dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-slate-700 border-2 border-rose-300 dark:border-slate-600'
                    }`}
                  >
                    Sve
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-500/50'
                        : 'bg-white dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-slate-700 border-2 border-rose-300 dark:border-slate-600'
                    }`}
                  >
                    💵 Keš
                  </button>
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      paymentMethod === 'credit'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-500/50'
                        : 'bg-white dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-slate-700 border-2 border-rose-300 dark:border-slate-600'
                    }`}
                  >
                    💳 Kredit
                  </button>
                </div>
              </div>
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