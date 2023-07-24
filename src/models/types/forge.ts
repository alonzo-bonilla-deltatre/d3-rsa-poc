import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { StoryPart } from '@/models/types/storyPart';
import { LinkRuleVariation } from '@/models/types/linkRule';

export type DistributionEntity = {
  id: string;
  type: string;
  _translationId: string;
  _entityId: string;
  selfUrl: string;
  slug: string;
  title: string;
  headline: string | null;
  tags: Tag[];
  relations: DistributionEntity[];
  references: { [key: string]: any };
  fields: Record<string, unknown>;
  createdBy: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  contentDate: string;
  context: Tag | null;
  featured: number;
  thumbnail: ImageAsset | null;
  image?: ImageAsset;
  parts: StoryPart[];
  entityCode?: string;
  url?: string;
  [key: string]: any;
};

export type AlbumEntity = DistributionEntity & {
  description: string;
  elements: DistributionEntity[] | null;
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
  type: string;
  selfUrl: string;
  title: string;
  slug: string;
  neutralSlug: string;
  externalSourceName: string | null;
  externalSourceReference: Record<string, unknown>;
  fields: Record<string, unknown>;
  extraData: any;
};

export type ForgeDistributionApiOption = {
  hasThumbnailPlaceholder?: boolean;
  hasLinkRules?: boolean;
  hasLinkRulesForRelationsAndParts?: boolean;
  skip?: number;
  limit?: number;
  tags?: string;
  variables: Variable[];
  linkRuleVariations?: LinkRuleVariation[];
} | null;
