/**
 * Returns the site direction based on the provided language.
 *
 * This function checks if the provided language is Arabic (case-insensitive).
 * If the language is Arabic, it returns 'rtl' for right-to-left.
 * If the language is not Arabic, it returns 'ltr' for left-to-right.
 *
 * @param {string} language - The language to check.
 * @returns {string} The site direction ('rtl' or 'ltr').
 */
export const getSiteDirection = (language: string) => {
  return isRtlSiteDirection(language) ? 'rtl' : 'ltr';
};

/**
 * Checks if the site direction is right-to-left based on the provided language.
 *
 * This function checks if the provided language is Arabic (case-insensitive).
 * If the language is Arabic, it returns true.
 * If the language is not Arabic, it returns false.
 *
 * @param {string} language - The language to check.
 * @returns {boolean} True if the site direction is right-to-left, false otherwise.
 */
export const isRtlSiteDirection = (language: string) => {
  return language?.toLowerCase() === 'ar';
};
