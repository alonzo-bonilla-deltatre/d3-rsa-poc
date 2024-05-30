export type ImageTransformation = {
  transformation: string;
  width: number;
  height: number;
};

export type ImageTransformations = {
  mobile: ImageTransformation;
  tablet: ImageTransformation;
  desktop: ImageTransformation;
};

export type ImageAsset = {
  title: string;
  templateUrl: string;
  thumbnailUrl?: string;
  format: string;
  slug: string;
  overriddenFormats?: Record<string, unknown>;
};

export enum ImageTransformationName {
  image_square_extra_small = 'image_square_extraSmall',
  image_square_small = 'image_square_small',
  image_square_medium = 'image_square_medium',
  image_square_large = 'image_square_large',
  image_square_extra_large = 'image_square_extraLarge',
  image_square_extra_extra_large = 'image_square_extraExtraLarge',
  image_portrait_extra_small = 'image_portrait_extraSmall',
  image_portrait_small = 'image_portrait_small',
  image_portrait_medium = 'image_portrait_medium',
  image_portrait_large = 'image_portrait_large',
  image_portrait_extra_large = 'image_portrait_extraLarge',
  image_portrait_extra_extra_large = 'image_portrait_extraExtraLarge',
  image_landscape_extra_small = 'image_landscape_extraSmall',
  image_landscape_small = 'image_landscape_small',
  image_landscape_medium = 'image_landscape_medium',
  image_landscape_large = 'image_landscape_large',
  image_landscape_extra_large = 'image_landscape_extraLarge',
  image_landscape_extra_extra_large = 'image_landscape_extraExtraLarge',
  image_hero_extra_small = 'image_hero_extraSmall',
  image_hero_small = 'image_hero_small',
  image_hero_medium = 'image_hero_medium',
  image_hero_large = 'image_hero_large',
  image_hero_extra_large = 'image_hero_extraLarge',
  image_hero_extra_extra_large = 'image_hero_extraExtraLarge',
  image_original_extra_small = 'image_original_extraSmall',
  image_original_small = 'image_original_small',
  image_original_medium = 'image_original_medium',
  image_original_large = 'image_original_large',
  image_original_extra_large = 'image_original_extraLarge',
  image_original_extra_extra_large = 'image_original_extraExtraLarge',

  good_assets = 'good_assets',
  best_assets = 'best_assets',
  thumbnail_wide_detail = 'thumbnail_wide_detail',
  thumbnail_landscape_detail = 'thumbnail_landscape_detail',
  thumbnail_small_landscape_detail = 'thumbnail_small_landscape_detail',
  thumbnail_square_detail = 'thumbnail_square_detail',
  thumbnail_portrait_detail = 'thumbnail_portrait_detail',
  thumbnail_portrait_wide_detail = 'thumbnail_portrait_wide_detail',

  // Modules or Common components
  fancy_box_detail = 'fancy_box_detail',
  story_header_background = 'story_header_background',
  hero_swiper_main_item = 'hero_swiper_main_item',
  hero_swiper_pagination_item = 'hero_swiper_pagination_item',
  focus_on_background = 'focus_on_background',
  focus_on_photo = 'focus_on_photo',
  mosaic_square = 'mosaic_square',
  mosaic_landscape = 'mosaic_landscape',
  mosaic_landscape_square = 'mosaic_landscape_square',
  mosaic_wide = 'mosaic_wide',
  mosaic_portrait = 'mosaic_portrait',
  mosaic_portrait_wide = 'mosaic_portrait_wide',
}
