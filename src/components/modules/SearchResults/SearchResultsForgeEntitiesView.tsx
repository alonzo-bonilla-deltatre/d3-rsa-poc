'use client';

import SearchCategories from '@/components/modules/SearchResults/SearchCategories';
import {
  createSearchResultItems,
  getPaginationNextPage,
  getPaginationPrevPage,
} from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureSearchOption } from '@/models/types/azureSearch';
import GridComponent from '@/components/commons/list/Grid/Grid';
import { useCallback, useEffect, useState } from 'react';
import { azureSearchForgeEntities } from '@/app/actions/azureSearch';
import { Variable } from '@/models/types/pageStructure';
import SearchPagination from '@/components/modules/SearchResults/SearchPagination';
import { DistributionEntity } from '@/models/types/forge';
import Loader from '@/components/commons/Loader/Loader';
import { CardsType } from '@/components/commons/cards';

type SearchResultViewProps = {
  types?: string[];
  initialAzureSearchOption: AzureSearchOption;
  variables?: Variable[];
};

const SearchResultsForgeEntitiesView = ({ types, initialAzureSearchOption, variables }: SearchResultViewProps) => {
  const [searchResult, setSearchResult] = useState<DistributionEntity[]>([]);
  const [azureSearchOption, setAzureSearchOption] = useState<AzureSearchOption>(initialAzureSearchOption);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<number>(0);
  const [prevPage, setPrevPage] = useState<number>(-1);
  const setPagination = useCallback(
    (items: DistributionEntity[], totalCount: number) => {
      setNextPage(getPaginationNextPage(azureSearchOption, items, totalCount));
      setPrevPage(getPaginationPrevPage(azureSearchOption));
    },
    [azureSearchOption]
  );
  const refreshSearch = async () => {
    await fetchData(azureSearchOption);
  };
  const fetchData = useCallback(
    async (azureSearchOption: AzureSearchOption) => {
      const result = await azureSearchForgeEntities(azureSearchOption, variables);
      if (result?.data) {
        const items = createSearchResultItems(azureSearchOption.facetValue, result?.data ?? []);
        setSearchResult(items);
        setPagination(items, result.data.count);
        setIsLoading(false);
      }
    },
    [setPagination, variables]
  );

  useEffect(() => {
    if (azureSearchOption) {
      setIsLoading(true);
      fetchData(azureSearchOption).then((r) => r);
    }
  }, [fetchData, azureSearchOption]);

  return (
    searchResult &&
    searchResult.length > 0 && (
      <div className="relative">
        {isLoading && <Loader />}
        <SearchCategories
          types={types}
          azureSearchOption={azureSearchOption}
          setIsLoading={setIsLoading}
          setAzureSearchOption={setAzureSearchOption}
          refreshSearch={refreshSearch}
        />
        <GridComponent
          items={searchResult}
          itemsPerRow={4}
          cardsType={CardsType.SearchCard}
        />
        <SearchPagination
          nextPage={nextPage}
          prevPage={prevPage}
          azureSearchOption={azureSearchOption}
          setIsLoading={setIsLoading}
          setAzureSearchOption={setAzureSearchOption}
          refreshSearch={refreshSearch}
        />
      </div>
    )
  );
};
export default SearchResultsForgeEntitiesView;
