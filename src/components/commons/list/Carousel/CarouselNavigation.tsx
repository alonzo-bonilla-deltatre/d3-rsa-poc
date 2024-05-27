'use client';

import { SwiperRef } from 'swiper/react';
import { RefObject, useState } from 'react';
import { renderSvgIcon } from '@/components/icons';

type CarouselNavigationProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
};

export const CarouselNavigation = ({
  uniqueId,
  swiperRef,
}: CarouselNavigationProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const buttonClassName = 'lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:z-10 aspect-square rounded-full opacity-70 disabled:opacity-25 p-2 2xl:p-3 bg-black text-white';

  const iconClassName = 'w-auto h-7 2xl:h-9';

  return (
    <div
      className={
        'd3-carousel__navigation mt-1 lg:mt-6 flex text-center lg:text-left gap-2 lg:gap-6 lg:absolute lg:bottom-[calc(700%*-1)]'
      }
    >
      <button
        className={'me-6'}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('ArrowLeftRounded', { className: iconClassName })}
      </button>
      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('ArrowRightRounded', { className: iconClassName })}
      </button>
    </div>
  );
};
