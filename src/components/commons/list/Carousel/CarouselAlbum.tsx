'use client';

import useTranslate from '@/hooks/useTranslate';
import { DistributionEntity } from '@/models/types/forge';
import { useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { CardsType, renderCard } from '@/components/commons/cards';

SwiperCore.use([A11y]);

type CarouselAlbumProps = {
  items?: DistributionEntity[] | null;
  uniqueId: string;
};

const CarouselAlbum = ({ items, uniqueId }: CarouselAlbumProps) => {
  items = items as DistributionEntity[];
  const translate = useTranslate();
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <Swiper
      ref={swiperRef}
      key={uniqueId}
      a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
      centerInsufficientSlides
      slidesPerView={'auto'}
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
        return (
          <SwiperSlide
            key={slide.id ?? slide._translationId}
            className={'max-w-[210px] lg:max-w-[420px]'}
            onFocus={() => swiperRef.current?.swiper?.slideTo(index)}
          >
            {renderCard(CardsType.AlbumCard, { entity: slide })}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarouselAlbum;
