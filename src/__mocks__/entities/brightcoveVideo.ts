import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { DistributionEntity, ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';

const sampleBrightcoveVideo: DistributionEntity = {
  ...emptyDistributionEntity,
  fields: {
    brightcoveAccountId: 'TestAccountId',
    brightcoveId: 'TestBrightcoveId',
  },
  createdBy: 'Test Creator',
  type: ForgeEntityType.customEntity,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'TestSelfUrl',
  slug: 'TestSlug',
  title: 'Test Title',
  headline: 'Test Headline',
  tags: [],
  relations: [],
  references: {},
  lastUpdatedBy: 'Test Updater',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
  context: {
    _translationId: 'TestContextTranslationId',
    _entityId: 'TestContextEntityId',
    type: 'TestType',
    selfUrl: 'TestContextSelfUrl',
    title: 'TestContextTitle',
    slug: 'TestContextSlug',
    neutralSlug: 'TestContextNeutralSlug',
    externalSourceName: 'TestExternalSourceName',
    externalSourceReference: {},
    fields: {},
    extraData: {},
  },
  featured: 1,
  thumbnail: {
    title: 'TestThumbnailTitle',
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
    format: 'png',
    slug: 'TestThumbnailSlug',
  },
  image: {
    title: 'TestImageTitle',
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.jpg',
    format: 'jpg',
    slug: 'TestImageSlug',
  },
  parts: [],
  entityCode: ForgeEntityCode.brightcoveVideo,
};

export { sampleBrightcoveVideo };
