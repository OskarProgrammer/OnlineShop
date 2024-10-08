/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": 
        {
          // #f8fafc -- white 
          // #6366f1 -- indigo
          // #000000 -- black
          "primaryColor" : "#6366f1", 
          "secondColor" : "#f8fafc",
          "successColor" : "#22c55e",
          "darkerSuccessColor" : "#007b35",
          "shadowColor" : "#1e1b4b",
          "shadowColorGreen" : "#052e16",
          "shadowColorRed" : "#450a0a",
          "formButtonBg" : "#16a34a",
          "errorMessageColor" : "#b91c1c",
          "goldColor" : "#FFD700"
        }
      ,
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

