/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeblue: '#a5d9f4',
        themeyellow: '#fff59d',
        themegreen: '#9bd3ae',
        themered: '#e1685a',
        themegrey: '#cbc1bf',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
};

