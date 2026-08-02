import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, Heart, Share2, Calendar, ArrowUpRight } from 'lucide-react';
import type { Apartment } from '@/data/apartments';
import { UI, type Lang } from './miaContent';
import { isFavorite, toggleFavorite } from './miaUtils';

interface Props {
  apartment: Apartment;
  lang: Lang;
  onSchedule: (apt: Apartment) => void;
  onClose: () => void;
}

export function MiaPropertyCard({ apartment, lang, onSchedule, onClose }: Props) {
  const t = UI[lang];
  const navigate = useNavigate();
  const [fav, setFav] = useState(isFavorite(apartment.id));

  const price = `€${apartment.price.toLocaleString()}${
    apartment.type === 'rent' ? (lang === 'sr' ? '/mes' : '/mo') : ''
  }`;

  const handleShare = async () => {
    const url = `${window.location.origin}/listing/${apartment.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: apartment.name, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* korisnik otkazao deljenje */
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card/80 backdrop-blur-sm shadow-sm">
      <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
        {apartment.images?.[0] && (
          <img
            src={apartment.images[0]}
            alt={apartment.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900/70 text-white backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          {apartment.location.split(' - ')[0]}
        </span>
        <span className="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-stone-900/90 text-foreground text-sm font-bold shadow-sm">
          {price}
        </span>
        <button
          onClick={() => setFav(toggleFavorite(apartment.id))}
          aria-label={t.save}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-stone-900/80 text-foreground hover:scale-110 transition-transform"
        >
          <Heart className={`h-4 w-4 ${fav ? 'fill-primary text-primary' : ''}`} />
        </button>
      </div>

      <div className="p-3">
        <h4 className="text-sm font-semibold text-foreground line-clamp-1">{apartment.name}</h4>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          {apartment.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {apartment.bedrooms}
            </span>
          )}
          {apartment.bathrooms > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {apartment.bathrooms}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {apartment.squareMeters} m²
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => {
              onClose();
              navigate(`/listing/${apartment.id}`);
            }}
            className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.viewDetails}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onSchedule(apartment)}
            className="inline-flex items-center justify-center gap-1 border border-border bg-secondary text-foreground text-xs font-semibold py-2 rounded-lg hover:bg-secondary/70 transition-colors"
          >
            <Calendar className="h-3.5 w-3.5" />
            {t.schedule}
          </button>
        </div>
        <button
          onClick={handleShare}
          className="mt-2 w-full inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          {t.share}
        </button>
      </div>
    </div>
  );
}
