import axios from 'axios';
import { ApiResponseError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import { Translations } from '@/models/types/translations';
import logger from '@/utilities/logger';

/* istanbul ignore next */
export const getFallBackTranslations = (): Translations => {
  const culture = `${process.env.CULTURE?.toLowerCase()}`;
  const translations = {
    mainLanguage: culture,
    languages: [culture],
    resources: {},
  } as Translations;
  translations.resources[culture] = { translation: {} };
  return translations;
};

export const getTranslations = async (): Promise<Translations | null> => {
  const apiUrl = `${process.env.VOCABULARY_TOOL_API_BASE_URL}/api/vocabularies/${process.env.VOCABULARY_TOOL_VOC_CODE}/i18n`;

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
      if (response?.data) {
        const error = response.data as ApiResponseError;
        let errorMessage = `VOCABULARY TOOL API Error status: ${response.status} - ${response.statusText} - Error message: ${error.error.message}`;
        logger.log(errorMessage, LoggerLevel.error);
      }
      logger.log(
        `VOCABULARY TOOL API Error: ${response?.message} - ${JSON.stringify(response?.stack)}. URL: ${apiUrl}`,
        LoggerLevel.error
      );
      return null;
    });
};
