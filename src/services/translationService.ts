import axios from 'axios';
import { LoggerLevel } from '@/models/types/logger';
import { Translations } from '@/models/types/translations';
import logger from '@/utilities/loggerUtility';
import { handleApiError } from '@/helpers/apiHelper';

// Base URL for the Vocabulary Tool API
const dapiUrl = process.env.VOCABULARY_TOOL_API_BASE_URL;
// Name of the API for logging purposes
const apiName = 'VOCABULARY TOOL API';

/**
 * Fetches all translations from the Vocabulary Tool API.
 * Sends a GET request to the Vocabulary Tool API and retrieves the translations.
 * If the translations are valid, they are returned.
 * If an error occurs during the request, it is handled and `null` is returned.
 *
 * @returns {Promise<Translations | null>} The translations if they are valid, null otherwise.
 */
export const getAllTranslations = async (): Promise<Translations | null> => {
  try {
    let apiUrl = `/api/vocabularies/${process.env.VOCABULARY_TOOL_VOC_CODE}/i18n`;
    apiUrl = new URL(apiUrl, dapiUrl).href;
    logger.log(`Getting Translations from VOCABULARY TOOL ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl)
      .then((response) => {
        logger.log(
          `Retrieved Translations from VOCABULARY TOOL ${apiUrl}. ${JSON.stringify(response.data)}`,
          LoggerLevel.debug
        );
        const translations: Translations = response.data;

        const areTranslationsValid = translations?.mainLanguage && translations?.languages && translations?.resources;

        return areTranslationsValid ? translations : null;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};
