import { ImageTransformations } from '@/models/types/images';

export const transformations: Record<any, ImageTransformations> = {
  thumbnailDetail: {
    mobile: 't_ratio21_9-size30',
    tablet: 't_ratio21_9-size30',
    desktop: 't_ratio21_9-size50',
    mobileWidth: 630,
    mobileHeight: 270,
  },
  logos: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 100,
    mobileHeight: 100,
  },
  thumbnailGridItem: {
    mobile: 't_ratio16_9-size20',
    tablet: 't_ratio16_9-size20',
    desktop: 't_ratio16_9-size40',
    mobileWidth: 416,
    mobileHeight: 234,
  },
  heroSwiper: {
    mobile: 't_ratio16_9-size30',
    tablet: 't_ratio16_9-size30',
    desktop: 't_ratio16_9-size50',
    mobileWidth: 624,
    mobileHeight: 351,
  },
  heroThumbnail: {
    mobile: 't_ratio16_9-size10',
    tablet: 't_ratio16_9-size10',
    desktop: 't_ratio16_9-size10',
    mobileWidth: 208,
    mobileHeight: 117,
  },
  mosaicSquareThumbnail: {
    mobile: 't_ratio1_1-size20',
    tablet: 't_ratio1_1-size20',
    desktop: 't_ratio1_1-size40',
    mobileWidth: 416,
    mobileHeight: 416,
  },
  mosaicLandscapeThumbnail: {
    mobile: 't_ratio16_9-size20',
    tablet: 't_ratio16_9-size20',
    desktop: 't_ratio16_9-size50',
    mobileWidth: 416,
    mobileHeight: 234,
  },
  mosaicPortraitThumbnail: {
    mobile: 't_ratio3_4-size20',
    tablet: 't_ratio3_4-size20',
    desktop: 't_ratio3_4-size40',
    mobileWidth: 420,
    mobileHeight: 560,
  },
  albumFeatured: {
    mobile: 't_ratio16_9-size30',
    tablet: 't_ratio16_9-size30',
    desktop: 't_ratio16_9-size50',
    mobileWidth: 1280,
    mobileHeight: 720,
  },
  albumFeaturedThumbnail: {
    mobile: 't_ratio1_1-size10',
    tablet: 't_ratio1_1-size10',
    desktop: 't_ratio1_1-size10',
    mobileWidth: 208,
    mobileHeight: 208,
  },
};

export const getSrcWithTransformation = (src: string, transformation: string) => {
  if (src) {
    const regex = /{formatInstructions}/;
    return src.replace(regex, transformation);
  }
  return '';
};
