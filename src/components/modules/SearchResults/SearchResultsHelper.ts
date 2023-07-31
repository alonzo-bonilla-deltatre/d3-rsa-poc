import { getDataVariable } from '@/helpers/dataVariableHelper';
import { checkPathFormats } from '@/helpers/urlHelper';
import { AzureSearchOption, AzureSearchResult } from '@/models/types/azureSearch';
import { DistributionEntity } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';

export const createSearchResultItems = (facetValue: string, searchResult: AzureSearchResult) => {
  let items: DistributionEntity[] = [];
  if (facetValue) {
    items =
      searchResult.forgeEntities.items.filter((item) => item.type === facetValue && item.documents.length > 0)[0]
        ?.documents ?? [];
  } else {
    searchResult.forgeEntities.items.forEach((item) => {
      item.documents.forEach((document) => {
        items.push(document);
      });
    });
  }
  return items;
};

export const getSearchPath = (variables: Variable[] | undefined) => {
  let searchPath = getDataVariable(variables, 'search_path');
  // fallback based on "pagePath" var
  if (!searchPath) {
    searchPath = getDataVariable(variables, 'pagePath') + '/search';
  }
  return checkPathFormats(searchPath);
};

export const getLink = (searchPath: string, q: string, facetType: string = '', facetValue: string = '') =>
  facetType && facetValue
    ? `${searchPath}?q=${q}&facetType=${facetType}&facetValue=${facetValue}`
    : `${searchPath}?q=${q}`;

export const getPaginationUrl = (path: string, azureSearchOption: AzureSearchOption) => {
  return `${path}?q=${azureSearchOption.q}&facetType=${azureSearchOption.facetType}&facetValue=${azureSearchOption.facetValue}`;
};

export const getPaginationNextUrl = (
  searchResult: AzureSearchResult,
  items: DistributionEntity[],
  azureSearchOption: AzureSearchOption,
  paginationUrl: string
) => {
  const page = azureSearchOption.page > 0 ? azureSearchOption.page + 1 : 1;
  return (searchResult.keyPages.items.length &&
    searchResult.keyPages.items.length === azureSearchOption.keyPagesLimit) ||
    (items.length && items.length === azureSearchOption.limit)
    ? `${paginationUrl}&page=${page}`
    : '';
};

export const getPaginationPrevUrl = (azureSearchOption: AzureSearchOption, paginationUrl: string) => {
  return azureSearchOption.page > 0 ? `${paginationUrl}&page=${azureSearchOption.page - 1}` : '';
};

export const getTotalCount = (azureSearchOption: AzureSearchOption, searchResult: AzureSearchResult) => {
  let totalCount = 0;
  if (azureSearchOption.facetType && azureSearchOption.facetValue) {
    totalCount =
      searchResult.forgeEntities.items.find((item) => item.type === azureSearchOption.facetValue)?.count ?? 0;
    totalCount += searchResult.keyPages.count;
  } else {
    totalCount = searchResult.totalCount;
  }
  return totalCount;
};
