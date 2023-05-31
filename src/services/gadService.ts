import { ApiResponseError } from '@/models/types/errors';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageAsset } from '@/models/types/images';
import { LoggerLevel } from '@/models/types/logger';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import logger from '@/utilities/logger';
import axios from 'axios';

export const getAssetsByTag = async (tag: string): Promise<GraphicAssetsDashboardItem[] | null> => {
  const apiUrl = `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=${tag}`;
  logger.log(`Getting Asset from GAD ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl)
    .then((response) => {
      logger.log(`Retrieved Asset from GAD ${apiUrl}. ${JSON.stringify(response.data)}`, LoggerLevel.debug);
      return response.data;
    })
    .catch((response) => {
      if (response && response.data) {
        const error = response.data as ApiResponseError;
        let errorMessage = `GAD API Error status: ${response.status} - ${response.statusText} - Error message: ${error.error.message}`;
        logger.log(errorMessage, LoggerLevel.error);
      } else {
        logger.log(`GAD API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};
export const getSingleAssetByTag = async (tag: string): Promise<GraphicAssetsDashboardItem | null> => {
  const gadAssets = await getAssetsByTag(tag);
  return firstAssetOrDefault(gadAssets);
};

export const firstAssetOrDefault = (assets: GraphicAssetsDashboardItem[] | null): GraphicAssetsDashboardItem | null => {
  return assets?.length ? assets[0] : null;
};

export const getPlaceholderAsset = async (
  placeHolderTag: string = IMAGE_PLACEHOLDER
): Promise<GraphicAssetsDashboardItem | null> => {
  const tag = placeHolderTag ? placeHolderTag : IMAGE_PLACEHOLDER;
  return await getSingleAssetByTag(tag);
};

export const getPlaceholderAssetUrl = async (placeHolderTag: string): Promise<string> => {
  try {
    const tag = placeHolderTag ? placeHolderTag : IMAGE_PLACEHOLDER;
    const asset = await getPlaceholderAsset(tag);
    console.log('GAD API PLACEHOLDER Found:', asset?.assetUrl);

    return asset?.assetUrl ?? '';
  } catch (error: unknown) {
    logger.log(`GAD API PLACEHOLDER Exception: ${(error as Error).message}`, LoggerLevel.error);
    return '';
  }
};

export const getImageOrPlaceholder = async (image: ImageAsset, placeHolderTag: string): Promise<ImageAsset | null> => {
  const needPlaceholderImage = image?.templateUrl;
  if (needPlaceholderImage) {
    return getPlaceholderImage(placeHolderTag);
  }
  return image;
};

export const getPlaceholderImage = async (placeHolderTag: string): Promise<ImageAsset | null> => {
  const asset = await getPlaceholderAsset(placeHolderTag);
  if (asset != null) {
    return gadAssetToImageAsset(asset);
  }
  return null;
};

export const gadAssetToImageAsset = (item: GraphicAssetsDashboardItem | null): ImageAsset | null => {
  if (item && item.assetUrl) {
    return {
      title: item.name,
      templateUrl: item.assetUrl,
      format: item.format,
    } as ImageAsset;
  }
  return null;
};
