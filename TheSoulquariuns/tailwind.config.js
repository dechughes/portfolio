/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#202023',
        secondary: '#8B323E',
        tertiary: '#E5E5E5',
        highlight: '#F5F5F1',
      },
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'text-light': '2px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
        'text-bold': '4px 4px 8px rgba(0, 0, 0, 0.2)',  // Stronger shadow
      },
    },
  },
  plugins: [],
}