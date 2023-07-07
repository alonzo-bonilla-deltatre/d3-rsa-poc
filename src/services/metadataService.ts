import { Metadata as MetadataItem } from '@/models/types/pageStructure';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';

import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';

import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export function getMetadata(metadata: MetadataItem[] | null, category: string, key: string) {
  return metadata ? metadata.find((item) => item.category === category && item.key === key) : null;
}

export const setPageMetadata = (metadataItems: MetadataItem[] | null): Metadata | null => {
  if (!metadataItems) {
    return null;
  }

  const seoData: Metadata = {};

  const getValueOrDefault = (
    items: MetadataItem[] | null,
    category: string,
    key: string,
    defaultValue: string = ''
  ) => {
    const metadataItem = getMetadata(items, category, key);
    return metadataItem?.value ?? defaultValue;
  };

  const title = getValueOrDefault(metadataItems, 'seo', 'title');
  const description = getValueOrDefault(metadataItems, 'seo', 'description');
  const siteName = getValueOrDefault(metadataItems, 'seo', 'sitename');
  const siteUrl = getValueOrDefault(metadataItems, 'config', 'vanityUrl');
  const robots = getValueOrDefault(metadataItems, 'seo', 'robots', 'noodp');
  const image = getValueOrDefault(metadataItems, 'seo', 'image');
  const twitteraccount = getValueOrDefault(metadataItems, 'socials', 'twitterid');
  const fbpages = getValueOrDefault(metadataItems, 'socials', 'fbpages');
  const fbappid = getValueOrDefault(metadataItems, 'socials', 'fbappid');
  const cultureCode = process.env.CULTURE;
  const canonicalUrl = siteUrl;
  const allSiteConfiguration = getFrontendAllSiteConfiguration();

  const getTwitterData = (): Twitter => {
    return {
      title,
      description,
      card: 'summary_large_image',
      site: twitteraccount,
      creator: twitteraccount,
      images: image,
    };
  };

  const getOpenGraphData = (): OpenGraph => {
    return {
      type: 'website',
      title,
      description,
      siteName,
      images: image,
      locale: cultureCode,
      url: canonicalUrl,
    };
  };

  seoData.title = title;
  seoData.description = description;
  seoData.authors = siteUrl && siteName ? { url: siteUrl, name: siteName } : null;
  seoData.robots = robots;
  seoData.openGraph = getOpenGraphData();
  seoData.twitter = getTwitterData();

  const fbcodes = {
    'fb:pages': fbpages,
    'fb:appid': fbappid,
  };

  seoData.other = fbpages.trim().length > 0 && fbappid.trim().length > 0 ? fbcodes : undefined;
  seoData.metadataBase = canonicalUrl.trim().length ? new URL(canonicalUrl) : null;

  const languages = {};
  seoData.alternates = {
    canonical: canonicalUrl,
    languages: getLanguages(languages, allSiteConfiguration),
  };

  return seoData;
};

function getLanguages(languages: object, allSiteConfiguration: FrontendConfiguration) {
  allSiteConfiguration.allSites.forEach((item: FrontendSiteConfiguration) => {
    const culture = `${item.culture}`;
    const url = new URL('/', item.url).href;
    const lang: Record<string, string> = {
      [culture]: url,
    };
    Object.assign(languages, lang);
  });
  return languages;
}
