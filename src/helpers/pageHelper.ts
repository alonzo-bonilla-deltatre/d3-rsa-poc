import { Metadata, PageStructureData, StructureItem, Variable } from '@/models/types/pageStructure';
import { setPageMetadata } from '@/services/metadataService';
import { getPageStructure } from '@/services/pageService';
import { Metadata as NextMetadata } from 'next';
import { setSiteTranslations } from '@/helpers/translationHelper';
import { requestUrlParser } from '@/utilities/requestUrlParserUtility';
import { renderMetadata } from '@/services/siteMetadataService';
import { setFrontendAllSiteConfiguration } from '@/services/configurationService';
import { getDataVariable } from '@/helpers/dataVariableHelper';

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
  seoData: NextMetadata;
} | null> => {
  const pageStructure = await getPageStructure(path, token);
  if (!pageStructure?.data) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadataItems = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;

  const seoData: NextMetadata = await setPageMetadata(metadataItems);

  return {
    structure,
    metadataItems,
    variables,
    seoData,
  };
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
  const previewToken = ''; // The token is empty outside the "preview" route
  const pageData = await getPageData(path, previewToken);
  if (!pageData) {
    return {};
  }
  const { structure, metadataItems, seoData, variables } = pageData;
  setFrontendAllSiteConfiguration(metadataItems);
  return await renderMetadata(structure, seoData, variables);
};

/**
 * This function retrieves the structure of a page from the Page Builder Frontend API using a variable path.
 * It first retrieves the path from the provided variables using the variable name.
 * If the path is not found, it returns `null`.
 * Otherwise, it calls the `getPageStructure` function with the path and the optional preview token,
 * and returns the data of the page structure or `null` if the page structure is not found.
 *
 * @param {string} variableName - The name of the variable to get the path from.
 * @param {Variable[]} [variables] - The variables to get the path from.
 * @param {string} [previewToken] - The optional preview token to use.
 * @returns {Promise<any | null>} - The data of the page structure or `null` if the path or the page structure is not found.
 */
export const getPageStructureFromVariablePath = async (
  variableName: string,
  variables?: Variable[],
  previewToken?: string
): Promise<PageStructureData | null> => {
  const path = getDataVariable(variables, variableName);

  if (!path) {
    return null;
  }

  const sourceStructure = await getPageStructure(path, previewToken);
  return sourceStructure?.data ?? null;
};

/**
 * Returns the site direction based on the provided language.
 *
 * This function checks if the provided language is Arabic (case-insensitive).
 * If the language is Arabic, it returns 'rtl' for right-to-left.
 * If the language is not Arabic, it returns 'ltr' for left-to-right.
 *
 * @param {string} language - The language to check.
 * @returns {string} The site direction ('rtl' or 'ltr').
 */
export const getSiteDirection = (language: string): string => {
  return isRtlSiteDirection(language) ? 'rtl' : 'ltr';
};

/**
 * Checks if the site direction is right-to-left based on the provided language.
 *
 * This function checks if the provided language is Arabic (case-insensitive).
 * If the language is Arabic, it returns true.
 * If the language is not Arabic, it returns false.
 *
 * @param {string} language - The language to check.
 * @returns {boolean} True if the site direction is right-to-left, false otherwise.
 */
export const isRtlSiteDirection = (language: string): boolean => {
  return language?.toLowerCase() === 'ar';
};
