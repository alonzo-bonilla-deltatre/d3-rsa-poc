import axios from 'axios';
import {LoggerLevel} from "@/models/types/logger";
import {DistributionEntity, PagedResult, QueryStringModuleProps} from "@/models/types/dapi";
import logger from "@/utilities/logger";
import {ForgeApiError} from "@/models/types/errors";

const culture = process.env.CULTURE;
const slugPlaceholder = "{slug}";
const entityCodePlaceholder = "{entityCode}";
const distributionDetailUrl = `v2/content/${culture}/${entityCodePlaceholder}/${slugPlaceholder}`;
const distributionListUrl = `v2/content/${culture}/${entityCodePlaceholder}`;
const distributionSelectionDetailUrl = `v2/content/${culture}/sel-${slugPlaceholder}`;

export const getEntity = async (
  entityCode: string,
  slug: string
): Promise<DistributionEntity | null> => {
  let apiUrl = distributionDetailUrl
    .replace(entityCodePlaceholder, entityCode)
    .replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(
    `Getting ${entityCode} entity slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`,
    LoggerLevel.debug
  );

  return await axios.get(apiUrl)
    .then(response => {
      logger.log(
        `Retrieved ${entityCode} entity slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
        LoggerLevel.debug
      );
      return response.data;
    }).catch(response => {
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
  queryParameters: string
): Promise<PagedResult | null> => {
  const queryString = queryParameters.length ? `?${queryParameters}` : "";
  let apiUrl =
    distributionListUrl.replace(entityCodePlaceholder, entityCode) +
    queryString;
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(
    `Getting ${entityCode} entity list data from FORGE DISTRIBUTION API ${apiUrl}`,
    LoggerLevel.debug
  );

  return await axios.get(apiUrl)
    .then(response => {
      logger.log(
        `Retrieved ${entityCode} ${entityCode} entity list data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
        LoggerLevel.debug
      );
      return response.data;
    }).catch(response => {
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
  slug: string
): Promise<PagedResult | null> => {
  let apiUrl = distributionSelectionDetailUrl.replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(
    `Getting selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}`,
    LoggerLevel.debug
  );

  return await axios.get(apiUrl)
    .then(response => {
      logger.log(
        `Retrieved selection slug:${slug} data from FORGE DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
        LoggerLevel.debug
      );
      return response.data;
    }).catch(response => {
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
  {skip, limit, tags}: QueryStringModuleProps,
  type: string
): Promise<DistributionEntity[] | null> => {
  if (selectionSlug) {
    const selection = await getSelection(selectionSlug);
    return selection?.items as DistributionEntity[];
  }
  if (type) {
    const queryString = getQueryString({skip, limit, tags});
    const entities = await getAllEntities(type, queryString);
    return entities?.items as DistributionEntity[];
  }
  return null;
};

export const getQueryString = ({skip, limit, tags}: QueryStringModuleProps) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (skip) {
    queryString.push(`$skip=${skip}`);
  }
  if (limit) {
    queryString.push(`$limit=${limit}`);
  }
  if (tags?.length && tags.includes(",")) {
    const tagSlugs = tags.split(",");
    tagSlugs.forEach((tag) => {
      queryString.push(`$tags.slug=${tag}`);
    });
  }
  return queryString.join("&");
};

export const getFilteredItems = (
  items: DistributionEntity[] | null | undefined,
  limit: number
) => {
  if (!items?.length) {
    return [];
  }
  if (limit === 0) {
    return items;
  }
  return items.slice(0, limit);
};