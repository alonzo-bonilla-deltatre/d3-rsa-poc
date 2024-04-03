import { ImageTransformations } from '@/models/types/images';

export type GridImage = {
  col: string;
  row: string;
  src?: string;
  title?: string;
  transformation?: ImageTransformations;
};

export type MosaicPatternItem = {
  col: string;
  row: string;
  transformation?: ImageTransformations;
};

export type MosaicPattern = MosaicPatternItem[];

export type ImageType = {
  title: string;
  templateUrl: string;
  thumbnailUrl: string;
  format: string;
  overriddenFormats: Record<string, unknown>;
};
