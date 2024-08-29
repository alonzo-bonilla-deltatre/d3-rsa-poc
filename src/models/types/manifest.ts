import { MetadataRoute } from 'next';

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

export type ManifestDisplay = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | undefined;

export type ManifestResponse = MetadataRoute.Manifest & { related_applications: RelatedApplication[] };
