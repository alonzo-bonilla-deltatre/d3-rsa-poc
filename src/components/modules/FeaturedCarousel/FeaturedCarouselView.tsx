'use client';

import FeaturedRow from '@/components/commons/FeaturedRow/FeaturedRow';
import React from 'react';
import { DistributionEntity } from '@/models/types/forge';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { HeaderTitleProps } from '@/models/types/components';
import { SwiperRef } from 'swiper/react';
import { useRef } from 'react';
import Carousel from '@/components/commons/list/Carousel/Carousel';
import { CarouselNavigationAside } from '@/components/commons/list/Carousel/CarouselNavigationAside';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import { CardsType } from '@/components/commons/cards';

type FeaturedCarouselViewProps = {
  items: DistributionEntity[];
  cardsType: CardsType,
  featuredDescription?: string;
  featuredSponsor?: GraphicAssetsDashboardItem | null;
  uniqueId: string;
  hasPagination: boolean;
  hasNavigation: boolean;
} & HeaderTitleProps;

const FeaturedCarouselView = ({ data }: { data: FeaturedCarouselViewProps }) => {
  const {
    items,
    cardsType,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    featuredDescription,
    featuredSponsor,
  } = data as FeaturedCarouselViewProps;
  const className = getStringProperty(data.className);
  const swiperRef = useRef<SwiperRef>(null);
  const uniqueId = data.uniqueId;
  const hasPagination = getBooleanProperty(data.hasPagination);
  const hasNavigation = getBooleanProperty(data.hasNavigation);

  if (!items?.length) return null;

  return (
    <ModuleContainer>
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
            <Carousel
              items={items}
              cardsType={cardsType}
              swiperRef={swiperRef}
              uniqueId={uniqueId}
              hasPagination={hasPagination}
              hasNavigation={hasNavigation}
              hasExternalNavigation={true}
            />
          ),
        }}
      />
    </ModuleContainer>
  );
};
export default FeaturedCarouselView;
