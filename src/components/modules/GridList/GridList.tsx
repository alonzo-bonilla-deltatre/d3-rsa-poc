'use client';

import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import GridComponent from '@/components/commons/list/Grid/Grid';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity, ForgeDapiEntityCode, ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';
import Loader from '@/components/commons/Loader/Loader';
import PaginationButtons from '@/components/commons/list/Pagination/PaginationButtons';
import { useCallback, useEffect, useState } from 'react';
import { getForgeEntityList } from '@/app/actions/forge';
import { CardsType } from '@/components/commons/cards';

type GridListProps = {
  itemsPerRow?: number;
} & EditorialListModuleProps &
  HeaderTitleProps;

const GridList = ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
    skip,
    limit,
    selectionSlug,
    itemsPerRow,
    isFullWidth,
  } = data.properties as GridListProps;

  const [results, setResults] = useState<PagedResult>();
  const [items, setItems] = useState<DistributionEntity[]>([]);
  const [forgeDistributionApiOptions, setForgeDistributionApiOptions] = useState<ForgeDistributionApiOption>({
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip: getNumberProperty(skip, 0),
    limit: getNumberProperty(limit, 4),
    variables: data.variables,
    hasPagination: true,
    page: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshPage = async () => {
    setIsLoading(true);
    await fetchData(selectionSlug ?? '', null);
  };

  const fetchData = useCallback(
    async (slug: string, entityCode: ForgeDapiEntityCode | null) => {
      const result = await getForgeEntityList(slug, entityCode, forgeDistributionApiOptions);
      if (result?.data) {
        setResults(result.data);
        setItems(result.data.items);
        setIsLoading(false);
      }
    },
    [forgeDistributionApiOptions]
  );

  useEffect(() => {
    fetchData(selectionSlug ?? '', null)
      .then((r) => r)
      .catch(() => []);
  }, [fetchData, selectionSlug]);

  if (moduleIsNotValid(data, ['selectionSlug'])) {
    return null;
  }

  if (!items?.length) return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `${isFullWidth ? '-full-width' : 'px-2'}`,
        children: isLoading ? (
          <div className={'relative'}>
            <Loader />
          </div>
        ) : (
          <>
            <GridComponent
              items={items}
              itemsPerRow={itemsPerRow}
              cardsType={CardsType.DefaultCard}
            />
            <PaginationButtons
              pagination={results?.pagination}
              forgeDistributionApiOptions={forgeDistributionApiOptions}
              setForgeDistributionApiOptions={setForgeDistributionApiOptions}
              refreshPage={refreshPage}
            />
          </>
        ),
      }}
    />
  );
};
export default GridList;
