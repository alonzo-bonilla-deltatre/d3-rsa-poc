'use client';

import { SwiperRef } from 'swiper/react';
import { RefObject, useState } from 'react';
import { NavButtonColor, NavButtonSize } from '@/models/types/carousel';
import { renderSvgIcon } from '@/components/icons';
import { CarouselProps } from '@/models/types/components';

type CarouselNavigationProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
} & CarouselProps;

export const CarouselNavigation = ({
  hideNavigation,
  hidePagination,
  uniqueId,
  swiperRef,
  navButtonSize,
  navButtonColor,
}: CarouselNavigationProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const buttonClassName = `lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:z-10 aspect-square rounded-full opacity-70 disabled:opacity-25 ${
    navButtonSize === NavButtonSize.Small ? 'p-2 2xl:p-3' : 'p-2 2xl:p-4'
  } ${navButtonColor === NavButtonColor.Dark ? 'bg-black text-white' : 'bg-greyscale-white lg:bg-white text-black'}`;

  const iconClassName = `w-auto ${navButtonSize === NavButtonSize.Small ? 'h-7 2xl:h-9' : 'h-7 2xl:h-14'}`;

  return (
    <div
      className={
        'd3-carousel__navigation mt-1 lg:mt-6 flex text-center lg:text-left gap-2 lg:gap-6 lg:absolute lg:bottom-[calc(700%*-1)]'
      }
    >
      <button
        className={`mr-6 d3-carousel__navbutton -prev carousel__navbutton--prev-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('ArrowLeftRounded', { className: iconClassName })}
      </button>
      <button
        className={`d3-carousel__navbutton -next carousel__navbutton--next-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('ArrowRightRounded', { className: iconClassName })}
      </button>
    </div>
  );
};
