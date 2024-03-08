'use client';

import { AzureSearchOption } from '@/models/types/azureSearch';
import CallToAction from '@/components/common/CallToAction/CallToAction';
import { Dispatch, SetStateAction } from 'react';
import useTranslate from '@/hooks/useTranslate';

type SearchPaginationProps = {
  nextPage: number;
  prevPage: number;
  azureSearchOption: AzureSearchOption;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setAzureSearchOption: Dispatch<SetStateAction<AzureSearchOption>>;
  refreshSearch: Function;
  isKeyPagesPagination?: boolean;
};

const SearchPagination = ({
  refreshSearch,
  isKeyPagesPagination,
  prevPage,
  azureSearchOption,
  setAzureSearchOption,
  nextPage,
  setIsLoading,
}: SearchPaginationProps) => {
  const translate = useTranslate();
  const previousTranslatedTag = 'previous';
  const nextTranslatedTag = 'next';
  const handlerNavigationClick = (page: number) => {
    setIsLoading(true);
    if (isKeyPagesPagination) {
      azureSearchOption.keyPagesPage = page;
    } else {
      azureSearchOption.page = page;
    }
    setAzureSearchOption(azureSearchOption);
    refreshSearch();
  };
  return (
    <div className="flex w-full justify-between mt-8">
      <div className="flex-start">
        {prevPage > -1 && (
          <CallToAction
            text={translate(previousTranslatedTag)}
            style={'primary'}
            hide={false}
            onClick={() => handlerNavigationClick(prevPage)}
          ></CallToAction>
        )}
      </div>
      <div className="flex-end">
        {nextPage > 0 && (
          <CallToAction
            text={translate(nextTranslatedTag)}
            style={'primary'}
            hide={false}
            onClick={() => handlerNavigationClick(nextPage)}
          ></CallToAction>
        )}
      </div>
    </div>
  );
};

export default SearchPagination;
