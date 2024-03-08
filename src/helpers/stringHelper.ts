/**
 * Transforms a translation key into a format suitable for use in URLs.
 *
 * This function takes a translation key as input and performs the following transformations:
 * - Replaces all spaces with hyphens.
 * - Converts all characters to lowercase.
 *
 * @param {string} key - The translation key to transform.
 * @returns {string} The transformed translation key.
 */
export const transformTranslationKey = (key: string) => {
  return key.replace(/\s/g, '-').toLowerCase();
};
