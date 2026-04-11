/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#e8f4fc', 100: '#c5e3f7', 200: '#8ec7ef', 400: '#3a8dc4', 500: '#0d4f82', 600: '#0b4371', 700: '#093760', DEFAULT: '#0d4f82' },
        accent: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 400: '#fb923c', 500: '#f97316', DEFAULT: '#f97316' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
