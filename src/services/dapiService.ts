import axios from 'axios';
import { LoggerLevel } from "@/models/types/logger";
import { DistributionEntity, PagedResult, QueryStringModuleProps } from "@/models/types/dapi";
import logger from "@/utilities/logger";
import { ForgeApiError } from "@/models/types/errors";
import { ImageAsset } from "@/models/types/images";

const culture = process.env.CULTURE;
const slugPlaceholder = "{slug}";
const entityCodePlaceholder = "{entityCode}";
const distributionDetailUrl = `v2/content/${culture}/${entityCodePlaceholder}/${slugPlaceholder}`;
const distributionListUrl = `v2/content/${culture}/${entityCodePlaceholder}`;
const distributionSelectionDetailUrl = `v2/content/${culture}/sel-${slugPlaceholder}`;

const revalidateTime =
  process.env.FORGE_DISTRIBUTION_API_REVALIDATE_TIME ?? "0";

export const getEntity = async (
  entityCode: string,
  slug: string
): Promise<DistributionEntity | null> => {
  try {
    let apiUrl = distributionDetailUrl
      .replace(entityCodePlaceholder, entityCode)
      .replace(slugPlaceholder, slug);
    apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
    logger.log(
      `Getting ${entityCode} entity slug:${slug} data from FORGE DAPI ${apiUrl}`,
      LoggerLevel.debug
    );

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      const error = response.data as ForgeApiError;
      let errorMessage = `FORGE DAPI Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
      logger.log(errorMessage, LoggerLevel.error);
      return null;
    }

    if (response.status === 200) {
      const json = response.data;
      return json;
    }

    return null;
  } catch (error: unknown) {
    logger.log(
      `FORGE DAPI Exception: ${(error as Error).message}`,
      LoggerLevel.error
    );
    return null;
  }
};

export const getEntityList = async (
  selectionSlug: string,
  { skip, limit, tags }: QueryStringModuleProps,
  type: string
): Promise<DistributionEntity[] | null> => {
  if (selectionSlug) {
    const dapiItems = await getSelection(selectionSlug);
    const items = dapiItems?.items as DistributionEntity[];
    return items;
  }
  if (type) {
    const queryString = getQueryString({ skip, limit, tags });
    const entities = await getAllEntities(type, queryString);
    const items = entities?.items as DistributionEntity[];
    return items;
  }
  return null;
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
    `Getting ${entityCode} entity list data from FORGE DAPI ${apiUrl}`,
    LoggerLevel.debug
  );

    const response = await axios.get(apiUrl);

  if (response.status !== 200) {
    const error = response.data as ForgeApiError;
    let errorMessage = `FORGE DAPI Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
    logger.log(errorMessage, LoggerLevel.error);
    return null;
  }

  if (response.status === 200) {
    const json = response.data;
    return json;
  }

  return null;
};

export const getSelection = async (
  slug: string
): Promise<PagedResult | null> => {
  let apiUrl = distributionSelectionDetailUrl.replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
  logger.log(
    `Getting selection slug:${slug} data from FORGE DAPI ${apiUrl}`,
    LoggerLevel.debug
  );

    const response = await axios.get(apiUrl);
  let errorMessage = "";

  if (response.status !== 200) {
    const error = response.data as ForgeApiError;
    let errorMessage = `FORGE DAPI Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
    logger.log(errorMessage, LoggerLevel.error);
    return null;
  }

  if (response.status === 200) {
    const json = response.data;
    return json;
  }

  return null;
};

export const getQueryString = ({ skip, limit, tags }: QueryStringModuleProps) => {
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

export const imageToImageAsset = (
  item: DistributionEntity | null
): ImageAsset | null => {
  if (item && item.image){
    item.image.slug = item.image.slug;
    item.image.selfUrl = item.image.selfUrl;
    return item.image;
  }
  return null;
};

