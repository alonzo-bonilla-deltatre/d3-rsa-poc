'use client';

import SearchBar from '@/components/commons/SearchBar/SearchBar';
import { getTotalCount } from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureSearchOption, AzureSearchResult, SearchResult } from '@/models/types/azureSearch';
import { useCallback, useEffect, useState } from 'react';
import { azureSearch } from '@/app/actions/azureSearch';
import { Variable } from '@/models/types/pageStructure';
import SearchResultsForgeEntitiesView from '@/components/modules/SearchResults/SearchResultsForgeEntitiesView';
import SearchResultsKeyPagesView from '@/components/modules/SearchResults/SearchResultsKeyPagesView';
import Loader from '@/components/commons/Loader/Loader';
import SearchResultsEmptyView from '@/components/modules/SearchResults/SearchResultsEmptyView';

type SearchResultViewProps = {
  cardLayout?: string;
  searchPath?: string;
  initialAzureSearchOption: AzureSearchOption;
  variables?: Variable[];
  isDark?: boolean;
};

const SearchResultView = ({
  searchPath,
  initialAzureSearchOption,
  variables,
}: SearchResultViewProps) => {
  const [searchResult, setSearchResult] = useState<AzureSearchResult>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (azureSearchOption: AzureSearchOption, variables?: Variable[]) => {
    const result = await azureSearch(azureSearchOption, variables);
    if (result?.data) {
      setSearchResult(result?.data);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialAzureSearchOption) {
      setIsLoading(true);
      fetchData(initialAzureSearchOption).then((r) => r);
    }
  }, [fetchData, initialAzureSearchOption]);

  const types = searchResult?.forgeEntities.items.map((item: SearchResult) => item.type);

  const totalCount = getTotalCount(initialAzureSearchOption, searchResult);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <SearchBar
        additionalClasses="mb-4 bg-transparent"
        inputAdditionalClasses="bg-transparent"
        inputValue={initialAzureSearchOption.q}
        showResultsCount
        resultsCount={totalCount}
        redirectPath={searchPath}
      />
      {isLoading ? (
        <div className="relative">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4 lg:gap-6">
          <SearchResultsKeyPagesView
            initialAzureSearchOption={initialAzureSearchOption}
          />
          <SearchResultsForgeEntitiesView
            types={types}
            initialAzureSearchOption={initialAzureSearchOption}
            variables={variables}
          />
          <SearchResultsEmptyView
            isLoading={isLoading}
            searchResult={searchResult}
          />
        </div>
      )}
    </div>
  );
};
export default SearchResultView;
