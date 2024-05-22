'use client';

import { SwiperRef } from 'swiper/react';
import { RefObject, useState } from 'react';
import { NavButtonSize, CarouselProps } from '@/models/types/carousel';
import { renderSvgIcon } from '@/components/icons';

type CarouselNavigationProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
} & CarouselProps;

export const CarouselNavigation = ({ uniqueId, swiperRef, navButtonSize }: CarouselNavigationProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const iconClassName = `w-auto ${navButtonSize === NavButtonSize.Small ? 'h-7 2xl:h-9' : 'h-7 2xl:h-14'}`;

  return (
    <div className={'absolute top-1/2 transform -translate-y-1/2 z-10 block w-full text-white'}>
      <button
        className={`ms-2 float-start -prev carousel__navbutton--prev-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('CaretLeft', { className: iconClassName })}
      </button>
      <button
        className={`me-2 float-end -next carousel__navbutton--next-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('CaretRight', { className: iconClassName })}
      </button>
    </div>
  );
};
