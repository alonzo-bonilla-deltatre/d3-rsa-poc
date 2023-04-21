export type ImageTransformations = {
  mobile: string,
  tablet: string,
  desktop: string,
  mobileWidth: number,
  mobileHeight: number
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
