export type Icon = {
  src: string;
  sizes: string;
  type: string;
};

export type RelatedApplication = {
  platform: string;
  url?: string;
  id?: string;
};

export type ManifestResponse = {
  name: string;
  short_name?: string;
  start_url?: string;
  display?: string;
  background_color?: string;
  theme_color?: string;
  scope?: string;
  icons?: Icon[];
  related_applications?: RelatedApplication[];
};
