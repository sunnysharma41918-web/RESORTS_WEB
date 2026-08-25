/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF1F02',
          ivory: '#FAFDF2',
          dark: '#1C1C1C',
          black: '#000000',
          heading: '#0E0E0E',
          stroke: '#E9E9DE',
          strokeDark: '#333333',
          paragraph: '#D0D0D0',
          paragraph2: '#B0B0B0',
        },
        luxury: {
          dark: '#1C1C1C',
          black: '#000000',
          stone: '#1C1C1C',
          muted: '#B0B0B0',
          light: '#FAFDF2',
          accent: '#FF1F02',
          border: '#E9E9DE',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
