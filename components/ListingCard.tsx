'use client';

import { MarketListing } from '@/types';
import { formatPrice, formatFloat, formatRelativeTime } from '@/lib/utils';
import MarketLogo from './MarketLogo';

interface ListingCardProps {
  listing: MarketListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Left side - Image if available */}
        <div className="flex-shrink-0">
          {listing.image_url ? (
            <img 
              src={listing.image_url} 
              alt={listing.name} 
              className="w-20 h-20 object-contain rounded-md"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </div>
        
        {/* Middle - Listing details */}
        <div className="flex-grow">
          <h3 className="font-medium text-sm md:text-base">{listing.name}</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-300">
            {/* Float */}
            {listing.float !== undefined && listing.float !== null && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Float:</span>{' '}
                <span className="font-medium">{formatFloat(listing.float)}</span>
              </div>
            )}
            
            {/* Wear */}
            {listing.wear && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Wear:</span>{' '}
                <span className="font-medium">{listing.wear}</span>
              </div>
            )}
            
            {/* Phase for Doppler */}
            {listing.phase && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Phase:</span>{' '}
                <span className="font-medium">{listing.phase}</span>
              </div>
            )}
            
            {/* Time updated */}
            <div>
              <span className="text-gray-500 dark:text-gray-400">Updated:</span>{' '}
              <span>{formatRelativeTime(listing.updated_at)}</span>
            </div>
            
            {/* Trade lock if available */}
            {listing.extra?.tradeLockDuration !== undefined && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  {listing.extra.tradeLockDuration > 0
                    ? `Trade Lock: ${listing.extra.tradeLockDuration}d`
                    : 'Tradable: Yes'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Price and Marketplace */}
        <div className="flex flex-col items-end justify-between space-y-4">
          {/* Marketplace */}
          <MarketLogo marketplace={listing.market} size="sm" />
          
          {/* Price */}
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">
              {formatPrice(listing.price_usd, 'USD')}
            </div>
            
            {/* Original price if different from USD */}
            {listing.currency !== 'USD' && (
              <div className="text-sm text-gray-500">
                {formatPrice(listing.price, listing.currency)}
              </div>
            )}
          </div>
          
          {/* Buy button */}
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-1.5 px-3"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}