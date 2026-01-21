import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: {
      icon: 'w-8 h-8',
      text: 'text-xl',
      tagline: 'text-xs',
      container: 'space-x-2'
    },
    md: {
      icon: 'w-10 h-10',
      text: 'text-2xl',
      tagline: 'text-sm',
      container: 'space-x-3'
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-3xl',
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
          {/* Solid Pink Background */}
          <div className="absolute inset-0 bg-pink-500 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-pink-500/30 dark:shadow-pink-600/30"></div>
          
          {/* Default Icon SVG - Building with stepped profile (side view) */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="relative z-10 w-full h-full p-1.5 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
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
            <rect x="8" y="14.5" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
            <rect x="12" y="10.5" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
            <rect x="16" y="6.5" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
            
            <rect x="8" y="18" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
            <rect x="12" y="14" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
            <rect x="16" y="10" width="1.5" height="1.5" fill="rgba(236, 72, 153, 0.5)"/>
          </svg>

          {/* Hover Icon SVG - 3D Isometric Stairs (3 steps) */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="absolute inset-0 z-10 w-full h-full p-1.5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 3D Isometric Stairs - 3 Steps in Perspective */}
            
            {/* First Step (Bottom) */}
            {/* Top face */}
            <path 
              d="M4 16 L9 13 L14 16 L9 19 Z" 
              fill="white"
              opacity="0.95"
            />
            {/* Right face */}
            <path 
              d="M14 16 L14 18 L9 21 L9 19 Z" 
              fill="white"
              opacity="0.7"
            />
            {/* Left face */}
            <path 
              d="M4 16 L4 18 L9 21 L9 19 Z" 
              fill="white"
              opacity="0.85"
            />
            
            {/* Second Step (Middle) */}
            {/* Top face */}
            <path 
              d="M6 12 L11 9 L16 12 L11 15 Z" 
              fill="white"
              opacity="0.95"
            />
            {/* Right face */}
            <path 
              d="M16 12 L16 14 L11 17 L11 15 Z" 
              fill="white"
              opacity="0.7"
            />
            {/* Left face */}
            <path 
              d="M6 12 L6 14 L11 17 L11 15 Z" 
              fill="white"
              opacity="0.85"
            />
            
            {/* Third Step (Top) */}
            {/* Top face */}
            <path 
              d="M8 8 L13 5 L18 8 L13 11 Z" 
              fill="white"
              opacity="0.95"
            />
            {/* Right face */}
            <path 
              d="M18 8 L18 10 L13 13 L13 11 Z" 
              fill="white"
              opacity="0.7"
            />
            {/* Left face */}
            <path 
              d="M8 8 L8 10 L13 13 L13 11 Z" 
              fill="white"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-light text-pink-500 dark:text-pink-500 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-all duration-300`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Nekretnine Stepenik
          </span>
          {showTagline && (
            <span className={`${currentSize.tagline} text-gray-600 dark:text-gray-400 -mt-1`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Vaš pouzdani partner
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}