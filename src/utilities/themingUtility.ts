import { Metadata } from '@/models/types/pageStructure';
import * as process from 'process';
import { ForgeMetadataCategoryType } from '@/models/types/forge';

/**
 * The suffix name for theming variables.
 * This is retrieved from the environment variable THEMING_SUFFIX_NAME.
 * If the environment variable is not provided, it defaults to 'd3'.
 *
 * @type {string}
 */
/* istanbul ignore next */
const themingSuffixName: string = process.env.THEMING_SUFFIX_NAME ?? 'd3';

/**
 * Generates a CSS string for theming variables.
 *
 * This function takes an array of metadata items as input. It filters the items to include only those with the category 'theming',
 * and maps each theming item to a CSS string that sets a CSS variable with the item's key and value.
 * The CSS variable name is formed by appending the item's key to the theming suffix name.
 * The CSS strings are then joined together and wrapped in a :root selector to form a CSS string for theming variables.
 *
 * @param {Metadata[]} items - The metadata items to generate the CSS string from.
 * @returns {string} The CSS string for theming variables.
 */
export const renderThemingVariables = (items: Metadata[]): string => {
  const themingItems = items.filter((item) => item.category === ForgeMetadataCategoryType.theming);
  const cssString = themingItems
    .map((item) => `--${themingSuffixName.toLowerCase()}-theme-${item.key}: ${item.value};`)
    .join(' ');

  return `:root{ ${cssString} }`;
};
