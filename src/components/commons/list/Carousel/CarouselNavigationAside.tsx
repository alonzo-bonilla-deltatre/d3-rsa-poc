'use client';

import { RefObject, useState } from 'react';
import { renderSvgIcon } from '@/components/icons';
import { SwiperRef } from 'swiper/react';
import { useEnvVars } from '@/hooks/useEnvVars';
import { isRtlSiteDirection } from '@/helpers/pageHelper';

type CarouselNavigationAsideProps = {
  uniqueId: string;
  swiperRef: RefObject<SwiperRef>;
};

export const CarouselNavigationAside = ({ uniqueId, swiperRef }: CarouselNavigationAsideProps) => {
  const { LANGUAGE } = useEnvVars();
  const [, setPrevEl] = useState<HTMLElement | null>(null);
  const [, setNextEl] = useState<HTMLElement | null>(null);

  const iconClassName = `w-auto h-7 2xl:h-14`;

  return (
    <div className="mt-1 hidden gap-6 text-center md:flex lg:mt-6 lg:text-left">
      <button
        className="ltr:left-2 ltr:xl:left-4 rtl:right-2 rtl:xl:right-4"
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        ref={(node) => setPrevEl(node)}
        data-js-carousel-prev={uniqueId}
      >
        {renderSvgIcon(isRtlSiteDirection(LANGUAGE) ? 'ArrowRightRounded' : 'ArrowLeftRounded', {
          className: iconClassName,
        })}
      </button>
      <button
        className="ltr:right-2 ltr:xl:right-4 rtl:left-2 rtl:xl:left-4"
        onClick={() => swiperRef.current?.swiper.slideNext()}
        ref={(node) => setNextEl(node)}
        data-js-carousel-next={uniqueId}
      >
        {renderSvgIcon(isRtlSiteDirection(LANGUAGE) ? 'ArrowLeftRounded' : 'ArrowRightRounded', {
          className: iconClassName,
        })}
      </button>
    </div>
  );
};
