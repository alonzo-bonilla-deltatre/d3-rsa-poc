'use client';

import { AzureSearchResult } from '@/models/types/azureSearch';
import useTranslate from '@/hooks/useTranslate';

type SearchResultEmptyViewProps = {
  isLoading: boolean;
  searchResult?: AzureSearchResult;
};

const SearchResultsEmptyView = ({ isLoading, searchResult }: SearchResultEmptyViewProps) => {
  const translate = useTranslate();
  return (
    !isLoading &&
    searchResult &&
    !searchResult.totalCount && <div className={'mx-auto'}>{translate('empty-search-message')}</div>
  );
};
export default SearchResultsEmptyView;
