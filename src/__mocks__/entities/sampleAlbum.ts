import { AlbumEntity, DistributionEntity, ForgeEntityCode, ForgeEntityType, Tag } from '@/models/types/forge';
import { emptyDistributionEntity } from './sampleStoryParts';
import { sampleContext, sampleTags } from './story';

const samplePhoto: DistributionEntity = {
  ...emptyDistributionEntity,
  type: ForgeEntityType.photo,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'TestSelfUrl',
  title: 'TestTitle',
  slug: 'TestSlug',
  fields: {
    copyright: 'TestCopyright',
    caption: 'TestCaption',
    photographer: 'TestPhotographer',
  },
  image: {
    title: 'TestImageTitle',
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.jpg',
    format: 'jpg',
    slug: 'TestImageSlug',
  },
  featured: 0,
  tags: [],
  createdBy: 'Test Creator',
  lastUpdatedBy: 'Test Updater',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
};

const sampleAlbum: AlbumEntity = {
  id: 'TestAlbumId',
  fields: {},
  createdBy: 'Test Creator',
  type: ForgeEntityType.album,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'TestSelfUrl',
  slug: 'TestSlug',
  title: 'TestTitle',
  tags: sampleTags,
  relations: [],
  references: {},
  lastUpdatedBy: 'Test Updater',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
  context: sampleContext,
  featured: 0,
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
  elements: [samplePhoto, samplePhoto, samplePhoto],
  entityCode: ForgeEntityCode.album,
  description: 'TestDescription',
};

export { sampleAlbum };
