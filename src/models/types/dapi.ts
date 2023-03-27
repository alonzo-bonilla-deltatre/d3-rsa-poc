export type DistributionEntity = {
  type: string;
  _translationId: string;
  _entityId: string;
  selfUrl: string;
  slug: string;
  title: string;
  headline: string;
  tags: Tag[];
  relations: any[];
  references: { [key: string]: any };
  fields: Record<string, unknown>;
  createdBy: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  contentDate: string;
  context: Tag;
  featured: number;
  thumbnail: {
    title: string;
    templateUrl: string;
    thumbnailUrl: string;
    format: string;
    overriddenFormats: { [key: string]: any };
    slug: string;
    selfUrl: string;
  };
  entityCode: string;
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
