'use client';

import Image from 'next/image';

// Define marketplace logo information
interface MarketLogoInfo {
  name: string;
  logoSrc: string;
  bgColor: string;
  textColor: string;
}

// Map of marketplace names to logo info
const marketplaceLogos: Record<string, MarketLogoInfo> = {
  'CSFloat': {
    name: 'CSFloat',
    logoSrc: '/logos/csfloat.svg', // Placeholder
    bgColor: 'bg-[#1E2326]',
    textColor: 'text-white'
  },
  'DMarket': {
    name: 'DMarket',
    logoSrc: '/logos/dmarket.svg', // Placeholder
    bgColor: 'bg-[#1B1E26]',
    textColor: 'text-white'
  },
  'Skinport': {
    name: 'Skinport',
    logoSrc: '/logos/skinport.svg', // Placeholder
    bgColor: 'bg-[#212B36]',
    textColor: 'text-white'
  },
  'CSMoney': {
    name: 'CS.MONEY',
    logoSrc: '/logos/csmoney.svg', // Placeholder
    bgColor: 'bg-[#2A3759]', 
    textColor: 'text-white'
  },
  'Buff': {
    name: 'BUFF',
    logoSrc: '/logos/buff.svg', // Placeholder
    bgColor: 'bg-[#2B3034]',
    textColor: 'text-white'
  },
  'BitSkins': {
    name: 'BitSkins',
    logoSrc: '/logos/bitskins.svg', // Placeholder
    bgColor: 'bg-[#1C1C1C]',
    textColor: 'text-white'
  },
};

// Default fallback
const defaultLogo: MarketLogoInfo = {
  name: 'Unknown',
  logoSrc: '/logos/default.svg', // Placeholder
  bgColor: 'bg-gray-700',
  textColor: 'text-white'
};

interface MarketLogoProps {
  marketplace: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function MarketLogo({ 
  marketplace, 
  size = 'md', 
  showName = true 
}: MarketLogoProps) {
  // Get logo info or use default
  const logoInfo = marketplaceLogos[marketplace] || defaultLogo;
  
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };
  
  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  // For the first version, we'll use a simple text badge instead of images
  // since we don't have the logo SVGs yet
  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`${logoInfo.bgColor} ${sizeClasses[size]} rounded-md flex items-center justify-center`}
      >
        <span className={`${logoInfo.textColor} font-bold text-xs`}>
          {logoInfo.name.charAt(0)}
        </span>
      </div>
      
      {showName && (
        <span className={`${textSizeClasses[size]} font-medium`}>
          {logoInfo.name}
        </span>
      )}
    </div>
  );
}