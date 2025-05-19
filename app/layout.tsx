import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Use Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for SEO
export const metadata: Metadata = {
  title: 'CS2 Skin Price Aggregator',
  description: 'Find the cheapest CS2 skins across multiple marketplaces like CSFloat, DMarket, and more.',
  keywords: 'CS2, skin, price, aggregator, marketplace, CSFloat, DMarket, Skinport, Counter-Strike',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white dark:bg-secondary-700 border-b border-gray-200 dark:border-secondary-600 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="/" className="font-bold text-xl md:text-2xl text-primary-500">CS2 Price Finder</a>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="/" className="hover:text-primary-500">Home</a>
                </li>
                <li>
                  <a href="/results?skin=Karambit%20%7C%20Doppler" className="hover:text-primary-500">Example Search</a>
                </li>
                <li>
                  <a href="https://github.com/yourusername/cs2-price-aggregator" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:text-primary-500">
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
            
            {/* Mobile menu button - you can expand this with a dropdown if needed */}
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        
        {children}
      </body>
    </html>
  );
}