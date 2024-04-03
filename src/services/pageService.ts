import axios from 'axios';
import { LoggerLevel } from '@/models/types/logger';
import { PageStructureResponse } from '@/models/types/pageStructure';
import logger from '@/utilities/loggerUtility';
import { handleApiError } from '@/helpers/apiHelper';

// The culture of the site, retrieved from environment variables
const culture = process.env.CULTURE;
// The environment of the site, retrieved from environment variables
const environment = process.env.ENVIRONMENT;
// The base URL of the Page Builder Frontend API, retrieved from environment variables
const dapiUrl = process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL;
// The secret key for the API, retrieved from environment variables
const apiSecret = process.env.PAGE_BUILDER_FRONTEND_API_SECRET;
// The name of the API
const apiName = 'PAGE BUILDER FRONTEND API';

// URL templates for the API endpoints
const pathPlaceholder = '{path}';
const tokenPlaceholder = '{token}';
const siteStructureApiUrl = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`;
const siteStructureApiUrlWithToken = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`;

/**
 * Function to get the structure of a page from the Page Builder Frontend API.
 * It replaces the placeholders in `siteStructureApiUrl` or `siteStructureApiUrlWithToken` with the provided `path` and `token`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {string} path - The path of the page to get.
 * @param {string} [token=''] - The token to use.
 * @returns {Promise<PageStructureResponse | null>} - The page structure or `null` if an error occurred.
 */
export const getPageStructure = async (path: string, token: string = ''): Promise<PageStructureResponse | null> => {
  try {
    let apiUrl = '';
    if (token) {
      apiUrl = siteStructureApiUrlWithToken.replace(pathPlaceholder, path).replace(tokenPlaceholder, token);
    } else {
      apiUrl = siteStructureApiUrl.replace(pathPlaceholder, path);
    }
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting SITE STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);
    return await axios
      .get(apiUrl, {
        headers: {
          Authorization: apiSecret,
        },
      })
      .then((response) => {
        logger.log(
          `Retrieved SITE STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}. ${JSON.stringify(response.data)}`,
          LoggerLevel.debug
        );
        return response.data;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};
