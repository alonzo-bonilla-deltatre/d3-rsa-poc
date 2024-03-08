'use client';
import { AlbumEntity, DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/common/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';
import AlbumHeader from '@/components/modules/Album/AlbumHeader';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import required modules
import 'swiper/swiper-bundle.css';
import { getSiteDirection } from '@/utilities/direction';
import { useEnvVars } from '@/hooks/useEnvVars';

type AlbumFeaturedProps = {
  albumEntity?: AlbumEntity;
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
  className?: string;
};

const AlbumFeatured = ({
  albumEntity,
  headerTitle,
  headerTitleHeadingLevel,
  hideHeaderTitle,
  className,
}: AlbumFeaturedProps) => {
  const { LANGUAGE } = useEnvVars();
  return (
    <div className={`section-row-full ${className} relative`}>
      <AlbumHeader
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={hideHeaderTitle}
      ></AlbumHeader>
      <Swiper
        dir={getSiteDirection(LANGUAGE)}
        spaceBetween={20}
        modules={[Navigation, Pagination]}
        pagination={{
          el: '.carousel__pagination',
          //@ts-ignore
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        }}
        style={{
          maxWidth: '2048px',
        }}
        loop={true}
        slidesPerView={'auto'}
      >
        {albumEntity?.elements?.map((slide: DistributionEntity, index: number) => (
          <SwiperSlide
            key={index}
            className={'max-w-[400px] lg:max-w-[600px]'}
          >
            <Picture
              src={slide.image?.templateUrl ?? ''}
              alt={slide.title}
              transformations={transformations.thumbnail_square_detail}
              className={'w-full h-full object-cover rounded-md'}
            ></Picture>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-5 lg:mt-10 container flex justify-center  carousel__pagination"></div>
    </div>
  );
};

export default AlbumFeatured;
