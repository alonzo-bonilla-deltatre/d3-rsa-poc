import React, { useContext } from 'react';
import { TranslationContext } from '@/context/translationContext';
import { TermType, Translation } from '@/models/types/translations';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';

/**
 * React hook for translating text.
 *
 * This hook uses the React context API to provide access to translations
 * anywhere in the component tree without having to pass them down through props.
 *
 * It returns a function that takes a key and a term type as parameters and returns the corresponding translation.
 * If the key is not provided, it returns an empty string.
 * If the key does not exist in the translations or the term type does not exist for the key, it logs a warning and returns the key.
 *
 * @returns {(key: string, type: TermType) => string} A function that takes a key and a term type and returns the corresponding translation.
 */
const useTranslate = () => {
  const context = useContext(TranslationContext);
  return (key: string = '', type: TermType = TermType.standard) => {
    if (!key) {
      return key;
    }
    const term: Translation | undefined = context?.[key.toLowerCase()];
    if (!term || !term[type]) {
      logger.log(`TRANSLATION not found for this key: '${key}' and this type: '${type}'`, LoggerLevel.warning);
      return key;
    }
    return term[type];
  };
};

export default useTranslate;
