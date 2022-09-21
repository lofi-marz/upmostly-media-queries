

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        title: ['Fredoka One', ...defaultTheme.fontFamily.sans],
        text: ['Fredoka', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.red[500],
        secondary: colors.orange[500],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            ['auto-fill-cols']: (value) => ({
              gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
            }),
          },
          { values: defaultTheme.spacing }
      );
    }),
  ],
};