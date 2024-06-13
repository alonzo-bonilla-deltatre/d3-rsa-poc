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
        gold: 'var(--color-gold)',
        'grey-50': 'var(--color-grey-50)',
        'grey-100': 'var(--color-grey-100)',
        'grey-200': 'var(--color-grey-200)',
        'grey-300': 'var(--color-grey-300)',
        'grey-400': 'var(--color-grey-400)',
        'grey-500': 'var(--color-grey-500)',
        'grey-900': 'var(--color-grey-900)',
      },
      backgroundImage: {
        'bullets': "url('/assets/bg-bullets.png')",
        'bullets-logo': "url('/assets/bg-bullets-logo.svg')",
        'dark-body-image': "url('/assets/stone.png')",
        'event-mask': "url('/assets/event-mask.png')",
        'event-date': "url('/assets/event-date.png')",
      },
      aspectRatio: {
        '1/1': '1 / 1',
        '3/4': '3 / 4',
        '4/3': '4 / 3',
        '10/16': '10 / 16',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
    },
  },
}
