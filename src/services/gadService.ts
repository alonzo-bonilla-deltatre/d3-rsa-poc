import { ApiResponseError } from "@/models/types/errors";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
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

    const response = await fetch(apiUrl, {
      next: { revalidate: parseInt(revalidateTime) },
    });

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

export const firstAssetOrDefault = (
  assets: GraphicAssetsDashboardItem[] | null
): GraphicAssetsDashboardItem | null => {
  return assets?.length ? assets[0] : null;
};
