'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SkinSearchParams, wearCategories, phaseOptions } from '@/types';
import { saveRecentSearch, generateSearchUrl } from '@/lib/utils';

export default function SearchForm() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SkinSearchParams>({
    name: '',
    float: undefined,
    phase: undefined,
    wear: undefined,
    maxPrice: undefined,
    limit: 50,
  });
  
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchParams.name.trim()) return;
    
    setIsSubmitting(true);
    
    // Save to recent searches
    saveRecentSearch(searchParams);
    
    // Navigate to results page
    router.push(generateSearchUrl(searchParams));
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle numeric inputs
    if (type === 'number') {
      setSearchParams({
        ...searchParams,
        [name]: value ? parseFloat(value) : undefined,
      });
    } else {
      setSearchParams({
        ...searchParams,
        [name]: value,
      });
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main search input */}
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="name"
            placeholder="Enter skin name (e.g., Karambit | Doppler)"
            value={searchParams.name}
            onChange={handleInputChange}
            className="input-field flex-1"
            required
          />
          <button 
            type="submit" 
            className="btn-primary md:w-auto w-full"
            disabled={isSubmitting || !searchParams.name.trim()}
          >
            {isSubmitting ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {/* Advanced search toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setAdvancedMode(!advancedMode)}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            {advancedMode ? '- Hide Advanced Options' : '+ Show Advanced Options'}
          </button>
        </div>
        
        {/* Advanced search options */}
        {advancedMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-secondary-700 rounded-lg">
            {/* Float value */}
            <div>
              <label className="block text-sm font-medium mb-1">Float Value</label>
              <input
                type="number"
                name="float"
                placeholder="e.g., 0.03"
                value={searchParams.float || ''}
                onChange={handleInputChange}
                min="0"
                max="1"
                step="0.001"
                className="input-field w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Float range: 0.00 - 1.00
              </p>
            </div>
            
            {/* Wear selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Wear</label>
              <select
                name="wear"
                value={searchParams.wear || ''}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Any wear</option>
                {wearCategories.map(wear => (
                  <option key={wear} value={wear}>
                    {wear}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Phase (for Doppler) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phase (for Doppler)
              </label>
              <select
                name="phase"
                value={searchParams.phase || ''}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Any phase</option>
                {phaseOptions.map(phase => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Max price */}
            <div>
              <label className="block text-sm font-medium mb-1">Max Price (USD)</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="e.g., 1000"
                value={searchParams.maxPrice || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="input-field w-full"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}