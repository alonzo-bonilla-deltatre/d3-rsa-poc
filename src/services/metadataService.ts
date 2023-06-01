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
  const seoData: Metadata = {};
  if (metadataItems) {
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
    const twitter = {
      title,
      description,
      card: 'summary_large_image',
      site: twitteraccount,
      creator: twitteraccount,
      images: image,
    } as Twitter;

    const openGraph = {
      type: 'website',
      title,
      description,
      siteName,
      images: image,
      locale: cultureCode,
      url: canonicalUrl,
    } as OpenGraph;

    seoData.title = title;
    seoData.description = description;
    seoData.authors = siteUrl && siteName ? { url: siteUrl, name: siteName } : null;
    seoData.robots = robots;
    seoData.openGraph = openGraph;
    seoData.twitter = twitter;

    const fbcodes = {
      'fb:pages': fbpages,
      'fb:appid': fbappid,
    } as Record<string, string>;

    seoData.other = fbpages.trim().length > 0 && fbappid.trim().length > 0 ? fbcodes : undefined;
    seoData.metadataBase = canonicalUrl.trim().length ? new URL(canonicalUrl) : null;
    const languages = {};
    seoData.alternates = {
      canonical: canonicalUrl,
      languages: getLanguages(languages, allSiteConfiguration),
    };

    return seoData;
  }
  return null;
};

function getLanguages(languages: object, allSiteConfiguration: FrontendConfiguration) {
  let lang: Record<string, string> = {};

  allSiteConfiguration.allSites.map((item: FrontendSiteConfiguration) => {
    const culture = `${item.culture}`;
    const url = new URL('/', item.url).href;
    const lang: Record<string, string> = {
      [culture]: url,
    };
    Object.assign(languages, lang);
  });
  return languages;
}
