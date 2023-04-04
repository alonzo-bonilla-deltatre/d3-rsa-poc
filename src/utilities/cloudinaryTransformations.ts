import { ImageTransformations } from "@/models/types/images";

export const transformations: Record<any, ImageTransformations> = {
  thumbnailDetail: {
    mobile: "t_ratio21_9-size30",
    tablet: "t_ratio21_9-size30",
    desktop: "t_ratio21_9-size50"
  },
  logos: {
    mobile: "t_q-best",
    tablet: "t_q-best",
    desktop: "t_q-best"
  },
  thumbnailGridItem: {
    mobile: "t_ratio16_9-size20",
    tablet: "t_ratio16_9-size20",
    desktop: "t_ratio16_9-size40"
  },
  heroSwiper: {
    mobile: "t_ratio16_9-size30",
    tablet: "t_ratio16_9-size30",
    desktop: "t_ratio16_9-size50"
  },
  heroThumbnail: {
    mobile: "t_ratio16_9-size10",
    tablet: "t_ratio16_9-size10",
    desktop: "t_ratio16_9-size10"
  },
  mosaicSquareThumbnail: {
    mobile: "t_ratio1_1-size20",
    tablet: "t_ratio1_1-size20",
    desktop: "t_ratio1_1-size40"
  },
  mosaicLandscapeThumbnail: {
    mobile: "t_ratio16_9-size20",
    tablet: "t_ratio16_9-size20",
    desktop: "t_ratio16_9-size50"
  },
  mosaicPortraitThumbnail: {
    mobile: "t_ratio3_4-size20",
    tablet: "t_ratio3_4-size20",
    desktop: "t_ratio3_4-size40"
  }
};

export const getSrcWithTransformation = (src: string, transformation: string) => {
  if (src) {
    const regex = /{formatInstructions}/;
    return src.replace(regex, transformation);
  }
  return "";
};
