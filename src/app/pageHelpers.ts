import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import { setPageMetadata } from '@/services/metadataService';
import { getPageStructure } from '@/services/pageService';
import { Metadata as NextMetadata } from 'next';
import { setSiteTranslations } from '@/helpers/translationHelper';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { renderMetadata } from '@/services/siteMetadataService';
import { setFrontendAllSiteConfiguration } from '@/services/configurationService';

/**
 * Fetches and prepares the data for a page.
 *
 * This function takes a path and a token as input. It fetches the page structure for the given path and token,
 * and prepares the structure, metadata, variables, and SEO data for the page.
 * If the page structure is not fetched successfully, it returns null.
 *
 * @async
 * @param {string} path - The path of the page.
 * @param {string} token - The token for fetching the page structure.
 * @returns {Promise<{ structure: StructureItem; metadataItems: Metadata[]; variables: Variable[]; seoData: NextMetadata | null } | null>} An object containing the structure, metadata, variables, and SEO data for the page, or null if the page structure is not fetched successfully.
 */
export const getPageData = async (
  path: string,
  token: string
): Promise<{
  structure: StructureItem;
  metadataItems: Metadata[];
  variables: Variable[];
  seoData: NextMetadata | null;
} | null> => {
  const pageStructure = await getPageStructure(path, token);
  if (!pageStructure?.data) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadataItems = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;

  const seoData: NextMetadata | null = await setPageMetadata(metadataItems);

  return {
    structure,
    metadataItems,
    variables,
    seoData,
  };
};

/**
 * Enriches the metadata of a page with SEO data.
 *
 * This function takes a metadata object and SEO data as input. If the SEO data is provided,
 * it adds the SEO data to the metadata object and returns the enriched metadata object.
 * If the SEO data is not provided, it returns the metadata object as is.
 *
 * @param {Metadata | {}} metadata - The metadata object to enrich.
 * @param {NextMetadata | null} seoData - The SEO data to add to the metadata object.
 * @returns {Metadata | {}} The enriched metadata object.
 */
export const enrichPageMetadata = (metadata: Metadata | {}, seoData: NextMetadata | null): Metadata | {} => {
  if (seoData) {
    Object.assign(metadata, {
      title: seoData?.title ? seoData.title.toString() : '',
      description: seoData?.description ? seoData?.description.toString() : '',
      metadataBase: seoData?.metadataBase,
      alternates: seoData?.alternates,
      authors: seoData?.authors,
      robots: seoData?.robots,
      openGraph: seoData?.openGraph,
      twitter: seoData?.twitter,
      other: seoData?.other,
    });
  }
  return metadata;
};

/**
 * Enriches the default variables of a page with additional variables.
 *
 * This function takes an array of default variables and an object of additional variables as input.
 * It adds each additional variable to the array of default variables.
 *
 * @param {Variable[]} defaultVariables - The array of default variables to enrich.
 * @param {Object} params - The object of additional variables.
 */
export const enrichPageVariables = (defaultVariables: Variable[], { ...params }): void => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const variable: Variable = {
        key,
        type: 'keyValue',
        keyValue: {
          value: params[key],
          valueType: 'string',
        },
      };
      defaultVariables.push(variable);
    }
  }
};

/**
 * Generates the metadata for a page.
 *
 * This function takes an object of request parameters as input. It gets the path name from the request parameters,
 * fetches the data for the page at the path, and generates the metadata for the page.
 * If the page data is not fetched successfully, it returns an empty object.
 *
 * @async
 * @param {Object} params - The request parameters.
 * @param {string[]} params.pageName - The pageName parameter.
 * @returns {Promise<NextMetadata>} The metadata for the page.
 */
export const generatePageMetadata = async (params: { pageName: string[] }): Promise<NextMetadata> => {
  await setSiteTranslations();
  const path = requestUrlParser.getPathName(params);
  const previewToken = ''; // The token is empty outside of the "preview" route
  const pageData = await getPageData(path, previewToken);
  if (!pageData) {
    return {};
  }
  const { structure, metadataItems, seoData } = pageData;
  setFrontendAllSiteConfiguration(metadataItems);
  return await renderMetadata(structure, {}, seoData);
};
