import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/50 dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <Hero />

      {/* Featured Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Istaknute Nekretnine</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pogledajte naše najbolje trenutno dostupne nekretnine za prodaju i izdavanje
            </p>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 relative overflow-hidden">
        {/* Subtle accent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/5 via-purple-600/5 to-pink-600/5"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronađimo Zajedno Vaš Savršeni Dom
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas danas i otkrijte kako možemo pomoći u ostvarivanju vaših želja za nekretninom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/browse"
              className="inline-block bg-white text-rose-600 hover:bg-rose-50 px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Pogledajte Ponudu
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block bg-rose-700 text-white hover:bg-rose-800 px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-white/20"
            >
              Kontaktirajte Nas
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}