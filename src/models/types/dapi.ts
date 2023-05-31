import { StoryPart } from '@/models/types/storyPart';
import { ImageAsset } from '@/models/types/images';

export type DistributionEntity = {
  type: string;
  _translationId: string;
  _entityId: string;
  selfUrl: string;
  slug: string;
  title: string;
  headline: string;
  tags: Tag[];
  relations: DistributionEntity[];
  references: { [key: string]: any };
  fields: Record<string, unknown>;
  createdBy: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  contentDate: string;
  context: Tag;
  featured: number;
  thumbnail: ImageAsset;
  image?: ImageAsset;
  parts: StoryPart[];
  entityCode?: string;
  url?: string;
};

export type PagedResult = {
  pagination: {
    nextUrl: string;
    maxItems: number;
  };
  meta: {
    apiVersion: string;
    generatedAt: string;
  };
  items: DistributionEntity[];
};

export type Tag = {
  _translationId: string;
  _entityId: string;
  selfUrl: string;
  title: string;
  slug: string;
  neutralSlug: string;
  externalSourceReference: Record<string, unknown>;
  fields: Record<string, unknown>;
};
export type QueryStringModuleProps = {
  skip: number;
  limit: number;
  tags: string;
};
