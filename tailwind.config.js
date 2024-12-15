/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.58)',
        },
      });
    },
  ],
};