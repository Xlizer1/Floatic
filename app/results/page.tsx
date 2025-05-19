'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ApiResponse, SkinSearchParams, MarketListing } from '@/types';
import { fetchCheapestListings } from '@/lib/api';
import { saveRecentSearch } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';
import ListingSkeleton from '@/components/ListingSkeleton';
import SearchForm from '@/components/SearchForm';

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortedListings, setSortedListings] = useState<MarketListing[]>([]);
  
  // Extract search parameters
  const queryParams: SkinSearchParams = {
    name: searchParams.get('skin') || '',
    float: searchParams.get('float') ? parseFloat(searchParams.get('float')!) : undefined,
    phase: searchParams.get('phase') || undefined,
    wear: searchParams.get('wear') || undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50,
  };
  
  // Fetch data using SWR
  const { data, error, isLoading } = useSWR(
    // Only fetch if we have a skin name
    queryParams.name ? ['cheapestListings', queryParams] : null,
    () => fetchCheapestListings(queryParams),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds
    }
  );
  
  // Save search to recent searches (on first load only)
  useEffect(() => {
    if (queryParams.name) {
      saveRecentSearch(queryParams);
    }
  }, []);
  
  // Handle sorting (price, float, etc.)
  const [sortBy, setSortBy] = useState<'price' | 'float' | 'updated'>('price');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Update sorted listings when data changes or sort options change
  useEffect(() => {
    if (!data?.listings) return;
    
    const listings = [...data.listings];
    
    // Sort by selected field
    listings.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return sortDirection === 'asc' 
            ? a.price_usd - b.price_usd 
            : b.price_usd - a.price_usd;
        case 'float':
          const aFloat = a.float || 1;
          const bFloat = b.float || 1;
          return sortDirection === 'asc' ? aFloat - bFloat : bFloat - aFloat;
        case 'updated':
          return sortDirection === 'asc'
            ? a.updated_at - b.updated_at
            : b.updated_at - a.updated_at;
        default:
          return 0;
      }
    });
    
    setSortedListings(listings);
  }, [data, sortBy, sortDirection]);
  
  // Handle sort change
  const handleSortChange = (field: 'price' | 'float' | 'updated') => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default direction
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Back to search
  const handleBackToSearch = () => {
    router.push('/');
  };
  
  // Sort button helper component
  const SortButton = ({ field, label }: { field: 'price' | 'float' | 'updated', label: string }) => (
    <button
      onClick={() => handleSortChange(field)}
      className={`px-3 py-1 text-sm rounded border ${
        sortBy === field
          ? 'bg-primary-500 text-white border-primary-500'
          : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-secondary-700 dark:text-gray-300 dark:border-secondary-600'
      }`}
    >
      {label} {sortBy === field && (sortDirection === 'asc' ? '↓' : '↑')}
    </button>
  );
  
  return (
    <main className="container mx-auto p-4 md:p-8">
      {/* Back button and search summary */}
      <div className="mb-6">
        <button 
          onClick={handleBackToSearch}
          className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
        >
          ← Back to Search
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold mt-4">
          Results for "{queryParams.name}"
        </h1>
        
        <div className="text-gray-600 dark:text-gray-300 mt-1">
          {queryParams.float !== undefined && (
            <span className="mr-3">Float: {queryParams.float}</span>
          )}
          {queryParams.wear && (
            <span className="mr-3">Wear: {queryParams.wear}</span>
          )}
          {queryParams.phase && (
            <span className="mr-3">Phase: {queryParams.phase}</span>
          )}
          {queryParams.maxPrice !== undefined && (
            <span>Max Price: ${queryParams.maxPrice}</span>
          )}
        </div>
      </div>
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-700 dark:text-red-400 mb-6">
          <h3 className="font-medium mb-1">Error fetching listings</h3>
          <p>{error.message || "An unknown error occurred. Please try again."}</p>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-medium">Loading listings...</div>
            <div className="animate-pulse h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <ListingSkeleton count={5} />
        </div>
      )}
      
      {/* Results */}
      {!isLoading && data && (
        <div>
          {/* Results info and sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
            <div>
              <div className="text-xl font-medium">
                {data.listings.length} Listings Found
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {data.cached ? 'Cached results' : 'Fresh results'} | 
                Response time: {data.metrics.responseTime}ms |
                Sources: {data.markets.join(', ')}
              </div>
            </div>
            
            {/* Sort options */}
            <div className="flex space-x-2">
              <span className="text-gray-600 dark:text-gray-300 self-center text-sm mr-1">Sort:</span>
              <SortButton field="price" label="Price" />
              <SortButton field="float" label="Float" />
              <SortButton field="updated" label="Updated" />
            </div>
          </div>
          
          {/* Listings grid */}
          <div className="space-y-4">
            {sortedListings.length > 0 ? (
              sortedListings.map((listing) => (
                <ListingCard key={`${listing.market}-${listing.extra?.offerId || Math.random()}`} listing={listing} />
              ))
            ) : (
              <div className="card text-center py-8">
                <h3 className="text-xl font-medium mb-2">No listings found</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search criteria or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}