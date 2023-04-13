import { PageBuilderFrontendApiError } from "@/models/types/errors";
import { LoggerLevel } from "@/models/types/logger";
import { PageStructureResponse } from "@/models/types/pageStructure";
import logger from "@/utilities/logger";

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;
const pathPlaceholder = "{path}";
const tokenPlaceholder = "{token}";
const siteStructureApiUrl = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`;
const siteStructureApiUrlWithToken = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`;

const revalidateTime =
process.env.PAGE_BUILDER_FRONTEND_API_REVALIDATE_TIME ?? "0";

export const getPage = async (
  path: string,
  token: string = ""
): Promise<PageStructureResponse | null> => {
  try {
    let apiUrl = "";
    if (token) {
      apiUrl = siteStructureApiUrlWithToken
        .replace(pathPlaceholder, path)
        .replace(tokenPlaceholder, token);
    } else {
      apiUrl = siteStructureApiUrl.replace(pathPlaceholder, path);
    }
    apiUrl = new URL(apiUrl, process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL)
      .href;
    logger.log(
      `Getting SITE STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}`,
      LoggerLevel.debug
    );

    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET ?? "",
      },
    });

    if (response.status !== 200) {
      const error = (await response.json()) as PageBuilderFrontendApiError;
      let errorMessage = `PAGE BUILDER FRONTEND API Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
      if (error.detail) {
        errorMessage = errorMessage + ` - Error Detail: ${error.detail}`;
      }
      logger.log(errorMessage, LoggerLevel.error);
      return null;
    }

    if (response.status === 200) {
      const json = await response.json();
      return json;
    }

    return null;
  } catch (error: unknown) {
    logger.log(
      `PAGE BUILDER FRONTEND API Exception: ${(error as Error).message} ${error}`,
      LoggerLevel.error
    );
    return null;
  }
};
