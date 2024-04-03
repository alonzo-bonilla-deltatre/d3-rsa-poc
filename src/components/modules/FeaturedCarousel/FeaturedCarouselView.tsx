'use client';

import FeaturedRow from '@/components/commons/FeaturedRow/FeaturedRow';
import React from 'react';
import { DistributionEntity } from '@/models/types/forge';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import CarouselComponent from '@/components/commons/list/Carousel/Carousel';
import { CardDesign } from '@/models/types/card';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { CarouselNavigationAside } from '@/components/commons/list/Carousel/CarouselNavigationAside';
import { HeaderTitleProps } from '@/models/types/components';
import { SwiperRef } from 'swiper/react';
import { useRef } from 'react';

type FeaturedCarouselViewProps = {
  items: DistributionEntity[];
  featuredDescription?: string;
  featuredSponsor?: GraphicAssetsDashboardItem | null;
  cardDesign: CardDesign;
  hasPagination: boolean;
  hasNavigation: boolean;
  uniqueId: string;
} & HeaderTitleProps;

const FeaturedCarouselView = ({ data }: { data: FeaturedCarouselViewProps }) => {
  const {
    items,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    featuredDescription,
    featuredSponsor,
    cardDesign,
  } = data as FeaturedCarouselViewProps;
  const className = getStringProperty(data.className);
  const swiperRef = useRef<SwiperRef>(null);
  const uniqueId = data.uniqueId;
  const hasPagination = getBooleanProperty(data.hasPagination);
  const hasNavigation = getBooleanProperty(data.hasNavigation);

  if (!items?.length) return null;

  return (
    <FeaturedRow
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        featuredDescription: featuredDescription,
        featuredSponsor: featuredSponsor,
        leftChildren: (
          <CarouselNavigationAside
            swiperRef={swiperRef}
            uniqueId={uniqueId}
          ></CarouselNavigationAside>
        ),
        sectionClassName: className,
        children: (
          <CarouselComponent
            items={items}
            cardDesign={cardDesign}
            hasPagination={hasPagination}
            hasNavigation={hasNavigation}
            hasExternalNavigation={true}
            swiperRef={swiperRef}
            uniqueId={uniqueId}
          />
        ),
      }}
    />
  );
};
export default FeaturedCarouselView;
