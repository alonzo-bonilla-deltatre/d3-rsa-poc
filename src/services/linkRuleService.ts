import axios from 'axios';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import { LinkRuleRequest, LinkRuleResponse } from '@/models/types/linkRule';
import { handleApiError } from '@/helpers/apiHelper';

// The base URL of the Page Builder Frontend API, retrieved from environment variables
const dapiUrl = process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL;
// The secret key for the API, retrieved from environment variables
const apiSecret = process.env.PAGE_BUILDER_FRONTEND_API_SECRET;
// The name of the API
const apiName = 'PAGE BUILDER FRONTEND API';

/**
 * Function to get link rules from the Page Builder Frontend API.
 * It sends a POST request to the `/api/v1/LinkRules` endpoint with the provided `body` as the request body,
 * and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {LinkRuleRequest[]} body - The request body to use.
 * @returns {Promise<LinkRuleResponse | null>} - The retrieved link rules or `null` if an error occurred.
 */
export const getLinkRules = async (body: LinkRuleRequest[]): Promise<LinkRuleResponse | null> => {
  try {
    let apiUrl = 'api/v1/LinkRules';
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting LINK RULES data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);
    return await axios
      .post(apiUrl, body, {
        headers: {
          Authorization: apiSecret,
        },
      })
      .then((response) => {
        logger.log(
          `Retrieved LINK RULES data from PAGE BUILDER FRONTEND API ${apiUrl}. ${JSON.stringify(response.data)}`,
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
