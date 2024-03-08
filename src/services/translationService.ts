import axios from 'axios';
import { LoggerLevel } from '@/models/types/logger';
import { TermType, Translations } from '@/models/types/translations';
import logger from '@/utilities/logger';
import { handleApiError } from '@/helpers/apiHelper';
import { translate as translateHelper } from '@/helpers/translationHelper';

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

/**
 * Translates a given key using the `translateHelper` function.
 * Calls the `translateHelper` function with the provided `key` and `type` and returns the result.
 *
 * @param {string} key - The key to be translated. Defaults to an empty string.
 * @param {TermType} type - The type of term to be translated. Defaults to `TermType.standard`.
 * @returns {string} The translated string.
 */
export const translate = (key: string = '', type: TermType = TermType.standard): string => {
  return translateHelper(key, type);
};
