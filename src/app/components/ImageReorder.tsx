import { apartments } from '@/data/apartments';

export function ImageReorder() {
  const apartment = apartments[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Slike oglasa - {apartment.name}
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Kliknite na bilo koju sliku da je vidite u punoj veličini. Zapamtite broj slike koju želite kao glavnu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartment.images.map((image, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={image}
                  alt={`Slika ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(image, '_blank')}
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-2">
                  Slika #{index + 1}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-all font-mono">
                  {image}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
