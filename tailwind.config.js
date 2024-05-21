/** @type {import('tailwindcss').Config} */

// Tailwind default config reference https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        content: ['var(--font-content)'],
        navigation: ['var(--font-navigation)'],
        heading: ['var(--font-heading)'],
      },
      colors: {
        link: 'var(--color-red)',
      },
    },
  },
  darkMode: 'class',
  corePlugins: {
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false
  }
}
