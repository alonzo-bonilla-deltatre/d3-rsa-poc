/**
 * @jest-environment node
 */

import { azureSearch, azureSearchForgeEntities, azureSearchKeyPages } from '@/app/actions/azureSearch';
import { searchForgeEntities, searchKeyPages, searchTotalCount } from '@/services/azureCognitiveSearchService';
import { AzureSearchOption, AzureSearchResult } from '@/models/types/azureSearch';
import { Variable } from '@/models/types/pageStructure';

jest.mock('@/services/azureCognitiveSearchService');

describe('azureSearch', () => {
  const azureSearchOption: AzureSearchOption = {
    q: 'test',
    page: 0,
    limit: 10,
    keyPagesPage: 10,
    keyPagesLimit: 10,
    facetType: '',
    facetValue: '',
  };
  const variables: Variable[] = [];

  it('returns data when search is successful', async () => {
    const mockResult: AzureSearchResult = {
      totalCount: 10,
      forgeEntities: { count: 5, items: [] },
      keyPages: { count: 5, items: [] },
    };
    (searchTotalCount as jest.Mock).mockResolvedValue(10);
    (searchForgeEntities as jest.Mock).mockResolvedValue({ count: 5, items: [] });
    (searchKeyPages as jest.Mock).mockResolvedValue({ count: 5, items: [] });

    const result = await azureSearch(azureSearchOption, variables);

    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    (searchTotalCount as jest.Mock).mockRejectedValue(new Error('Search failed'));

    const result = await azureSearch(azureSearchOption, variables);

    expect(result.error).toBe('Search failed');
  });
});

describe('azureSearchForgeEntities', () => {
  const azureSearchOption: AzureSearchOption = {
    q: 'test',
    page: 0,
    limit: 10,
    keyPagesPage: 10,
    keyPagesLimit: 10,
    facetType: '',
    facetValue: '',
  };
  const variables: Variable[] = [];

  it('returns data when search is successful', async () => {
    const mockResult = { count: 5, items: [] };
    (searchForgeEntities as jest.Mock).mockResolvedValue(mockResult);

    const result = await azureSearchForgeEntities(azureSearchOption, variables);

    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    (searchForgeEntities as jest.Mock).mockRejectedValue(new Error('Search failed'));

    const result = await azureSearchForgeEntities(azureSearchOption, variables);

    expect(result.error).toBe('Search failed');
  });
});

describe('azureSearchKeyPages', () => {
  const azureSearchOption: AzureSearchOption = {
    q: 'test',
    page: 0,
    limit: 10,
    keyPagesPage: 10,
    keyPagesLimit: 10,
    facetType: '',
    facetValue: '',
  };

  it('returns data when search is successful', async () => {
    const mockResult = { count: 5, items: [] };
    (searchKeyPages as jest.Mock).mockResolvedValue(mockResult);

    const result = await azureSearchKeyPages(azureSearchOption);

    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    (searchKeyPages as jest.Mock).mockRejectedValue(new Error('Search failed'));

    const result = await azureSearchKeyPages(azureSearchOption);

    expect(result.error).toBe('Search failed');
  });
});
