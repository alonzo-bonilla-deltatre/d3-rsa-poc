'use client';

import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import React, { RefObject, useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { PaginationOptions } from 'swiper/types/modules/pagination';
import { CarouselNavigation } from '@/components/commons/list/Carousel/CarouselNavigation';
import { useEnvVars } from '@/hooks/useEnvVars';
import { getSiteDirection } from '@/helpers/pageHelper';
import useTranslate from '@/hooks/useTranslate';
import { CardsType, renderCard } from '@/components/commons/cards';

SwiperCore.use([A11y]);

type CarouselProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
  className?: string;
  cardsType: CardsType;
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
  hasPagination: boolean;
  hasNavigation: boolean;
  hasExternalNavigation?: boolean;
};

const Carousel = ({
  items,
  className,
  cardsType,
  uniqueId,
  swiperRef,
  hasPagination,
  hasNavigation,
  hasExternalNavigation,
}: CarouselProps) => {
  const translate = useTranslate();
  items = items as DistributionEntity[];
  className = getStringProperty(className);
  hasPagination = getBooleanProperty(hasPagination);
  hasNavigation = getBooleanProperty(hasNavigation);
  hasExternalNavigation = getBooleanProperty(hasExternalNavigation);
  const newSwiperRef = useRef<SwiperRef>(null) as RefObject<SwiperRef>;
  swiperRef = swiperRef !== undefined ? swiperRef : newSwiperRef;
  const navigation = {
    prevEl: `[data-js-carousel-prev="${uniqueId}"]`,
    nextEl: `[data-js-carousel-next="${uniqueId}"]`,
    disabledClass: 'opacity-25 pointer-events-none',
  };
  const pagination = {
    el: '.carousel__pagination',
    //@ts-ignore
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  const { LANGUAGE } = useEnvVars();

  return (
    <>
      <Swiper
        ref={swiperRef}
        dir={getSiteDirection(LANGUAGE)}
        className={className}
        key={uniqueId}
        spaceBetween={8}
        modules={[Navigation, Pagination]}
        navigation={hasNavigation ? navigation : false}
        pagination={hasPagination ? (pagination as PaginationOptions) : false}
        a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
        slidesPerView="auto"
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
          return (
            <SwiperSlide
              key={index}
              className="max-w-[210px] lg:max-w-[420px]"
              onFocus={() => swiperRef.current?.swiper?.slideTo(index)}
            >
              {renderCard(cardsType, { entity: slide })}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {hasPagination && <div className="carousel__pagination container mt-5 flex justify-center lg:mt-10"></div>}
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
