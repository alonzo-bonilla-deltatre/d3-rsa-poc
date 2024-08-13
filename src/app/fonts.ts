import { Barlow } from 'next/font/google';

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
  weight: ['400', '500', '700', '800'],
});

const heading = { ...barlow, variable: '--font-heading' };
const subtitle = { ...barlow, variable: '--font-subtitle' };
const navigation = { ...barlow, variable: '--font-navigation' };
const body = { ...barlow, variable: '--font-body' };
const uber = { ...barlow, variable: '--font-uber' };

const fonts = {
  heading,
  subtitle,
  navigation,
  body,
  uber,
};

export default fonts;
