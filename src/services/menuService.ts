import axios from 'axios';
import { MenuStructureResponse } from '@/models/types/menu';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
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
const menuStructureApiUrl = `api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`;
const menuStructureApiUrlWithToken = `api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`;

/**
 * Function to get the structure of a menu from the Page Builder Frontend API.
 * It replaces the placeholders in `menuStructureApiUrl` or `menuStructureApiUrlWithToken` with the provided `path` and `token`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {string} [path=''] - The path of the menu to get.
 * @param {string} [token=''] - The token to use.
 * @returns {Promise<MenuStructureResponse | null>} - The menu structure or `null` if an error occurred.
 */
export const getMenuStructure = async (
  path: string = '',
  token: string = ''
): Promise<MenuStructureResponse | null> => {
  try {
    let apiUrl = '';
    if (token) {
      apiUrl = menuStructureApiUrlWithToken.replace(pathPlaceholder, path).replace(tokenPlaceholder, token);
    } else {
      apiUrl = menuStructureApiUrl.replace(pathPlaceholder, path);
    }
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting MENU STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl, {
        headers: {
          Authorization: apiSecret,
        },
      })
      .then((response) => {
        logger.log(
          `Retrieved MENU STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}. ${JSON.stringify(response.data)}`,
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
