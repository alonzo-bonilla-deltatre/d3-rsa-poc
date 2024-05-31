/* istanbul ignore file */
import { Metadata, PageStructureItemType, StructureItem } from '@/models/types/pageStructure';
import { enrichPageMetadata } from '@/helpers/pageHelper';
import { Metadata as NextMetadata } from 'next';
import { getEntity } from '@/services/forgeDistributionService';
import {
  overrideAlbumMetadata,
  overrideStoryMetadata,
  overrideVideoMetadata,
  overrideLiveBloggingMetadata,
} from '@/helpers/metadataHelper';
import { getBlogEntity } from '@/services/liveBloggingDistributionService';
import { ForgeDapiEntityCode } from '@/models/types/forge';

// Global variable to hold the page metadata
let pageMetadata: NextMetadata = {};

/**
 * Function to render metadata for a structure item.
 * It enriches the provided `nextMetadata` with `seoData` and stores it in `pageMetadata`.
 * If `item` is not provided, it returns `pageMetadata`.
 * Otherwise, it calls `renderMetadataItem` with `item`, `nextMetadata`, and `seoData`,
 * and returns `pageMetadata` if it has a `title` property, or the enriched `nextMetadata` otherwise.
 *
 * @param {StructureItem} item - The structure item to render metadata for.
 * @param {NextMetadata} nextMetadata - The initial metadata.
 * @param {NextMetadata | null} seoData - The SEO data to enrich the metadata with.
 * @returns {Promise<Metadata | {}>} - The rendered metadata.
 */
export const renderMetadata = async (
  item: StructureItem,
  nextMetadata: NextMetadata,
  seoData: NextMetadata | null
): Promise<Metadata | {}> => {
  pageMetadata = enrichPageMetadata(nextMetadata, seoData);
  if (!item) {
    return pageMetadata;
  }
  await renderMetadataItem(item, nextMetadata, seoData);
  return pageMetadata?.title ? pageMetadata : enrichPageMetadata(nextMetadata, seoData);
};

/**
 * Function to render metadata for multiple structure items.
 * It iterates over the provided `items` and calls `renderMetadataItem` for each item.
 *
 * @param {StructureItem[] | undefined} items - The structure items to render metadata for.
 * @param {NextMetadata} nextMetadata - The initial metadata.
 * @param {NextMetadata | null} seoData - The SEO data to enrich the metadata with.
 */
export const renderMetadataItems = async (
  items: StructureItem[] | undefined,
  nextMetadata: NextMetadata,
  seoData: NextMetadata | null
) => {
  for (const item of items ?? []) {
    await renderMetadataItem(item, nextMetadata, seoData);
  }
};

/**
 * Function to render metadata for a single structure item.
 * If `item` is not provided, it returns `pageMetadata`.
 * If `item` is a template or layout, it calls `renderMetadataItems` with `item.items`, `nextMetadata`, and `seoData`.
 * If `item` is a module, it calls `setMetadataBasedOnItem` with `item`, `item.key.id`, `nextMetadata`, and `seoData`.
 *
 * @param {StructureItem} item - The structure item to render metadata for.
 * @param {NextMetadata} nextMetadata - The initial metadata.
 * @param {NextMetadata | null} seoData - The SEO data to enrich the metadata with.
 */
export const renderMetadataItem = async (
  item: StructureItem,
  nextMetadata: NextMetadata,
  seoData: NextMetadata | null
) => {
  if (!item) {
    return pageMetadata;
  }
  if (item.type === PageStructureItemType.template || item.type === PageStructureItemType.layout) {
    await renderMetadataItems(item.items, nextMetadata, seoData);
  }
  if (item.type === PageStructureItemType.module) {
    await setMetadataBasedOnItem(item, item.key.id, nextMetadata, seoData);
  }
};

/**
 * Function to set metadata based on a structure item.
 * If `item` is provided and its `properties.preventSettingMetadata` property is `true`,
 * it calls `setMetadataFromModule` with `moduleId`, `item.properties.slug.toString()`, `nextMetadata`, and `seoData`.
 *
 * @param {StructureItem | undefined} item - The structure item to set metadata based on.
 * @param {string} moduleId - The ID of the module to set metadata for.
 * @param {NextMetadata} nextMetadata - The initial metadata.
 * @param {NextMetadata | null} seoData - The SEO data to enrich the metadata with.
 */
const setMetadataBasedOnItem = async (
  item: StructureItem | undefined,
  moduleId: string,
  nextMetadata: NextMetadata,
  seoData: NextMetadata | null
) => {
  if (item?.properties?.preventSettingMetadata === undefined || item?.properties?.preventSettingMetadata === false) {
    await setMetadataFromModule(moduleId, item?.properties?.slug?.toString() ?? '', nextMetadata, seoData);
  }
};

/**
 * Function to set metadata from a module.
 * It checks the `moduleId` and calls the corresponding metadata override function with `pageMetadata` and the retrieved entity.
 * If the entity cannot be retrieved, it enriches `nextMetadata` with `seoData`.
 *
 * @param {string} moduleId - The ID of the module to set metadata from.
 * @param {string} slug - The slug of the entity to get.
 * @param {NextMetadata} nextMetadata - The initial metadata.
 * @param {NextMetadata | null} seoData - The SEO data to enrich the metadata with.
 */
const setMetadataFromModule = async (
  moduleId: string,
  slug: string,
  nextMetadata: NextMetadata,
  seoData: NextMetadata | null
) => {
  switch (moduleId) {
    case 'Story':
      const story = await getEntity(ForgeDapiEntityCode.stories, slug);
      pageMetadata = story ? overrideStoryMetadata(pageMetadata, story) : enrichPageMetadata(nextMetadata, seoData);
      break;
    case 'AlbumMosaic':
      const album = await getEntity(ForgeDapiEntityCode.albums, slug);
      pageMetadata = album ? overrideAlbumMetadata(pageMetadata, album) : enrichPageMetadata(nextMetadata, seoData);
      break;
    case 'BrightcoveVideo':
      const brightcoveVideo = await getEntity(ForgeDapiEntityCode.brightcoveVideos, slug);
      pageMetadata = brightcoveVideo
        ? overrideVideoMetadata(pageMetadata, brightcoveVideo)
        : enrichPageMetadata(nextMetadata, seoData);
      break;
    case 'DivaVideo':
      const divaVideo = await getEntity(ForgeDapiEntityCode.divaVideos, slug);
      pageMetadata = divaVideo
        ? overrideVideoMetadata(pageMetadata, divaVideo)
        : enrichPageMetadata(nextMetadata, seoData);
      break;
    case 'LiveBlogging':
      const liveBlogging = await getBlogEntity(slug, false);
      pageMetadata = liveBlogging
        ? overrideLiveBloggingMetadata(pageMetadata, liveBlogging)
        : enrichPageMetadata(nextMetadata, seoData);
      break;
  }
};
