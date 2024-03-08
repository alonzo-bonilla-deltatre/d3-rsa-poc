import {
  enrichDistributionEntitiesWithLinkRules,
  enrichEntitiesWithThumbnailPlaceholder,
} from '@/helpers/forgeDistributionEntityHelper';
import { AzureKeyPagesIndexEntity, AzureSearchGroupOption, AzureSearchResult } from '@/models/types/azureSearch';
import { DistributionEntity, ForgeEntityType } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';
import { SearchIterator } from '@azure/search-documents';

/**
 * Group types for Azure Search.
 */
const groupTypes = {
  items: [
    {
      type: 'video',
      items: ['video', 'brightcovevideo', 'jwplayervideo', 'youtubevideo', 'vimeovideo', 'divavideo'],
    },
  ],
} as AzureSearchGroupOption;

/**
 * Groups search results by entity type.
 *
 * @param {AzureSearchResult} azureSearchResult - The Azure search result to group.
 */
export const groupSearchResultsByEntityType = (azureSearchResult: AzureSearchResult) => {
  groupTypes.items.forEach((groupItem) => {
    const groups = {
      count: 0, // This must be set to 0
      type: groupItem.type,
      documents: new Array(),
    };

    if (!azureSearchResult.forgeEntities.items.some((item) => groupItem.items.includes(item.type))) {
      return;
    }

    // Group videoEntityTypes items into video entity code key ('video')
    groupItem.items.forEach((videoItem) => {
      const foundItem = azureSearchResult.forgeEntities.items.find((item) => item.type === videoItem);

      // Push the item to the 'video' object
      groups.documents.push(...(foundItem?.documents ?? []));
      groups.count += foundItem?.count ?? 0;

      // Remove current item in order to avoid duplicates
      azureSearchResult.forgeEntities.items = azureSearchResult.forgeEntities.items.filter(
        (item) => item !== foundItem
      );
    });

    // Push the new video results to the original azureSearchResult
    azureSearchResult.forgeEntities.items.push(groups);
  });
};

/**
 * Creates a filter for Azure Search.
 *
 * @param {string} facetType - The facet type.
 * @param {string} facetValue - The facet value.
 * @returns {string} The filter string.
 */
export const createFilter = (facetType: string, facetValue: string): string => {
  let filter = '';
  if (facetType && facetValue) {
    if (groupTypes.items.some((item) => item.type === facetValue)) {
      groupTypes.items
        .find((item) => item.type === facetValue)
        ?.items.map((type) => {
          if (filter) {
            filter = filter.concat(' or ');
          }
          filter = filter.concat(`${facetType} eq '${type}'`);
        });
    } else {
      filter = filter.concat(`${facetType} eq '${facetValue}'`);
    }
  }
  return filter;
};

/**
 * Processes facets from Azure Search.
 *
 * @param {any} facets - The facets to process.
 * @param {any[]} items - The items to add the processed facets to.
 */
export const processFacets = (facets: any, items: any[]): void => {
  if (facets && facets.hasOwnProperty('type')) {
    facets.type.forEach((facet: any) => {
      if (facet.value !== ForgeEntityType.customEntity) {
        items.push({
          count: facet.count ? facet.count : 0,
          type: facet.value,
          documents: [],
        });
      }
    });
  }

  if (facets && facets.hasOwnProperty('entityCode')) {
    facets.entityCode.forEach((facet: any) => {
      items.push({
        count: facet.count ? facet.count : 0,
        type: facet.value,
        documents: [],
      });
    });
  }
};

/**
 * Processes documents from Azure Search.
 *
 * @async
 * @param {SearchIterator<object, string>} results - The search results to process.
 * @param {any[] | undefined} items - The items to add the processed documents to.
 */
export const processDocuments = async (
  results: SearchIterator<object, string>,
  items: any[] | undefined
): Promise<void> => {
  for await (const result of results) {
    const document = result.document as DistributionEntity;
    const typeItem = items?.find((item) => item.type === document.type);
    const entityCodeItem = items?.find((item) => item.type === document.entityCode);

    if (typeItem) {
      typeItem.documents.push(document);
    }

    if (entityCodeItem && entityCodeItem !== typeItem) {
      entityCodeItem.documents.push(document);
    }
  }
};

/**
 * Processes key pages documents from Azure Search.
 *
 * @async
 * @param {SearchIterator<object, string>} results - The search results to process.
 * @param {any[] | undefined} items - The items to add the processed documents to.
 */
export const processKeyPagesDocuments = async (
  results: SearchIterator<object, string>,
  items: any[] | undefined
): Promise<void> => {
  for await (const result of results) {
    const document = result.document as AzureKeyPagesIndexEntity;
    items?.push(document);
  }
};

/**
 * Enriches search results with distribution entities.
 *
 * @async
 * @param {any[]} items - The items to enrich.
 * @param {Variable[] | undefined} variables - The variables to use for enrichment.
 */
export const enrichSearchResultsWithDistributionEntities = async (
  items: any[],
  variables?: Variable[]
): Promise<void> => {
  for (const item of items) {
    item.documents = await enrichDistributionEntitiesWithLinkRules(item.documents, true);
    item.documents = enrichEntitiesWithThumbnailPlaceholder(item.documents, variables);
  }
};

/**
 * Calculates the number of items to skip for pagination.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {number} The number of items to skip.
 */
export const calculateSkip = (page: number, limit: number): number => {
  return limit > 0 ? limit * page : 0;
};
