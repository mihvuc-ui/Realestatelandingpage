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
        {/* Custom Icon with Gradient */}
        <div className={`${currentSize.icon} relative flex-shrink-0`}>
          {/* Gradient Background Circle */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg"></div>
          
          {/* Icon SVG - Stairs/Steps representing "Stepenik" */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="relative z-10 w-full h-full p-1.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stairs/Steps Design */}
            <path 
              d="M3 21V19H7V15H11V11H15V7H19V3H21V21H3Z" 
              fill="white"
              className="drop-shadow-sm"
            />
            <path 
              d="M7 19H3V21H7V19Z" 
              fill="white" 
              opacity="0.9"
            />
            <path 
              d="M11 15H7V19H11V15Z" 
              fill="white" 
              opacity="0.85"
            />
            <path 
              d="M15 11H11V15H15V11Z" 
              fill="white" 
              opacity="0.8"
            />
            <path 
              d="M19 7H15V11H19V7Z" 
              fill="white" 
              opacity="0.75"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-rose-700 group-hover:via-pink-700 group-hover:to-purple-700 dark:group-hover:from-rose-300 dark:group-hover:via-pink-300 dark:group-hover:to-purple-300 transition-all duration-300`}>
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