'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecentSearch } from '@/types';
import { getRecentSearches, clearRecentSearches, generateSearchUrl, formatRelativeTime } from '@/lib/utils';

export default function RecentSearches() {
  const router = useRouter();
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  
  useEffect(() => {
    setSearches(getRecentSearches());
  }, []);
  
  const handleClearSearches = () => {
    clearRecentSearches();
    setSearches([]);
  };
  
  const handleSearchClick = (search: RecentSearch) => {
    router.push(generateSearchUrl(search.params));
  };
  
  if (searches.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Recent Searches</h3>
        <button
          onClick={handleClearSearches}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {searches.map((search) => (
          <div 
            key={search.id}
            onClick={() => handleSearchClick(search)}
            className="p-3 bg-white dark:bg-secondary-600 rounded-md shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          >
            <div className="font-medium truncate">{search.params.name}</div>
            <div className="flex justify-between text-sm mt-1">
              <div className="text-gray-500 dark:text-gray-400">
                {search.params.float !== undefined && 
                  `Float: ${search.params.float}`}
                {search.params.wear && 
                  `${search.params.float !== undefined ? ' • ' : ''}Wear: ${search.params.wear}`}
                {search.params.phase && 
                  ` • Phase: ${search.params.phase}`}
              </div>
              <div className="text-gray-400 dark:text-gray-500">
                {formatRelativeTime(search.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}