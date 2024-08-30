/**
 * Checks the format of a given URL.
 *
 * This function checks if the URL starts with a slash ('/'). If not, it adds a slash at the beginning.
 *
 * @param {string} urlToCheck - The URL to check.
 * @returns {string} The URL with a slash at the beginning.
 */
export const checkPathFormats = (urlToCheck: string): string => {
  if (!urlToCheck.startsWith('/')) {
    urlToCheck = '/' + urlToCheck;
  }
  return urlToCheck;
};

/**
 * Replaces the current URL in the browser's history without reloading the page.
 *
 * @param {string} url - The new URL.
 */
export const changeHistory = (url: string): void => {
  window.history.replaceState(null, '', url);
};

/**
 * Converts an object of key-value pairs into a URL search params string.
 *
 * This function iterates over each key-value pair in the object and adds it to a URLSearchParams instance.
 * If a value is falsy, it is not included in the URL search params string.
 * The function then returns the URL search params string.
 *
 * @param {Record<string, string>} params - The object of key-value pairs to convert.
 * @returns {string} The URL search params string.
 */
export const setURLSearchParams = (params: Record<string, string>): string => {
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const urlSearchParams = new URLSearchParams(params);
  return Array.from(urlSearchParams.entries()).length > 0 ? `${urlSearchParams.toString()}` : '';
};

/**
 * Checks if a given URL is an external link.
 *
 * This function checks if the URL starts with 'http' and does not include the base URL.
 * If both conditions are met, the function returns true, indicating that the URL is an external link.
 *
 * @param {string} url - The URL to check.
 * @param {string} [baseUrl] - The base URL to compare against.
 * @returns {boolean} True if the URL is an external link, false otherwise.
 */
export const isExternalLink = (url?: string, baseUrl?: string): boolean => {
  return !!url && url.startsWith('http') && !!baseUrl && !url.includes(baseUrl);
};

/**
 * Checks if a given URL is valid.
 *
 * This function checks if the URL is not undefined, null, or an empty string, and if it is not equal to '#nolink'.
 * If both conditions are met, the function returns true, indicating that the URL is valid.
 *
 * @param {string} [url] - The URL to check.
 * @returns {boolean} True if the URL is valid, false otherwise.
 */
export const hasValidUrl = (url?: string): boolean => {
  return !!url && url !== '#nolink';
};
