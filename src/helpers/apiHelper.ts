import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

/**
 * Handles API errors by logging the error details.
 *
 * @param {any} response - The response from the API call.
 * @param {string} apiName - The name of the API that was called.
 * @param {string} [apiUrl] - The URL of the API that was called (optional).
 *
 * @returns {null} Always returns null.
 */
export const handleApiError = (response: any, apiName: string, apiUrl?: string) => {
  if (response?.data) {
    let errorMessage = `${apiName} Error status: ${response?.status} - ${response?.statusText} - Error: ${JSON.stringify(response?.data)}${apiUrl ? '. URL: ' + apiUrl : '.'}`;
    logger.log(errorMessage, LoggerLevel.error);
  } else {
    logger.log(
      `${apiName} Error: ${response?.message} - ${JSON.stringify(response?.stack)}${apiUrl ? '. URL: ' + apiUrl : '.'}`,
      LoggerLevel.error
    );
  }
  return null;
};
