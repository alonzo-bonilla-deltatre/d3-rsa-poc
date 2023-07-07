import { LoggerLevel } from '@/models/types/logger';
import { TermType, Translation } from '@/models/types/translations';
import { getFallBackTranslations, getTranslations } from '@/services/translationService';
import i18n, { InitOptions } from 'i18next';
import logger from './logger';

const fallback = getFallBackTranslations();
const options: InitOptions = {
  lowerCaseLng: true,
  interpolation: { escapeValue: false },
  react: { useSuspense: true },
  lng: fallback.mainLanguage,
  resources: fallback.resources,
  supportedLngs: fallback.languages,
  fallbackLng: fallback.languages,
};
i18n.init(options);

export const initI18n = async (): Promise<any> => {
  const translations = await getTranslations();

  if (translations != null) {
    translations.languages.forEach((culture) => {
      const namespace = 'translation';
      const resources = translations.resources[culture];
      i18n.addResourceBundle(culture, namespace, resources[namespace]);
    });
  }
};

export const translate = (key: string = '', type: TermType = TermType.standard): string => {
  if (!key) {
    return key;
  }
  const term: Translation = i18n.t(key.toLowerCase(), { returnObjects: true });
  if (!term[type]) {
    logger.log(`TRANSLATION not found for this key: '${key}' and this type: '${type}'`, LoggerLevel.warning);
    return key;
  }
  return term[type];
};
