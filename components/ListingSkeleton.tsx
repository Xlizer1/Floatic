'use client';

/**
 * Skeleton loader for listings while data is being fetched
 */
export default function ListingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="animate-pulse card">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Image skeleton */}
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
            
            {/* Content skeleton */}
            <div className="flex-grow space-y-3">
              {/* Title */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              
              {/* Details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28" />
              </div>
            </div>
            
            {/* Price skeleton */}
            <div className="flex flex-col items-end space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}