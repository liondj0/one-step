/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        forest: '#228B22',
        peach: '#FFB199',
        sunbeam: '#FFD966',
        dustysky: '#7DA2A9',
      },
    }
  },
  plugins: [],
}
