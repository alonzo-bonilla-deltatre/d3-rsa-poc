'use server';

import { AzureSearchOption, AzureSearchResult } from '@/models/types/azureSearch';
import { searchForgeEntities, searchKeyPages, searchTotalCount } from '@/services/azureCognitiveSearchService';
import { Variable } from '@/models/types/pageStructure';

const errorMessage = 'Unable to retrieve data from search. Please try again later.';

export async function azureSearch(azureSearchOption: AzureSearchOption, variables?: Variable[]) {
  try {
    let data: AzureSearchResult = {
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
    data.totalCount = await searchTotalCount(azureSearchOption);
    data.forgeEntities = await searchForgeEntities(azureSearchOption, variables);
    data.keyPages = await searchKeyPages(azureSearchOption);
    return { data };
  } catch (e) {
    let message = errorMessage;
    if (e instanceof Error) message = e.message;
    return { error: message };
  }
}

export async function azureSearchForgeEntities(azureSearchOption: AzureSearchOption, variables?: Variable[]) {
  try {
    const data = await searchForgeEntities(azureSearchOption, variables);
    return { data };
  } catch (e) {
    let message = errorMessage;
    if (e instanceof Error) message = e.message;
    return { error: message };
  }
}

export async function azureSearchKeyPages(azureSearchOption: AzureSearchOption) {
  try {
    const data = await searchKeyPages(azureSearchOption);
    return { data };
  } catch (e) {
    let message = errorMessage;
    if (e instanceof Error) message = e.message;
    return { error: message };
  }
}
