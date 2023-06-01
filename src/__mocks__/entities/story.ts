import { DistributionEntity, Tag } from '@/models/types/forge';

const sampleContext: Tag = {
  _translationId: '2d9edf1c-6432-44f7-b065-c09ffacfb5dc',
  _entityId: 'f3cd7696-faa9-490e-841b-ee0c907df43e',
  selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/tags/supercars',
  type: 'tag',
  title: 'supercars',
  slug: 'supercars',
  neutralSlug: 'supercars',
  externalSourceName: null,
  externalSourceReference: {},
  fields: {},
  extraData: null,
};

const sampleTags: Tag[] = [
  {
    slug: 'awards',
    type: 'tag',
    _translationId: '9a220596-d930-4689-a28b-e6186ec76017',
    _entityId: '13d162ee-7a96-4f11-a40f-06a2ce5fc99f',
    selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/tags/awards',
    title: 'awards',
    neutralSlug: 'awards',
    externalSourceName: null,
    externalSourceReference: {
      sourceId: 'taxonomy-tag-awards',
      sourceName: 'taxonomy',
    },
    fields: {},
    extraData: null,
  },
];

const sampleStory: DistributionEntity = {
  fields: {},
  createdBy: 'Mario Rossi',
  type: 'story',
  _translationId: '63b4c7d9-c86e-4c39-8033-1a335f87e2ad',
  _entityId: 'd2ffd20f-0c27-41fb-b33e-b872cb46a641',
  selfUrl: '',
  slug: 'full-wwe-extreme-rules-results',
  title: 'Full WWE Extreme Rules results',
  headline: 'Lorem ipsum dolor',
  tags: sampleTags,
  relations: [],
  references: {},
  lastUpdatedBy: 'Mario Rossi',
  lastUpdatedDate: '2023-04-18T15:00:33.902Z',
  contentDate: '2022-10-21T14:41:27Z',
  context: sampleContext,
  featured: 0,
  thumbnail: {
    title: 'GEN3_Supercars_Ford_Mustang_Chevrolet_Camaro_4',
    templateUrl:
      'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/v1678118218/forgego-sandbox/lhmqewjgfmjddly5ii3s',
    format: 'webp',
    slug: 'gen3-supercars-ford-mustang-chevrolet-camaro-4',
  },
  image: {
    title: '',
    templateUrl: '',
    format: '',
    slug: '',
  },
  parts: [],
  entityCode: 'story',
};

export { sampleStory, sampleContext, sampleTags };
