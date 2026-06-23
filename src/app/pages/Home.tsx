import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { AutoScrollThumbnails } from '@/app/components/AutoScrollThumbnails';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  Phone,
  ShoppingCart,
  TrendingUp,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Scale,
  HeartHandshake,
  Award,
} from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { Footer } from '@/app/components/Footer';
import { SEO } from '@/app/components/SEO';
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, FAQSchema } from '@/app/components/SchemaMarkup';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  const faqs = [
    {
      question: 'Da li vaša agencija pruža pravnu podršku?',
      answer: 'Da, pružamo potpunu pravnu podršku tokom celog procesa kupovine ili prodaje nekretnine. Naš tim vas vodi kroz svu potrebnu dokumentaciju.',
    },
    {
      question: 'Kolika je provizija agencije?',
      answer: 'Naša provizija je konkurentna i zavisi od tipa transakcije. Kontaktirajte nas za detalje o ceni za vašu specifičnu situaciju.',
    },
    {
      question: 'Da li mogu da zakažem razgledanje stana?',
      answer: 'Da, možete zakazati razgledanje direktno preko našeg sajta ili nas kontaktirati telefonom na +381 62 671 155.',
    },
    {
      question: 'Koje lokacije pokrivate?',
      answer: 'Pokrivamo sve opštine Beograda i okolne gradove, uključujući Novi Beograd, Zvezdara, Vračar, Savski Venac i druge.',
    },
    {
      question: 'Koliko dugo traje proces kupovine nekretnine?',
      answer: 'Proces obično traje između 30-60 dana, zavisno od dokumentacije i pravne provere. Mi olakšavamo ceo proces i brinemo o svim detaljima.',
    },
  ];

  const services = [
    { to: '/kupujem', icon: ShoppingCart, title: t('nav.buying'), desc: t('buying.subtitle') },
    { to: '/prodajem', icon: TrendingUp, title: t('nav.selling'), desc: t('selling.subtitle') },
    { to: '/rentiranje', icon: KeyRound, title: t('nav.renting'), desc: t('rentiranje.subtitle') },
  ];

  const benefits = [
    { icon: Award, title: t('about.experienced'), desc: t('about.experiencedDesc') },
    { icon: Scale, title: t('about.legal'), desc: t('about.legalDesc') },
    { icon: HeartHandshake, title: t('about.support'), desc: t('about.supportDesc') },
    { icon: ShieldCheck, title: t('about.trust'), desc: t('about.trustDesc') },
  ];

  return (
    <>
      <SEO
        title="Nekretnine Beograd - Prodaja i Izdavanje Stanova | Agencija Stepenik"
        description="Nekretnine u Beogradu - Agencija Stepenik. Stanovi, kuće i poslovni prostori. Prodaja stanova Beograd, izdavanje stanova, nekretnine Zvezdara, Vračar, Novi Beograd. Preko 150 uspešno završenih poslova. Pozovite: 062 671 155"
        keywords="nekretnine, nekretnine beograd, prodaja stanova beograd, agencija stepenik, stepenik nekretnine, stanovi beograd, izdavanje stanova, kupovina stana, stan na prodaju, agencija za nekretnine"
        canonical="/"
      />

      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <FAQSchema faqs={faqs} />

      <Hero />

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {t('footer.services')}
          </p>
          <h2 className="text-foreground">{t('about.subtitle')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative flex flex-col p-7 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-primary flex items-center justify-center mb-5">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">{s.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {t('listing.viewDetails')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {t('featured.viewAll')}
              </p>
              <h2 className="text-foreground mb-3">{t('featured.title')}</h2>
              <p className="text-muted-foreground">{t('featured.subtitle')}</p>
            </div>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-secondary">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1745596536494-9d32ffb89302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Moderna zgrada u Beogradu — Nekretnine Stepenik"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-card border border-border rounded-2xl shadow-xl p-5 w-44">
              <p className="text-3xl font-display font-semibold text-primary">150+</p>
              <p className="text-sm text-muted-foreground">{t('stats.completedDeals')}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {t('about.title')}
            </p>
            <h2 className="text-foreground mb-4">{t('about.whyUs')}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t('about.missionText')}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-primary flex items-center justify-center">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-1">{b.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Elegantan enterijer — Nekretnine Stepenik"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 to-stone-950/55" />
          <div className="relative z-10 px-6 sm:px-12 py-16 lg:py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-white mb-4">{t('cta.title')}</h2>
            <p className="text-white/80 text-base sm:text-lg mb-8">{t('cta.subtitle')}</p>

            <div className="flex flex-col items-center gap-10">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                <Phone className="h-5 w-5" />
                {t('cta.contact')}
              </button>

              <div className="w-full">
                <AutoScrollThumbnails />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}
