'use client';

import { SwiperRef } from 'swiper/react';
import { RefObject, useState } from 'react';
import { renderSvgIcon } from '@/components/icons';

type CarouselNavigationProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
};

export const CarouselNavigation = ({ uniqueId, swiperRef }: CarouselNavigationProps) => {
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const iconClassName = 'w-auto h-7 2xl:h-9';

  return (
    <div className="absolute top-1/2 z-10 block w-full -translate-y-1/2 transform text-white">
      <button
        className={`-prev float-start ms-2 rtl:float-end carousel__navbutton--prev-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('CaretLeft', { className: iconClassName })}
      </button>
      <button
        className={`-next float-end me-2 rtl:float-start carousel__navbutton--next-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('CaretRight', { className: iconClassName })}
      </button>
    </div>
  );
};
