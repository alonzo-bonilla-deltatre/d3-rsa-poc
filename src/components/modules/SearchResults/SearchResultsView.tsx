'use client';

import SearchBar from '@/components/commons/SearchBar/SearchBar';
import { getTotalCount } from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureSearchOption, AzureSearchResult, SearchResult } from '@/models/types/azureSearch';
import { CardLayout, CardOptions, CardType } from '@/models/types/card';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';
import { useCallback, useEffect, useState } from 'react';
import { azureSearch } from '@/app/actions/azureSearch';
import { Variable } from '@/models/types/pageStructure';
import SearchResultsForgeEntitiesView from '@/components/modules/SearchResults/SearchResultsForgeEntitiesView';
import SearchResultsKeyPagesView from '@/components/modules/SearchResults/SearchResultsKeyPagesView';
import Loader from '@/components/commons/Loader/Loader';
import SearchResultsEmptyView from '@/components/modules/SearchResults/SearchResultsEmptyView';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';

type SearchResultViewProps = {
  cardLayout?: string;
  searchPath?: string;
  initialAzureSearchOption: AzureSearchOption;
  variables?: Variable[];
  isDark?: boolean;
};

const SearchResultView = ({
  cardLayout,
  searchPath,
  initialAzureSearchOption,
  variables,
  isDark,
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

  const cardOptions = {
    hideIcon: true,
    hideRoofline: true,
    hideTitle: false,
    hideDate: true,
    hideAuthor: true,
    hideCta: true,
    hideSummary: true,
  } as CardOptions;

  const cardDesign = getCardSettings(
    CardType.KeyPages,
    cardOptions,
    cardLayout ? (cardLayout as CardLayout) : CardLayout.Landscape
  );

  return (
    <>
      <SearchBar
        additionalClasses={`mb-4 bg-transparent text-black dark:text-white ${getDarkClass(isDark)}`}
        inputAdditionalClasses={'bg-transparent'}
        inputValue={initialAzureSearchOption.q}
        showResultsCount
        resultsCount={totalCount}
        redirectPath={searchPath}
      />
      {isLoading ? (
        <div className={'relative'}>
          <Loader />
        </div>
      ) : (
        <>
          <SearchResultsKeyPagesView
            cardDesign={cardDesign}
            initialAzureSearchOption={initialAzureSearchOption}
          />
          <SearchResultsForgeEntitiesView
            types={types}
            cardLayout={cardLayout}
            initialAzureSearchOption={initialAzureSearchOption}
            variables={variables}
          />
          <SearchResultsEmptyView
            isLoading={isLoading}
            searchResult={searchResult}
          />
        </>
      )}
    </>
  );
};
export default SearchResultView;
