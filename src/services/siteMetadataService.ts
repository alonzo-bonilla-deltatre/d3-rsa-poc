import { PageStructureItemType, StructureItem, Variable } from '@/models/types/pageStructure';
import { Metadata as NextMetadata } from 'next';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { moduleHandlers, ModuleHandlers } from '@/services/moduleSeoMetadataHandlers/moduleSeoMetadataHandlers';

// Global variable to hold the page metadata
let pageMetadata: NextMetadata = {};

/**
 * Asynchronously renders metadata for a given structure item.
 *
 * This function is responsible for enriching the provided `nextMetadata` object with additional `seoData`.
 * The enriched metadata is then stored in a global `pageMetadata` variable. If the `item` parameter is not
 * provided, the function simply returns the current state of `pageMetadata`. If an `item` is provided, the
 * function proceeds to call `renderMetadataItem` with the `item`, `nextMetadata`, and `seoData` as arguments.
 * After the `renderMetadataItem` function call, it checks if `pageMetadata` has a `title` property. If it does,
 * `pageMetadata` is returned; otherwise, it returns the metadata enriched with `seoData`. This function allows
 * for dynamic rendering of metadata based on the structure of the content and SEO requirements.
 *
 * @param {StructureItem} item - The structure item for which to render metadata. Can be null.
 * @param {NextMetadata | null} seoData - Additional SEO data to enrich the metadata with. Can be null.
 * @param {Variable[]} [variables] - Optional. Additional variables that might influence metadata rendering.
 * @returns {Promise<Metadata | {}>} A promise that resolves to the rendered metadata object or an empty object if no metadata could be rendered.
 */
export const renderMetadata = async (
  item: StructureItem,
  seoData: NextMetadata,
  variables?: Variable[]
): Promise<NextMetadata> => {
  pageMetadata = {};
  if (!item) {
    return seoData;
  }
  await renderMetadataItem(item, seoData, variables);
  return pageMetadata?.title ? pageMetadata : seoData;
};

/**
 * Asynchronously processes and renders metadata for an array of structure items.
 *
 * This function is designed to handle an array of structure items, iterating through each item and
 * applying metadata rendering logic individually. It leverages `renderMetadataItem` to process each item,
 * ensuring that metadata is appropriately enriched based on the item's characteristics and any provided SEO data.
 * This approach allows for batch processing of items, making it efficient for scenarios where multiple items
 * need their metadata rendered or updated simultaneously.
 *
 * @param {StructureItem[] | undefined} items - An array of structure items to render metadata for. If undefined, the function will not perform any operations.
 * @param {NextMetadata | null} seoData - Optional SEO data that can be used to further enrich the metadata. If null, no additional SEO-specific enrichment will be applied.
 * @param {Variable[]} [variables] - An optional array of variables that may influence how metadata is rendered for each item.
 * @returns {Promise<void>} A promise that resolves once all items have been processed. Does not return any value.
 */
const renderMetadataItems = async (
  items: StructureItem[] | undefined,
  seoData: NextMetadata,
  variables?: Variable[]
): Promise<void> => {
  if (!items || !items.length) {
    return;
  }
  for (const item of items) {
    await renderMetadataItem(item, seoData, variables);
  }
};

/**
 * Asynchronously renders metadata for a specific structure item.
 *
 * This function is a key part of the metadata rendering process, handling the rendering of metadata for individual structure items.
 * Depending on the type of the item (template, layout, or module), it delegates the task to other functions designed for batch processing or specific metadata setting.
 *
 * - If no item is provided, it simply returns the current global `pageMetadata`.
 * - For template or layout items, it recursively processes their child items using `renderMetadataItems`.
 * - For module items, it directly sets the metadata based on the module's specifics through `setMetadataBasedOnItem`.
 *
 * This approach allows for a flexible and scalable way to handle metadata rendering across different types of content structures.
 *
 * @param {StructureItem} item - The structure item to render metadata for. If null, returns the current `pageMetadata`.
 * @param {NextMetadata | null} seoData - Optional SEO data for further enriching the metadata.
 * @param {Variable[]} [variables] - Optional variables that might influence metadata rendering, specific to the structure item.
 */
const renderMetadataItem = async (
  item: StructureItem,
  seoData: NextMetadata,
  variables?: Variable[]
): Promise<void> => {
  if (!item) {
    return;
  }
  if (item.type === PageStructureItemType.template || item.type === PageStructureItemType.layout) {
    await renderMetadataItems(item.items, seoData, variables);
  }
  if (item.type === PageStructureItemType.module) {
    await setMetadataBasedOnItem(item, item.key.id, seoData, variables);
  }
};

/**
 * Asynchronously sets metadata for a given structure item based on its module ID.
 * This function checks if the `preventSettingMetadata` property of the item is either not set or false,
 * and if so, it proceeds to call `setMetadataFromModule` to set the metadata based on the module's specific logic.
 * It's designed to selectively apply metadata settings, allowing certain modules to opt out of automatic metadata setting
 * through their `preventSettingMetadata` property.
 *
 * @param {StructureItem | undefined} item - The structure item to set metadata based on. If undefined, no action is taken.
 * @param {string} moduleId - The ID of the module to set metadata for. Determines which metadata override function is called.
 * @param {NextMetadata | null} seoData - Optional SEO data to enrich the metadata with. Can be null.
 * @param {Variable[]} [variables] - Optional. Additional variables that might influence metadata setting.
 */
const setMetadataBasedOnItem = async (
  item: StructureItem | undefined,
  moduleId: string,
  seoData: NextMetadata,
  variables?: Variable[]
): Promise<void> => {
  if (item?.properties?.preventSettingMetadata === undefined || item?.properties?.preventSettingMetadata === false) {
    await setMetadataFromModule(moduleId, seoData, item?.properties, variables);
  }
};

/**
 * Asynchronously sets metadata for a given structure item based on its module ID.
 * This function dynamically selects the appropriate metadata override function based on the `moduleId` parameter.
 * It attempts to retrieve the relevant entity using the `slug` property from the module's properties. If the entity
 * is successfully retrieved, the corresponding override function is called to update the global `pageMetadata` object
 * with specific metadata for the entity. If the entity cannot be retrieved, it falls back to enriching the `nextMetadata`
 * object with any provided `seoData`. This mechanism allows for flexible and dynamic metadata setting based on the
 * type of content being processed.
 *
 * @param {string} moduleId - The ID of the module to set metadata from. Determines which override function is used.
 * @param {NextMetadata | null} seoData - Optional SEO data to enrich the metadata with. Can be null.
 * @param {Record<string, unknown>} [properties] - The properties of the module, including the `slug` used to retrieve the entity.
 * @param {Variable[]} [variables] - Optional. Additional variables that might influence metadata setting.
 */
const setMetadataFromModule = async (
  moduleId: string,
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<void> => {
  try {
    if (moduleId in moduleHandlers) {
      const handler = moduleHandlers[moduleId as keyof ModuleHandlers];
      pageMetadata = await handler(seoData, properties, variables);
    }
  } catch (e) {
    logger.log(`${JSON.stringify(e)}`, LoggerLevel.error);
  }
};
