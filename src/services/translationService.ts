import { ApiResponseError } from "@/models/types/errors";
import { LoggerLevel } from "@/models/types/logger";
import { Translations } from "@/models/types/translations";
import logger from "@/utilities/logger";

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
  try {
    const apiUrl = `${process.env.VOCABULARY_TOOL_API_BASE_URL}/api/vocabularies/${process.env.VOCABULARY_TOOL_VOC_CODE}/i18n`;
    const revalidateTime =
      process.env.VOCABULARY_TOOL_TRANSLATIONS_REVALIDATE_TIME ?? "120";

    logger.log(
      `Getting Translations from VOCABULARY TOOL ${apiUrl}`,
      LoggerLevel.debug
    );
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });

    if (response.status !== 200) {
      const error = (await response.json()) as ApiResponseError;
      let errorMessage = `VOCABULARY TOOL API Error status: ${response.status} - ${response.statusText} - Error message: ${error.error.message}`;
      logger.log(errorMessage, LoggerLevel.error);
      return null;
    }

    if (response.status === 200) {
      const translations: Translations = await response.json();

      const areTranslationsValid =
        translations &&
        translations.mainLanguage &&
        translations.languages &&
        translations.resources;

      return areTranslationsValid ? translations : null;
    }

    return null;
  } catch (error: unknown) {
    logger.log(`VOCABULARY TOOL API Exception: ${(error as Error).message}`, LoggerLevel.error);
    return null;
  }
};
