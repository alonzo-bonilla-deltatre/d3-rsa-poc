'use client';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
SwiperCore.use([EffectCoverflow]);
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import 'swiper/swiper-bundle.css';
import { DistributionEntity } from '@/models/types/forge';
import React from 'react';
import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { formatDate } from '@/helpers/dateHelper';
import { CardDesign, CardProps } from '@/models/types/card';
import { getSiteDirection } from '@/helpers/pageHelper';
import { useEnvVars } from '@/hooks/useEnvVars';

type FeaturedEventListSwiperProps = {
  slides: DistributionEntity[];
  cardDesign: CardDesign;
};

const customPagination = (slides: DistributionEntity[]) => ({
  el: '.swiper-pagination--event',
  clickable: true,
  bulletClass: 'event_pagination__item',
  bulletActiveClass: 'is-active',
  bulletElement: 'button',
  renderBullet: function (index: number, className: string) {
    if (!slides.length) {
      return '';
    }
    const dateFrom = getStringProperty(slides[index].fields?.dateFrom, '');
    return `
    <button class='${className} ' role="button"
    aria-label="${slides[index].thumbnail?.title ?? ''}">
    <span class='day'>${formatDate(dateFrom, 'DD')}</span>
    <span class='month'>${formatDate(dateFrom, 'MMM')}</span>
    <div class='event_pagination__divider'></div>
    <div class='event_pagination__bar'></div>
    </button>
    `;
  },
});

export const FeaturedEventListSwiper = ({ cardDesign, slides }: FeaturedEventListSwiperProps) => {
  const { LANGUAGE } = useEnvVars();

  return (
    <>
      <div className={'swiper-container-full-width swiper-container--event'}>
        <Swiper
          dir={getSiteDirection(LANGUAGE)}
          modules={[Pagination, Navigation]}
          pagination={customPagination(slides)}
          effect={'coverflow'}
          initialSlide={2}
          spaceBetween={20}
          slidesPerView={'auto'}
          centeredSlides
          centerInsufficientSlides
          coverflowEffect={{
            rotate: 0,
            scale: 0.9,
            stretch: 0,
            depth: 100,
            modifier: 0.6,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {slides.map((slide, index) => {
            const props = {
              entity: slide,
              cardDesign,
            } as CardProps;
            return <SwiperSlide key={index}>{renderCard(props)}</SwiperSlide>;
          })}
        </Swiper>
      </div>
      <div className="swiper-pagination--event"></div>
    </>
  );
};
