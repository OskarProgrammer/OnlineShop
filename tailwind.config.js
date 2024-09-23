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
          "primaryColor" : "#6366f1",
          "secondColor" : "#f8fafc",
          "shadowColor" : "#1e1b4b",
          "formButtonBg" : "#16a34a",
          "shadowColorGreen" : "#052e16",
          "errorMessageColor" : "#b91c1c" 
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

