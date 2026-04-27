import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/app/components/PropertyCard';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Footer } from '@/app/components/Footer';
import { SEO } from '@/app/components/SEO';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { BreadcrumbSchema, ItemListSchema } from '@/app/components/SchemaMarkup';
import { useApartments } from '@/app/hooks/useApartments';

export function BrowseListings() {
  const { t } = useLanguage();
  const { apartments, loading, useSupabase } = useApartments();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(600000);
  const [sqmFrom, setSqmFrom] = useState(0);
  const [sqmTo, setSqmTo] = useState(1000);
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
    setPriceFrom(0);
    setPriceTo(600000);
    setSqmFrom(0);
    setSqmTo(1000);
    setPaymentMethod('all');
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' ||
           locationFilter !== 'all' ||
           priceFrom !== 0 ||
           priceTo !== 600000 ||
           sqmFrom !== 0 ||
           sqmTo !== 1000 ||
           paymentMethod !== 'all';
  }, [searchQuery, locationFilter, priceFrom, priceTo, sqmFrom, sqmTo, paymentMethod]);

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

      // Note: Removed struktura filter - structure info not in database
      // Filter only sale type (not rent) for this page
      if (apt.type !== 'sale') {
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
  }, [apartments, searchQuery, locationFilter, priceFrom, priceTo, sqmFrom, sqmTo, sortBy]);

  // Prepare items for ItemList schema
  const schemaItems = filteredApartments.slice(0, 20).map(apt => ({
    name: apt.name,
    url: `https://nekretnine-stepenik.rs/browse/${apt.id}`,
    image: apt.image,
    price: apt.price
  }));

  return (
    <>
      <SEO
        title="Prodaja Nekretnina u Beogradu – Stanovi na Prodaju"
        description="Stepenik Nekretnine - pregledajte kompletnu ponudu nekretnina za prodaju u Beogradu. Agencija Stepenik: stanovi, kuće i poslovni prostori sa detaljnim filterima."
        keywords="agencija stepenik, stepenik nekretnine beograd, stanovi na prodaju beograd, nekretnine prodaja beograd, kupovina stana beograd, agencija stepenik stanovi, stepenik real estate belgrade"
        canonical="/browse"
      />
      
      {/* Schema Markup za listu nekretnina */}
      {filteredApartments.length > 0 && <ItemListSchema items={schemaItems} />}
      <BreadcrumbSchema items={[
        { name: 'Početna', url: 'https://nekretnine-stepenik.rs/' },
        { name: 'Prodaja', url: 'https://nekretnine-stepenik.rs/browse' }
      ]} />

      <div className="min-h-screen bg-white dark:bg-slate-950 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 mb-8 border border-fuchsia-200 dark:border-slate-800 shadow-md transition-colors">
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('browse.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white flex items-center justify-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('browse.filters')}</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 rounded-lg pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-fuchsia-500 cursor-pointer"
                >
                  <option value="newest">{t('browse.newest')}</option>
                  <option value="price-asc">{t('browse.priceAsc')}</option>
                  <option value="price-desc">{t('browse.priceDesc')}</option>
                  <option value="sqm-desc">{t('browse.sqmDesc')}</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filters Panel - Kompaktnija verzija za telefon */}
            <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-fuchsia-500/30 ${showFilters ? '' : 'hidden lg:block'}`}>
              <div className="bg-gradient-to-br from-gray-50 via-white to-fuchsia-50/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/30 rounded-2xl p-3 sm:p-4 shadow-2xl border-2 border-fuchsia-400/40 dark:border-fuchsia-500/40 transition-colors">
                
                {/* Prvi red: Lokacija */}
                <div className="mb-3 sm:mb-4">
                  {/* Lokacija */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">{t('filters.location')}</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-slate-700"
                    >
                      <option value="all">{t('filters.allLocations')}</option>
                      {uniqueLocations.filter(loc => loc !== 'all').map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drugi red: Cena i Površina */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  
                  {/* Cena - Input polja Od/Do */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">Cena (€)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Od"
                        min="0"
                        step="1000"
                        value={priceFrom || ''}
                        onChange={(e) => setPriceFrom(Math.max(0, Number(e.target.value) || 0))}
                        className="w-1/2 bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                      />
                      <input
                        type="number"
                        placeholder="Do"
                        min="0"
                        step="1000"
                        value={priceTo === 600000 ? '' : priceTo}
                        onChange={(e) => setPriceTo(Math.max(0, Number(e.target.value) || 600000))}
                        className="w-1/2 bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Površina - Input polja Od/Do */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">Površina (m²)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Od"
                        min="0"
                        step="5"
                        value={sqmFrom || ''}
                        onChange={(e) => setSqmFrom(Math.max(0, Number(e.target.value) || 0))}
                        className="w-1/2 bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                      />
                      <input
                        type="number"
                        placeholder="Do"
                        min="0"
                        step="5"
                        value={sqmTo === 1000 ? '' : sqmTo}
                        onChange={(e) => setSqmTo(Math.max(0, Number(e.target.value) || 1000))}
                        className="w-1/2 bg-white dark:bg-slate-700/50 border-2 border-fuchsia-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                      />
                    </div>
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
                  <span>{t('browse.resetFilters')}</span>
                </button>
              </div>
            )}
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