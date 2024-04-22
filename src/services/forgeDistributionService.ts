import { DistributionEntity, ForgeDapiEntityCode, ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import axios from 'axios';
import { enrichDistributionEntities, getAPIQueryString } from '@/helpers/forgeDistributionEntityHelper';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';
import { handleApiError } from '@/helpers/apiHelper';
import { enrichPagination } from '@/helpers/paginationHelper';

// The culture of the site, retrieved from environment variables
const culture = process.env.CULTURE;
// The base URL of the Forge Distribution API, retrieved from environment variables
const dapiUrl = process.env.FORGE_DISTRIBUTION_API_BASE_URL;
// The name of the API
const apiName = 'FORGE DISTRIBUTION API';

// URL templates for the API endpoints
const slugPlaceholder = '{slug}';
const entityCodePlaceholder = '{entityCode}';
const distributionDetailUrl = `v2/content/${culture}/${entityCodePlaceholder}/${slugPlaceholder}`;
const distributionListUrl = `v2/content/${culture}/${entityCodePlaceholder}`;
const distributionSelectionDetailUrl = `v2/content/${culture}/sel-${slugPlaceholder}`;

/**
 * Function to get a single entity from the Forge Distribution API.
 * It replaces the placeholders in `distributionDetailUrl` with the provided `entityCode` and `slug`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {ForgeDapiEntityCode} entityCode - The entity code to use.
 * @param {string | undefined} slug - The slug of the entity to get.
 * @param {ForgeDistributionApiOption | null} options - Optional options to use.
 * @returns {Promise<DistributionEntity | null>} - The retrieved entity or `null` if an error occurred.
 */
export const getEntity = async (
  entityCode: ForgeDapiEntityCode,
  slug?: string,
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity | null> => {
  if (!slug) return null;
  try {
    let apiUrl = distributionDetailUrl
      .replace(entityCodePlaceholder, entityCode)
      .replace(slugPlaceholder, parseFieldValue(slug, options?.variables));
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(
      `Getting ${entityCode} entity slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`,
      LoggerLevel.debug
    );

    return await axios
      .get(apiUrl)
      .then(async (response) => {
        logger.log(
          `Retrieved ${entityCode} entity slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(
            response.data
          )}`,
          LoggerLevel.debug
        );
        const result = await enrichDistributionEntities([response.data], options);
        return result && result.length > 0 ? result[0] : null;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};

/**
 * Function to get all entities of a certain type from the Forge Distribution API.
 * It replaces the placeholder in `distributionListUrl` with the provided `entityCode`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {ForgeDapiEntityCode} entityCode - The entity code to use.
 * @param {ForgeDistributionApiOption | null} options - Optional options to use.
 * @returns {Promise<PagedResult | null>} - The retrieved entities or `null` if an error occurred.
 */
export const getAllEntities = async (
  entityCode: ForgeDapiEntityCode,
  options: ForgeDistributionApiOption = null
): Promise<PagedResult | null> => {
  try {
    const queryString = getAPIQueryString(options);
    let apiUrl = distributionListUrl.replace(entityCodePlaceholder, entityCode) + queryString;
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting ${entityCode} entity list data from FORGE DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl)
      .then(async (response) => {
        logger.log(
          `Retrieved ${entityCode} ${entityCode} entity list data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(
            response.data
          )}`,
          LoggerLevel.debug
        );
        if (response.data.pagination)
          response.data.pagination = enrichPagination(
            response.data.pagination,
            options?.hasPagination,
            response.data.pagination.page
          );
        response.data.items = await enrichDistributionEntities(response.data.items, options);
        return response.data;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};

/**
 * Function to get a selection from the Forge Distribution API.
 * It replaces the placeholder in `distributionSelectionDetailUrl` with the provided `slug`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {string | undefined} slug - The slug of the selection to get.
 * @param {ForgeDistributionApiOption | null} options - Optional options to use.
 * @returns {Promise<PagedResult | null>} - The retrieved selection or `null` if an error occurred.
 */
export const getSelection = async (
  slug?: string,
  options: ForgeDistributionApiOption = null
): Promise<PagedResult | null> => {
  if (!slug) return null;
  try {
    const queryString = getAPIQueryString(options);
    let apiUrl = distributionSelectionDetailUrl.replace(slugPlaceholder, slug) + queryString;
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl)
      .then(async (response) => {
        logger.log(
          `Retrieved selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
          LoggerLevel.debug
        );
        if (response.data.pagination)
          response.data.pagination = enrichPagination(
            response.data.pagination,
            options?.hasPagination,
            response.data.pagination.page
          );
        response.data.items = await enrichDistributionEntities(response.data.items, options);
        return response.data;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};

/**
 * Function to get a list of entities from the Forge Distribution API.
 * If a `selectionSlug` is provided, it gets the selection with that slug.
 * If a `type` is provided, it gets all entities of that type.
 * If neither is provided, it returns `null`.
 * If `options?.hasPagination` is `true`, it returns the entire `PagedResult`.
 * Otherwise, it returns only the `items` property of the `PagedResult`.
 *
 * @param {string | null | undefined} selectionSlug - The slug of the selection to get.
 * @param {ForgeDapiEntityCode | null} type - The type of entities to get.
 * @param {ForgeDistributionApiOption | null} options - Optional options to use.
 * @returns {Promise<DistributionEntity[] | PagedResult | null>} - The retrieved entities or `null` if an error occurred.
 */
export const getEntityList = async (
  selectionSlug: string | null | undefined,
  type: ForgeDapiEntityCode | null,
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity[] | PagedResult | null> => {
  if (selectionSlug) {
    const selection = await getSelection(selectionSlug, options);
    if (options?.hasPagination) {
      return selection as PagedResult;
    }
    return (selection?.items as DistributionEntity[]) || null;
  }
  if (type) {
    const entities = await getAllEntities(type, options);
    if (options?.hasPagination) {
      return entities as PagedResult;
    }
    return entities?.items as DistributionEntity[];
  }
  return null;
};
