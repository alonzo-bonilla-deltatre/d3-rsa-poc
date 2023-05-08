'use client';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

import { DistributionEntity } from '@/models/types/dapi';
import { nanoid } from 'nanoid';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import { formatDate } from '@/utilities/dateFormatter';

import './HeroSwiper.css';
import Roofline from '@/components/common/Roofline';
import Picture from '@/components/common/Picture';

type ModuleProps = {
  slides: DistributionEntity[];
  hideDate: boolean;
};

const autoplayDuration = 3000;

const customPagination = (slides: DistributionEntity[]) => ({
  clickable: true,
  bulletClass: 'c-hero-swiper-pagination__item',
  bulletActiveClass: 'is-active',
  bulletElement: 'button',
  renderBullet: function (index: number, className: string) {
    if (!slides.length) {
      return '';
    }
    const needPlaceholderImage = !slides[index] || !slides[index].thumbnail?.templateUrl;

    console.log(index, 'needPlaceholderImage: ', slides[index]);
    if (needPlaceholderImage) {
      console.log('needPlaceholderImage: ', slides[index]);
    }
    const imageSrc = getSrcWithTransformation(
      slides[index].thumbnail?.templateUrl,
      transformations.heroThumbnail.mobile
    );

    return `
        <button 
          class="${className} relative w-[86px] h-[115px] bg-center transition-width delay-150 duration-500 ease-in-out" 
          aria-label="${slides[index].thumbnail?.title ?? ''}"
          style="background-image:url(${imageSrc});"
          >
          <div aria-hidden="true" class="c-hero-swiper__progress-bar">
            <div class="c-hero-swiper__progress-bar-percent"></div>
          </div>
        </button>
       `;
  },
});

const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
  const activeBullet = swiper.pagination.bullets[swiper.activeIndex];
  const activeProgressbar = activeBullet.querySelector('.c-hero-swiper__progress-bar-percent');
  activeProgressbar.style.width = `${100 - progress * 100}%`;
};

export const HeroSwiper = ({ ...data }: ModuleProps) => {
  return (
    <div className="">
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-pagination-bottom': '46px',
          '--swiper-wrapper-transition-timing-function': 'cubic-bezier(.62,-0.01,0,1.01)',
        }}
        modules={[Pagination, Autoplay]}
        pagination={customPagination(data.slides)}
        spaceBetween={0}
        slidesPerView={1}
        speed={750}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {data.slides &&
          data.slides.map((slide) => (
            <SwiperSlide key={nanoid()}>
              <div className="grid grid-cols-1 max-h-[100vh] w-full overflow-hidden">
                {slide.thumbnail && (
                  <div className="col-start-1 row-start-1 bg-black">
                    <Picture
                      transformations={transformations.heroSwiper}
                      className="w-full h-full object-cover opacity-[.50]"
                      src={slide.thumbnail.templateUrl}
                      alt={slide.title}
                    />
                  </div>
                )}
                <div className="mt-[35vh] ml-40 max-w-[500px] col-start-1 row-start-1 z-10">
                  <header>
                    <>
                      <Roofline
                        context={slide.context}
                        hide={false}
                      ></Roofline>
                      {/* <CardTitle title={slide.title} heading="h1" hide={false}></CardTitle> */}
                      <h3 className="font-bold text-5xl uppercase mt-4">{slide.title}</h3>
                      {/* <CardDate date={slide.contentDate} format={null}  hide={false}></CardDate> */}
                      {!data.hideDate && (
                        <time className="mt-3 font-light text-[#BEBEBE]">{formatDate(slide.contentDate)}</time>
                      )}
                    </>
                  </header>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
