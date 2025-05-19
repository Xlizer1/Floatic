import { RecentSearch, SkinSearchParams } from '@/types';

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    RUB: '₽',
    CNY: '¥'
  };

  const symbol = currencySymbols[currency] || currency;
  
  return `${symbol}${price.toFixed(2)}`;
}

/**
 * Format float value to limited decimal places
 */
export function formatFloat(float: number | null | undefined): string {
  if (float === null || float === undefined) return 'N/A';
  return float.toFixed(4);
}

/**
 * Format relative time (e.g., "2 mins ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Convert to seconds
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
  
  // Convert to minutes
  const minutes = Math.floor(seconds / 60);
  
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  
  // Convert to hours
  const hours = Math.floor(minutes / 60);
  
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  
  // Convert to days
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

// Local Storage Keys
const RECENT_SEARCHES_KEY = 'cs2_recent_searches';
const FAVORITES_KEY = 'cs2_favorites';
const MAX_RECENT_SEARCHES = 10;

/**
 * Save a search to recent searches in localStorage
 */
export function saveRecentSearch(params: SkinSearchParams): void {
  try {
    // Skip empty searches
    if (!params.name) return;
    
    const id = `${Date.now()}`;
    const newSearch: RecentSearch = {
      id,
      params,
      timestamp: Date.now()
    };
    
    const existingSearchesJson = localStorage.getItem(RECENT_SEARCHES_KEY);
    const existingSearches: RecentSearch[] = existingSearchesJson 
      ? JSON.parse(existingSearchesJson) 
      : [];
      
    // Filter out duplicate searches (same skin name and float)
    const filteredSearches = existingSearches.filter(search => 
      !(search.params.name.toLowerCase() === params.name.toLowerCase() && 
        search.params.float === params.float)
    );
    
    // Add new search to the beginning
    const updatedSearches = [newSearch, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
}

/**
 * Get recent searches from localStorage
 */
export function getRecentSearches(): RecentSearch[] {
  try {
    const searchesJson = localStorage.getItem(RECENT_SEARCHES_KEY);
    return searchesJson ? JSON.parse(searchesJson) : [];
  } catch (error) {
    console.error('Error getting recent searches:', error);
    return [];
  }
}

/**
 * Clear all recent searches
 */
export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
}

/**
 * Toggle a skin as favorite
 */
export function toggleFavoriteSkin(skinName: string): boolean {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = favoritesJson ? JSON.parse(favoritesJson) : [];
    
    const index = favorites.indexOf(skinName);
    
    if (index >= 0) {
      // Remove from favorites
      favorites.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return false;
    } else {
      // Add to favorites
      favorites.push(skinName);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite skin:', error);
    return false;
  }
}

/**
 * Check if a skin is in favorites
 */
export function isSkinFavorite(skinName: string): boolean {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = favoritesJson ? JSON.parse(favoritesJson) : [];
    
    return favorites.includes(skinName);
  } catch (error) {
    console.error('Error checking if skin is favorite:', error);
    return false;
  }
}

/**
 * Get all favorite skins
 */
export function getFavoriteSkins(): string[] {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorite skins:', error);
    return [];
  }
}

/**
 * Generate a search URL from params
 */
export function generateSearchUrl(params: SkinSearchParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.name) searchParams.set('skin', params.name);
  if (params.float !== undefined) searchParams.set('float', params.float.toString());
  if (params.phase) searchParams.set('phase', params.phase);
  if (params.wear) searchParams.set('wear', params.wear);
  if (params.maxPrice !== undefined) searchParams.set('maxPrice', params.maxPrice.toString());
  
  return `/results?${searchParams.toString()}`;
}