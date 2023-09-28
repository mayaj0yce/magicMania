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
        themelightgrey: '#e5e5e5',
      }
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class"
};

