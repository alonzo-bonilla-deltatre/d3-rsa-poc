/* istanbul ignore file */
import { AzureSearchResult } from '@/models/types/azureSearch';
import {
  groupSearchResultsByEntityType,
  createFilter,
  processFacets,
  calculateSkip,
  processDocuments,
  enrichSearchResultsWithDistributionEntities,
  processKeyPagesDocuments,
} from '@/helpers/azureCognitiveSearchHelper';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { AzureKeyCredential, SearchClient } from '@azure/search-documents';

export const search = async (
  q: string,
  page: number = 0,
  limit: number = 25,
  keyPagesLimit: number = 25,
  facetType: string = '',
  facetValue: string = ''
): Promise<AzureSearchResult> => {
  let azureSearchResult: AzureSearchResult = {
    totalCount: 0,
    forgeEntities: {
      count: 0,
      items: [],
    },
    keyPages: {
      count: 0,
      items: [],
    },
  };
  try {
    const client = new SearchClient(
      process.env.AZURE_COGNITIVE_SEARCH_ENDPOINT_URL ?? '',
      process.env.AZURE_COGNITIVE_SEARCH_INDEX_NAME ?? '',
      new AzureKeyCredential(process.env.AZURE_COGNITIVE_SEARCH_KEY ?? '')
    );
    let keyPagesClient = null;
    if (process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME) {
      keyPagesClient = new SearchClient(
        process.env.AZURE_COGNITIVE_SEARCH_ENDPOINT_URL ?? '',
        process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME ?? '',
        new AzureKeyCredential(process.env.AZURE_COGNITIVE_SEARCH_KEY ?? '')
      );
    }
    const filter = createFilter(facetType, facetValue);

    const searchResults = await client.search(q, {
      queryType: 'full',
      searchMode: 'all',
      facets: ['type', 'entityCode'],
      skip: 0,
      top: 0,
      includeTotalCount: true,
    });

    if (!searchResults) {
      return azureSearchResult;
    }

    if (page < 0) {
      page = 0;
    }

    azureSearchResult.forgeEntities.count = searchResults.count ?? 0;

    processFacets(searchResults.facets, azureSearchResult.forgeEntities.items);

    if (keyPagesClient && !facetType && !facetValue) {
      let keyPages = await keyPagesClient.search(q, {
        queryType: 'full',
        searchMode: 'all',
        filter: `Culture eq '${process.env.CULTURE}'`,
        skip: 0,
        top: 0,
        includeTotalCount: true,
      });
      azureSearchResult.keyPages.count = keyPages.count ?? 0;

      keyPages = await keyPagesClient.search(q, {
        queryType: 'full',
        searchMode: 'all',
        filter: `Culture eq '${process.env.CULTURE}'`,
        skip: calculateSkip(page, keyPagesLimit),
        top: keyPagesLimit,
        includeTotalCount: true,
      });
      await processKeyPagesDocuments(keyPages.results, azureSearchResult.keyPages.items);
    }

    const searchResultsWithDocuments = await client.search(q, {
      queryType: 'full',
      searchMode: 'all',
      facets: ['type', 'entityCode'],
      filter,
      skip: calculateSkip(page, limit),
      top: limit,
      includeTotalCount: true,
    });

    await processDocuments(searchResultsWithDocuments.results, azureSearchResult.forgeEntities.items);

    await enrichSearchResultsWithDistributionEntities(azureSearchResult.forgeEntities.items);

    groupSearchResultsByEntityType(azureSearchResult);

    azureSearchResult.totalCount = azureSearchResult.forgeEntities.count + azureSearchResult.keyPages.count;

    return azureSearchResult;
  } catch (ex) {
    logger.log(`AZURE COGNITIVE SEARCH Error. ${JSON.stringify(ex)}`, LoggerLevel.error);
    throw ex;
  }
};
