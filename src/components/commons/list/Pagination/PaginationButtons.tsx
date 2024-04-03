'use client';

import { ForgeDistributionApiOption, Pagination } from '@/models/types/forge';
import CallToAction from '@/components/commons/CallToAction/CallToAction';
import { getNextPage, getPreviousPage } from '@/components/commons/list/Pagination/PaginationHelper';
import { Dispatch, SetStateAction } from 'react';
import useTranslate from '@/hooks/useTranslate';

type PaginationButtonsProps = {
  pagination?: Pagination;
  forgeDistributionApiOptions: ForgeDistributionApiOption;
  setForgeDistributionApiOptions: Dispatch<SetStateAction<ForgeDistributionApiOption>>;
  refreshPage: Function;
};

const PaginationButtons = ({
  pagination,
  forgeDistributionApiOptions,
  setForgeDistributionApiOptions,
  refreshPage,
}: PaginationButtonsProps) => {
  const translate = useTranslate();
  const previousTranslatedTag = 'previous';
  const nextTranslatedTag = 'next';

  const handlerNextNavigationClick = (page: number) => {
    if (forgeDistributionApiOptions?.skip !== undefined && forgeDistributionApiOptions?.limit !== undefined) {
      forgeDistributionApiOptions.skip = forgeDistributionApiOptions.skip + forgeDistributionApiOptions.limit;
    }
    if (forgeDistributionApiOptions?.page !== undefined) forgeDistributionApiOptions.page = page;
    setForgeDistributionApiOptions(forgeDistributionApiOptions);
    refreshPage();
  };

  const handlerPrevNavigationClick = (page: number) => {
    if (forgeDistributionApiOptions?.skip !== undefined && forgeDistributionApiOptions?.limit !== undefined) {
      forgeDistributionApiOptions.skip = forgeDistributionApiOptions.skip - forgeDistributionApiOptions.limit;
    }
    if (forgeDistributionApiOptions?.page !== undefined) forgeDistributionApiOptions.page = page;
    setForgeDistributionApiOptions(forgeDistributionApiOptions);
    refreshPage();
  };

  const previousPage = getPreviousPage(pagination);
  const nextPage = getNextPage(pagination);

  if (!pagination?.hasPagination) return null;

  return (
    <div className="flex w-full justify-between mt-8">
      <div className="flex-start">
        {previousPage > -1 && (
          <CallToAction
            text={translate(previousTranslatedTag)}
            style={'primary'}
            onClick={() => handlerPrevNavigationClick(previousPage)}
          ></CallToAction>
        )}
      </div>
      <div className="flex-end">
        {nextPage > 0 && (
          <CallToAction
            text={translate(nextTranslatedTag)}
            style={'primary'}
            onClick={() => handlerNextNavigationClick(nextPage)}
          ></CallToAction>
        )}
      </div>
    </div>
  );
};
export default PaginationButtons;
