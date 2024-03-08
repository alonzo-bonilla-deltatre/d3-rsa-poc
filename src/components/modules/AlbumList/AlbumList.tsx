'use client';

import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { DistributionEntity, PagedResult } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { fetcher } from '@/services/fetcherService';
import logger from '@/utilities/logger';
import useSWRInfinite from 'swr/infinite';
import AlbumListView from './AlbumListView';
import { parseFieldValue } from '@/utilities/fieldValueParser';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';

const AlbumList = ({ data }: { data: ComponentProps }) => {
  const {
    isFullWidth,
    isDark,
    selectionSlug,
    limit,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
  } = data.properties as EditorialModuleProps;

  const {
    data: response,
    setSize,
    size,
    error,
    isLoading,
  } = useSWRInfinite(
    (index: number) => `/api/dapi/selection/${selectionSlug}?skip=${index}&limit=${limit}`,
    fetcher<PagedResult>(),
    { revalidateFirstPage: false }
  );

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  if (error) {
    logger.log('Fetch error Album List', LoggerLevel.error);
    return null;
  }

  const items: DistributionEntity[] = response ? response.flatMap((page) => page?.items ?? []) : [];
  if (items.length === 0) {
    logger.log('No Albums for AlbumList Module', LoggerLevel.warning);
    return null;
  }

  const currentResponse = response ? response[response.length - 1] : null;
  const isLoadMoreDisplayed = !isLoading && ((!currentResponse || currentResponse.pagination.nextUrl) as boolean);

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
        sectionClassName: `d3-album-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <AlbumListView
            entityList={items}
            isLoadMoreDisplayed={isLoadMoreDisplayed}
            handleLoadMore={handleLoadMore}
          />
        ),
      }}
    />
  );
};

export default AlbumList;
