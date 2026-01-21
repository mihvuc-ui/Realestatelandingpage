import { useParams, Link } from 'react-router-dom';
import { apartments } from '@/data/apartments';
import { Bed, Bath, Square, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Building2, Flame, Car, Calendar, Compass, Armchair, Navigation, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { ScheduleViewingModal } from '@/app/components/ScheduleViewingModal';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function ListingDetail() {
  const { id } = useParams();
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

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/50 dark:bg-slate-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 dark:text-white mb-4">{t('listing.notFound')}</h1>
          <Link to="/browse" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300">
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/50 dark:bg-slate-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('listing.backToBrowse')}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden mb-6 shadow-lg transition-colors border border-rose-200 dark:border-slate-800">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-rose-600 text-white p-2 rounded-full transition-colors shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-rose-600 text-white p-2 rounded-full transition-colors shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Expand Button */}
                <button
                  onClick={openLightbox}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-rose-600 text-white p-2 rounded-full transition-colors shadow-lg"
                  title="Uvećaj sliku"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm shadow-lg">
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
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-rose-500'
                          : 'border-transparent opacity-60 hover:opacity-100'
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

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-rose-200 dark:border-slate-800 shadow-md transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('listing.description')}</h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{getDescription()}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-rose-200 dark:border-slate-800 sticky top-24 shadow-lg transition-colors">
              {/* Type Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 shadow-sm ${
                apartment.type === 'sale' 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
              }`}>
                {apartment.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
              </span>

              {/* Title & Location */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{apartment.name}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{apartment.location}</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-rose-200 dark:border-slate-800">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {formatPrice(apartment.price, apartment.type)}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6 pb-6 border-b border-rose-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{t('listing.bedrooms')}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">{apartment.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{t('listing.bathrooms')}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">{apartment.bathrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{t('listing.area')}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">{apartment.squareMeters} m²</span>
                </div>
                {apartment.floor && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span>{t('listing.floor')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">{apartment.floor}</span>
                  </div>
                )}
                {apartment.heating && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Flame className="h-5 w-5 mr-2" />
                      <span>{t('listing.heating')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">{apartment.heating}</span>
                  </div>
                )}
                {apartment.parking && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Car className="h-5 w-5 mr-2" />
                      <span>{t('listing.parking')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-sm">{apartment.parking}</span>
                  </div>
                )}
                {apartment.yearRenovated && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{t('listing.renovated')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">{apartment.yearRenovated}</span>
                  </div>
                )}
                {apartment.orientation && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Compass className="h-5 w-5 mr-2" />
                      <span>{t('listing.orientation')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-sm">{apartment.orientation}</span>
                  </div>
                )}
                {apartment.furnished && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Armchair className="h-5 w-5 mr-2" />
                      <span>{t('listing.furniture')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-sm text-right">
                      {apartment.furnished}
                    </span>
                  </div>
                )}
                {apartment.distanceToRiver && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Navigation className="h-5 w-5 mr-2" />
                      <span>{t('listing.distanceToRiver')}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">{apartment.distanceToRiver}</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={openScheduleModal}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  {t('listing.schedule')}
                </button>
                <button
                  onClick={openContactModal}
                  className="w-full bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold transition-colors border border-rose-200 dark:border-slate-700 shadow-sm"
                >
                  {t('nav.contact')}
                </button>
              </div>
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
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors shadow-lg z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={apartment.images[currentImageIndex]}
              alt={`${apartment.name} - Slika ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation in Lightbox */}
            {apartment.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-rose-600 text-white p-3 rounded-full transition-colors shadow-lg"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-rose-600 text-white p-3 rounded-full transition-colors shadow-lg"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Counter in Lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-lg shadow-lg">
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
    </div>
  );
}