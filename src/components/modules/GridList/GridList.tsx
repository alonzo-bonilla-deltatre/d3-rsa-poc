'use client';

import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import GridComponent from '@/components/common/list/Grid/Grid';
import { getDarkClass, getNumberProperty, getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardLayout, CardType } from '@/models/types/card';
import {
  DistributionEntity,
  ForgeDapiEntityCode,
  ForgeDistributionApiOption,
  PagedResult,
  Pagination,
} from '@/models/types/forge';
import { enrichPagination } from '@/components/common/list/Pagination/PaginationHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { parseFieldValue } from '@/utilities/fieldValueParser';
import Loader from '@/components/common/Loader/Loader';
import PaginationButtons from '@/components/common/list/Pagination/PaginationButtons';
import { useCallback, useEffect, useState } from 'react';
import { getForgeEntityList } from '@/app/actions/forge';

type GridListProps = {
  cardLayout?: string;
  disablePagination?: boolean;
  itemsPerRow?: number;
} & EditorialModuleProps;

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
    disablePagination,
    itemsPerRow,
    isFullWidth,
    isDark,
    cardLayout,
  } = data.properties as GridListProps;

  const hasPagination = getOppositeBooleanProperty(disablePagination);
  const [results, setResults] = useState<PagedResult>();
  const [items, setItems] = useState<DistributionEntity[]>([]);
  const [forgeDistributionApiOptions, setForgeDistributionApiOptions] = useState<ForgeDistributionApiOption>({
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip: getNumberProperty(skip, 0),
    limit: getNumberProperty(limit, 4),
    variables: data.variables,
    hasPagination: hasPagination,
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

  const cardType = CardType.Default;
  const cardDesign = getCardSettings(cardType, null, cardLayout ? (cardLayout as CardLayout) : CardLayout.PortraitFull);

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
        sectionClassName: `d3-grid-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: isLoading ? (
          <div className={'relative'}>
            <Loader />
          </div>
        ) : (
          <>
            <GridComponent
              items={items}
              itemsPerRow={itemsPerRow}
              cardDesign={cardDesign}
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
