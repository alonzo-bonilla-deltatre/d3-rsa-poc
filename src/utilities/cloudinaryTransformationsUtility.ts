import { ImageTransformationName, ImageTransformations } from '@/models/types/images';
import { defaultCloudinaryTransformations } from '@/utilities/defaultCloudinaryTransformationsUtility';

/**
 * `transformations` is a Record object that maps ImageTransformationName to ImageTransformations.
 * Each key in the object represents a specific image transformation name, and the value is another object that defines the transformation for different devices (mobile, tablet, desktop).
 * The transformation for each device is defined in terms of the defaultCloudinaryTransformations.
 *
 * For example, the transformation for `ImageTransformationName.image_square_extra_small` is defined as:
 * - mobile: defaultCloudinaryTransformations.ratio1_1_size20
 * - tablet: defaultCloudinaryTransformations.ratio1_1_size40
 * - desktop: defaultCloudinaryTransformations.ratio1_1_size60
 *
 * This means that for an image_square_extra_small, the transformation applied will be `ratio1_1_size20` for all devices.
 *
 * The transformations are defined for different image types like square, portrait, landscape, hero, original, etc.
 * Each image type has different sizes like extra small, small, medium, large, extra large, and extra extra large.
 *
 * The transformations are also defined for other modules like thumbnail, fancy box, story, enhanced title, event banner, hero, mosaic, promo, focus on, etc.
 */
