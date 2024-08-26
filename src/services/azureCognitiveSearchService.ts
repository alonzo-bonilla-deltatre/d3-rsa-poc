import {
  AzureSearchForgeEntitiesResult,
  AzureSearchKeyPagesResult,
  AzureSearchOption,
  AzureSearchResult,
} from '@/models/types/azureSearch';
import {
  groupSearchResultsByEntityType,
  createFilter,
  processFacets,
  calculateSkip,
  processDocuments,
  enrichSearchResultsWithDistributionEntities,
  processKeyPagesDocuments,
} from '@/helpers/azureCognitiveSearchHelper';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { AzureKeyCredential, SearchClient } from '@azure/search-documents';
import { Variable } from '@/models/types/pageStructure';

/**
 * Function to get the total count of search results from Azure Cognitive Search.
 * It creates a new `SearchClient` and sends a search request with the provided `azureSearchOption`.
 * The total count of search results is returned.
 *
 * @param {AzureSearchOption} azureSearchOption - The search options to use.
 * @returns {Promise<number>} - The total count of search results.
 * @throws {Error} - If an error occurs during the search.
 */
export const searchTotalCount = async (azureSearchOption: AzureSearchOption): Promise<number> => {
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
        process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME,
        new AzureKeyCredential(process.env.AZURE_COGNITIVE_SEARCH_KEY ?? '')
      );
    }

    const searchResults = await client.search(azureSearchOption.q, {
      queryType: 'full',
      searchMode: 'all',
      facets: ['type', 'entityCode'],
      skip: 0,
      top: 0,
      includeTotalCount: true,
    });

    if (azureSearchOption.page < 0) {
      azureSearchOption.page = 0;
    }

    azureSearchResult.forgeEntities.count = searchResults.count ?? 0;

    processFacets(searchResults.facets, azureSearchResult.forgeEntities.items);

    if (keyPagesClient && !azureSearchOption.facetType && !azureSearchOption.facetValue) {
      let keyPages = await keyPagesClient.search(azureSearchOption.q, {
        queryType: 'full',
        searchMode: 'all',
        filter: `Culture eq '${process.env.CULTURE}'`,
        skip: 0,
        top: 0,
        includeTotalCount: true,
      });
      azureSearchResult.keyPages.count = keyPages.count ?? 0;
    }

    azureSearchResult.totalCount = azureSearchResult.forgeEntities.count + azureSearchResult.keyPages.count;

    return azureSearchResult.totalCount;
  } catch (ex) {
    logger.log(`AZURE COGNITIVE SEARCH Error. ${JSON.stringify(ex)}`, LoggerLevel.error);
    throw ex;
  }
};

/**
 * Function to search for forge entities from Azure Cognitive Search.
 * It creates a new `SearchClient` and sends a search request with the provided `azureSearchOption` and optional `variables`.
 * The search results are processed and returned.
 *
 * @param {AzureSearchOption} azureSearchOption - The search options to use.
 * @param {Variable[] | undefined} variables - Optional variables to use.
 * @returns {Promise<AzureSearchForgeEntitiesResult>} - The search results.
 * @throws {Error} - If an error occurs during the search.
 */
export const searchForgeEntities = async (
  azureSearchOption: AzureSearchOption,
  variables?: Variable[]
): Promise<AzureSearchForgeEntitiesResult> => {
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
    const filter = createFilter(azureSearchOption.facetType, azureSearchOption.facetValue);

    if (azureSearchOption.page < 0) {
      azureSearchOption.page = 0;
    }

    const searchResultsWithDocuments = await client.search(azureSearchOption.q, {
      queryType: 'full',
      searchMode: 'all',
      facets: ['type', 'entityCode'],
      filter,
      skip: calculateSkip(azureSearchOption.page, azureSearchOption.limit),
      top: azureSearchOption.limit,
      includeTotalCount: true,
    });

    azureSearchResult.forgeEntities.count = searchResultsWithDocuments.count ?? 0;

    processFacets(searchResultsWithDocuments.facets, azureSearchResult.forgeEntities.items);

    await processDocuments(searchResultsWithDocuments.results, azureSearchResult.forgeEntities.items);

    await enrichSearchResultsWithDistributionEntities(azureSearchResult.forgeEntities.items, variables);

    groupSearchResultsByEntityType(azureSearchResult);

    return azureSearchResult.forgeEntities;
  } catch (ex) {
    logger.log(`AZURE COGNITIVE SEARCH Error. ${JSON.stringify(ex)}`, LoggerLevel.error);
    throw ex;
  }
};

/**
 * Function to search for key pages from Azure Cognitive Search.
 * It creates a new `SearchClient` and sends a search request with the provided `azureSearchOption`.
 * The search results are processed and returned.
 *
 * @param {AzureSearchOption} azureSearchOption - The search options to use.
 * @returns {Promise<AzureSearchKeyPagesResult>} - The search results.
 * @throws {Error} - If an error occurs during the search.
 */
export const searchKeyPages = async (azureSearchOption: AzureSearchOption): Promise<AzureSearchKeyPagesResult> => {
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
    let keyPagesClient = null;
    if (process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME) {
      keyPagesClient = new SearchClient(
        process.env.AZURE_COGNITIVE_SEARCH_ENDPOINT_URL ?? '',
        process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME,
        new AzureKeyCredential(process.env.AZURE_COGNITIVE_SEARCH_KEY ?? '')
      );
    }

    if (azureSearchOption.keyPagesPage < 0) {
      azureSearchOption.keyPagesPage = 0;
    }

    if (keyPagesClient) {
      let keyPages = await keyPagesClient.search(azureSearchOption.q, {
        queryType: 'full',
        searchMode: 'all',
        filter: `Culture eq '${process.env.CULTURE}'`,
        skip: 0,
        top: 0,
        includeTotalCount: true,
      });
      azureSearchResult.keyPages.count = keyPages.count ?? 0;

      keyPages = await keyPagesClient.search(azureSearchOption.q, {
        queryType: 'full',
        searchMode: 'all',
        filter: `Culture eq '${process.env.CULTURE}'`,
        skip: calculateSkip(azureSearchOption.keyPagesPage, azureSearchOption.keyPagesLimit),
        top: azureSearchOption.keyPagesLimit,
        includeTotalCount: true,
      });
      await processKeyPagesDocuments(keyPages.results, azureSearchResult.keyPages.items);
    }

    return azureSearchResult.keyPages;
  } catch (ex) {
    logger.log(`AZURE COGNITIVE KEY PAGES SEARCH Error. ${JSON.stringify(ex)}`, LoggerLevel.error);
    throw ex;
  }
};
