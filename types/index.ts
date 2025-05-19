// Types for CS2 Skin Price Aggregator

// The standard marketplace listing format
export interface MarketListing {
  market: string;        // Marketplace name (e.g., "Skinport", "CSFloat")
  price: number;         // Original price in the marketplace's currency
  price_usd: number;     // Price converted to USD
  float?: number | null; // Float value of the skin (optional)
  url: string;           // Direct URL to the listing
  currency: string;      // Original currency code (e.g., "EUR", "USD")
  name: string;          // Full name of the skin
  image_url?: string;    // URL to the skin image (optional)
  phase?: string | null; // For Doppler and similar skins with phases (optional)
  wear?: string;         // Wear category (e.g., "Factory New", "Minimal Wear")
  updated_at: number;    // Timestamp when this listing was fetched
  extra?: {              // Additional marketplace-specific data
    tradeLockDuration?: number;  // Trade lock duration in days
    tradable?: boolean;          // Whether the item is tradable
    offerId?: string;            // Offer ID on the marketplace
    paintSeed?: number;          // Paint seed value
    inspectLink?: string;        // In-game inspect link
    stickers?: Array<{           // Stickers on the item
      name: string;
      slot: number;
      icon_url?: string;
    }>;
    [key: string]: any;          // Other marketplace-specific properties
  };
}

// Parameters for skin search
export interface SkinSearchParams {
  name: string;          // Skin name to search for
  float?: number;        // Optional float value to filter by
  phase?: string;        // Optional phase filter
  wear?: string;         // Optional wear category filter
  maxPrice?: number;     // Optional maximum price filter
  limit?: number;        // Maximum number of results to return
  offset?: number;       // Offset for pagination
}

// API response format
export interface ApiResponse {
  listings: MarketListing[];
  timestamp: number;
  cached: boolean;       // Whether this result came from cache
  error?: string;        // Optional error message
  markets: string[];     // List of marketplaces that were queried
  metrics: {
    total: number;       // Total number of listings
    responseTime: number; // Response time in milliseconds
  };
}

// Recent search history type
export interface RecentSearch {
  id: string;           // Unique ID (timestamp-based)
  params: SkinSearchParams;
  timestamp: number;    // When the search was performed
}

// Wear categories for dropdown selection
export const wearCategories = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred"
];

// Phase options for Doppler knives
export const phaseOptions = [
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Ruby",
  "Sapphire",
  "Black Pearl",
  "Emerald"
];