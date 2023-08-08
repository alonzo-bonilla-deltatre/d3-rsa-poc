import { AlbumEntity, DistributionEntity, Tag } from '@/models/types/forge';
import { emptyDistributionEntity } from './sampleStoryParts';
import { sampleContext, sampleTags } from './story';
const samplePhoto: DistributionEntity = {
  ...emptyDistributionEntity,
  type: 'photo',
  _translationId: '7c1c8452-6092-48f9-a6f8-8d2b0d86c5cf',
  _entityId: 'a740c843-a2a2-4a76-94dc-59d0a05ac6fc',
  selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/photos/virinhv2b3nkturg0toi',
  title: 'Roger',
  slug: 'virinhv2b3nkturg0toi',
  fields: {
    copyright: '1',
    caption: 'caption 1',
    photographer: 'pg1',
  },
  image: {
    title: 'virinhv2b3nkturg0toi',
    templateUrl:
      'htt,ps://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/cww95wkwe8sr4tkyccyu',
    format: 'jpg',
    slug: '',
  },
  featured: 0,
  tags: [],
  createdBy: 'Davide Giulietti',
  lastUpdatedBy: 'naile kas',
  lastUpdatedDate: '2021-09-16T13:59:40.718Z',
  contentDate: '2020-05-04T10:36:51.987Z',
};

const sampleAlbum: AlbumEntity = {
  id: 'd2ffd20f-0c27-41fb-b33e-b872cb46a641',
  fields: {},
  createdBy: 'Mario Rossi',
  type: 'album',
  _translationId: '63b4c7d9-c86e-4c39-8033-1a335f87e2ad',
  _entityId: 'd2ffd20f-0c27-41fb-b33e-b872cb46a641',
  selfUrl: '',
  slug: 'roger-rafa',
  title: 'Victory on Sunday collected the100th win at Roland Garros',
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
  elements: [samplePhoto, samplePhoto, samplePhoto],
  entityCode: 'album',
  description: 'description',
};

export { sampleAlbum };
