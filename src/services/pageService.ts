import axios from 'axios';
import { PageBuilderFrontendApiError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import { PageStructureResponse } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;
const pathPlaceholder = '{path}';
const tokenPlaceholder = '{token}';
const siteStructureApiUrl = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`;
const siteStructureApiUrlWithToken = `api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`;

export const getPageStructure = async (path: string, token: string = ''): Promise<PageStructureResponse | null> => {
  let apiUrl = '';
  if (token) {
    apiUrl = siteStructureApiUrlWithToken.replace(pathPlaceholder, path).replace(tokenPlaceholder, token);
  } else {
    apiUrl = siteStructureApiUrl.replace(pathPlaceholder, path);
  }
  apiUrl = new URL(apiUrl, process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL).href;
  logger.log(`Getting SITE STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl, {
      headers: {
        Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET ?? '',
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
