import SearchForm from '@/components/SearchForm';
import RecentSearches from '@/components/RecentSearches';

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          CS2 Skin Price Aggregator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-8">
          Find the best deals across multiple marketplaces. Compare prices from CSFloat, DMarket, and more.
        </p>
        
        <SearchForm />
        <RecentSearches />
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Feature cards */}
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Real-time Aggregation</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get the most current prices from multiple marketplaces in one search.
          </p>
        </div>
        
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Detailed Filtering</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Filter by float value, wear, phase, and more to find exactly what you want.
          </p>
        </div>
        
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Price Comparison</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All prices normalized to USD for easy comparison across different marketplaces.
          </p>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>
          CS2 Skin Price Aggregator © {new Date().getFullYear()}
        </p>
        <p className="mt-1">
          Not affiliated with Valve Corporation or any marketplace.
        </p>
      </footer>
    </main>
  );
}