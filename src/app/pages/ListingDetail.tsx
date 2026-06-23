import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Building2, Flame, Car, Calendar, Compass, Armchair, Navigation, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { ScheduleViewingModal } from '@/app/components/ScheduleViewingModal';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Footer } from '@/app/components/Footer';
import { useApartments } from '@/app/hooks/useApartments';
import { SEO } from '@/app/components/SEO';
import { PropertySchema, BreadcrumbSchema } from '@/app/components/SchemaMarkup';

export function ListingDetail() {
  const { id } = useParams();
  const { apartments, loading } = useApartments();
  const apartment = apartments.find(apt => apt.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const { t, language } = useLanguage();

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Runs whenever the id changes (new apartment)

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center transition-colors">
        <div className="text-center py-12 text-muted-foreground">Učitavam oglas...</div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center transition-colors">
        <div className="text-center">
          <h1 className="text-2xl text-foreground mb-4">{t('listing.notFound')}</h1>
          <Link to="/browse" className="text-primary hover:opacity-90 transition-opacity">
            {t('listing.backToBrowse')}
          </Link>
        </div>
      </div>
    );
  }

  // Get the description in the current language, fallback to default description
  const getDescription = () => {
    if (apartment.descriptions && apartment.descriptions[language as keyof typeof apartment.descriptions]) {
      return apartment.descriptions[language as keyof typeof apartment.descriptions];
    }
    return apartment.description;
  };

  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `€${price.toLocaleString()}/${t('listing.perMonth')}`;
    }
    return `€${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={`${apartment.name} - ${formatPrice(apartment.price, apartment.type)}`}
        description={`${apartment.name} u ${apartment.location}. ${apartment.propertyType === 'land' ? `Zemljište ${(apartment.squareMeters / 100).toFixed(2)} ari` : `${apartment.squareMeters}m²${apartment.bedrooms ? `, ${apartment.bedrooms} soba` : ''}`}. ${getDescription().substring(0, 150)}...`}
        keywords={`${apartment.name}, nekretnine ${apartment.location}, ${apartment.type === 'sale' ? 'prodaja' : 'izdavanje'} ${apartment.propertyType === 'land' ? 'zemljište' : 'stan'}, nekretnine beograd, agencija stepenik`}
        canonical={`/listing/${apartment.id}`}
        ogImage={apartment.images[0]}
        ogType="product"
      />

      {/* Property Schema Markup */}
      <PropertySchema
        name={apartment.name}
        price={apartment.price}
        location={apartment.location}
        area={apartment.squareMeters}
        type={apartment.type}
        bedrooms={apartment.bedrooms}
        bathrooms={apartment.bathrooms}
        image={apartment.images[0]}
        url={`https://stepeniknekretnine.com/listing/${apartment.id}`}
        description={getDescription().substring(0, 200)}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://stepeniknekretnine.com/' },
          { name: 'Prodaja', url: 'https://stepeniknekretnine.com/browse' },
          { name: apartment.name, url: `https://stepeniknekretnine.com/listing/${apartment.id}` }
        ]}
      />

      <div className="min-h-screen bg-background text-foreground pt-24 pb-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('listing.backToBrowse')}</span>
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2 order-1">
            <div className="relative bg-card rounded-2xl overflow-hidden mb-6 shadow-lg transition-colors border border-border">
              <div className="aspect-[16/10] relative">
                <img
                  src={apartment.images[currentImageIndex]}
                  alt={`${apartment.name} - Slika ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {apartment.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors shadow-md"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors shadow-md"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Expand Button */}
                <button
                  onClick={openLightbox}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors shadow-md"
                  title="Uvećaj sliku"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm shadow-md">
                  {currentImageIndex + 1} / {apartment.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {apartment.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {apartment.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? 'ring-2 ring-primary'
                          : 'border border-border opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Minijatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Karakteristike */}
          <div className="order-2 lg:col-span-1 lg:order-3 lg:row-span-2">
            <div className="bg-card rounded-2xl p-6 border border-border lg:sticky lg:top-24 shadow-lg transition-colors">
              {/* Type Badge */}
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                apartment.type === 'sale'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-stone-900/80 text-white'
              }`}>
                {apartment.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
              </span>

              {/* Title & Location */}
              <h1 className="text-2xl font-bold text-foreground mb-2">{apartment.name}</h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{apartment.location}</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="text-3xl font-semibold text-foreground">
                  {formatPrice(apartment.price, apartment.type)}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {/* Površina - različito za zemljište i ostalo */}
                <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                  <div className="flex items-center text-muted-foreground">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{apartment.propertyType === 'land' ? 'Površina' : t('listing.area')}</span>
                  </div>
                  <span className="text-foreground font-semibold">
                    {apartment.propertyType === 'land'
                      ? `${(apartment.squareMeters / 100).toFixed(2)} ari (${apartment.squareMeters} m²)`
                      : `${apartment.squareMeters} m²`
                    }
                  </span>
                </div>

                {/* Sobe i kupatila - samo za stanove i kuće */}
                {apartment.propertyType !== 'land' && (
                  <>
                    {apartment.bedrooms > 0 && (
                      <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                        <div className="flex items-center text-muted-foreground">
                          <Bed className="h-5 w-5 mr-2" />
                          <span>{t('listing.bedrooms')}</span>
                        </div>
                        <span className="text-foreground font-semibold">{apartment.bedrooms}</span>
                      </div>
                    )}
                    {apartment.bathrooms > 0 && (
                      <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                        <div className="flex items-center text-muted-foreground">
                          <Bath className="h-5 w-5 mr-2" />
                          <span>{t('listing.bathrooms')}</span>
                        </div>
                        <span className="text-foreground font-semibold">{apartment.bathrooms}</span>
                      </div>
                    )}
                  </>
                )}
                {apartment.floor && (
                  <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span>{t('listing.floor')}</span>
                    </div>
                    <span className="text-foreground font-semibold">{apartment.floor}</span>
                  </div>
                )}
                {apartment.heating && (
                  <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground">
                      <Flame className="h-5 w-5 mr-2" />
                      <span>{t('listing.heating')}</span>
                    </div>
                    <span className="text-foreground font-semibold">{apartment.heating}</span>
                  </div>
                )}
                {apartment.parking && (
                  <div className="flex items-center justify-between gap-3 bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground flex-shrink-0">
                      <Car className="h-5 w-5 mr-2" />
                      <span>{t('listing.parking')}</span>
                    </div>
                    <span className="text-foreground font-semibold text-sm text-right break-words">{apartment.parking}</span>
                  </div>
                )}
                {apartment.yearRenovated && (
                  <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{t('listing.renovated')}</span>
                    </div>
                    <span className="text-foreground font-semibold">{apartment.yearRenovated}</span>
                  </div>
                )}
                {/* Zemljište - specifična polja */}
                {apartment.propertyType === 'land' ? (
                  <>
                    {apartment.landLocation && (
                      <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>Lokacija</span>
                        </div>
                        <span className="text-foreground font-semibold text-sm">{apartment.landLocation}</span>
                      </div>
                    )}
                    {apartment.buildingOnLand && (
                      <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                        <div className="flex items-center text-muted-foreground">
                          <Building2 className="h-5 w-5 mr-2" />
                          <span>Objekat na placu</span>
                        </div>
                        <span className="text-foreground font-semibold text-sm">{apartment.buildingOnLand}</span>
                      </div>
                    )}
                    {apartment.landType && (
                      <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                        <div className="flex items-center text-muted-foreground">
                          <Square className="h-5 w-5 mr-2" />
                          <span>Tip zemljišta</span>
                        </div>
                        <span className="text-foreground font-semibold text-sm">{apartment.landType}</span>
                      </div>
                    )}
                  </>
                ) : (
                  // Stan/Kuća - orijentacija
                  apartment.orientation && (
                    <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                      <div className="flex items-center text-muted-foreground">
                        <Compass className="h-5 w-5 mr-2" />
                        <span>{t('listing.orientation')}</span>
                      </div>
                      <span className="text-foreground font-semibold text-sm">{apartment.orientation}</span>
                    </div>
                  )
                )}
                {apartment.furnished && apartment.propertyType !== 'land' && (
                  <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground">
                      <Armchair className="h-5 w-5 mr-2" />
                      <span>{t('listing.furniture')}</span>
                    </div>
                    <span className="text-foreground font-semibold text-sm text-right">
                      {apartment.furnished}
                    </span>
                  </div>
                )}
                {apartment.distanceToRiver && (
                  <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <div className="flex items-center text-muted-foreground">
                      <Navigation className="h-5 w-5 mr-2" />
                      <span>{t('listing.distanceToRiver')}</span>
                    </div>
                    <span className="text-foreground font-semibold">{apartment.distanceToRiver}</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={openScheduleModal}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  {t('listing.schedule')}
                </button>
                <button
                  onClick={openContactModal}
                  className="w-full border border-border bg-card hover:bg-secondary text-foreground py-3.5 rounded-xl font-semibold transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2 order-3 lg:order-2">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-md transition-colors">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('listing.description')}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{getDescription()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors shadow-md z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={apartment.images[currentImageIndex]}
              alt={`${apartment.name} - Slika ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-lg"
            />

            {/* Navigation in Lightbox */}
            {apartment.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-3 rounded-full transition-colors shadow-md"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-3 rounded-full transition-colors shadow-md"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Counter in Lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-lg shadow-md">
              {currentImageIndex + 1} / {apartment.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />

      {/* Schedule Viewing Modal */}
      <ScheduleViewingModal
        isOpen={isScheduleModalOpen}
        onClose={closeScheduleModal}
        apartmentName={apartment.name}
      />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}