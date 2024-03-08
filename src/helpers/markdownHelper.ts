/* istanbul ignore file */
import { remark } from 'remark';
import remarkHtml from 'remark-html';

type MarkdownObject = {
  text: string;
  links: string[];
  strikeouts: string[];
  superScripts: string[];
  subScripts: string[];
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
  const processedContent = await remark().use(remarkHtml, { sanitize: true }).process(markdownObject.text);
  markdownObject.text = processedContent?.toString() ? processedContent?.toString() : markdownObject.text;

  // replaced placeholder with correct html tags
  markdownObject = replacePlaceholderWithAnchorTags(markdownObject);
  markdownObject = replacePlaceholderWithStrikeoutTags(markdownObject);
  markdownObject = replacePlaceholderWithSuperScriptTags(markdownObject);
  markdownObject = replacePlaceholderWithSubScriptTags(markdownObject);

  return markdownObject.text;
};

/**
 * Replaces anchor tags in the text of a given markdown object with placeholders and stores the original anchor tags.
 *
 * This function first creates a regular expression pattern to match anchor tags in the text.
 * It then finds all matches of this pattern in the text and stores them in an array.
 * For each match, it adds the match to the links array of the markdown object and replaces the match in the text with a placeholder.
 * The placeholder is a string that includes the index of the match in the links array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with anchor tags replaced by placeholders.
 */
export function replaceAnchorTagsWithPlaceholder(markdownObject: MarkdownObject) {
  // manage links
  const patternRegex = /<\s*(a)[^>]*>(.*?)<\s*\/\s*(a)>/g;
  const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map((m) => m[0]);

  matches?.map((m) => {
    markdownObject.links.push(m);
    markdownObject.text = markdownObject.text.replace(m, `[link-placeholder-${markdownObject.links.length - 1}]`);
  });

  return markdownObject;
}

/**
 * Replaces strikeout tags in the text of a given markdown object with placeholders and stores the original strikeout tags.
 *
 * This function first creates a regular expression pattern to match strikeout tags in the text.
 * It then finds all matches of this pattern in the text and stores them in an array.
 * For each match, it adds the match to the strikeouts array of the markdown object and replaces the match in the text with a placeholder.
 * The placeholder is a string that includes the index of the match in the strikeouts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with strikeout tags replaced by placeholders.
 */
export function replaceStrikeoutTagsWithPlaceholder(markdownObject: MarkdownObject) {
  // manage strikeout
  const patternRegex = /<\s*(s)[^>]*>(.*?)<\s*\/\s*(s)>/g;
  const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map((m) => m[0]);

  matches?.map((m) => {
    markdownObject.strikeouts.push(m);
    markdownObject.text = markdownObject.text.replace(
      m,
      `[strikeout-placeholder-${markdownObject.strikeouts.length - 1}]`
    );
  });

  return markdownObject;
}

/**
 * Replaces superscript tags in the text of a given markdown object with placeholders and stores the original superscript tags.
 *
 * This function first creates a regular expression pattern to match superscript tags in the text.
 * It then finds all matches of this pattern in the text and stores them in an array.
 * For each match, it adds the match to the superScripts array of the markdown object and replaces the match in the text with a placeholder.
 * The placeholder is a string that includes the index of the match in the superScripts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with superscript tags replaced by placeholders.
 */
export function replaceSuperScriptTagsWithPlaceholder(markdownObject: MarkdownObject) {
  // manage superscript
  const patternRegex = /<\s*(sup)[^>]*>(.*?)<\s*\/\s*(sup)>/g;
  const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map((m) => m[0]);

  matches?.map((m) => {
    markdownObject.superScripts.push(m);
    markdownObject.text = markdownObject.text.replace(
      m,
      `[superscript-placeholder-${markdownObject.superScripts.length - 1}]`
    );
  });
  return markdownObject;
}

