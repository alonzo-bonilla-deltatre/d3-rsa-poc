import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageAsset } from '@/models/types/images';
import { LoggerLevel } from '@/models/types/logger';
import { IMAGE_PLACEHOLDER } from '@/utilities/constsUtility';
import logger from '@/utilities/loggerUtility';
import axios from 'axios';
import { handleApiError } from '@/helpers/apiHelper';

// The base URL of the Graphic Assets Dashboard API, retrieved from environment variables
const dapiUrl = process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL;
// The name of the API
const apiName = 'GAD API';

/**
 * Function to get assets by tag from the Graphic Assets Dashboard API.
 * It sends a GET request to the `/api/assets/tag` endpoint with the provided `tag` as a query parameter,
 * and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {string | undefined} tag - The tag of the assets to get.
 * @returns {Promise<GraphicAssetsDashboardItem[] | null>} - The retrieved assets or `null` if an error occurred.
 */
export const getAssetsByTag = async (tag?: string): Promise<GraphicAssetsDashboardItem[] | null> => {
  if (!tag) {
    logger.log('Cannot render GAD asset with no tag', LoggerLevel.warning);
    return null;
  }
  try {
    let apiUrl = `/api/assets/tag?tags=${tag}`;
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting Asset from GAD ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl)
      .then((response) => {
        logger.log(`Retrieved Asset from GAD ${apiUrl}. ${JSON.stringify(response.data)}`, LoggerLevel.debug);
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
 * Function to get a single asset by tag from the Graphic Assets Dashboard API.
 * It calls `getAssetsByTag` with the provided `tag` and returns the first asset in the response.
 *
 * @param {string} tag - The tag of the asset to get.
 * @returns {Promise<GraphicAssetsDashboardItem | null>} - The retrieved asset or `null` if no assets were found.
 */
export const getSingleAssetByTag = async (tag: string = ''): Promise<GraphicAssetsDashboardItem | null> => {
  const gadAssets = await getAssetsByTag(tag);
  return firstAssetOrDefault(gadAssets);
};

/**
 * Function to get the first asset in an array of assets or `null` if the array is empty or `null`.
 *
 * @param {GraphicAssetsDashboardItem[] | null} assets - The array of assets.
 * @returns {GraphicAssetsDashboardItem | null} - The first asset or `null` if the array is empty or `null`.
 */
export const firstAssetOrDefault = (assets: GraphicAssetsDashboardItem[] | null): GraphicAssetsDashboardItem | null => {
  return assets?.length ? assets[0] : null;
};

/**
 * Function to get a placeholder asset from the Graphic Assets Dashboard API.
 * It calls `getSingleAssetByTag` with the provided `placeHolderTag` or a default tag if `placeHolderTag` is not provided.
 *
 * @param {string} placeHolderTag - The tag of the placeholder asset to get.
 * @returns {Promise<GraphicAssetsDashboardItem | null>} - The retrieved placeholder asset or `null` if no assets were found.
 */
export const getPlaceholderAsset = async (
  placeHolderTag: string = IMAGE_PLACEHOLDER
): Promise<GraphicAssetsDashboardItem | null> => {
  const tag = placeHolderTag ? placeHolderTag : IMAGE_PLACEHOLDER;
  return await getSingleAssetByTag(tag);
};

/**
 * Function to get an image or a placeholder image.
 * If `image.templateUrl` is truthy, it calls `getPlaceholderImage` with `placeHolderTag` and returns the result.
 * Otherwise, it returns `image`.
 *
 * @param {ImageAsset} image - The image to check.
 * @param {string} placeHolderTag - The tag of the placeholder image to get if `image.templateUrl` is truthy.
 * @returns {Promise<ImageAsset | null>} - The image or placeholder image, or `null` if no placeholder image was found.
 */
export const getImageOrPlaceholder = async (image: ImageAsset, placeHolderTag: string): Promise<ImageAsset | null> => {
  const needPlaceholderImage = image?.templateUrl;
  if (needPlaceholderImage) {
    return getPlaceholderImage(placeHolderTag);
  }
  return image;
};

/**
 * Function to get a placeholder image.
 * It calls `getPlaceholderAsset` with `placeHolderTag` and converts the result to an `ImageAsset` using `gadAssetToImageAsset`.
 *
 * @param {string} placeHolderTag - The tag of the placeholder image to get.
 * @returns {Promise<ImageAsset | null>} - The placeholder image or `null` if no placeholder asset was found.
 */
export const getPlaceholderImage = async (placeHolderTag: string): Promise<ImageAsset | null> => {
  const asset = await getPlaceholderAsset(placeHolderTag);
  if (asset != null) {
    return gadAssetToImageAsset(asset);
  }
  return null;
};

/**
 * Function to convert a `GraphicAssetsDashboardItem` to an `ImageAsset`.
 * If `item.assetUrl` is truthy, it creates an `ImageAsset` with `item.assetUrl`, `item.name`, and `item.format` and returns it.
 * Otherwise, it returns `null`.
 *
 * @param {GraphicAssetsDashboardItem | null} item - The item to convert.
 * @returns {ImageAsset | null} - The converted image or `null` if `item.assetUrl` is not truthy.
 */
const gadAssetToImageAsset = (item: GraphicAssetsDashboardItem | null): ImageAsset | null => {
  if (item?.assetUrl) {
    return {
      title: item.name,
      templateUrl: item.assetUrl,
      format: item.format,
    } as ImageAsset;
  }
  return null;
};
