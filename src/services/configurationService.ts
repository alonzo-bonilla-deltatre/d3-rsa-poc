/* istanbul ignore file */
import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';
import { Metadata } from '@/models/types/pageStructure';
import { getMetadataGroup } from '@/services/metadataService';
import { getPageStructure } from './pageService';
import { ForgeMetadataCategoryType } from '@/models/types/forge';

// The culture of the site, retrieved from environment variables
const siteCulture = process.env.CULTURE;

// Initial configuration for the frontend
let frontendConfiguration: FrontendConfiguration = {
  allSites: [],
};

/**
 * Sets the configuration for all sites based on the provided metadata.
 * It finds the metadata for languages, and for each language, it finds the culture, url, and translation.
 * These are used to create a `FrontendSiteConfiguration` which is added to the `allSites` array of `frontendConfiguration`.
 *
 * @param {Metadata[]} metadata - The metadata to use.
 * @returns {FrontendSiteConfiguration[]} - The updated `allSites` array of `frontendConfiguration`.
 */
export const setFrontendAllSiteConfiguration = (metadata: Metadata[]) => {
  const languagesMetadata = getMetadataGroup(metadata, ForgeMetadataCategoryType.languages);
  const allSites: FrontendSiteConfiguration[] = [];
  const siteLanguagesKeys: string[] = [];
  languagesMetadata.forEach((item) => {
    if (item.key.indexOf('culture') !== -1) {
      siteLanguagesKeys.push(item.value.replace('-culture', '').replace('-', '_')?.toLowerCase());
    }
  });
  siteLanguagesKeys.forEach((languageKey) => {
    const culture = languagesMetadata.find((item) => item.key === languageKey + '_culture')?.value ?? '';
    const url = languagesMetadata.find((item) => item.key === languageKey + '_url')?.value ?? '';
    const translation = languagesMetadata.find((item) => item.key === languageKey + '_voc_tag')?.value ?? '';
    if (culture && url && translation) {
      allSites.push({
        culture,
        url,
        translation,
      });
    }
  });
  return (frontendConfiguration.allSites = allSites);
};

/**
 * Returns the current frontend configuration.
 *
 * @returns {FrontendConfiguration} - The current frontend configuration.
 */
export const getFrontendAllSiteConfiguration = (): FrontendConfiguration => {
  return frontendConfiguration;
};

/**
 * Returns the URL of the site for the current culture.
 * If the frontend configuration is not set, it retrieves the page structure for the root page and sets the frontend configuration.
 *
 * @returns {Promise<string>} - The URL of the site for the current culture, or the default URL if the culture is not found.
 * @throws {Error} - If an error occurs while retrieving the page structure.
 */
export const getSiteUrl = async (): Promise<string> => {
  if (!frontendConfiguration || !frontendConfiguration.allSites.length) {
    const pageStructure = await getPageStructure(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH ?? '~/');
    setFrontendAllSiteConfiguration(pageStructure?.data.metadata ?? []);
  }
  return frontendConfiguration!.allSites.find((s) => s.culture === siteCulture)?.url ?? '';
};
