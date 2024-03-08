'use client';

import { RefObject, useState } from 'react';
import { NavButtonSize } from '@/models/types/carousel';
import { renderSvgIcon } from '@/components/icons';
import { CarouselProps } from '@/models/types/components';
import { SwiperRef } from 'swiper/react';

type CarouselNavigationAsideProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
} & CarouselProps;

export const CarouselNavigationAside = ({
  hideNavigation,
  hidePagination,
  uniqueId,
  navButtonSize,
  navButtonColor,
  swiperRef,
}: CarouselNavigationAsideProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);
  const buttonClassName = '';

  const iconClassName = `w-auto ${navButtonSize === NavButtonSize.Small ? 'h-7 2xl:h-9' : 'h-7 2xl:h-14'}`;

  return (
    <div className={'d3-carousel__navigation mt-1 lg:mt-6 hidden md:flex text-center lg:text-left gap-6'}>
      <button
        className={`d3-carousel__navbutton -prev left-2 xl:left-4 ${buttonClassName}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('ArrowLeftRounded', { className: iconClassName })}
      </button>
      <button
        className={`d3-carousel__navbutton -next right-2 xl:right-4 ${buttonClassName}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('ArrowRightRounded', { className: iconClassName })}
      </button>
    </div>
  );
};
