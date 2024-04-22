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
        'grey-900': 'var(--color-grey-900)',
        'grey-500': 'var(--color-grey-500)',
        'grey-300': 'var(--color-grey-300)',
        'grey-400': 'var(--color-grey-400)',
        'grey-200': 'var(--color-grey-200)',
        'grey-100': 'var(--color-grey-100)',
        'grey-50': 'var(--color-grey-50)',
        link: 'var(--color-red)',
      },
    },
  },
  darkMode: 'class',
}
