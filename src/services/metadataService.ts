import { Metadata as MetadataItem } from '@/models/types/pageStructure';
import { getSiteUrl } from '@/services/configurationService';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { translate } from '@/services/translationService';
import {
  ForgeMetadataCategoryType,
  ForgeMetadataKeyType,
  ForgeSEOMetadataKey,
  ForgeSocialsMetadataKey,
} from '@/models/types/forge';

/**
 * Function to get a group of metadata items with the specified category.
 * It filters the provided metadata items by category and returns the filtered items.
 *
 * @param {MetadataItem[] | null} metadata - The metadata items to filter.
 * @param {ForgeMetadataCategoryType} category - The category to filter by.
 * @returns {MetadataItem[]} - The filtered metadata items.
 */
export function getMetadataGroup(metadata: MetadataItem[] | null, category: ForgeMetadataCategoryType) {
  const categoryMetadata: MetadataItem[] = [];
  metadata?.forEach((item) => {
    if (item.category === category) {
      categoryMetadata.push(item);
    }
  });
  return categoryMetadata;
}

/**
 * Function to get a metadata item with the specified category and key.
 * It finds the first metadata item with the specified category and key and returns it.
 *
 * @param {MetadataItem[] | null} metadata - The metadata items to search.
 * @param {ForgeMetadataCategoryType} category - The category to search for.
 * @param {ForgeMetadataKeyType} key - The key to search for.
 * @returns {MetadataItem | null} - The found metadata item or `null` if no item was found.
 */
export function getMetadata(
  metadata: MetadataItem[] | null,
  category: ForgeMetadataCategoryType,
  key: ForgeMetadataKeyType
) {
  return metadata ? metadata.find((item) => item.category === category && item.key === key) : null;
}

/**
 * Function to set the page metadata.
 * It creates a `Metadata` object with default values and sets its properties based on the provided metadata items.
 * It translates the values of the metadata items and gets the site URL.
 * It also creates `Twitter` and `OpenGraph` objects and sets their properties based on the metadata items.
 * If the metadata items include Facebook pages or app ID, it adds them to the `other` property of the `Metadata` object.
 * The `Metadata` object is returned.
 *
 * @param {MetadataItem[] | null} metadataItems - The metadata items to use.
 * @returns {Promise<Metadata | null>} - The page metadata or `null` if no metadata items were provided.
 */
export const setPageMetadata = async (metadataItems: MetadataItem[] | null): Promise<Metadata | null> => {
  if (!metadataItems) {
    return null;
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

  const title = translate(getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.title));
  const description = translate(
    getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.description)
  );
  const siteName = translate(
    getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.siteName)
  );
  const siteUrl = await getSiteUrl();
  const robots = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.robots, 'noodp');
  const image = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.image);
  const twitteraccount = getValueOrDefault(
    metadataItems,
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.twitterid
  );
  const fbpages = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.socials, ForgeSocialsMetadataKey.fbpages);
  const fbappid = getValueOrDefault(metadataItems, ForgeMetadataCategoryType.socials, ForgeSocialsMetadataKey.fbappid);
  const cultureCode = process.env.CULTURE;

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

  seoData.other = fbpages ? fbcodes : undefined;

  return seoData;
};
