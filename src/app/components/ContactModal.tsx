import { X, User, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Track initial scroll position when modal opens
    const initialScrollY = window.scrollY;
    setScrollY(initialScrollY);

    // Handle scroll to close modal
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - initialScrollY);
      
      // Close modal if user scrolls more than 150px
      if (scrollDifference > 150) {
        onClose();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-border transition-colors animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-all z-10 p-2 hover:bg-secondary rounded-full hover:rotate-90 duration-300"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-4 rounded-full">
            <Phone className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl text-foreground text-center mb-2">
          Kontaktirajte nas
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Pozovite nas za sve informacije
        </p>

        {/* Contact Info */}
        <div className="bg-secondary rounded-xl p-6 mb-6 border border-border">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Agent</p>
              <p className="font-semibold text-foreground">Branka Gojković</p>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-3" />
            <a
              href="tel:+38162671155"
              className="font-semibold text-lg text-foreground hover:text-primary transition-colors"
            >
              +381 62 671 155
            </a>
          </div>
        </div>

        {/* Call Button */}
        <a
          href="tel:+38162671155"
          className="block w-full bg-primary text-primary-foreground text-center py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
        >
          Pozovi Odmah
        </a>
      </div>
    </div>
  );
}