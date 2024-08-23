/* istanbul ignore file */
import { remark } from 'remark';
import html from 'remark-html';
import {
  replaceAnchorTagsWithPlaceholder,
  replacePlaceholderWithAnchorTags,
  replacePlaceholderWithStrikeoutTags,
  replacePlaceholderWithSubScriptTags,
  replacePlaceholderWithSuperScriptTags,
  replaceStrikeoutTagsWithPlaceholder,
  replaceSubScriptTagsWithPlaceholder,
  replaceSuperScriptTagsWithPlaceholder,
} from '@/helpers/markdownHelper';

/**
 * Encodes the given text into HTML using the remark library.
 *
 * This function first checks if the provided text is not empty. If it is, it returns an empty string.
 * If the text is not empty, it creates a markdown object with the text and empty arrays for links, strikeouts, superscripts, and subscripts.
 * It then replaces any anchor, strikeout, superscript, and subscript tags in the text with placeholders.
 * After that, it uses the remark library to convert the markdown text into HTML.
 * Finally, it replaces the placeholders in the HTML string with the original tags and returns the resulting HTML string.
 *
 * @async
 * @param {string} text - The text to be encoded into HTML.
 * @returns {Promise<string>} The encoded HTML string.
 */
export const encode = async (text: string): Promise<string> => {
  if (!text) {
    return '';
  }
  let markdownObject: MarkdownObject = {
    text: text,
    links: [],
    strikeouts: [],
    superScripts: [],
    subScripts: [],
  };

  // remark and remark-html not manage in the proper way some html tags for this we need to put some placeholder and replace them after the remake process
  markdownObject = replaceAnchorTagsWithPlaceholder(markdownObject);
  markdownObject = replaceStrikeoutTagsWithPlaceholder(markdownObject);
  markdownObject = replaceSuperScriptTagsWithPlaceholder(markdownObject);
  markdownObject = replaceSubScriptTagsWithPlaceholder(markdownObject);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html, { sanitize: true }).process(markdownObject.text);
  markdownObject.text = processedContent?.toString() ? processedContent?.toString() : markdownObject.text;

  // replaced placeholder with correct html tags
  markdownObject = replacePlaceholderWithAnchorTags(markdownObject);
  markdownObject = replacePlaceholderWithStrikeoutTags(markdownObject);
  markdownObject = replacePlaceholderWithSuperScriptTags(markdownObject);
  markdownObject = replacePlaceholderWithSubScriptTags(markdownObject);

  return markdownObject.text;
};

/**
 * Transforms the given text by encoding it.
 *
 * This function checks if the provided text is not empty, and if so, it encodes the text and returns the encoded string.
 * If the provided text is empty, it returns an empty string.
 *
 * @async
 * @param {string} [text=''] - The text to be transformed. Defaults to an empty string.
 * @returns {Promise<string>} The transformed text as a Promise.
 */
export const transform = async (text: string = ''): Promise<string> => {
  if (!text) {
    return '';
  }
  return await encode(text);
};
