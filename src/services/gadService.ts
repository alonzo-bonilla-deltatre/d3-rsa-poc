import { ApiResponseError } from "@/models/types/errors";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { ImageAsset } from "@/models/types/images";
import { LoggerLevel } from "@/models/types/logger";
import logger from "@/utilities/logger";

const revalidateTime =
  process.env.GRAPHIC_ASSETS_DASHBOARD_API_REVALIDATE_TIME ?? "0";

export const getAssetsByTag = async (
  tag: string
): Promise<GraphicAssetsDashboardItem[] | null> => {
  try {
    const apiUrl = `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=${tag}`;
    logger.log(`Getting Asset from GAD ${apiUrl}`, LoggerLevel.debug);

    const response = await fetch(apiUrl);

    if (response.status !== 200) {
      const error = (await response.json()) as ApiResponseError;
      let errorMessage = `GAD API Error status: ${response.status} - ${response.statusText} - Error message: ${error.error.message}`;
      logger.log(errorMessage, LoggerLevel.error);
      return null;
    }

    if (response.status === 200) {
      const json = await response.json();
      return json;
    }

    return null;
  } catch (error: unknown) {
    logger.log(`GAD API Exception: ${(error as Error).message}`, LoggerLevel.error);
    return null;
  }
};
export const getSingleAssetByTag = async (
  tag: string
): Promise<GraphicAssetsDashboardItem | null> => {
  const gadAssetsFetch = getAssetsByTag(tag);
  const [gadAssets] = await Promise.all([gadAssetsFetch]);
  const asset = firstAssetOrDefault(gadAssets);
  return asset;
}

export const firstAssetOrDefault = (
  assets: GraphicAssetsDashboardItem[] | null
): GraphicAssetsDashboardItem | null => {
  return assets?.length ? assets[0] : null;
};

export const getPlaceholderAsset = async (placeHolderTag: string): Promise<GraphicAssetsDashboardItem | null> => {
  const tag = placeHolderTag ? placeHolderTag : "react-poc-placeholder";
  return await getSingleAssetByTag(tag);
};
export const getPlaceholderAssetUrl = async (placeHolderTag: string): Promise<string> => {
   try {
  const tag = placeHolderTag ? placeHolderTag : "react-poc-placeholder";
  const asset = await getPlaceholderAsset(tag);
  console.log("GAD API PLACEHOLDER Found:", asset?.assetUrl);

  return asset?.assetUrl ?? "";
} catch (error: unknown) {
  logger.log(`GAD API PLACEHOLDER Exception: ${(error as Error).message}`, LoggerLevel.error);
  return "";
}
};

export const getImageOrPlaceholder = async (
  image: ImageAsset,
  placeHolderTag: string
): Promise<ImageAsset | null> => {
  const needPlaceholderImage = image?.templateUrl;
  if (needPlaceholderImage){
    return getPlaceholderImage(placeHolderTag);
  }
  return image;
};
export const getPlaceholderImage = async (
  placeHolderTag: string
): Promise<ImageAsset | null> => {
  const asset = await getPlaceholderAsset(placeHolderTag);
  if (asset != null) {
    return gadAssetToImageAsset(asset);
  }
  return null;
};
export const gadAssetToImageAsset = (
  item: GraphicAssetsDashboardItem | null
): ImageAsset | null => {
  if (item && item.assetUrl) {
    const asset = {
      title: item.name,
      templateUrl: item.assetUrl,
      thumbnailUrl: item.assetThumbnailUrl,
      format: item.format
    } as ImageAsset;

    return asset;
  }
  return null;
};
export const getPlaceholderUrl = (tag: string) => {
  let imagePlaceholder = "";
  getPlaceholderAssetUrl("").then((x) => {
    imagePlaceholder = x;
  });
  return imagePlaceholder;
}