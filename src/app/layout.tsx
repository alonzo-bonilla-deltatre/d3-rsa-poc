import '@/styles/globals.css';
import { getSiteTranslations } from '@/helpers/translationHelper';
import { TranslationProvider } from '@/contexts/translationContext';
import { Metadata } from 'next';
import { generatePageMetadata, getSiteDirection } from '@/helpers/pageHelper';
import { EnvVarsProvider } from '@/contexts/envVarsContexts';
import { publicEnvVariables } from '@/utilities/publicEnvVariablesUtility';
import { Barlow, Barlow_Condensed, Karantina } from 'next/font/google';
import { FeatureFlagsProvider } from '@/contexts/featureFlagsContext';
import { featureFlags } from '@/utilities/featureFlagsUtility';
import { GoogleAnalytics } from '@next/third-parties/google';
import Favicon from '@/components/commons/Favicon/Favicon';
import Script from 'next/script';
import { ReactNode } from 'react';

// If loading a variable font, you don"t need to specify the font weight
const content = Barlow({
  variable: '--font-content',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});
const navigation = Barlow_Condensed({
  variable: '--font-navigation',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});
const heading = Karantina({
  variable: '--font-heading',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const translations = await getSiteTranslations();
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <html
      lang={process.env.LANGUAGE ?? 'en'}
      className={`${content.variable} ${navigation.variable} ${heading.variable}`}
      dir={getSiteDirection(process.env.LANGUAGE ?? '')}
    >
      <head>
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
        <link
          rel="manifest"
          href="/manifest.webmanifest"
        />
        <Favicon />
      </head>
      <body suppressHydrationWarning={true}>
        <TranslationProvider translations={translations}>
          <EnvVarsProvider envVars={publicEnvVariables}>
            <FeatureFlagsProvider featureFlags={featureFlags}>{children}</FeatureFlagsProvider>
          </EnvVarsProvider>
        </TranslationProvider>
        {googleAnalyticsId && (
          <Script
            async
            src="https://www.googletagservices.com/tag/js/gpt.js"
          />
        )}
      </body>
    </html>
  );
};

export default RootLayout;

export async function generateMetadata({ params }: { params: { pageName: string[] } }): Promise<Metadata> {
  return await generatePageMetadata({ pageName: [] }); // force empty string to get metadata from index for error page
}
