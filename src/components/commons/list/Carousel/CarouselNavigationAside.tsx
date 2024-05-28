'use client';

import { RefObject, useState } from 'react';
import { renderSvgIcon } from '@/components/icons';
import { SwiperRef } from 'swiper/react';

type CarouselNavigationAsideProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
};

export const CarouselNavigationAside = ({ uniqueId, swiperRef }: CarouselNavigationAsideProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const iconClassName = `w-auto h-7 2xl:h-14`;

  return (
    <div className={'mt-1 lg:mt-6 hidden md:flex text-center lg:text-left gap-6'}>
      <button
        className={`left-2 xl:left-4`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('ArrowLeftRounded', { className: iconClassName })}
      </button>
      <button
        className={`right-2 xl:right-4`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('ArrowRightRounded', { className: iconClassName })}
      </button>
    </div>
  );
};
