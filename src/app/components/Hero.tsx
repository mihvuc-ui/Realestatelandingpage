import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [dealType, setDealType] = useState<'sale' | 'rent'>('sale');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (dealType === 'rent') {
      navigate(`/rentiranje${params.toString() ? `?${params}` : ''}`);
    } else {
      params.set('type', 'sale');
      navigate(`/browse?${params}`);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
          alt="Moderan svetao enterijer dnevne sobe — Nekretnine Stepenik Beograd"
          className="w-full h-full object-cover"
        />
        {/* Legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-stone-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            {t('hero.badge')}
          </span>

          <h1 className="text-white mb-5 [font-size:clamp(2.5rem,6vw,4.5rem)]">
            {t('hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-white/85 max-w-xl mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Search card */}
          <form
            onSubmit={handleSearch}
            className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 sm:p-4 border border-white/10"
          >
            {/* Deal type segmented control */}
            <div className="inline-flex p-1 rounded-full bg-secondary mb-3">
              <button
                type="button"
                onClick={() => setDealType('sale')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  dealType === 'sale'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('filters.sale')}
              </button>
              <button
                type="button"
                onClick={() => setDealType('rent')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  dealType === 'rent'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('filters.rent')}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 rounded-xl bg-secondary border border-border focus-within:border-primary transition-colors">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('buying.locationPlaceholder')}
                  className="w-full bg-transparent py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                <Search className="h-5 w-5" />
                {t('filters.search')}
              </button>
            </div>
          </form>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 text-white">
            <div>
              <span className="text-2xl font-display font-semibold">150+</span>
              <span className="block text-xs text-white/70">{t('stats.completedDeals')}</span>
            </div>
            <div className="w-px h-9 bg-white/20 hidden sm:block" />
            <div>
              <span className="text-2xl font-display font-semibold">2021</span>
              <span className="block text-xs text-white/70">{t('stats.yearFounded')}</span>
            </div>
            <div className="w-px h-9 bg-white/20 hidden sm:block" />
            <div>
              <span className="text-2xl font-display font-semibold">100%</span>
              <span className="block text-xs text-white/70">{t('stats.legalSupport')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
