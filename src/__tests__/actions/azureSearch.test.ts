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
    // ARRANGE
    const mockResult: AzureSearchResult = {
      totalCount: 10,
      forgeEntities: { count: 5, items: [] },
      keyPages: { count: 5, items: [] },
    };
    (searchTotalCount as jest.Mock).mockResolvedValue(10);
    (searchForgeEntities as jest.Mock).mockResolvedValue({ count: 5, items: [] });
    (searchKeyPages as jest.Mock).mockResolvedValue({ count: 5, items: [] });

    // ACT
    const result = await azureSearch(azureSearchOption, variables);

    // ASSERT
    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    // ARRANGE
    (searchTotalCount as jest.Mock).mockRejectedValue(new Error('Search failed'));

    // ACT
    const result = await azureSearch(azureSearchOption, variables);

    // ASSERT
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
    // ARRANGE
    const mockResult = { count: 5, items: [] };
    (searchForgeEntities as jest.Mock).mockResolvedValue(mockResult);

    // ACT
    const result = await azureSearchForgeEntities(azureSearchOption, variables);

    // ASSERT
    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    // ARRANGE
    (searchForgeEntities as jest.Mock).mockRejectedValue(new Error('Search failed'));

    // ACT
    const result = await azureSearchForgeEntities(azureSearchOption, variables);

    // ASSERT
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
    // ARRANGE
    const mockResult = { count: 5, items: [] };
    (searchKeyPages as jest.Mock).mockResolvedValue(mockResult);

    // ACT
    const result = await azureSearchKeyPages(azureSearchOption);

    // ASSERT
    expect(result.data).toEqual(mockResult);
  });

  it('returns error message when search fails', async () => {
    // ARRANGE
    (searchKeyPages as jest.Mock).mockRejectedValue(new Error('Search failed'));

    // ACT
    const result = await azureSearchKeyPages(azureSearchOption);

    // ASSERT
    expect(result.error).toBe('Search failed');
  });
});
