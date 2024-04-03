'use client';

import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import React, { RefObject, useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { CardDesign, CardProps } from '@/models/types/card';
import '@/styles/components/commons/list/tailwind-carousel.css';
import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { PaginationOptions } from 'swiper/types/modules/pagination';
import { CarouselNavigation } from '@/components/commons/list/Carousel/CarouselNavigation';
import { useEnvVars } from '@/hooks/useEnvVars';
import { getSiteDirection } from '@/helpers/pageHelper';
import useTranslate from '@/hooks/useTranslate';

SwiperCore.use([A11y]);

type CarouselProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
  className?: string;
  cardDesign: CardDesign;
  hasPagination: boolean;
  hasNavigation: boolean;
  hasExternalNavigation?: boolean;
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
};

const Carousel = ({
  hasNavigation,
  hasExternalNavigation,
  hasPagination,
  className,
  cardDesign,
  swiperRef,
  uniqueId,
  items,
}: CarouselProps) => {
  const translate = useTranslate();
  items = items as DistributionEntity[];
  className = getStringProperty(className);
  const newSwiperRef = useRef<SwiperRef>(null) as RefObject<SwiperRef>;
  swiperRef = swiperRef !== undefined ? swiperRef : newSwiperRef;
  hasPagination = getBooleanProperty(hasPagination);
  hasNavigation = getBooleanProperty(hasNavigation);
  const navigation = {
    prevEl: `[data-js-carousel-prev="${uniqueId}"]`,
    nextEl: `[data-js-carousel-next="${uniqueId}"]`,
  };
  const pagination = {
    el: '.carousel__pagination',
    //@ts-ignore
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  hasExternalNavigation = getBooleanProperty(hasExternalNavigation);
  const carouselClassName = `carousel__container ${className}`;

  const { LANGUAGE } = useEnvVars();

  return (
    <>
      <Swiper
        ref={swiperRef}
        dir={getSiteDirection(LANGUAGE)}
        className={carouselClassName}
        key={uniqueId}
        spaceBetween={24}
        modules={[Navigation, Pagination]}
        navigation={hasNavigation ? navigation : false}
        pagination={hasPagination ? (pagination as PaginationOptions) : false}
        a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1280: {
            slidesPerView: 3,
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
              key={index}
              className={'max-w-[354px]'}
              onFocus={() => swiperRef.current?.swiper?.slideTo(index)}
            >
              {renderCard(cardProps)}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {hasPagination && <div className="mt-5 lg:mt-10 container flex justify-center carousel__pagination"></div>}
      {hasNavigation && !hasExternalNavigation && (
        <CarouselNavigation
          swiperRef={swiperRef}
          uniqueId={uniqueId}
        ></CarouselNavigation>
      )}
    </>
  );
};

export default Carousel;
