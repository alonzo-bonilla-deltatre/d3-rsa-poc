/**
 * Extracts the source URL from an HTML string.
 *
 * This function takes an HTML string as input and uses a regular expression to find the source URL of an image.
 * The regular expression looks for a string that starts with 'src="' and ends with a double quote or an asterisk.
 * If the HTML string is empty or does not contain a source URL, the function returns an empty string.
 * If multiple source URLs are found, the function returns the first one.
 *
 * @param {string} html - The HTML string to extract the source URL from.
 * @returns {string} The extracted source URL, or an empty string if no source URL is found.
 */
export const getSrcFromMarkup = (html: string): string => {
  if (!html) {
    return '';
  }
  const patternRegex = /(?<=src=").*?(?=[\*"])/g;
  const src = Array.from(html.matchAll(patternRegex)).map((m) => m[0]);

  return src.length > 0 ? src[0] : '';
};
