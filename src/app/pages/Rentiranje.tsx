import { apartments } from '@/data/apartments';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PropertyCard } from '@/app/components/PropertyCard';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { RangeSlider } from '@/app/components/RangeSlider';
import { Footer } from '@/app/components/Footer';
import { SEO } from '@/app/components/SEO';

export function Rentiranje() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(2000); // Lower max for rent
  const [sqmFrom, setSqmFrom] = useState(0);
  const [sqmTo, setSqmTo] = useState(1000);
  const [roomsFilter, setRoomsFilter] = useState('all');
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
    setPriceFrom(0);
    setPriceTo(2000);
    setSqmFrom(0);
    setSqmTo(1000);
    setRoomsFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' || 
           locationFilter !== 'all' || 
           priceFrom !== 0 || 
           priceTo !== 2000 || 
           sqmFrom !== 0 || 
           sqmTo !== 1000 ||
           roomsFilter !== 'all';
  }, [searchQuery, locationFilter, priceFrom, priceTo, sqmFrom, sqmTo, roomsFilter]);

  const filteredApartments = useMemo(() => {
    // Filter only rent properties
    let filtered = apartments.filter(apt => apt.type === 'rent').filter(apt => {
      // Search query
      if (searchQuery && !apt.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !apt.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && apt.location !== locationFilter) {
        return false;
      }

      // Price range (for rent, price is monthly rent)
      if (apt.price < priceFrom || apt.price > priceTo) {
        return false;
      }

      // Square meters range
      if (apt.squareMeters < sqmFrom || apt.squareMeters > sqmTo) {
        return false;
      }

      // Rooms filter
      if (roomsFilter !== 'all') {
        const rooms = parseInt(roomsFilter);
        if (apt.bedrooms !== rooms) {
          return false;
        }
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
  }, [searchQuery, locationFilter, priceFrom, priceTo, sqmFrom, sqmTo, roomsFilter, sortBy]);

  return (
    <>
      <SEO
        title={t('rentiranje.pageTitle')}
        description={t('rentiranje.pageDescription')}
        keywords={t('rentiranje.pageKeywords')}
      />
      
      <div className="min-h-screen bg-white dark:bg-slate-950 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('rentiranje.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('rentiranje.subtitle')}</p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border border-fuchsia-200 dark:border-slate-800 shadow-md transition-colors">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('rentiranje.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white flex items-center justify-center space-x-2"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>{t('browse.filters')}</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-fuchsia-500 cursor-pointer"
                >
                  <option value="newest">{t('browse.newest')}</option>
                  <option value="price-asc">{t('browse.priceAsc')}</option>
                  <option value="price-desc">{t('browse.priceDesc')}</option>
                  <option value="sqm-desc">{t('browse.sqmDesc')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filters Panel */}
            <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-fuchsia-500/30 ${showFilters ? '' : 'hidden lg:block'}`}>
              <div className="bg-gradient-to-br from-gray-50 via-white to-fuchsia-50/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/30 rounded-2xl p-6 shadow-2xl border-2 border-fuchsia-400/40 dark:border-fuchsia-500/40 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Lokacija */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">{t('filters.location')}</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-slate-700"
                    >
                      <option value="all">{t('filters.allLocations')}</option>
                      {uniqueLocations.filter(loc => loc !== 'all').map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Broj Soba */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">{t('rentiranje.rooms')}</label>
                    <select
                      value={roomsFilter}
                      onChange={(e) => setRoomsFilter(e.target.value)}
                      className="w-full bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-slate-700"
                    >
                      <option value="all">{t('rentiranje.allRooms')}</option>
                      <option value="1">{t('rentiranje.oneRoom')}</option>
                      <option value="2">{t('rentiranje.twoRooms')}</option>
                      <option value="3">{t('rentiranje.threeRooms')}</option>
                      <option value="4">{t('rentiranje.fourPlusRooms')}</option>
                    </select>
                  </div>

                  {/* Mesečna Kirija - Slider */}
                  <div>
                    <RangeSlider
                      min={0}
                      max={2000}
                      step={50}
                      value={priceTo}
                      onChange={setPriceTo}
                      label={t('rentiranje.maxRent')}
                      formatValue={(v) => `€${v.toLocaleString()}`}
                    />
                  </div>

                  {/* m² - Slider */}
                  <div>
                    <RangeSlider
                      min={0}
                      max={1000}
                      step={5}
                      value={sqmTo}
                      onChange={setSqmTo}
                      label={t('browse.maxArea')}
                      formatValue={(v) => `${v} m²`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center space-x-2 text-sm bg-gray-100 dark:bg-slate-800 hover:bg-red-600 text-gray-900 dark:text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors border border-red-500/30 hover:border-red-500"
                >
                  <X className="h-4 w-4 text-red-400" />
                  <span>{t('browse.resetFilters')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-6 text-gray-400">
            {t('browse.showing')} {filteredApartments.length} {t('rentiranje.properties')}
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
              <p className="text-gray-400 text-lg">{t('browse.noPropertiesFound')}</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-blue-400 hover:text-blue-300"
              >
                {t('browse.resetFilters')}
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
