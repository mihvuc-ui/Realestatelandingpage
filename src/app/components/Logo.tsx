import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: {
      icon: 'w-8 h-8',
      text: 'text-lg',
      tagline: 'text-xs',
      container: 'space-x-2'
    },
    md: {
      icon: 'w-10 h-10',
      text: 'text-xl',
      tagline: 'text-sm',
      container: 'space-x-3'
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-2xl',
      tagline: 'text-base',
      container: 'space-x-3'
    }
  };

  const currentSize = sizes[size];

  return (
    <Link to="/" className="flex items-center group">
      <div className={`flex items-center ${currentSize.container}`}>
        {/* Custom Icon - Istočne kapije isometric view */}
        <div className={`${currentSize.icon} relative flex-shrink-0`}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-fuchsia-600 to-fuchsia-700 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-cyan-500/30 dark:shadow-fuchsia-600/30"></div>
          
          {/* Icon SVG - Building with stepped profile (side view) */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="relative z-10 w-full h-full p-1.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Single stepped building - side profile view */}
            {/* Base/Ground level */}
            <path 
              d="M3 21 L3 17 L7 17 L7 21 Z" 
              fill="white"
              opacity="0.95"
              className="drop-shadow-sm"
            />
            
            {/* Second step */}
            <path 
              d="M7 17 L7 13 L11 13 L11 21 L7 21 Z" 
              fill="white"
              opacity="0.9"
            />
            
            {/* Third step */}
            <path 
              d="M11 13 L11 9 L15 9 L15 21 L11 21 Z" 
              fill="white"
              opacity="0.85"
            />
            
            {/* Fourth step */}
            <path 
              d="M15 9 L15 5 L19 5 L19 21 L15 21 Z" 
              fill="white"
              opacity="0.8"
            />
            
            {/* Top/Peak */}
            <path 
              d="M19 5 L19 3 L21 3 L21 21 L19 21 Z" 
              fill="white"
              opacity="0.75"
            />
            
            {/* Windows/Details */}
            <rect x="8" y="14.5" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
            <rect x="12" y="10.5" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
            <rect x="16" y="6.5" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
            
            <rect x="8" y="18" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
            <rect x="12" y="14" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
            <rect x="16" y="10" width="1.5" height="1.5" fill="rgba(6, 182, 212, 0.5)"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-black bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-fuchsia-700 dark:from-cyan-400 dark:via-fuchsia-500 dark:to-fuchsia-600 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:via-fuchsia-700 group-hover:to-fuchsia-800 dark:group-hover:from-cyan-300 dark:group-hover:via-fuchsia-400 dark:group-hover:to-fuchsia-500 transition-all duration-300`}>
            Nekretnine Stepenik
          </span>
          {showTagline && (
            <span className={`${currentSize.tagline} text-gray-600 dark:text-gray-400 -mt-1`}>
              Vaš pouzdani partner
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}