export const transformations: Record<ImageTransformationName, ImageTransformations> = {
  // Image module
  [ImageTransformationName.image_square_extra_small]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size20,
    desktop: defaultCloudinaryTransformations.ratio1_1_size20,
  },
  [ImageTransformationName.image_square_small]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size20,
    desktop: defaultCloudinaryTransformations.ratio1_1_size20,
  },
  [ImageTransformationName.image_square_medium]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size40,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio1_1_size40,
  },
  [ImageTransformationName.image_square_large]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size40,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio1_1_size40,
  },
  [ImageTransformationName.image_square_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size60,
    tablet: defaultCloudinaryTransformations.ratio1_1_size60,
    desktop: defaultCloudinaryTransformations.ratio1_1_size60,
  },
  [ImageTransformationName.image_square_extra_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size60,
    tablet: defaultCloudinaryTransformations.ratio1_1_size60,
    desktop: defaultCloudinaryTransformations.ratio1_1_size60,
  },
  [ImageTransformationName.image_portrait_extra_small]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size20,
    tablet: defaultCloudinaryTransformations.ratio3_4_size20,
    desktop: defaultCloudinaryTransformations.ratio3_4_size20,
  },
  [ImageTransformationName.image_portrait_small]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size20,
    tablet: defaultCloudinaryTransformations.ratio3_4_size20,
    desktop: defaultCloudinaryTransformations.ratio3_4_size20,
  },
  [ImageTransformationName.image_portrait_medium]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size40,
    tablet: defaultCloudinaryTransformations.ratio3_4_size40,
    desktop: defaultCloudinaryTransformations.ratio3_4_size40,
  },
  [ImageTransformationName.image_portrait_large]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size40,
    tablet: defaultCloudinaryTransformations.ratio3_4_size40,
    desktop: defaultCloudinaryTransformations.ratio3_4_size40,
  },
  [ImageTransformationName.image_portrait_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size60,
    tablet: defaultCloudinaryTransformations.ratio3_4_size60,
    desktop: defaultCloudinaryTransformations.ratio3_4_size60,
  },
  [ImageTransformationName.image_portrait_extra_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size60,
    tablet: defaultCloudinaryTransformations.ratio3_4_size60,
    desktop: defaultCloudinaryTransformations.ratio3_4_size60,
  },
  [ImageTransformationName.image_landscape_extra_small]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size20,
    desktop: defaultCloudinaryTransformations.ratio16_9_size20,
  },
  [ImageTransformationName.image_landscape_small]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size20,
    desktop: defaultCloudinaryTransformations.ratio16_9_size20,
  },
  [ImageTransformationName.image_landscape_medium]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size40,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  [ImageTransformationName.image_landscape_large]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size40,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  [ImageTransformationName.image_landscape_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size60,
    tablet: defaultCloudinaryTransformations.ratio16_9_size60,
    desktop: defaultCloudinaryTransformations.ratio16_9_size60,
  },
  [ImageTransformationName.image_landscape_extra_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size60,
    tablet: defaultCloudinaryTransformations.ratio16_9_size60,
    desktop: defaultCloudinaryTransformations.ratio16_9_size60,
  },
  [ImageTransformationName.image_hero_extra_small]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size20,
    tablet: defaultCloudinaryTransformations.ratio21_9_size20,
    desktop: defaultCloudinaryTransformations.ratio21_9_size20,
  },
  [ImageTransformationName.image_hero_small]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size20,
    tablet: defaultCloudinaryTransformations.ratio21_9_size20,
    desktop: defaultCloudinaryTransformations.ratio21_9_size20,
  },
  [ImageTransformationName.image_hero_medium]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size40,
    tablet: defaultCloudinaryTransformations.ratio21_9_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size40,
  },
  [ImageTransformationName.image_hero_large]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size40,
    tablet: defaultCloudinaryTransformations.ratio21_9_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size40,
  },
  [ImageTransformationName.image_hero_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size60,
    tablet: defaultCloudinaryTransformations.ratio21_9_size60,
    desktop: defaultCloudinaryTransformations.ratio21_9_size60,
  },
  [ImageTransformationName.image_hero_extra_extra_large]: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size60,
    tablet: defaultCloudinaryTransformations.ratio21_9_size60,
    desktop: defaultCloudinaryTransformations.ratio21_9_size60,
  },
  [ImageTransformationName.image_original_extra_small]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  [ImageTransformationName.image_original_small]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  [ImageTransformationName.image_original_medium]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  [ImageTransformationName.image_original_large]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  [ImageTransformationName.image_original_extra_large]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  [ImageTransformationName.image_original_extra_extra_large]: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  good_assets: {
    mobile: defaultCloudinaryTransformations.q_good,
    tablet: defaultCloudinaryTransformations.q_good,
    desktop: defaultCloudinaryTransformations.q_good,
  },
  best_assets: {
    mobile: defaultCloudinaryTransformations.q_best,
    tablet: defaultCloudinaryTransformations.q_best,
    desktop: defaultCloudinaryTransformations.q_best,
  },
  thumbnail_wide_detail: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size20,
    tablet: defaultCloudinaryTransformations.ratio21_9_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size40,
  },
  thumbnail_landscape_detail: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  thumbnail_small_landscape_detail: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  thumbnail_square_detail: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio1_1_size40,
  },
  thumbnail_portrait_detail: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size20,
    tablet: defaultCloudinaryTransformations.ratio3_4_size40,
    desktop: defaultCloudinaryTransformations.ratio3_4_size40,
  },
  thumbnail_portrait_wide_detail: {
    mobile: defaultCloudinaryTransformations.ratio10_16_size20,
    tablet: defaultCloudinaryTransformations.ratio10_16_size20,
    desktop: defaultCloudinaryTransformations.ratio10_16_size20,
  },
  // Fancy box detail
  fancy_box_detail: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size10_c_pad_b_none,
    tablet: defaultCloudinaryTransformations.ratio16_9_size30_c_pad_b_none,
    desktop: defaultCloudinaryTransformations.ratio16_9_size50_c_pad_b_none,
  },
  // Module Story: header
  story_header_background: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size60,
  },
  // Module Hero main item
  hero_swiper_main_item: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size60,
    tablet: defaultCloudinaryTransformations.ratio1_1_size20,
    desktop: defaultCloudinaryTransformations.ratio21_9_size60,
  },
  // Module Hero pagination item
  hero_swiper_pagination_item: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size20,
    desktop: defaultCloudinaryTransformations.ratio16_9_size20,
  },
  // Module Focus on: background
  focus_on_background: {
    mobile: defaultCloudinaryTransformations.ratio21_9_size20,
    tablet: defaultCloudinaryTransformations.ratio21_9_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size60,
  },
  // Module Focus on: photo
  focus_on_photo: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  // Common Component Mosaic
  mosaic_square: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio1_1_size40,
  },
  mosaic_landscape: {
    mobile: defaultCloudinaryTransformations.ratio3_4_size20,
    tablet: defaultCloudinaryTransformations.ratio16_9_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  mosaic_landscape_square: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio16_9_size40,
  },
  mosaic_wide: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio21_9_size40,
  },
  mosaic_portrait: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio3_4_size40,
  },
  mosaic_portrait_wide: {
    mobile: defaultCloudinaryTransformations.ratio1_1_size20,
    tablet: defaultCloudinaryTransformations.ratio1_1_size40,
    desktop: defaultCloudinaryTransformations.ratio10_16_size20,
  },
};

/**
 * Returns the source URL of an image with the specified transformation applied.
 *
 * This function takes a source URL and a transformation string as input.
 * It checks if the source URL and transformation string are provided, and if so, it appends the transformation string to the source URL and returns the updated URL.
 * If the source URL or transformation string are not provided, it returns the source URL as is.
 *
 * @param {string | null | undefined} src - The source URL of the image.
 * @param {string | undefined} transformation - The transformation string to apply.
 * @returns {string | null | undefined} The source URL with the transformation applied, or the source URL as is if the transformation string is not provided.
 */
export const getSrcWithTransformation = (src: string | null | undefined, transformation: string | undefined) => {
  if (src && transformation) {
    const regex = /{formatInstructions}/;
    return src.replace(regex, transformation);
  }
  return '';
};
