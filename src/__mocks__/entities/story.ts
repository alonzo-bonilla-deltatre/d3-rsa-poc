import { DistributionEntity, ForgeEntityCode, ForgeEntityType, Tag } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { samplePhotoStoryPart } from '@/__mocks__/entities/sampleStoryParts';

const sampleContext: Tag = {
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'https://test.url.com/tags/test',
  type: ForgeEntityType.tag,
  title: 'test',
  slug: 'test',
  neutralSlug: 'test',
  externalSourceName: null,
  externalSourceReference: {},
  fields: {},
  extraData: null,
};

const sampleTags: Tag[] = [
  {
    slug: 'test',
    type: ForgeEntityType.tag,
    _translationId: 'TestTranslationId',
    _entityId: 'TestEntityId',
    selfUrl: 'https://test.url.com/tags/test',
    title: 'test',
    neutralSlug: 'test',
    externalSourceName: null,
    externalSourceReference: {
      sourceId: 'test',
      sourceName: 'test',
    },
    fields: {},
    extraData: null,
  },
];
const sampleThumbnail: ImageAsset = {
  title: 'TestTitle',
  templateUrl: 'https://test.url.com/test',
  format: 'jpg',
  slug: 'test',
};

const sampleStory: DistributionEntity = {
  id: 'TestID',
  fields: {},
  createdBy: 'Test User',
  type: ForgeEntityType.story,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'https://test.url.com/test',
  slug: 'test',
  title: 'Test Title',
  headline: 'Test Headline',
  summary: 'Test Summary',
  tags: sampleTags,
  relations: [],
  references: {},
  lastUpdatedBy: 'Test User',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
  context: sampleContext,
  featured: 0,
  thumbnail: sampleThumbnail,
  image: {
    title: 'TestTitle',
    templateUrl: 'https://test.url.com/test',
    format: 'jpg',
    slug: 'test',
  },
  parts: [samplePhotoStoryPart],
  entityCode: ForgeEntityCode.story,
};

const sampleStoryWithPhotoPart: DistributionEntity = {
  ...sampleStory,
  ...samplePhotoStoryPart,
};

export { sampleStory, sampleStoryWithPhotoPart, sampleContext, sampleTags, sampleThumbnail };
