'use client';

import { CarouselNavigation } from '@/components/commons/CarouselNavigation/CarouselNavigation';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { PaginationOptions } from 'swiper/types/modules/pagination';
import { getSiteDirection, isRtlSiteDirection } from '@/helpers/pageHelper';
import { useEnvVars } from '@/hooks/useEnvVars';
import useTranslate from '@/hooks/useTranslate';
import { twMerge } from 'tailwind-merge';
import Picture from '@/components/commons/Picture/Picture';

SwiperCore.use([A11y]);

type AlbumProps = {
  albumEntity?: DistributionEntity;
  uniqueId: string;
  isStoryPart?: boolean;
  hasNavigation?: boolean;
  hasPagination?: boolean;
};

export const AlbumCarousel = ({ albumEntity, uniqueId, isStoryPart, hasNavigation, hasPagination }: AlbumProps) => {
  const { LANGUAGE } = useEnvVars();
  const translate = useTranslate();
  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      animated: false,
      Thumbs: false,
      Toolbar: {
        display: {
          left: [isRtlSiteDirection(LANGUAGE) ? 'close' : ''],
          middle: [],
          right: [!isRtlSiteDirection(LANGUAGE) ? 'close' : ''],
        },
      },
      backdropClick: false,
      Images: {
        initialSize: 'cover',
        content: (_ref, slide) => {
          let rez = '<picture>';

          const media = slide.media?.split(';');
          slide.sources?.split(';').map((source, index) => {
            rez += `<source
              media="${media ? media[index] : ''}"
              srcset="${source}"
            />`;
          });

          // @ts-ignore
          rez += `<img src="${slide.src}" alt="${slide.title}" class="max-w-none w-full h-full object-cover block object-top"/>`;

          rez += '</picture>';

          return rez;
        },
      },
      wheel: false,
      on: {
        loaded: (_instance, slide) => {
          if (slide) {
            /* Workaround because it doesn't come out of the box from the library */
            const image = document.querySelector(`.fancybox-image[src="${slide.src}"]`);
            if (image) image.setAttribute('title', slide.title);
          }
        },
      },
    });
  }, []);

  const handleGalleryShow = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
  };

  const swiperRef = useRef<SwiperRef>(null);

  if (!albumEntity || !albumEntity?.elements?.length) {
    return null;
  }

  const navigation = {
    prevEl: `[data-js-carousel-prev="${uniqueId}"]`,
    nextEl: `[data-js-carousel-next="${uniqueId}"]`,
    disabledClass: 'opacity-25 pointer-events-none',
  };
  const pagination = {
    el: '[data-js-carousel-pagination]',
    //@ts-ignore
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <Swiper
      ref={swiperRef}
      dir={getSiteDirection(LANGUAGE)}
      key={uniqueId}
      spaceBetween={20}
      modules={[Navigation, Pagination, Autoplay]}
      navigation={getBooleanProperty(hasNavigation) ? navigation : false}
      pagination={getBooleanProperty(hasPagination) ? (pagination as PaginationOptions) : false}
      a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
      loop={true}
      slidesPerView={'auto'}
      speed={750}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {albumEntity?.elements?.map((slide: DistributionEntity, index: number) => (
        <SwiperSlide key={index}>
          <a
            href={getSrcWithTransformation(
              slide.image?.templateUrl,
              transformations.fancy_box_detail.desktop.transformation
            )}
            data-fancybox="gallery"
            data-caption={slide?.fields?.description || slide.title}
            onClick={handleGalleryShow}
            data-title={slide.title}
            data-height="100%"
            data-media="(max-width: 40em);(max-width: 64em)"
            data-sources={`${getSrcWithTransformation(slide?.src, transformations.fancy_box_detail.mobile.transformation)};
                ${getSrcWithTransformation(slide?.src, transformations.fancy_box_detail.tablet.transformation)}`}
            className={'w-full h-full'}
          >
            <figure className={'block overflow-hidden w-full h-full rounded-lg'}>
              <Picture
                src={slide?.image?.templateUrl ?? ''}
                transformations={transformations.thumbnail_landscape_detail}
                alt={slide.title}
                className={twMerge(
                  'w-full h-full object-cover block object-center hover:scale-110 transition duration-300 cursor-pointer',
                  getBooleanProperty(isStoryPart) ? 'rounded-lg' : ''
                )}
              />
            </figure>
          </a>
        </SwiperSlide>
      ))}
      <CarouselNavigation
        swiperRef={swiperRef}
        uniqueId={uniqueId}
      ></CarouselNavigation>
    </Swiper>
  );
};

export default AlbumCarousel;
