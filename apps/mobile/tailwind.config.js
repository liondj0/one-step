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
        paper: "#f7f7f5",
        ink: "#0f1412",
        button: '#f8f1e1',
        soft: '#fefbf2',
        grey: '#d7d7cb',
        danger: '#e7000b'
      },
      fontFamily: {
        libre: ['LibreBaskerville_400Regular'],
        libreBold: ['LibreBaskerville_700Bold'],
        nunito: ['Nunito'],
      },
      text: {
        xs: ['12px'],
        sm: ['14px'],
        base: ['16px'],
        lg: ['18px'],
        xl: ['20px'],
        '2xl': ['24px'],
        '3xl': ['30px'],
        '4xl': ['36px'],
        '5xl': ['48px'],
        '6xl': ['60px'],
      }
    }
  },
  plugins: [],
}
