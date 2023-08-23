import { ImageTransformations } from '@/models/types/images';

/* istanbul ignore next */
const transformations: Record<any, ImageTransformations> = {
  square_extraSmall: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 208,
    mobileHeight: 208,
  },
  square_small: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 416,
    mobileHeight: 416,
  },
  square_medium: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 624,
    mobileHeight: 624,
  },
  square_large: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 832,
    mobileHeight: 832,
  },
  square_extraLarge: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 1280,
    mobileHeight: 1280,
  },
  square_extraExtraLarge: {
    mobile: 't_ratio1_1-size60',
    tablet: 't_ratio1_1-size60',
    desktop: 't_ratio1_1-size60',
    mobileWidth: 1920,
    mobileHeight: 1920,
  },
  portrait_extraSmall: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 210,
    mobileHeight: 280,
  },
  portrait_small: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 420,
    mobileHeight: 560,
  },
  portrait_medium: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 624,
    mobileHeight: 832,
  },
  portrait_large: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 840,
    mobileHeight: 1120,
  },
  portrait_extraLarge: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 1260,
    mobileHeight: 1680,
  },
  portrait_extraExtraLarge: {
    mobile: 't_ratio3_4-size60',
    tablet: 't_ratio3_4-size60',
    desktop: 't_ratio3_4-size60',
    mobileWidth: 1920,
    mobileHeight: 2560,
  },
  landscape_extraSmall: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 208,
    mobileHeight: 117,
  },
  landscape_small: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 416,
    mobileHeight: 234,
  },
  landscape_medium: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 624,
    mobileHeight: 351,
  },
  landscape_large: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 832,
    mobileHeight: 468,
  },
  landscape_extraLarge: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 1280,
    mobileHeight: 720,
  },
  landscape_extraExtraLarge: {
    mobile: 't_ratio16_9-size60',
    tablet: 't_ratio16_9-size60',
    desktop: 't_ratio16_9-size60',
    mobileWidth: 1920,
    mobileHeight: 1080,
  },
  hero_extraSmall: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 210,
    mobileHeight: 90,
  },
  hero_small: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 420,
    mobileHeight: 180,
  },
  hero_medium: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 630,
    mobileHeight: 270,
  },
  hero_large: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 840,
    mobileHeight: 360,
  },
  hero_extraLarge: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 1281,
    mobileHeight: 549,
  },
  hero_extraExtraLarge: {
    mobile: 't_ratio21_9-size60',
    tablet: 't_ratio21_9-size60',
    desktop: 't_ratio21_9-size60',
    mobileWidth: 1932,
    mobileHeight: 828,
  },
  original_extraSmall: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 208,
    mobileHeight: 117,
  },
  original_small: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 416,
    mobileHeight: 234,
  },
  original_medium: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 624,
    mobileHeight: 351,
  },
  original_large: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 832,
    mobileHeight: 468,
  },
  original_extraLarge: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 1280,
    mobileHeight: 720,
  },
  original_extraExtraLarge: {
    mobile: 't_q-best',
    tablet: 't_q-best',
    desktop: 't_q-best',
    mobileWidth: 1920,
    mobileHeight: 1080,
  },
};

const getLinkCssClass = (alignment?: string): string | undefined => {
  let result = 'flex flex-col items-';
  switch (alignment?.toLowerCase()) {
    case 'left':
      result += 'start';
      break;
    case 'center':
      result += 'center';
      break;
    case 'right':
      result += 'end';
      break;
    default:
      result += 'start';
      break;
  }
  return result;
};

const getImageContainerCssClass = (alignment?: string): string | undefined => {
  let result = 'flex justify-';
  switch (alignment?.toLowerCase()) {
    case 'left':
      result += 'start';
      break;
    case 'center':
      result += 'center';
      break;
    case 'right':
      result += 'end';
      break;
    default:
      result += 'start';
      break;
  }
  return result;
};

export { transformations, getLinkCssClass, getImageContainerCssClass };
