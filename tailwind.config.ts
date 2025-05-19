/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6B00', // CS2 Orange
          600: '#E05F00',
          700: '#C55200',
        },
        secondary: {
          500: '#242424', // Dark Gray
          600: '#1E1E1E',
          700: '#161616',
        }
      },
    },
  },
  plugins: [],
}