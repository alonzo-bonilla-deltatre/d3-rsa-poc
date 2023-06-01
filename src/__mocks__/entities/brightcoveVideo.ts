import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { DistributionEntity } from '@/models/types/forge';

const sampleBrightcoveVideo: DistributionEntity = {
  ...emptyDistributionEntity,
  fields: {
    brightcoveAccountId: '5530036775001',
    brightcoveId: '6323538882112',
  },
  createdBy: 'Mario Rossi',
  type: 'customentity',
  _translationId: '59b6e3f1-dad3-4f87-9043-25c582cd7b4d',
  _entityId: '35cd864c-41df-45cf-949d-fd556e0b65be',
  selfUrl: '',
  slug: '23-gotm-march-16x9',
  title: 'Goal of the match',
  headline: '',
  tags: [],
  relations: [],
  references: {},
  lastUpdatedBy: '',
  lastUpdatedDate: '',
  contentDate: '',
  context: {
    _translationId: '',
    _entityId: '',
    type: '',
    selfUrl: '',
    title: '',
    slug: '',
    neutralSlug: '',
    externalSourceName: null,
    externalSourceReference: {},
    fields: {},
    extraData: {},
  },
  featured: 0,
  thumbnail: {
    title: '23_GOTM_March_16x9',
    templateUrl:
      'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/hyqtbrhtvxjyg0iejqna',
    format: 'jpg',
    slug: '23-gotm-march-16x9-x3983',
  },
  image: {
    title: '',
    templateUrl: '',
    format: '',
    slug: '',
  },
  parts: [],
  entityCode: 'brightcovevideo',
};

export { sampleBrightcoveVideo };
