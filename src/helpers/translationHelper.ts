import { LoggerLevel } from '@/models/types/logger';
import { TermType, Translation } from '@/models/types/translations';
import logger from '@/utilities/logger';
import { getAllTranslations } from '@/services/translationService';

// Cache for the site translations
let siteTranslations: Record<string, Translation> | undefined = undefined;

/**
 * Deletes the site translations.
 * This function sets the `siteTranslations` cache to `undefined`.
 * @returns {Record<string, Translation> | undefined} The updated site translations.
 */
export const deleteSiteTranslations = () => {
  siteTranslations = undefined;
  return siteTranslations;
};

/**
 * Fetches and sets the site translations for the current culture.
 */
export const setSiteTranslations = async () => {
  const translations = await getAllTranslations();
  const culture = `${process.env.CULTURE?.toLowerCase()}`;
  siteTranslations = translations?.resources[culture]?.translation;
};

/**
 * Returns the site translations.
 * If the translations are not set, it fetches and sets them before returning.
 * @returns {Promise<Record<string, Translation> | undefined>} The site translations.
 */
export const getSiteTranslations = async (): Promise<Record<string, Translation> | undefined> => {
  if (siteTranslations) {
    return siteTranslations;
  }
  await setSiteTranslations();
  return siteTranslations;
};

/**
 * Returns the translation for a given key and term type.
 * If the translation is not found, it logs a warning and returns the original key.
 * @param {string} key - The key for the translation.
 * @param {TermType} type - The term type for the translation.
 * @returns {string} The translation.
 */
export const translate = (key: string = '', type: TermType = TermType.standard): string => {
  if (!key) {
    return '';
  }
  const term: Translation | '' = siteTranslations?.[key?.toLowerCase()] ?? '';
  if (term === '' || !term[type]) {
    logger.log(`TRANSLATION not found for this key: '${key}' and this type: '${type}'`, LoggerLevel.warning);
    return key;
  }
  return term[type];
};
