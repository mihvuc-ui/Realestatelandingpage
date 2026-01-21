import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { BrowseListings } from '@/app/pages/BrowseListings';
import { ListingDetail } from '@/app/pages/ListingDetail';
import { About } from '@/app/pages/About';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { ImageReorder } from '@/app/components/ImageReorder';
import { ContactModal } from '@/app/components/ContactModal';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
            <Header />
            <ContactModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseListings />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/image-reorder" element={<ImageReorder />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}