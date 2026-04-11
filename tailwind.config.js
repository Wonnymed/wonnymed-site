/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#e6f2f3', 100: '#b3dde1', 200: '#7ec8c8', 400: '#1f8a95', 500: '#155e6b', 600: '#0f4a52', 700: '#0a3a40', DEFAULT: '#155e6b' },
        accent: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 400: '#fb923c', 500: '#ff6a00', DEFAULT: '#ff6a00' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
