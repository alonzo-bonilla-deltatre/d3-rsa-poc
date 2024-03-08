import { DistributionEntity, ForgeEntityType, PagedResult, Tag } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';

const mockTag: Tag = {
  _translationId: 'trans-001',
  _entityId: 'tag-001',
  type: 'topic',
  selfUrl: 'http://example.com/tags/tag-001',
  title: 'Sports',
  slug: 'sports',
  neutralSlug: 'sports',
  externalSourceName: null,
  externalSourceReference: {},
  fields: {},
  extraData: null,
};

const mockImageAsset: ImageAsset = {
  title: 'Image title',
  templateUrl: 'ImagetemplateUrl',
  format: 'image-format',
  slug: '12345-slug',
};

const mockDistributionEntity: DistributionEntity = {
  id: 'entity-001',
  type: ForgeEntityType.story,
  _translationId: 'trans-001',
  _entityId: 'entity-001',
  selfUrl: 'http://example.com/entities/entity-001',
  slug: 'sample-article',
  title: 'Sample Article Title',
  headline: 'This is a headline',
  description: 'This is a description of the article content',
  tags: [mockTag],
  relations: [],
  references: {},
  fields: {},
  createdBy: 'user-001',
  lastUpdatedBy: 'user-002',
  lastUpdatedDate: '2023-11-06T12:00:00Z',
  contentDate: '2023-11-06T00:00:00Z',
  context: mockTag,
  featured: 1,
  thumbnail: mockImageAsset,
  image: mockImageAsset,
  parts: [],
  entityCode: 'articles',
  url: 'http://example.com/sample-article',
  elements: [],
  elementsCount: 0,
};

const mockPagedResult: PagedResult = {
  pagination: {
    nextUrl: 'http://example.com/page/2',
    previousUrl: 'http://example.com/page/1',
    maxItems: 50,
    page: 1,
    hasPagination: true,
  },
  meta: {
    apiVersion: '1.0',
    generatedAt: '2023-11-06T12:00:00Z',
  },
  items: [
    mockDistributionEntity,
    {
      ...mockDistributionEntity,
      id: 'entity-002',
      slug: 'another-article',
      title: 'Another Article Title',
      url: 'http://example.com/another-article',
    },
  ],
};

export { mockPagedResult };
