'use client';

import {
  getPaginationNextKeyPagesPage,
  getPaginationPrevKeyPagesPage,
} from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureKeyPagesIndexEntity, AzureSearchOption } from '@/models/types/azureSearch';
import { CardDesign } from '@/models/types/card';
import { useCallback, useEffect, useState } from 'react';
import { azureSearchKeyPages } from '@/app/actions/azureSearch';
import SearchPagination from '@/components/modules/SearchResults/SearchPagination';
import Loader from '@/components/commons/Loader/Loader';
import GridComponent from '@/components/commons/list/Grid/Grid';
import { DistributionEntity } from '@/models/types/forge';

type SearchResultViewProps = {
  cardDesign?: CardDesign;
  initialAzureSearchOption: AzureSearchOption;
};

const SearchResultsKeyPagesView = ({ cardDesign, initialAzureSearchOption }: SearchResultViewProps) => {
  const [searchResult, setSearchResult] = useState<DistributionEntity[]>();
  const [azureSearchOption, setAzureSearchOption] = useState<AzureSearchOption>(initialAzureSearchOption);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextKeyPagesPage, setNextKeyPagesPage] = useState<number>(0);
  const [prevKeyPagesPage, setPrevKeyPagesPage] = useState<number>(-1);

  const setKeyPagesPagination = useCallback(
    (items: AzureKeyPagesIndexEntity[], totalCount: number) => {
      setNextKeyPagesPage(getPaginationNextKeyPagesPage(azureSearchOption, items, totalCount));
      setPrevKeyPagesPage(getPaginationPrevKeyPagesPage(azureSearchOption));
    },
    [azureSearchOption]
  );
  const refreshSearch = async () => {
    await fetchData(azureSearchOption);
  };
  const fetchData = useCallback(
    async (azureSearchOption: AzureSearchOption) => {
      const result = await azureSearchKeyPages(azureSearchOption);
      if (result?.data) {
        let keyPagesItems = [] as DistributionEntity[];
        result?.data.items.map((document) => {
          const entity = {
            title: document.Title,
            thumbnail: {
              title: document.Title,
              templateUrl: document.Image,
            },
            url: document.Url,
          } as DistributionEntity;
          keyPagesItems.push(entity);
        });
        setSearchResult(keyPagesItems);
        setKeyPagesPagination(result?.data.items, result?.data.count);
        setIsLoading(false);
      }
    },
    [setKeyPagesPagination]
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
      <div className={'relative'}>
        {isLoading && <Loader />}
        <GridComponent
          items={searchResult}
          itemsPerRow={4}
          cardDesign={cardDesign}
        />
        <SearchPagination
          nextPage={nextKeyPagesPage}
          prevPage={prevKeyPagesPage}
          azureSearchOption={azureSearchOption}
          setIsLoading={setIsLoading}
          setAzureSearchOption={setAzureSearchOption}
          refreshSearch={refreshSearch}
          isKeyPagesPagination
        />
      </div>
    )
  );
};
export default SearchResultsKeyPagesView;
