'use client';

import renderCard from '@/components/common/cards/Card/CardWrapper';
import { CarouselNavigation } from '@/components/common/list/Carousel/CarouselNavigation';
import { CarouselPagination } from '@/components/common/list/Carousel/CarouselPagination';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import useTranslate from '@/hooks/useTranslate';
import { CardDesign, CardProps } from '@/models/types/card';
import { CarouselProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import '@/styles/components/common/list/tailwind-carousel.css';
import { RefObject, useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { PaginationOptions } from 'swiper/types/modules/pagination';

SwiperCore.use([A11y]);

type CarouselAlbumProps = {
  items?: DistributionEntity[] | null;
  cardDesign: CardDesign;
  className?: string;
  hasPagination: boolean;
  hasNavigation: boolean;
  uniqueId: string;
} & CarouselProps;

const CarouselAlbum = ({
  className,
  cardDesign,
  items,
  hasPagination,
  hasNavigation,
  hidePagination,
  hideNavigation,
  uniqueId,
  navButtonSize,
  navButtonColor,
}: CarouselAlbumProps) => {
  items = items as DistributionEntity[];
  const translate = useTranslate();
  className = getStringProperty(className);
  const swiperRef = useRef<SwiperRef>(null);
  hasPagination = getBooleanProperty(hasPagination);
  hasNavigation = getBooleanProperty(hasNavigation);
  const navigation = {
    prevEl: `[data-js-carousel-prev="${uniqueId}"]`,
    nextEl: `[data-js-carousel-next="${uniqueId}"]`,
  };
  const pagination = {
    el: '[data-js-carousel-pagination]',
    //@ts-ignore
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  const carouselClassName = `d3-carousel ${className}`;
  return (
    <>
      {hasNavigation && (
        <div className={'mb-2'}>
          <CarouselNavigation
            swiperRef={swiperRef}
            uniqueId={uniqueId}
          ></CarouselNavigation>
        </div>
      )}
      <Swiper
        ref={swiperRef}
        className={carouselClassName}
        key={uniqueId}
        modules={[Navigation, Pagination]}
        navigation={hasNavigation ? navigation : false}
        pagination={hasPagination ? (pagination as PaginationOptions) : false}
        a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
        slidesPerView={'auto'}
        centerInsufficientSlides
        spaceBetween={8}
        breakpoints={{
          640: {
            spaceBetween: 16,
          },
          1280: {
            spaceBetween: 24,
          },
        }}
      >
        {items.map((slide: DistributionEntity, index: number) => {
          const cardProps = {
            entity: slide,
            cardDesign: cardDesign,
          } as CardProps;
          return (
            <SwiperSlide
              key={slide.id ?? slide._translationId}
              className={'max-w-[315px] lg:max-w-[480px]'}
              onFocus={() => swiperRef.current?.swiper?.slideTo(index)}
            >
              {renderCard(cardProps)}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {hasPagination && <CarouselPagination />}
    </>
  );
};

export default CarouselAlbum;
