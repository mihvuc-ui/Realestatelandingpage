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
      tagline: 'text-[9px]',
      container: 'space-x-2'
    },
    md: {
      icon: 'w-10 h-10',
      text: 'text-xl',
      tagline: 'text-[10px]',
      container: 'space-x-3'
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-3xl',
      tagline: 'text-xs',
      container: 'space-x-3'
    }
  };

  const currentSize = sizes[size];

  return (
    <Link to="/" className="flex items-center group">
      <div className={`flex items-center ${currentSize.container}`}>
        {/* Custom Icon - Istočne kapije isometric view */}
        <div className={`${currentSize.icon} relative flex-shrink-0 flex items-center justify-center`}>
          {/* Solid Pink Background */}
          <div className="absolute inset-0 bg-pink-500 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-pink-500/30 dark:shadow-pink-600/30"></div>
          
          {/* Default Icon SVG - Building with stepped profile (side view) */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="relative z-10 w-full h-full p-1.5 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Modern Stepped Building - Cleaner design */}
            {/* Base level - wider */}
            <path 
              d="M2 21 L2 16 L8 16 L8 21 Z" 
              fill="white"
              opacity="0.98"
              className="drop-shadow-md"
            />
            
            {/* Second step */}
            <path 
              d="M8 16 L8 12 L13 12 L13 21 L8 21 Z" 
              fill="white"
              opacity="0.93"
            />
            
            {/* Third step */}
            <path 
              d="M13 12 L13 8 L17 8 L17 21 L13 21 Z" 
              fill="white"
              opacity="0.88"
            />
            
            {/* Fourth step */}
            <path 
              d="M17 8 L17 4 L20 4 L20 21 L17 21 Z" 
              fill="white"
              opacity="0.83"
            />
            
            {/* Top peak - sharp */}
            <path 
              d="M20 4 L20 2 L22 2 L22 21 L20 21 Z" 
              fill="white"
              opacity="0.78"
            />
            
            {/* Accent windows - pink glow */}
            <circle cx="10.5" cy="14" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
            <circle cx="15" cy="10" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
            <circle cx="18.5" cy="6" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
            
            <circle cx="10.5" cy="18" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
            <circle cx="15" cy="15" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
            <circle cx="18.5" cy="11" r="0.8" fill="rgba(236, 72, 153, 0.6)" className="drop-shadow-lg"/>
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
          <span className={`${currentSize.text} font-normal text-gray-700 dark:text-gray-700 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-all duration-300 whitespace-nowrap lowercase`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
            nekretnine<span style={{ textShadow: '0 0 8px rgba(236, 72, 153, 0.5)' }}>stepenik</span>
          </span>
          {showTagline && (
            <span className={`${currentSize.tagline} font-extralight text-gray-600 dark:text-gray-400 -mt-1`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Pravi stepenik između ponude i promišljene odluke
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}