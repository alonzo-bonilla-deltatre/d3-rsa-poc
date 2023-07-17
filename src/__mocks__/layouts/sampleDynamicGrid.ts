const genericDivContent = (number: number) =>
  `<div class="font-bold uppercase px-8 py-6 bg-[#EE3123]">col${number}</div>`;

/**
 * Returns dummy StructureItem[] items
 * @param number the number total wanted items
 * @returns the dummy items in as StructureItem[]
 */
export const getGenericItems = (number: number) => {
  return [...Array(number)].map((_, i: number) => ({
    key: {
      id: 'HtmlContent',
      namespace: 'd3-external',
    },
    type: 'module',
    properties: {
      content: genericDivContent(i + 1),
    },
    slot: `col${i + 1}`,
  }));
};
