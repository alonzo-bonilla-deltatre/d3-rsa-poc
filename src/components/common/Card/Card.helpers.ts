import { ImageTransformations } from '@/models/types/images';
import { transformations } from '@/utilities/cloudinaryTransformations';

export const getImageTransformation = (name: string): ImageTransformations => {
  switch (name) {
    case 'fullimage':
      return transformations.mosaicSquareThumbnail;
    case 'fullimage-portrait':
      return transformations.mosaicPortraitThumbnail;
    default:
      return transformations.thumbnailGridItem;
  }
};
export const getContainerClassName = (name: string): string => {
  switch (name) {
    case 'fullimage':
      return 'grid';
    case 'fullimage-portrait':
      return 'grid';
    default:
      return '';
  }
};
export const getInfoClassName = (name: string): string => {
  switch (name) {
    case 'fullimage':
      return 'p-5 col-start-1 row-start-1 flex justify-end flex-col z-10';
    case 'fullimage-portrait':
      return 'p-5 col-start-1 row-start-1 flex justify-end flex-col z-10';
    default:
      return 'py-5 w-4/6';
  }
};
