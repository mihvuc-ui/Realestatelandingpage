import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from '@/app/components/Logo';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-rose-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo size="md" showTagline />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-4 mt-6">
              Vaša pouzdana agencija za nekretnine. Pratimo vas od početka do kraja, sa pravnom podrškom našeg advokatskog tima.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                <span>agencijastepenik@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                <span>+381 62 671-155</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                <span>Cara Lazara 5, 11000 Beograd, Srbija</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Brzi Linkovi</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Početna
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Ponuda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  O Nama
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Naše Usluge</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Kupovina Nekretnina
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Prodaja Nekretnina
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Iznajmljivanje
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Pravna Podrška
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-rose-200 dark:border-slate-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Nekretnine Stepenik. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}