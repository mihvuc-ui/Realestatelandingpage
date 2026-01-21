import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ContactModal } from '@/app/components/ContactModal';
import { Logo } from '@/app/components/Logo';
import { LanguageSelector } from '@/app/components/LanguageSelector';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [mouseY, setMouseY] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      
      // On homepage with mobile, hide header when scrolled past first section (viewport height)
      if (isHomePage && isMobile && window.scrollY > window.innerHeight) {
        setIsHeaderVisible(false);
      } else if (isHomePage && !isMobile && window.scrollY > 100) {
        // Desktop: hide header when scrolled down
        setIsHeaderVisible(false);
      } else if (!isHomePage) {
        setIsHeaderVisible(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
      
      // Only apply mouse hover logic on desktop
      const isMobile = window.innerWidth < 768;
      
      // Show header when mouse is near the top (within 100px) on homepage and desktop
      if (isHomePage && !isMobile && e.clientY < 100) {
        setIsHeaderVisible(true);
      } else if (isHomePage && !isMobile && window.scrollY > 100) {
        setIsHeaderVisible(false);
      }
    };

    // Handle touch on mobile - show header on touch at top
    const handleTouchStart = (e: TouchEvent) => {
      const isMobile = window.innerWidth < 768;
      if (isHomePage && isMobile && e.touches[0].clientY < 100) {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isHomePage]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 dark:bg-black/95 border-b-2 border-fuchsia-500 dark:border-fuchsia-600 transition-all duration-500 ${
      scrolled ? 'shadow-lg shadow-fuchsia-500/20 dark:shadow-fuchsia-600/30' : ''
    } ${
      isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-base font-light transition-all duration-300 ${
                isActive('/') ? 'text-fuchsia-500 dark:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-gray-700 dark:text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/browse"
              className={`text-base font-light transition-all duration-300 ${
                isActive('/browse') ? 'text-fuchsia-500 dark:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-gray-700 dark:text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]'
              }`}
            >
              {t('nav.browse')}
            </Link>
            <Link
              to="/kupujem"
              className={`text-base font-light transition-all duration-300 ${
                isActive('/kupujem') ? 'text-fuchsia-500 dark:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-gray-700 dark:text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]'
              }`}
            >
              Kupujem
            </Link>
            <Link
              to="/prodajem"
              className={`text-base font-light transition-all duration-300 ${
                isActive('/prodajem') ? 'text-fuchsia-500 dark:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-gray-700 dark:text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]'
              }`}
            >
              Prodajem
            </Link>
            <Link
              to="/about"
              className={`text-base font-light transition-all duration-300 ${
                isActive('/about') ? 'text-fuchsia-500 dark:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-gray-700 dark:text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]'
              }`}
            >
              {t('nav.about')}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-fuchsia-100 dark:bg-slate-800 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-200 dark:hover:bg-slate-700 transition-colors shadow-sm border-2 border-fuchsia-400/30 dark:border-fuchsia-500/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-fuchsia-600/30 hover:shadow-lg hover:shadow-fuchsia-600/40 border-2 border-fuchsia-500/30"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-fuchsia-400/30 dark:border-fuchsia-600/30">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/') ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/browse"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/browse') ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                {t('nav.browse')}
              </Link>
              <Link
                to="/kupujem"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/kupujem') ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                Kupujem
              </Link>
              <Link
                to="/prodajem"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/prodajem') ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                Prodajem
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/about') ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                {t('nav.about')}
              </Link>
              
              {/* Language Selector Mobile */}
              <div className="py-2">
                <LanguageSelector />
              </div>
              
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-sm py-2 text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300 transition-colors font-semibold"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>{t('nav.lightTheme')}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>{t('nav.darkTheme')}</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-4 py-2 rounded-lg text-sm font-bold text-center transition-all shadow-md shadow-fuchsia-600/30 border-2 border-fuchsia-500/30"
              >
                {t('nav.contact')}
              </button>
            </nav>
          </div>
        )}
      </nav>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </header>
  );
}