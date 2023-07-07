import axios from 'axios';
import { MenuItem, MenuStructureResponse } from '@/models/types/menu';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { PageBuilderFrontendApiError } from '@/models/types/errors';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;
const pathPlaceholder = '{path}';
const tokenPlaceholder = '{token}';
const menuStructureApiUrl = `api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`;
const menuStructureApiUrlWithToken = `api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`;

export const getMenuStructure = async (
  path: string = '',
  token: string = ''
): Promise<MenuStructureResponse | null> => {
  let apiUrl = '';
  if (token) {
    apiUrl = menuStructureApiUrlWithToken.replace(pathPlaceholder, path).replace(tokenPlaceholder, token);
  } else {
    apiUrl = menuStructureApiUrl.replace(pathPlaceholder, path);
  }
  apiUrl = new URL(apiUrl, process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL).href;
  logger.log(`Getting MENU STRUCTURE data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl, {
      headers: {
        Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET ?? '',
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
