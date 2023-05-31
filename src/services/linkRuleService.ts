import axios from 'axios';
import { PageBuilderFrontendApiError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import { LinkRuleRequest, LinkRuleResponse } from '@/models/types/linkRule';

export const getLinkRules = async (body: LinkRuleRequest[]): Promise<LinkRuleResponse | null> => {
  let apiUrl = 'api/v1/LinkRules';
  apiUrl = new URL(apiUrl, process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL).href;
  logger.log(`Getting LINK RULES data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .post(apiUrl, body, {
      headers: {
        Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET ?? '',
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
      if (response && response.data) {
        const error = response.data as PageBuilderFrontendApiError;
        let errorMessage = `PAGE BUILDER FRONTEND API Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
        if (error.detail) {
          errorMessage = errorMessage + ` - Error Detail: ${error.detail}`;
        }
        logger.log(errorMessage, LoggerLevel.error);
        return null;
      } else {
        logger.log(`PAGE BUILDER FRONTEND API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};
