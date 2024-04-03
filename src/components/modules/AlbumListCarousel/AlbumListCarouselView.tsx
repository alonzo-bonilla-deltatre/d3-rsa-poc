'use client';

import CarouselAlbum from '@/components/commons/list/Carousel/CarouselAlbum';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardDesign } from '@/models/types/card';
import { CarouselProps, ModuleProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import 'swiper/swiper-bundle.css';

type AlbumListCarouselViewProps = {
  items: DistributionEntity[];
  className?: string;
  cardDesign: CardDesign;
  hasPagination: boolean;
  hasNavigation: boolean;
  uniqueId: string;
  sectionClassName?: string;
} & ModuleProps &
  CarouselProps;

const AlbumListCarouselView = ({ data }: { data: AlbumListCarouselViewProps }) => {
  const uniqueId = data.uniqueId;
  const hasPagination = getBooleanProperty(data.hasPagination);
  const hasNavigation = getBooleanProperty(data.hasNavigation);

  return (
    <SectionWithHeader
      data={{
        headerTitle: data.headerTitle,
        headerTitleHeadingLevel: data.headerTitleHeadingLevel,
        hideHeaderTitle: data.hideHeaderTitle,
        ctaLink: data.ctaLink,
        ctaTitle: data.ctaTitle,
        hasFullWidthContent: true,
        sectionClassName: `d3-album-list-carousel ${data.sectionClassName}`,
        children: (
          <CarouselAlbum
            items={data.items}
            className={data.className}
            hasPagination={hasPagination}
            hasNavigation={hasNavigation}
            uniqueId={uniqueId}
            navButtonSize={data.navButtonSize}
            cardDesign={data.cardDesign}
          />
        ),
      }}
    />
  );
};

export default AlbumListCarouselView;
