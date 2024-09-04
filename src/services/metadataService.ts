import {
  ForgeMetadataCategoryType,
  ForgeMetadataKeyType,
  ForgeSEOMetadataKey,
  ForgeSocialsMetadataKey,
} from '@/models/types/forge';
import { Metadata as MetadataItem } from '@/models/types/pageStructure';
import { getFrontendAllSiteConfiguration, getSiteUrl } from '@/services/configurationService';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

/**
 * Function to get a group of metadata items with the specified category.
 * It filters the provided metadata items by category and returns the filtered items.
 *
 * @param {MetadataItem[] | null} metadata - The metadata items to filter.
 * @param {ForgeMetadataCategoryType} category - The category to filter by.
 * @returns {MetadataItem[]} - The filtered metadata items.
 */
export const getMetadataGroup = (
  metadata: MetadataItem[] | null,
  category: ForgeMetadataCategoryType
): MetadataItem[] => {
  const categoryMetadata: MetadataItem[] = [];
  metadata?.forEach((item) => {
    if (item.category === category) {
      categoryMetadata.push(item);
    }
  });
  return categoryMetadata;
};

/**
 * Function to get a metadata item with the specified category and key.
 * It finds the first metadata item with the specified category and key and returns it.
 *
 * @param {MetadataItem[] | null} metadata - The metadata items to search.
 * @param {ForgeMetadataCategoryType} category - The category to search for.
 * @param {ForgeMetadataKeyType} key - The key to search for.
 * @returns {MetadataItem | null | undefined} - The found metadata item or `null` if no item was found.
 */
export const getMetadata = (
  metadata: MetadataItem[] | null,
  category: ForgeMetadataCategoryType,
  key: ForgeMetadataKeyType
): MetadataItem | null | undefined => {
  return metadata ? metadata.find((item) => item.category === category && item.key === key) : null;
};

/**
 * Function to set the page metadata.
 * It creates a `Metadata` object with default values and sets its properties based on the provided metadata items.
 * It translates the values of the metadata items and gets the site URL.
 * It also creates `Twitter` and `OpenGraph` objects and sets their properties based on the metadata items.
 * If the metadata items include Facebook pages or app ID, it adds them to the `other` property of the `Metadata` object.
 * The `Metadata` object is returned.
 *
 * @param {MetadataItem[] | null} metadataItems - The metadata items to use.
 * @param path - The path of the page.
 * @returns {Promise<Metadata | null>} - The page metadata or `null` if no metadata items were provided.
 */
export const setPageMetadata = async (metadataItems: MetadataItem[] | null, path: string): Promise<Metadata> => {
  if (!metadataItems) {
    return {};
  }

  const seoData: Metadata = {};

  const getValueOrDefault = (
    items: MetadataItem[] | null,
    category: ForgeMetadataCategoryType,
    key: ForgeMetadataKeyType,
    defaultValue: string = ''
  ) => {
    const metadataItem = getMetadata(items, category, key);
    return metadataItem?.value ?? defaultValue;
  };

  const title = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.title);
  const description = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.description);
  const siteName = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.site_name);
  const siteUrl = await getSiteUrl();
  const robots = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.robots, 'noodp');
  const image = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.image);
  const twitterAccount = getValueOrDefault(
    metadataItems,
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.twitter_id
  );
  const fbPages = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.socials, ForgeSocialsMetadataKey.fb_pages);
  const fbAppId = getValueOrDefault(
    metadataItems,
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.fb_app_id
  );
  const cultureCode = process.env.CULTURE;
  let canonicalUrl;

  try {
    canonicalUrl = new URL(path, siteUrl)?.href;
  } catch (e) {
    canonicalUrl = siteUrl;
  }

  const allSiteConfiguration = getFrontendAllSiteConfiguration();

  const getTwitterData = (): Twitter => {
    return {
      title,
      description,
      card: 'summary_large_image',
      site: twitterAccount,
      creator: twitterAccount,
      images: image,
    } as Twitter;
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
      authors: siteName ? siteName : null,
    } as OpenGraph;
  };

  seoData.title = title;
  seoData.description = description;
  seoData.authors = siteUrl && siteName ? { url: siteUrl, name: siteName } : null;
  seoData.robots = robots;
  seoData.openGraph = getOpenGraphData();
  seoData.twitter = getTwitterData();

  const fbCodes = {
    'fb:pages': fbPages,
    'fb:appid': fbAppId,
  };

  seoData.other = fbPages ? fbCodes : undefined;
  try {
    seoData.metadataBase = new URL(canonicalUrl);
  } catch (e) {
    seoData.metadataBase = null;
  }

  return seoData;
};
