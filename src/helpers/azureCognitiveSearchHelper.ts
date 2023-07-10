import { SearchIterator } from '@azure/search-documents';
import { AzureKeyPagesIndexEntity, AzureSearchGroupOption, AzureSearchResult } from '@/models/types/azureSearch';
import { DistributionEntity } from '@/models/types/forge';
import { enrichDistributionEntitiesWithLinkRules } from '@/helpers/forgeDistributionEntityHelper';

const groupTypes = {
  items: [
    {
      type: 'video',
      items: ['video', 'brightcovevideo', 'jwplayervideo', 'youtubevideo', 'vimeovideo', 'divavideo'],
    },
  ],
} as AzureSearchGroupOption;

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

export const processFacets = (facets: any, items: any[]): void => {
  if (facets && facets.hasOwnProperty('type')) {
    facets.type.forEach((facet: any) => {
      if (facet.value !== 'customentity') {
        items.push({
          count: facet.count ?? 0,
          type: facet.value,
          documents: [],
        });
      }
    });
  }

  if (facets && facets.hasOwnProperty('entityCode')) {
    facets.entityCode.forEach((facet: any) => {
      items.push({
        count: facet.count ?? 0,
        type: facet.value,
        documents: [],
      });
    });
  }
};

export const processDocuments = async (
  results: SearchIterator<Pick<unknown, never>>,
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

export const processKeyPagesDocuments = async (
  results: SearchIterator<Pick<unknown, never>>,
  items: any[] | undefined
): Promise<void> => {
  for await (const result of results) {
    const document = result.document as AzureKeyPagesIndexEntity;
    items?.push(document);
  }
};

export const enrichSearchResultsWithDistributionEntities = async (items: any[]): Promise<void> => {
  for (const item of items) {
    item.documents = await enrichDistributionEntitiesWithLinkRules(item.documents, true);
  }
};

export const calculateSkip = (page: number, limit: number): number => {
  return limit > 0 ? limit * page : 0;
};
