import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="md" showTagline />
            <p className="text-muted-foreground text-sm max-w-md mb-6 mt-5 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex flex-col space-y-3 text-sm text-foreground/80">
              <a href="mailto:agencijastepenik@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>agencijastepenik@gmail.com</span>
              </a>
              <a href="tel:+38162671155" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span>+381 62 671-155</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Cara Lazara 5, 11000 Beograd, Srbija</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">{t('footer.home')}</Link></li>
              <li><Link to="/browse" className="hover:text-primary transition-colors">{t('footer.browse')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('footer.about')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/kupujem" className="hover:text-primary transition-colors">{t('footer.buying')}</Link></li>
              <li><Link to="/prodajem" className="hover:text-primary transition-colors">{t('footer.selling')}</Link></li>
              <li><Link to="/rentiranje" className="hover:text-primary transition-colors">{t('footer.renting')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 pt-10 border-t border-border grid grid-cols-3 gap-6 text-center">
          {[
            { value: '2021', label: t('stats.yearFounded') },
            { value: '150+', label: t('stats.completedDeals') },
            { value: '100%', label: t('stats.legalSupport') },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-1">{s.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Nekretnine Stepenik. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
