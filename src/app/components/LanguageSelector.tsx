import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { SerbiaFlag } from '@/app/components/flags/SerbiaFlag';
import { UKFlag } from '@/app/components/flags/UKFlag';
import { RussiaFlag } from '@/app/components/flags/RussiaFlag';
import { TurkeyFlag } from '@/app/components/flags/TurkeyFlag';

type Language = 'sr' | 'en' | 'ru' | 'tr';

interface LanguageOption {
  code: Language;
  name: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

const languages: LanguageOption[] = [
  { code: 'sr', name: 'Srpski', FlagComponent: SerbiaFlag },
  { code: 'en', name: 'English', FlagComponent: UKFlag },
  { code: 'ru', name: 'Русский', FlagComponent: RussiaFlag },
  { code: 'tr', name: 'Türkçe', FlagComponent: TurkeyFlag },
];

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Izaberi jezik"
      >
        {currentLanguage && <currentLanguage.FlagComponent className="w-6 h-4 rounded-[3px]" />}
      </button>

      {isOpen && (
        <div className={`absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 w-14 bg-popover rounded-xl shadow-xl border border-border py-1.5 z-50`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-center px-2 py-2 hover:bg-secondary transition-colors ${
                language === lang.code ? 'bg-secondary' : ''
              }`}
            >
              <lang.FlagComponent className="w-6 h-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}