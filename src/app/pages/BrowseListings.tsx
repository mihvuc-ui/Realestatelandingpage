import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationFilter, setLocationFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(600000);
  const [sqmFrom, setSqmFrom] = useState(0);
  const [sqmTo, setSqmTo] = useState(10000); // Povećano za zemljišta
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
    setPropertyTypeFilter('all');
    setPriceFrom(0);
    setPriceTo(600000);
    setSqmFrom(0);
    setSqmTo(10000);
    setPaymentMethod('all');
    setSortBy('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' ||
           locationFilter !== 'all' ||
           propertyTypeFilter !== 'all' ||
           priceFrom !== 0 ||
           priceTo !== 600000 ||
           sqmFrom !== 0 ||
           sqmTo !== 10000 ||
           paymentMethod !== 'all';
  }, [searchQuery, locationFilter, propertyTypeFilter, priceFrom, priceTo, sqmFrom, sqmTo, paymentMethod]);

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

      // Filter only sale type (not rent) for this page
      if (apt.type !== 'sale') {
        return false;
      }

      // Property type filter (apartment, house, land, etc.)
      if (propertyTypeFilter !== 'all' && apt.propertyType !== propertyTypeFilter) {
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
  }, [apartments, searchQuery, locationFilter, propertyTypeFilter, priceFrom, priceTo, sqmFrom, sqmTo, sortBy]);

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
        title="Nekretnine Beograd - Prodaja Stanova, Kuća i Zemljišta | Stepenik"
        description="Nekretnine na prodaju u Beogradu. Agencija Stepenik - stanovi, kuće, poslovni prostori i zemljišta. Pretraga po lokaciji, ceni i kvadraturi. Vračar, Zvezdara, Novi Beograd, Grocka. Besplatna procena nekretnine."
        keywords="nekretnine, nekretnine beograd, prodaja nekretnina, stanovi na prodaju, stanovi beograd, prodaja stanova, kupovina stana, kuće na prodaju, zemljište na prodaju, nekretnine zvezdara, nekretnine vračar, nekretnine grocka, agencija stepenik, stepenik nekretnine, agencija za nekretnine beograd, real estate belgrade, apartments for sale belgrade"
        canonical="/browse"
      />
      
      {/* Schema Markup za listu nekretnina */}
      {filteredApartments.length > 0 && <ItemListSchema items={schemaItems} />}
      <BreadcrumbSchema items={[
        { name: 'Početna', url: 'https://nekretnine-stepenik.rs/' },
        { name: 'Prodaja', url: 'https://nekretnine-stepenik.rs/browse' }
      ]} />

      <div className="min-h-screen bg-background pt-24 pb-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2">{t('browse.title')}</h1>
            <p className="text-muted-foreground">{t('browse.subtitle')}</p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-card rounded-2xl p-3 sm:p-4 mb-10 border border-border shadow-sm">
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('browse.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-secondary border border-border rounded-xl px-4 py-3 text-foreground flex items-center justify-center gap-2 font-medium"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>{t('browse.filters')}</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-secondary border border-border rounded-xl pl-4 pr-10 py-3 text-foreground focus:outline-none focus:border-primary cursor-pointer w-full"
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
            <div className={`mt-4 pt-4 border-t border-border ${showFilters ? '' : 'hidden lg:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Lokacija */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('filters.location')}</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="all">{t('filters.allLocations')}</option>
                    {uniqueLocations.filter(loc => loc !== 'all').map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Tip Nekretnine */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tip Nekretnine</label>
                  <select
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="w-full bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="all">Sve</option>
                    <option value="apartment">Stan</option>
                    <option value="house">Kuća</option>
                    <option value="land">Zemljište</option>
                    <option value="commercial">Poslovni prostor</option>
                    <option value="garage">Garaža</option>
                    <option value="office">Kancelarija</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cena */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Cena (€)</label>
                  <div className="flex gap-2">
                    <input
                      type="number" placeholder="Od" min="0" step="1000"
                      value={priceFrom || ''}
                      onChange={(e) => setPriceFrom(Math.max(0, Number(e.target.value) || 0))}
                      className="w-1/2 bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="number" placeholder="Do" min="0" step="1000"
                      value={priceTo === 600000 ? '' : priceTo}
                      onChange={(e) => setPriceTo(Math.max(0, Number(e.target.value) || 600000))}
                      className="w-1/2 bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Površina */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Površina (m²)</label>
                  <div className="flex gap-2">
                    <input
                      type="number" placeholder="Od" min="0" step="5"
                      value={sqmFrom || ''}
                      onChange={(e) => setSqmFrom(Math.max(0, Number(e.target.value) || 0))}
                      className="w-1/2 bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="number" placeholder="Do" min="0" step="5"
                      value={sqmTo === 10000 ? '' : sqmTo}
                      onChange={(e) => setSqmTo(Math.max(0, Number(e.target.value) || 10000))}
                      className="w-1/2 bg-secondary border border-border text-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-destructive/10 text-foreground hover:text-destructive px-4 py-2 rounded-full transition-colors border border-border"
                >
                  <X className="h-4 w-4" />
                  <span>{t('browse.resetFilters')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Results count */}
          {!loading && filteredApartments.length > 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              {filteredApartments.length} {t('browse.resultsCount')}
            </p>
          )}

          {/* Listings Grid */}
          {filteredApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredApartments.map(apartment => (
                <PropertyCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t('browse.noPropertiesFound')}</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-primary hover:underline font-medium"
              >
                {t('browse.resetFilters')}
              </button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}