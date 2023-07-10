/**
 * Base partial url check: if initial slash are not present, add them
 * @param urlToCheck the url to check
 * @returns
 */
export const checkPathFormats = (urlToCheck: string) => {
  if (!urlToCheck.startsWith('/')) {
    urlToCheck = '/' + urlToCheck;
  }
  return urlToCheck;
};
