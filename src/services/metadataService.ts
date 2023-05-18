/* instanbul ignore file */
import { Metadata } from 'next';
import { Metadata as MetadataItem } from '@/models/types/pageStructure';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';

export function getMetadata(metadata: MetadataItem[], category: string, key: string) {
  return metadata.find((item) => item.category === category && item.key === key);
}

export const setPageMetadata = (seoData: Metadata, metadataItems: MetadataItem[]): Metadata => {
  const title = getMetadata(metadataItems, 'seo', 'title')?.value ?? '';
  const description = getMetadata(metadataItems, 'seo', 'description')?.value ?? '';
  const siteName = getMetadata(metadataItems, 'seo', 'sitename')?.value ?? '';
  const siteUrl = getMetadata(metadataItems, 'config', 'vanityUrl')?.value ?? '';
  const robots = getMetadata(metadataItems, 'seo', 'robots')?.value ?? 'noodp';
  const image = getMetadata(metadataItems, 'seo', 'image')?.value ?? '';
  const twitteraccount = getMetadata(metadataItems, 'socials', 'twitterid')?.value ?? '';
  const fbpages = getMetadata(metadataItems, 'socials', 'fbpages')?.value ?? '';
  const fbappid = getMetadata(metadataItems, 'socials', 'fbappid')?.value ?? '';
  const cultureCode = process.env.CULTURE;
  const canonicalUrl = siteUrl;
  const allSiteConfiguration = getFrontendAllSiteConfiguration();
  let twitter = {} as Twitter;
  twitter = {
    title: title,
    description: description,
    card: 'summary_large_image',
    site: twitteraccount,
    creator: twitteraccount,
    images: [
      {
        url: image,
      },
    ],
  };
  let openGraph = {} as OpenGraph;
  openGraph = {
    type: getOgType(''), //TO DO
    title: title,
    description: description,
    siteName: siteName,
    images: [
      {
        url: image,
      },
    ],
    locale: cultureCode,
    url: canonicalUrl,
  };
  seoData.title = title;
  seoData.description = description;
  seoData.authors = { url: siteUrl, name: siteName };
  seoData.robots = robots;
  seoData.openGraph = openGraph;
  seoData.twitter = twitter;

  seoData.other = {
    'fb:pages': fbpages,
    'fb:appid': fbappid,
  };
  seoData.metadataBase = new URL(canonicalUrl);
  const languages = {};
  seoData.alternates = {
    canonical: canonicalUrl,
    languages: getLanguages(languages, allSiteConfiguration),
  };

  return seoData;
};

function getOgType(entityCode: string | ''): any {
  //article, video or website TO DO
  return 'website';
}

function getLanguages(languages: object, allSiteConfiguration: FrontendConfiguration) {
  let lang: Record<string, string> = {};

  allSiteConfiguration.allSites.map((item: FrontendSiteConfiguration) => {
    const culture = `${item.culture}`;
    const url = new URL('/', item.originUrl).href;
    lang[culture] = url;
    Object.assign(languages, lang);
  });
  return languages;
}
