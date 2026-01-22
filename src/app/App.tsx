import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { BrowseListings } from '@/app/pages/BrowseListings';
import { ListingDetail } from '@/app/pages/ListingDetail';
import { About } from '@/app/pages/About';
import { Kupujem } from '@/app/pages/Kupujem';
import { Prodajem } from '@/app/pages/Prodajem';
import { Rentiranje } from '@/app/pages/Rentiranje';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { ImageReorder } from '@/app/components/ImageReorder';
import { ContactModal } from '@/app/components/ContactModal';
import { OrganizationSchema } from '@/app/components/SchemaMarkup';
import { Toaster } from '@/app/components/ui/sonner';
import { useEffect, useState } from 'react';

function AppContent() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  // Check if current page is Home to hide footer
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors flex flex-col">
      <OrganizationSchema />
      <Header />
      <main 
        className={`flex-grow transition-opacity duration-500 ease-in-out ${
          transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
        }`}
        onTransitionEnd={() => {
          if (transitionStage === 'fadeOut') {
            setDisplayLocation(location);
            setTransitionStage('fadeIn');
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseListings />} />
          <Route path="/rentiranje" element={<Rentiranje />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/kupujem" element={<Kupujem />} />
          <Route path="/prodajem" element={<Prodajem />} />
          <Route path="/image-reorder" element={<ImageReorder />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppContent />
            <Toaster richColors position="top-center" />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}