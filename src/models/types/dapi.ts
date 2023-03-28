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
  thumbnail: Image;
  image: Image;
  content: string;
  parts: DistributionEntity[];
  entityCode: string;
};
// export type StoryPart = DistributionEntity & {
//   content: string;
//   Image: Image;
// };
export type Image = {
  title: string;
  templateUrl: string;
  thumbnailUrl: string;
  format: string;
  overriddenFormats: { [key: string]: any };
  slug: string;
  selfUrl: string;
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

export type CardOptions = {
  hideIcon: boolean | false;
  hideRoofline: boolean | false;
  hideTitle: boolean | false;
  hideDate: boolean | false;
  hideAuthor: boolean | true;
  hideCta: boolean | true;
};