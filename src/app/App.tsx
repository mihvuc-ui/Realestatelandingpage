import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { BrowseListings } from '@/app/pages/BrowseListings';
import { ListingDetail } from '@/app/pages/ListingDetail';
import { About } from '@/app/pages/About';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { ImageReorder } from '@/app/components/ImageReorder';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/50 to-purple-50/50 dark:bg-slate-950 transition-colors">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseListings />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/image-reorder" element={<ImageReorder />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}