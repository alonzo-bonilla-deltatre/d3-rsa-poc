'use client';

import { ForgeDistributionApiOption, Pagination } from '@/models/types/forge';
import { getNextPage, getPreviousPage } from '@/components/commons/list/Pagination/PaginationHelper';
import { Dispatch, SetStateAction } from 'react';
import useTranslate from '@/hooks/useTranslate';
import CallToActionFilledButton from '@/components/commons/CallToActionButton/CallToActionFilledButton';

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
    <div className="mt-8 flex w-full justify-between">
      <div className="flex-start">
        {previousPage > -1 && (
          <CallToActionFilledButton
            text={translate(previousTranslatedTag)}
            onClick={() => handlerPrevNavigationClick(previousPage)}
          ></CallToActionFilledButton>
        )}
      </div>
      <div className="flex-end">
        {nextPage > 0 && (
          <CallToActionFilledButton
            text={translate(nextTranslatedTag)}
            onClick={() => handlerNextNavigationClick(nextPage)}
          ></CallToActionFilledButton>
        )}
      </div>
    </div>
  );
};
export default PaginationButtons;