/**
 * Replaces subscript tags in the text of a given markdown object with placeholders and stores the original subscript tags.
 *
 * This function first creates a regular expression pattern to match subscript tags in the text.
 * It then finds all matches of this pattern in the text and stores them in an array.
 * For each match, it adds the match to the subScripts array of the markdown object and replaces the match in the text with a placeholder.
 * The placeholder is a string that includes the index of the match in the subScripts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with subscript tags replaced by placeholders.
 */
export function replaceSubScriptTagsWithPlaceholder(markdownObject: MarkdownObject) {
  // manage subscript
  const patternRegex = /<\s*(sub)[^>]*>(.*?)<\s*\/\s*(sub)>/g;
  const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map((m) => m[0]);

  matches?.map((m) => {
    markdownObject.subScripts.push(m);
    markdownObject.text = markdownObject.text.replace(
      m,
      `[subscript-placeholder-${markdownObject.subScripts.length - 1}]`
    );
  });

  return markdownObject;
}

/**
 * Replaces placeholders in the text of a given markdown object with the original anchor tags.
 *
 * This function iterates over each link in the markdown object's links array.
 * For each link, it replaces the corresponding placeholder in the text with the link.
 * The placeholder is a string that includes the index of the link in the links array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with placeholders replaced by anchor tags.
 */
export function replacePlaceholderWithAnchorTags(markdownObject: MarkdownObject) {
  // manage links
  for (let i = 0; i < markdownObject.links.length; i++) {
    let link = markdownObject.links[i];
    markdownObject.text = markdownObject.text.replace(`[link-placeholder-${i}]`, link);
  }

  return markdownObject;
}

/**
 * Replaces placeholders in the text of a given markdown object with the original strikeout tags.
 *
 * This function iterates over each strikeout tag in the markdown object's strikeouts array.
 * For each strikeout tag, it replaces the corresponding placeholder in the text with the strikeout tag.
 * The placeholder is a string that includes the index of the strikeout tag in the strikeouts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with placeholders replaced by strikeout tags.
 */
export function replacePlaceholderWithStrikeoutTags(markdownObject: MarkdownObject) {
  // manage strikeouts
  for (let i = 0; i < markdownObject.strikeouts.length; i++) {
    let link = markdownObject.strikeouts[i];
    markdownObject.text = markdownObject.text.replace(`[strikeout-placeholder-${i}]`, link);
  }

  return markdownObject;
}

/**
 * Replaces placeholders in the text of a given markdown object with the original superscript tags.
 *
 * This function iterates over each superscript tag in the markdown object's superScripts array.
 * For each superscript tag, it replaces the corresponding placeholder in the text with the superscript tag.
 * The placeholder is a string that includes the index of the superscript tag in the superScripts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with placeholders replaced by superscript tags.
 */
export function replacePlaceholderWithSuperScriptTags(markdownObject: MarkdownObject) {
  // manage superscripts
  for (let i = 0; i < markdownObject.superScripts.length; i++) {
    let link = markdownObject.superScripts[i];
    markdownObject.text = markdownObject.text.replace(`[superscript-placeholder-${i}]`, link);
  }

  return markdownObject;
}

/**
 * Replaces placeholders in the text of a given markdown object with the original subscript tags.
 *
 * This function iterates over each subscript tag in the markdown object's subScripts array.
 * For each subscript tag, it replaces the corresponding placeholder in the text with the subscript tag.
 * The placeholder is a string that includes the index of the subscript tag in the subScripts array.
 * Finally, it returns the updated markdown object.
 *
 * @param {MarkdownObject} markdownObject - The markdown object to process.
 * @returns {MarkdownObject} The updated markdown object with placeholders replaced by subscript tags.
 */
export function replacePlaceholderWithSubScriptTags(markdownObject: MarkdownObject) {
  // manage subscripts
  for (let i = 0; i < markdownObject.subScripts.length; i++) {
    let link = markdownObject.subScripts[i];
    markdownObject.text = markdownObject.text.replace(`[subscript-placeholder-${i}]`, link);
  }

  return markdownObject;
}
