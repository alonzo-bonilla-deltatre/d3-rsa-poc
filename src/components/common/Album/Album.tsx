'use client';

import CardIcon from '@/components/common/CardIcon/CardIcon';
import Picture from '@/components/common/Picture/Picture';
import CardInfo from '@/components/common/cards/AlbumCard/AlbumCardInfo';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import CardSponsor from '@/components/common/cards/Card/CardSponsor';
import { CarouselNavigation } from '@/components/common/list/Carousel/CarouselNavigation';
import { CardLayout, CardType } from '@/models/types/card';
import { NavButtonSize } from '@/models/types/carousel';
import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { PaginationOptions } from 'swiper/types/modules/pagination';
import { getSiteDirection } from '@/utilities/direction';
import { useEnvVars } from '@/hooks/useEnvVars';
import useTranslate from '@/hooks/useTranslate';

SwiperCore.use([A11y]);

type AlbumProps = {
  albumEntity?: DistributionEntity;
  uniqueId: string;
  isStoryPart?: boolean;
};

export const Album = ({ albumEntity, uniqueId, isStoryPart }: AlbumProps) => {
  const translate = useTranslate();
  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      animated: false,
      Thumbs: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close'],
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

  const { LANGUAGE } = useEnvVars();

  const swiperRef = useRef<SwiperRef>(null);

  if (!albumEntity || !albumEntity?.elements?.length) {
    return null;
  }

  const hasPagination = false;
  const hasNavigation = true;
  const navigation = {
    prevEl: `[data-js-carousel-prev="${uniqueId}"]`,
    nextEl: `[data-js-carousel-next="${uniqueId}"]`,
  };
  const pagination = {
    el: '[data-js-carousel-pagination]',
    //@ts-ignore
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  const carouselClassName = 'd3-carousel';

  const cardType = CardType.Album;
  const cardLayout = CardLayout.VerticalFull;
  const cardDesign = getCardSettings(cardType, null, cardLayout, 'video-carousel');

  return (
    <Swiper
      ref={swiperRef}
      dir={getSiteDirection(LANGUAGE)}
      className={carouselClassName}
      key={uniqueId}
      spaceBetween={24}
      modules={[Navigation, Pagination]}
      navigation={hasNavigation ? navigation : false}
      pagination={hasPagination ? (pagination as PaginationOptions) : false}
      a11y={{ enabled: true, nextSlideMessage: translate('next-slide'), prevSlideMessage: translate('prev-slide') }}
      style={{
        maxWidth: '2048px',
      }}
      loop={true}
      slidesPerView={'auto'}
    >
      {albumEntity?.elements?.map((slide: DistributionEntity, index: number) => (
        <SwiperSlide
          key={index}
          className="max-w-[400px] lg:max-w-[600px]"
        >
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
          >
            <div className={`${isStoryPart ? 'card__container rounded-lg' : 'card__container'}`}>
              <figure>
                <Picture
                  src={slide?.image?.templateUrl ?? ''}
                  className={cardDesign?.style?.cardImgClassName}
                  transformations={
                    cardDesign?.style?.imageTransformations ?? transformations.thumbnail_landscape_detail
                  }
                  alt={slide.title}
                />
              </figure>
              <CardSponsor entity={slide}></CardSponsor>
              <CardIcon
                entityCode={slide.entityCode as string}
                hide={cardDesign?.options?.hideIcon}
              ></CardIcon>
              {cardDesign?.style?.isInnerInfo && (
                <CardInfo
                  entity={slide}
                  cardDesign={cardDesign}
                />
              )}
            </div>
            {!cardDesign?.style?.isInnerInfo && (
              <CardInfo
                entity={slide}
                cardDesign={cardDesign}
              />
            )}
            <div className={`${isStoryPart ? 'card__container rounded-lg' : 'card__container'}`}>
              <figure>
                <Picture
                  src={slide?.image?.templateUrl ?? ''}
                  className={cardDesign?.style?.cardImgClassName}
                  transformations={
                    cardDesign?.style?.imageTransformations ?? transformations.thumbnail_landscape_detail
                  }
                  alt={slide.title}
                />
              </figure>
              <CardSponsor entity={slide}></CardSponsor>
              <CardIcon
                entityCode={slide.entityCode as string}
                hide={cardDesign?.options?.hideIcon}
              ></CardIcon>
              {cardDesign?.style?.isInnerInfo && (
                <CardInfo
                  entity={slide}
                  cardDesign={cardDesign}
                />
              )}
            </div>
            {!cardDesign?.style?.isInnerInfo && (
              <CardInfo
                entity={slide}
                cardDesign={cardDesign}
              />
            )}
          </a>
        </SwiperSlide>
      ))}
      <CarouselNavigation
        swiperRef={swiperRef}
        uniqueId={uniqueId}
        navButtonSize={NavButtonSize.Large}
      ></CarouselNavigation>
    </Swiper>
  );
};

export default Album;
