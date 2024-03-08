'use client';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import Picture from '@/components/common/Picture/Picture';
import '@/components/modules/Hero/tailwind-hero.css';
import { useEnvVars } from '@/hooks/useEnvVars';
import { getSiteDirection } from '@/utilities/direction';

type HeroSwiperProps = {
  slides: DistributionEntity[];
};

const autoplayDuration = 8000;

const customPagination = (slides: DistributionEntity[]) => ({
  clickable: true,
  bulletClass: 'hero-pagination__item',
  bulletActiveClass: 'is-active',
  bulletElement: 'button',
  renderBullet: function (index: number, className: string) {
    if (!slides.length) {
      return '';
    }
    const alt = slides[index].thumbnail?.title ? 'image: ' + slides[index].thumbnail?.title : 'image';
    const src = getSrcWithTransformation(
      slides[index]?.thumbnail?.templateUrl ?? null,
      transformations.hero_swiper_pagination_item.mobile.transformation
    );
    const width = transformations.hero_swiper_pagination_item.mobile.width;
    const height = transformations.hero_swiper_pagination_item.mobile.height;

    return `
        <div 
          class="${className} relative bg-center transition-width delay-150 duration-500 ease-in-out inline-flex" 
          aria-label="${slides[index].thumbnail?.title ?? ''}"
          role="button"
          >
          <img src="${src}" alt="${alt}" width="${width}" height="${height}" class="object-cover" loading="lazy"/>
          <div aria-hidden="true" class="hero-pagination__progress-bar">
            <div class="hero-pagination__progress-bar-percent"></div>
          </div>
        </div>
       `;
  },
});

const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
  const activeBullet = swiper.pagination.bullets[swiper.activeIndex];
  const activeProgressbar = activeBullet?.querySelector('.hero-pagination__progress-bar-percent');
  if (activeProgressbar) activeProgressbar.style.width = `${100 - progress * 100}%`;
};

export const HeroSwiper = ({ slides }: HeroSwiperProps) => {
  const { LANGUAGE } = useEnvVars();
  return (
    <div className="hero">
      <Swiper
        dir={getSiteDirection(LANGUAGE)}
        style={{
          // @ts-ignore
          '--swiper-pagination-bottom': '46px',
          '--swiper-wrapper-transition-timing-function': 'cubic-bezier(.62,-0.01,0,1.01)',
        }}
        modules={[Pagination, Autoplay]}
        pagination={customPagination(slides)}
        spaceBetween={0}
        slidesPerView={1}
        speed={750}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {slides.map((slide: DistributionEntity, index: number) => (
          <SwiperSlide key={index}>
            <a
              href={slide.url}
              title={slide.title}
            >
              <div className="grid grid-cols-1 h-[100vh] w-full overflow-hidden">
                {slide.thumbnail && (
                  <div className="col-start-1 row-start-1 bg-black">
                    <Picture
                      transformations={transformations.hero_swiper_main_item}
                      className="w-full h-full object-cover opacity-[.50]"
                      src={slide.thumbnail.templateUrl}
                      alt={slide.title}
                      imageStyle={{
                        width: '100vw',
                        height: '100%',
                      }}
                      priority={true}
                    />
                  </div>
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                  <h3 className="text-component-module-hero-title d3-ty-heading-2 uppercase mt-4 text-center p-6 md:p-12">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
