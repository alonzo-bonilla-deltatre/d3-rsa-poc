import { DistributionEntity, ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { ForgeApiError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import axios from 'axios';
import { enrichDistributionEntities, getQueryString } from '@/helpers/forgeDistributionEntityHelper';

const culture = process.env.CULTURE;
const slugPlaceholder = '{slug}';
const entityCodePlaceholder = '{entityCode}';
const distributionDetailUrl = `v2/content/${culture}/${entityCodePlaceholder}/${slugPlaceholder}`;
const distributionListUrl = `v2/content/${culture}/${entityCodePlaceholder}`;
const distributionSelectionDetailUrl = `v2/content/${culture}/sel-${slugPlaceholder}`;

export const getEntity = async (
  entityCode: string,
  slug: string,
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity | null> => {
  let apiUrl = distributionDetailUrl.replace(entityCodePlaceholder, entityCode).replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(`Getting ${entityCode} entity slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

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
      if (response && response.data) {
        const error = response.data as ForgeApiError;
        let errorMessage = `FORGE DISTRIBUTION API Error status: ${response.status} - ${response.statusText} - Error message: ${error?.title}`;
        logger.log(errorMessage, LoggerLevel.error);
      } else {
        logger.log(`FORGE DISTRIBUTION API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};

export const getAllEntities = async (
  entityCode: string,
  options: ForgeDistributionApiOption = null
): Promise<PagedResult | null> => {
  const skip = options?.skip ?? 0;
  const limit = options?.limit ?? 0;
  const tags = options?.tags ?? '';
  const queryParameters = getQueryString(skip, limit, tags);
  const queryString = queryParameters.length ? `?${queryParameters}` : '';
  let apiUrl = distributionListUrl.replace(entityCodePlaceholder, entityCode) + queryString;
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
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
      response.data.items = await enrichDistributionEntities(response.data.items, options);
      return response.data;
    })
    .catch((response) => {
      if (response && response.data) {
        const error = response.data as ForgeApiError;
        let errorMessage = `FORGE DISTRIBUTION API Error status: ${response.status} - ${response.statusText} - Error message: ${error?.title}`;
        logger.log(errorMessage, LoggerLevel.error);
      } else {
        logger.log(`FORGE DISTRIBUTION API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};

export const getSelection = async (
  slug: string,
  options: ForgeDistributionApiOption = null
): Promise<PagedResult | null> => {
  let apiUrl = distributionSelectionDetailUrl.replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(`Getting selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl)
    .then(async (response) => {
      logger.log(
        `Retrieved selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
        LoggerLevel.debug
      );
      response.data.items = await enrichDistributionEntities(response.data.items, options);
      return response.data;
    })
    .catch((response) => {
      if (response && response.data) {
        const error = response.data as ForgeApiError;
        let errorMessage = `FORGE DISTRIBUTION API Error status: ${response.status} - ${response.statusText} - Error message: ${error?.title}`;
        logger.log(errorMessage, LoggerLevel.error);
      } else {
        logger.log(`FORGE DISTRIBUTION API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};

export const getEntityList = async (
  selectionSlug: string,
  type: string,
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity[] | null> => {
  if (selectionSlug) {
    const selection = await getSelection(selectionSlug, options);
    return selection?.items as DistributionEntity[];
  }
  if (type) {
    const entities = await getAllEntities(type, options);
    return entities?.items as DistributionEntity[];
  }
  return null;
};
