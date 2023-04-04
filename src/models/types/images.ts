export type ImageTransformations = {
  mobile: string,
  tablet: string,
  desktop: string,
}

export type ImageAsset = {
  title: string;
  templateUrl: string;
  thumbnailUrl: string;
  format: string;
  overriddenFormats: { [key: string]: any };
  slug: string;
  selfUrl: string;
}
