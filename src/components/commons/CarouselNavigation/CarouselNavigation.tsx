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
    <div className="absolute top-1/2 transform -translate-y-1/2 z-10 block w-full text-white">
      <button
        className={`ms-2 float-start rtl:float-end -prev carousel__navbutton--prev-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon('CaretLeft', { className: iconClassName })}
      </button>
      <button
        className={`me-2 float-end rtl:float-start -next carousel__navbutton--next-${uniqueId}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon('CaretRight', { className: iconClassName })}
      </button>
    </div>
  );
};
