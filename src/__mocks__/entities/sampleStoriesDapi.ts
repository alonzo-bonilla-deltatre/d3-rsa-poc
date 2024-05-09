import { DistributionEntity, ForgeEntityCode, ForgeEntityType, PagedResult, Tag } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';

const mockTag: Tag = {
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  type: 'topic',
  selfUrl: 'https://test.url.com/tags/test-tag',
  title: 'Test',
  slug: 'test',
  neutralSlug: 'test',
  externalSourceName: null,
  externalSourceReference: {},
  fields: {},
  extraData: null,
};

const mockImageAsset: ImageAsset = {
  title: 'TestImageTitle',
  templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
  format: 'png',
  slug: 'TestSlug',
};

const mockDistributionEntity: DistributionEntity = {
  id: 'TestEntityId',
  type: ForgeEntityType.story,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'https://test.url.com/entities/test-entity',
  slug: 'test-article',
  title: 'Test Article Title',
  headline: 'Test Headline',
  description: 'Test Description',
  tags: [mockTag],
  relations: [],
  references: {},
  fields: {},
  createdBy: 'TestCreator',
  lastUpdatedBy: 'TestUpdater',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
  context: mockTag,
  featured: 1,
  thumbnail: mockImageAsset,
  image: mockImageAsset,
  parts: [],
  entityCode: ForgeEntityCode.story,
  url: 'https://test.url.com/test-article',
  elements: [],
  elementsCount: 0,
};

const mockPagedResult: PagedResult = {
  pagination: {
    nextUrl: 'https://test.url.com/page/2',
    previousUrl: 'https://test.url.com/page/1',
    maxItems: 50,
    page: 1,
    hasPagination: true,
  },
  meta: {
    apiVersion: '1.0',
    generatedAt: '2022-01-01T00:00:00Z',
  },
  items: [
    mockDistributionEntity,
    {
      ...mockDistributionEntity,
      id: 'TestEntityId2',
      slug: 'test-article-2',
      title: 'Test Article Title 2',
      url: 'https://test.url.com/test-article-2',
    },
  ],
};

export { mockPagedResult };
