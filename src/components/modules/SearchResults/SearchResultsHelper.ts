import { getDataVariable } from '@/helpers/dataVariableHelper';
import { checkPathFormats } from '@/helpers/urlHelper';
import {
  AzureKeyPagesIndexEntity,
  AzureSearchForgeEntitiesResult,
  AzureSearchOption,
  AzureSearchResult,
} from '@/models/types/azureSearch';
import { DistributionEntity } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';

export const createSearchResultItems = (facetValue: string, searchResult?: AzureSearchForgeEntitiesResult) => {
  let items: DistributionEntity[] = [];
  if (facetValue) {
    items =
      searchResult?.items.filter((item) => item.type === facetValue && item.documents.length > 0)[0]?.documents ?? [];
  } else {
    searchResult?.items.forEach((item) => {
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

export const getPaginationNextPage = (
  azureSearchOption: AzureSearchOption,
  items: DistributionEntity[],
  totalCount: number
) => {
  const totalItemsShowed = azureSearchOption.limit * (azureSearchOption.page + 1) === totalCount;
  const page = azureSearchOption.page > 0 ? azureSearchOption.page + 1 : 1;
  return items.length && items.length === azureSearchOption.limit && !totalItemsShowed ? page : 0;
};

export const getPaginationPrevPage = (azureSearchOption: AzureSearchOption) => {
  return azureSearchOption.page >= 0 ? azureSearchOption.page - 1 : -1;
};

export const getPaginationNextKeyPagesPage = (
  azureSearchOption: AzureSearchOption,
  searchResult: AzureKeyPagesIndexEntity[],
  totalCount: number
) => {
  const totalItemsShowed = azureSearchOption.keyPagesLimit * (azureSearchOption.keyPagesPage + 1) === totalCount;
  const page = azureSearchOption.keyPagesPage > 0 ? azureSearchOption.keyPagesPage + 1 : 1;
  return searchResult?.length && searchResult?.length === azureSearchOption.keyPagesLimit && !totalItemsShowed
    ? page
    : 0;
};

export const getPaginationPrevKeyPagesPage = (azureSearchOption: AzureSearchOption) => {
  return azureSearchOption.keyPagesPage >= 0 ? azureSearchOption.keyPagesPage - 1 : -1;
};

export const getTotalCount = (azureSearchOption: AzureSearchOption, searchResult?: AzureSearchResult) => {
  let totalCount = 0;
  if (azureSearchOption.facetType && azureSearchOption.facetValue) {
    totalCount =
      searchResult?.forgeEntities.items.find((item) => item.type === azureSearchOption.facetValue)?.count ?? 0;
    totalCount += searchResult?.keyPages.count ?? 0;
  } else {
    totalCount = searchResult?.totalCount ?? 0;
  }
  return totalCount;
};
