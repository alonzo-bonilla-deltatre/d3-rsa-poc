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
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { getDay, getMonth } from '@/helpers/dateHelper';
import { getSiteDirection } from '@/helpers/pageHelper';
import { useEnvVars } from '@/hooks/useEnvVars';
import { CardsType, renderCard } from '@/components/commons/cards';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type FeaturedEventListSwiperProps = {
  slides: DistributionEntity[];
};

const customPagination = (slides: DistributionEntity[]) => ({
  el: '.swiper-pagination--event',
  clickable: true,
  bulletClass: 'flex flex-col items-center px-6 relative text-grey-100 transition duration-300 ease-in hover:text-link',
  bulletActiveClass: 'text-white',
  bulletElement: 'button',
  renderBullet: function (index: number, className: string) {
    if (!slides.length) {
      return '';
    }
    const dateFrom = getStringProperty(slides[index].fields?.dateFrom, '');
    return `
    <button class='${className}' role="button" aria-label="${slides[index].thumbnail?.title ?? ''}">
    <span class='font-heading text-[80px] leading-[64px] text-center w-full'>${getDay(dateFrom)}</span>
    <span class='font-heading text-[30px] uppercase text-center -mt-1 w-full'>${getMonth(dateFrom)}</span>
    <div class='absolute top-6 right-0 h-[80px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-white to-transparent opacity-20'></div>
    <div class='transition duration-300 ease-in w-full h-[6px] bg-link'></div>
    </button>
    `;
  },
});

export const FeaturedEventListSwiper = ({ slides }: FeaturedEventListSwiperProps) => {
  const { LANGUAGE } = useEnvVars();

  return (
    <>
      <ModuleContainer
        isFullWidth
        className="flex"
      >
        <Swiper
          dir={getSiteDirection(LANGUAGE)}
          modules={[Pagination, Navigation]}
          pagination={customPagination(slides)}
          effect="coverflow"
          initialSlide={2}
          spaceBetween={20}
          slidesPerView="auto"
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
            return <SwiperSlide key={index}>{renderCard(CardsType.EventCard, { entity: slide })}</SwiperSlide>;
          })}
        </Swiper>
      </ModuleContainer>
      <div className="swiper-pagination--event hidden md:flex flex-row items-center justify-center gap-2"></div>
    </>
  );
};
