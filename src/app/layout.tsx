import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Poppins } from "next/font/google";
import './globals.css';

// If loading a variable font, you don"t need to specify the font weight
const webFont = Poppins({
  variable: '--font-poppins',
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang={process.env.LANGUAGE ?? 'en'}
      className={webFont.variable}
    >
      <head />
      <body>{children}</body>
    </html>
  );
};
// export const metadata: Metadata = {
//   title: {
//     template: '%s | Acme',
//   },
// };

export default RootLayout;
