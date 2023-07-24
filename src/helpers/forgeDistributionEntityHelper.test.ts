import { DistributionEntity, Tag } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { enrichEntitiesWithThumbnailPlaceholder } from './forgeDistributionEntityHelper';

const fallbackImageAsset: ImageAsset = {
  title: 'no_image_available',
  templateUrl:
    'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/sandbox-integrations/react-poc/d3-placeholder_d8r7kc',
  format: '',
  slug: 'no_image_available',
};

const fallbackImageAssetWithoutTemplateUrl: ImageAsset = {
  title: 'Thumbnail 1',
  templateUrl: '',
  format: 'jpg',
  slug: 'thumbnail-1',
};

const mockedVariables: Variable[] = [
  {
    type: 'keyValue',
    key: 'inc_header',
    keyValue: {
      value: '~/test/react-poc/library/_header',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_footer',
    keyValue: {
      value: '~/test/react-poc/library/_footer',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'image_placeholder',
    keyValue: {
      value:
        'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/sandbox-integrations/react-poc/d3-placeholder_d8r7kc',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'sitename',
    keyValue: {
      value: 'FORGE GO',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_amp_header',
    keyValue: {
      value: '~/_libraries/_ampheader',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'user_profile',
    keyValue: {
      value: '/account/profile/overview',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'hello',
    keyValue: {
      value: 'val in english parent',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_hamburger',
    keyValue: {
      value: '~/test/react-poc/library/_hamburgher',
      valueType: 'string',
    },
  },
];

const tag1: Tag = {
  _translationId: 'tag-1',
  _entityId: 'tag-1',
  selfUrl: 'https://example.com/tags/tag-1',
  title: 'Tag 1',
  slug: 'tag-1',
  neutralSlug: 'tag-1',
  externalSourceReference: {},
  fields: {},
  type: '',
  externalSourceName: null,
  extraData: undefined,
};

const tag2: Tag = {
  _translationId: 'tag-2',
  _entityId: 'tag-2',
  selfUrl: 'https://example.com/tags/tag-2',
  title: 'Tag 2',
  slug: 'tag-2',
  neutralSlug: 'tag-2',
  externalSourceReference: {},
  fields: {},
  type: '',
  externalSourceName: null,
  extraData: undefined,
};

const mockedEntities: DistributionEntity[] = [
  {
    id: 'entity-1',
    type: 'entity',
    _translationId: 'entity-1',
    _entityId: 'entity-1',
    selfUrl: 'https://example.com/entities/entity-1',
    slug: 'entity-1',
    title: 'Entity 1',
    headline: 'Headline 1',
    tags: [tag1, tag2],
    relations: [],
    references: {},
    fields: {},
    createdBy: 'user-1',
    lastUpdatedBy: 'user-1',
    lastUpdatedDate: '2023-05-24',
    contentDate: '2023-05-24',
    context: tag1,
    featured: 0,
    thumbnail: fallbackImageAsset,
    parts: [],
  },
  {
    id: 'entity-2',
    type: 'entity',
    _translationId: 'entity-2',
    _entityId: 'entity-2',
    selfUrl: 'https://example.com/entities/entity-2',
    slug: 'entity-2',
    title: 'Entity 2',
    headline: 'Headline 2',
    tags: [tag2],
    relations: [],
    references: {},
    fields: {},
    createdBy: 'user-2',
    lastUpdatedBy: 'user-2',
    lastUpdatedDate: '2023-05-24',
    contentDate: '2023-05-24',
    context: tag2,
    featured: 0,
    thumbnail: fallbackImageAsset,
    parts: [],
  },
];

const mockedEntitiesWithIncompleteThumbnail: DistributionEntity[] = [
  {
    id: 'entity-1',
    type: 'entity',
    _translationId: 'entity-1',
    _entityId: 'entity-1',
    selfUrl: 'https://example.com/entities/entity-1',
    slug: 'entity-1',
    title: 'Entity 1',
    headline: 'Headline 1',
    tags: [tag1, tag2],
    relations: [],
    references: {},
    fields: {},
    createdBy: 'user-1',
    lastUpdatedBy: 'user-1',
    lastUpdatedDate: '2023-05-24',
    contentDate: '2023-05-24',
    context: tag1,
    featured: 0,
    thumbnail: fallbackImageAssetWithoutTemplateUrl,
    parts: [],
  },
  {
    id: 'entity-2',
    type: 'entity',
    _translationId: 'entity-2',
    _entityId: 'entity-2',
    selfUrl: 'https://example.com/entities/entity-2',
    slug: 'entity-2',
    title: 'Entity 2',
    headline: 'Headline 2',
    tags: [tag2],
    relations: [],
    references: {},
    fields: {},
    createdBy: 'user-2',
    lastUpdatedBy: 'user-2',
    lastUpdatedDate: '2023-05-24',
    contentDate: '2023-05-24',
    context: tag2,
    featured: 0,
    thumbnail: fallbackImageAssetWithoutTemplateUrl,
    parts: [],
  },
];

describe('enrichEntitiesWithThumbnailPlaceholder function', () => {
  it('should return an empty array if items are null', () => {
    const entities = enrichEntitiesWithThumbnailPlaceholder(null, mockedVariables);
    expect(entities).toStrictEqual([]);
  });

  it('should return an empty array if items are empty array', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder([], mockedVariables);
    expect(result).toEqual([]);
  });

  it('should set fallbackImageAsset as thumbnail for entities with empty string as per thumbnail "templateUrl" property', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntitiesWithIncompleteThumbnail, mockedVariables);
    expect(result).toStrictEqual(mockedEntities);
  });

  it('should return the original entities are with a valid placeholder', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntities, mockedVariables);
    expect(result).toEqual(result);
  });
});
