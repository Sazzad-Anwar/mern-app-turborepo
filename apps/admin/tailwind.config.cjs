/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "primary-dark-400": "#1e1e20",
      "primary-dark-500": "#161618",
      "primary-dark-600": "#000c17"
    }),
    // borderColor: theme => ({
    //   DEFAULT: theme('colors.gray.300', 'currentColor'),
    //   "primary-dark-400": "#1e1e20",
    //   "primary-dark-500": "#161618",
    //   "primary-dark-600": "#000c17"
    // })
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}