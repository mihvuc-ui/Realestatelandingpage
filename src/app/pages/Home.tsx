import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ShoppingCart, TrendingUp, Phone, MapPin, Mail } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { SEO } from '@/app/components/SEO';
import { Logo } from '@/app/components/Logo';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Nekretnine u Beogradu – Prodaja i Izdavanje Stanova"
        description="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova, kuće na prodaju. Preko 150 uspešno završenih poslova. Profesionalna pravna podrška."
        keywords="nekretnine Beograd, prodaja stanov Beograd, izdavanje stanov Beograd, stan na prodaju, stan za izdavanje, agencija za nekretnine Beograd, kuće na prodaju Srbija, nekretnine Srbija"
        canonical="/"
      />
      
      <div className="overflow-y-auto h-screen hide-scrollbar scroll-smooth snap-y snap-mandatory">
        {/* Hero Section */}
        <section className="h-screen flex flex-col relative snap-start snap-always">
          <Hero />
          {/* Gradient blend to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/30 to-black/60 z-[5] pointer-events-none"></div>
        </section>

        {/* Featured Listings */}
        <section className="h-screen py-16 md:py-20 relative overflow-hidden flex items-center snap-start snap-always">
          {/* Gradient blend from previous section */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-[5] pointer-events-none"></div>
          
          {/* Belgrade Panorama Background - Clean Day Image */}
          <div className="fixed inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1733561589475-2492c96283f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxncmFkZSUyMGRheSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjkxMTI4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1920"
              alt="Belgrade Panorama"
              className="w-full h-full object-cover opacity-80"
            />
            {/* White fade overlay for light mode / Dark gray for dark mode */}
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/90"></div>
          </div>
          
          {/* Gradient blend to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-fuchsia-950/20 to-fuchsia-950/40 z-[5] pointer-events-none"></div>
          
          {/* Content - TOP LAYER */}
          <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-10 lg:px-16 w-full">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extralight bg-gradient-to-r from-fuchsia-500 via-pink-600 to-fuchsia-700 dark:from-fuchsia-400 dark:via-pink-500 dark:to-fuchsia-600 bg-clip-text text-transparent mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] break-words px-4">{t('featured.title')}</h2>
              <p className="text-gray-100 dark:text-white max-w-xl mx-auto text-sm sm:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] break-words px-4">
                {t('featured.subtitle')}</p>
            </div>
            <FeaturedListings />
          </div>
        </section>

        {/* CTA Section with Belgrade Panorama */}
        <section className="h-screen py-20 relative overflow-hidden flex items-center snap-start snap-always">
          {/* Gradient blend from previous section */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-fuchsia-950/40 via-pink-950/30 to-transparent z-[5] pointer-events-none"></div>
          
          {/* Belgrade Panorama Background - Clean Day Image */}
          <div className="fixed inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1733561589475-2492c96283f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxncmFkZSUyMGRheSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjkxMTI4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1920"
              alt="Belgrade Panorama"
              className="w-full h-full object-cover opacity-80"
            />
            {/* White fade overlay for light mode / Dark gray for dark mode */}
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/90"></div>
          </div>
          
          {/* Content - TOP LAYER */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {t('cta.title')}
            </h2>
            <p className="text-gray-100 dark:text-white text-lg mb-8 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Kupujem i Prodajem - Prvi red */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Link
                  to="/kupujem"
                  className="w-full sm:w-56 inline-flex items-center justify-center space-x-2 bg-pink-500/40 sm:bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_10px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 hover:border-2 hover:border-pink-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t('hero.buying')}</span>
                </Link>
                <Link
                  to="/prodajem"
                  className="w-full sm:w-56 inline-flex items-center justify-center space-x-2 bg-pink-500/40 sm:bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_10px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:border-2 hover:border-pink-700 hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>{t('hero.selling')}</span>
                </Link>
              </div>
              {/* Kontaktirajte nas - Drugi red, centrirano */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full sm:w-[464px] inline-flex items-center justify-center space-x-2 bg-pink-500/40 sm:bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_10px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 hover:border-2 hover:border-pink-700 whitespace-nowrap"
              >
                <Phone className="h-5 w-5" />
                <span>{t('cta.contact')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer Section - Full Screen */}
        <section className="h-screen py-20 relative overflow-hidden flex items-center snap-start snap-always bg-white dark:bg-slate-900">
          {/* Gradient blend from previous section */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/30 to-transparent z-[5] pointer-events-none"></div>
          
          {/* Footer Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="mb-4">
                  <Logo size="md" showTagline />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm max-w-md mb-4 mt-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {t('footer.description')}
                </p>
                <div className="flex flex-col space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center space-x-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    <Mail className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    <span>agencijastepenik@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    <Phone className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    <span>+381 62 671-155</span>
                  </div>
                  <div className="flex items-center space-x-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    <MapPin className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    <span>Cara Lazara 5, 11000 Beograd, Srbija</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t('footer.quickLinks')}</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <Link to="/" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.home')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.browse')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.about')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t('footer.services')}</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <Link to="/kupujem" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.buying')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/prodajem" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.selling')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/rentiranje" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.renting')}
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {t('footer.legal')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Minimal Stats Section */}
            <div className="mt-8 pt-8 border-t border-fuchsia-300/50 dark:border-fuchsia-600/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="group cursor-default transition-all">
                  <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">2021</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t('stats.yearFounded')}</div>
                </div>
                <div className="group cursor-default transition-all">
                  <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">150+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t('stats.completedDeals')}</div>
                </div>
                <div className="group cursor-default transition-all">
                  <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">100%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t('stats.legalSupport')}</div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-fuchsia-300/50 dark:border-fuchsia-600/30 text-center text-sm text-gray-700 dark:text-gray-300">
              <p className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">&copy; 2026 Nekretnine Stepenik. {t('footer.rights')}</p>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </>
  );
}