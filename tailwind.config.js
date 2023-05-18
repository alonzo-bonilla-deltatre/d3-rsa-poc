/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)']
      },
    },
    colors: {
      'white': '#FFFFFF',
      'grey_100': '#FAFAFA',
      'grey_300': '#DCDCDC',
      'grey_400': '#A5A5A5',
      'grey_500': '#A5A5A5',
      'grey_600': '#333333',
      'grey_700': '#646464',
      'grey_900': '#404040',
      'black': '#161616',
      'primary-100': '#943134',
      'primary-300': '#cf444a',
      'primary_500': '#F75258',
      'primary-700': '#f87b7f',
      'primary-900': '#fa979a',
      'secondary': '#212553',
      'secondary-100': '#121531',
      'secondary-300': '#1b1f45',
      'secondary-500': '#212653',
      'secondary-700': '#56597c',
      'secondary-900': '#797c97',
      'tertiary': '#5371F7',
      'accent': '#F8F566',
    }
  },
  plugins: [],
}
