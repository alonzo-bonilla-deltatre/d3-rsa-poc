import { LoggerLevel } from '@/models/types/logger';
import { Variable } from '@/models/types/pageStructure';
import { ModuleHandlers, moduleHandlers } from '@/services/moduleSeoMetadataHandlers/moduleSeoMetadataHandlers';
import logger from '@/utilities/loggerUtility';
import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';

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
export const customSetMetadataFromModule = async (
  moduleId: string,
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<NextMetadata | undefined> => {
  try {
    if (moduleId in moduleHandlers) {
      const handler = moduleHandlers[moduleId as keyof ModuleHandlers];
      return await handler(seoData, properties, variables);
    }
  } catch (e) {
    logger.log(`${JSON.stringify(e)}`, LoggerLevel.error);
  }
};
