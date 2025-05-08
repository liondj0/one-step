/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        forest: '#4f694c',
        peach: '#FFB199',
        sunbeam: '#FFD966',
        dustysky: '#7DA2A9',
        button: '#f8f1e1',
        soft: '#fefbf2'
      },
      fontFamily: {
        libre: ['LibreBaskerville_400Regular'],
        libreBold: ['LibreBaskerville_700Bold'],
        nunito: ['Nunito'],
      },
    }
  },
  plugins: [],
}
