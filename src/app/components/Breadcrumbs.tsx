import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors flex items-center"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url} 
                className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
