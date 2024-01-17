/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'rentzilaHeaderBackground': '#283149',
      'rentzilaDark': '#283149',
      'rentzilaError': '#df1332',
    },
  },
  plugins: [],
}

