import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyCard } from '@/app/components/PropertyCard';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Footer } from '@/app/components/Footer';
import { SEO } from '@/app/components/SEO';
import { useApartments } from '@/app/hooks/useApartments';

export function Rentiranje() {
  const { t } = useLanguage();
  const { apartments, loading } = useApartments();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationFilter, setLocationFilter] = useState('all');
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
    setRoomsFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' ||
           locationFilter !== 'all' ||
           roomsFilter !== 'all';
  }, [searchQuery, locationFilter, roomsFilter]);

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
  }, [searchQuery, locationFilter, roomsFilter, sortBy, apartments]);

  return (
    <>
      <SEO
        title={t('rentiranje.pageTitle')}
        description={t('rentiranje.pageDescription')}
        keywords={t('rentiranje.pageKeywords')}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('rentiranje.title')}</h1>
            <p className="text-muted-foreground">{t('rentiranje.subtitle')}</p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-sm transition-colors">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('rentiranje.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden border border-border bg-card hover:bg-secondary rounded-full px-6 py-3 text-foreground flex items-center justify-center space-x-2 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>{t('browse.filters')}</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-secondary border border-border rounded-xl pl-4 pr-10 py-3 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="newest">{t('browse.newest')}</option>
                  <option value="price-asc">{t('browse.priceAsc')}</option>
                  <option value="price-desc">{t('browse.priceDesc')}</option>
                  <option value="sqm-desc">{t('browse.sqmDesc')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Filters Panel */}
            <div className={`mt-6 pt-6 border-t border-border ${showFilters ? '' : 'hidden lg:block'}`}>
              <div className="bg-secondary rounded-2xl p-6 border border-border transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Lokacija */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">{t('filters.location')}</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="all">{t('filters.allLocations')}</option>
                      {uniqueLocations.filter(loc => loc !== 'all').map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Broj Soba */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">{t('rentiranje.rooms')}</label>
                    <select
                      value={roomsFilter}
                      onChange={(e) => setRoomsFilter(e.target.value)}
                      className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="all">{t('rentiranje.allRooms')}</option>
                      <option value="1">{t('rentiranje.oneRoom')}</option>
                      <option value="2">{t('rentiranje.twoRooms')}</option>
                      <option value="3">{t('rentiranje.threeRooms')}</option>
                      <option value="4">{t('rentiranje.fourPlusRooms')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center space-x-2 text-sm border border-border bg-card hover:bg-secondary text-foreground px-4 py-2 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span>{t('browse.resetFilters')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-6 text-muted-foreground">
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
              <p className="text-muted-foreground text-lg">{t('browse.noPropertiesFound')}</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-primary hover:opacity-90 transition-opacity"
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
