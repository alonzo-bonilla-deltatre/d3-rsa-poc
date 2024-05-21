import {
  DistributionEntity,
  ForgeDistributionApiOption,
  ForgeEntityCode,
  ForgeEntityType,
  ForgeExternalEntityType,
  ListAvailabilityOption,
  RangeOption,
  SortOptions,
  SortOrder,
  Tag,
} from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import {
  addLinkRuleRequest,
  addLinkRulesForEntities,
  buildLinkRulesRequest,
  createLinkRuleId,
  enrichDistributionEntities,
  enrichDistributionEntitiesWithLinkRules,
  enrichEntitiesWithThumbnailPlaceholder,
  enrichLinkRuleRequestEntity,
  getAPIQueryString,
  getContextParam,
  getEntityType,
  getFilteredItems,
  getGenericParams,
  getListAvailabilityParams,
  getQueryString,
  getRangeParams,
  getSortParams,
  getTagsParam,
  updateEntityURL,
  updateEntityURLs,
} from './forgeDistributionEntityHelper';
import { StoryPart } from '@/models/types/storyPart';
import { getLinkRules } from '@/services/linkRuleService';
import { LinkRuleRequest, LinkRuleResponse, LinkRuleVariation, LinkRuleVariationType } from '@/models/types/linkRule';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@/utilities/loggerUtility');
jest.mock('@/services/linkRuleService', () => ({
  getLinkRules: jest.fn(),
}));
const mockLogger = logger.log as jest.Mock;

// ARRANGE
const fallbackImageAsset: ImageAsset = {
  title: 'no_image_available',
  templateUrl:
    'https://test.url.com/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/d3-placeholder_d8r7kc',
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
      value: '~/test/library/_header',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_footer',
    keyValue: {
      value: '~/test/library/_footer',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'image_placeholder',
    keyValue: {
      value: 'https://test.url.com/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/d3-placeholder_d8r7kc',
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
      value: '~/test/library/_hamburgher',
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
    type: ForgeEntityType.story,
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
    type: ForgeEntityType.story,
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
const mockedEntitiesWithIncompleteThumbnail = [
  {
    ...mockedEntities[0],
    thumbnail: null,
  },
  {
    ...mockedEntities[1],
    thumbnail: {
      ...fallbackImageAssetWithoutTemplateUrl,
    },
  },
];
const mockedEntitiesWithIncompleteThumbnailInRelations = [
  {
    ...mockedEntities[0],
    relations: [
      {
        ...mockedEntities[0],
        thumbnail: null,
      },
    ],
  },
  {
    ...mockedEntities[1],
    relations: [
      {
        ...mockedEntities[1],
        thumbnail: fallbackImageAssetWithoutTemplateUrl,
      },
    ],
  },
];
const mockedEntitiesWithIncompleteThumbnailInPartsField = [
  {
    ...mockedEntities[0],
    parts: [
      {
        thumbnail: null,
        content: '',
        inputUrl: '',
        externalType: ForgeExternalEntityType.storyPartPhoto,
        entityCode: ForgeEntityCode.photo,
        url: '',
        image: fallbackImageAssetWithoutTemplateUrl,
        description: '',
        elements: null,
      },
    ] as StoryPart[],
  },
  {
    ...mockedEntities[1],
    parts: [
      {
        thumbnail: fallbackImageAssetWithoutTemplateUrl,
        content: '',
        inputUrl: '',
        externalType: ForgeExternalEntityType.storyPartPhoto,
        entityCode: ForgeEntityCode.photo,
        url: '',
        image: fallbackImageAssetWithoutTemplateUrl,
        description: '',
        elements: null,
      },
      {
        thumbnail: fallbackImageAsset,
        content: '',
        inputUrl: '',
        externalType: ForgeExternalEntityType.storyPartPhoto,
        entityCode: ForgeEntityCode.photo,
        url: '',
        image: fallbackImageAssetWithoutTemplateUrl,
        description: '',
        elements: null,
      },
    ] as StoryPart[],
  },
] as DistributionEntity[];

describe('enrichEntitiesWithThumbnailPlaceholder function', () => {
  it('should return an empty array if items are null', () => {
    // ACT
    const entities = enrichEntitiesWithThumbnailPlaceholder(null, mockedVariables);
    // ASSERT
    expect(entities).toStrictEqual([]);
  });

  it('should return an empty array if items are empty array', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder([], mockedVariables);
    // ASSERT
    expect(result).toEqual([]);
  });

  it('should set fallbackImageAsset as thumbnail for entities with empty string as per thumbnail "templateUrl" property', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntitiesWithIncompleteThumbnail, mockedVariables);
    // ASSERT
    expect(result).toStrictEqual(mockedEntities);
  });

  it('should set fallbackImageAsset as thumbnail for entities with empty string as per thumbnail "templateUrl" property with empty variables', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntitiesWithIncompleteThumbnail, []);
    // ASSERT
    expect(result).toStrictEqual(mockedEntities);
  });

  it('should return the original entities are with a valid placeholder', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntities, mockedVariables);
    // ASSERT
    expect(result).toEqual(result);
  });

  it('should return the original entities are with a valid placeholder in relations', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder(
      mockedEntitiesWithIncompleteThumbnailInRelations,
      mockedVariables
    );
    // ASSERT
    expect(result).toEqual(result);
  });

  it('should return the original entities are with a valid placeholder in parts field', () => {
    // ACT
    const result = enrichEntitiesWithThumbnailPlaceholder(
      mockedEntitiesWithIncompleteThumbnailInPartsField,
      mockedVariables
    );
    // ASSERT
    expect(result).toEqual(result);
  });
});

describe('enrichDistributionEntitiesWithLinkRules function', () => {
  it('should return original entities if no entities are provided', async () => {
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules([]);
    // ASSERT
    expect(result).toEqual([]);
  });

  it('should return original entities if no link rules are found', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
      },
      {
        id: '2',
        type: ForgeEntityType.story,
        _translationId: '2',
        _entityId: '2',
        selfUrl: 'https://example.com/entities/2',
        slug: 'entity-2',
        title: 'Entity 2',
        headline: 'Headline 2',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-2',
        lastUpdatedBy: 'user-2',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
      },
    ];
    (getLinkRules as jest.Mock).mockResolvedValueOnce({ data: [] });
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules(mockEntities);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should enrich entities with link rules if link rules are found', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'old-url',
      },
      {
        id: '2',
        type: ForgeEntityType.story,
        _translationId: '2',
        _entityId: '2',
        selfUrl: 'https://example.com/entities/2',
        slug: 'entity-2',
        title: 'Entity 2',
        headline: 'Headline 2',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-2',
        lastUpdatedBy: 'user-2',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'old-url',
      },
    ];
    const mockLinkRules = [
      { id: '1-story', url: 'new-url-1' },
      { id: '2-story', url: 'new-url-2' },
    ];
    (getLinkRules as jest.Mock).mockResolvedValueOnce({ data: mockLinkRules });
    const expectedResult = [
      { ...mockEntities[0], url: 'new-url-1' },
      { ...mockEntities[1], url: 'new-url-2' },
    ];
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules(mockEntities);
    // ASSERT
    expect(result).toEqual(expectedResult);
  });

  it('should not enrich entities if link rules do not match entity ids', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'old-url',
      },
      {
        id: '2',
        type: ForgeEntityType.story,
        _translationId: '2',
        _entityId: '2',
        selfUrl: 'https://example.com/entities/2',
        slug: 'entity-2',
        title: 'Entity 2',
        headline: 'Headline 2',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-2',
        lastUpdatedBy: 'user-2',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'old-url',
      },
    ];
    const mockLinkRules = [
      { id: '3', url: 'new-url-1' },
      { id: '4', url: 'new-url-2' },
    ];
    (getLinkRules as jest.Mock).mockResolvedValueOnce({ data: mockLinkRules });
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules(mockEntities);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should update entity URLs based on link rules and environment variables for local test with default value', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
      {
        id: '2',
        type: ForgeEntityType.story,
        _translationId: '2',
        _entityId: '2',
        selfUrl: 'https://example.com/entities/2',
        slug: 'entity-2',
        title: 'Entity 2',
        headline: 'Headline 2',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-2',
        lastUpdatedBy: 'user-2',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const mockLinkRules = [
      { id: '1-story', url: 'https://new-url-1/entities/entity-1' },
      { id: '2-story', url: 'https://new-url-2/entities/entity-2' },
    ];
    process.env.KEEP_LINK_RULES_LOCAL = 'true';
    (getLinkRules as jest.Mock).mockResolvedValueOnce({ data: mockLinkRules });
    const expectedResult = [
      { ...mockEntities[0], url: 'http://localhost:3000/entities/entity-1' },
      { ...mockEntities[1], url: 'http://localhost:3000/entities/entity-2' },
    ];
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules(mockEntities);
    // ASSERT
    expect(result).toEqual(expectedResult);
    process.env.KEEP_LINK_RULES_LOCAL = 'false';
  });

  it('should update entity URLs based on link rules and environment variables for local test', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
      {
        id: '2',
        type: ForgeEntityType.story,
        _translationId: '2',
        _entityId: '2',
        selfUrl: 'https://example.com/entities/2',
        slug: 'entity-2',
        title: 'Entity 2',
        headline: 'Headline 2',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-2',
        lastUpdatedBy: 'user-2',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const mockLinkRules = [
      { id: '1-story', url: 'https://new-url-1/entities/entity-1' },
      { id: '2-story', url: 'https://new-url-2/entities/entity-2' },
    ];
    process.env.KEEP_LINK_RULES_LOCAL = 'true';
    process.env.LINK_RULES_LOCAL_HOSTNAME = 'localhost';
    process.env.LINK_RULES_LOCAL_PORT = '3000';
    process.env.LINK_RULES_LOCAL_PROTOCOL = 'http';
    (getLinkRules as jest.Mock).mockResolvedValueOnce({ data: mockLinkRules });
    const expectedResult = [
      { ...mockEntities[0], url: 'http://localhost:3000/entities/entity-1' },
      { ...mockEntities[1], url: 'http://localhost:3000/entities/entity-2' },
    ];
    // ACT
    const result = await enrichDistributionEntitiesWithLinkRules(mockEntities);
    // ASSERT
    expect(result).toEqual(expectedResult);
    process.env.KEEP_LINK_RULES_LOCAL = 'false';
  });

  it('should add link rules for relations and parts if withRelationsAndParts is true', () => {
    // ARRANGE
    const mockEntity: DistributionEntity = {
      id: '1',
      type: ForgeEntityType.story,
      _translationId: '1',
      _entityId: '1',
      selfUrl: 'https://example.com/entities/1',
      slug: 'entity-1',
      title: 'Entity 1',
      headline: 'Headline 1',
      tags: [],
      relations: [
        {
          id: '2',
          type: ForgeEntityType.story,
          _translationId: '2',
          _entityId: '2',
          selfUrl: 'https://example.com/entities/2',
          slug: 'entity-2',
          title: 'Entity 2',
          headline: 'Headline 2',
          tags: [],
          relations: [],
          references: {},
          fields: {},
          createdBy: 'user-2',
          lastUpdatedBy: 'user-2',
          lastUpdatedDate: '2023-05-24',
          contentDate: '2023-05-24',
          context: null,
          featured: 0,
          thumbnail: null,
          parts: [],
        },
      ],
      references: {},
      fields: {},
      createdBy: 'user-1',
      lastUpdatedBy: 'user-1',
      lastUpdatedDate: '2023-05-24',
      contentDate: '2023-05-24',
      context: null,
      featured: 0,
      thumbnail: null,
      parts: [
        {
          id: '1',
          thumbnail: null,
          content: '',
          inputUrl: '',
          externalType: ForgeExternalEntityType.storyPartPhoto,
          entityCode: ForgeEntityCode.photo,
          type: ForgeEntityType.photo,
          url: '',
          image: fallbackImageAssetWithoutTemplateUrl,
          description: '',
          elements: null,
          fields: {},
        },
      ] as StoryPart[],
    };
    const mockLinkRuleVariations: LinkRuleVariation[] = [
      { type: LinkRuleVariationType.fields, key: 'key1', value: 'value1' },
      { type: LinkRuleVariationType.root, key: 'key2', value: 'value2' },
    ];

    // ACT
    const linkRulesRequest = buildLinkRulesRequest([mockEntity], true, mockLinkRuleVariations);

    // ASSERT
    expect(linkRulesRequest).toHaveLength(3);
    expect(linkRulesRequest[0].id).toEqual('1-story');
    expect(linkRulesRequest[1].id).toEqual('2-story');
    expect(linkRulesRequest[2].id).toEqual('1-photo-photo');
  });

  it('should add link rules for relations and parts if withRelationsAndParts is true and check all internal method if the arrays is empty', () => {
    // ARRANGE
    const mockEntity: DistributionEntity = {
      id: '1',
      type: ForgeEntityType.story,
      _translationId: '1',
      _entityId: '1',
      selfUrl: 'https://example.com/entities/1',
      slug: 'entity-1',
      title: 'Entity 1',
      headline: 'Headline 1',
      tags: [],
      references: {},
      fields: {},
      createdBy: 'user-1',
      lastUpdatedBy: 'user-1',
      lastUpdatedDate: '2023-05-24',
      contentDate: '2023-05-24',
      context: null,
      featured: 0,
      thumbnail: null,
      parts: undefined as any,
    };
    const mockLinkRuleVariations: LinkRuleVariation[] = [
      { type: LinkRuleVariationType.fields, key: 'key1', value: 'value1' },
      { type: LinkRuleVariationType.root, key: 'key2', value: 'value2' },
    ];

    // ACT
    const linkRulesRequest = buildLinkRulesRequest([mockEntity], true, mockLinkRuleVariations);

    // ASSERT
    expect(linkRulesRequest).toHaveLength(1);
    expect(linkRulesRequest[0].id).toEqual('1-story');
  });
});

describe('updateEntityURLs function', () => {
  it('should return original entities if no link rules are found', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const linkRules: LinkRuleResponse = { data: [], meta: { version: '1' } };
    // ACT
    const result = updateEntityURLs(mockEntities, linkRules);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should update entity URLs based on link rules', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const linkRules: LinkRuleResponse = {
      data: [{ id: '1-story', url: 'https://new-url-1', success: true }],
      meta: { version: '1' },
    };
    const expectedResult = [{ ...mockEntities[0], url: 'https://new-url-1' }];
    // ACT
    const result = updateEntityURLs(mockEntities, linkRules);
    // ASSERT
    expect(result).toEqual(expectedResult);
  });

  it('should not update entity URLs if link rules do not match entity ids', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const linkRules: LinkRuleResponse = {
      data: [{ id: '3', url: 'https://new-url-1', success: true }],
      meta: { version: '1' },
    };
    // ACT
    const result = updateEntityURLs(mockEntities, linkRules);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should update URLs of entity relations based on link rules', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [
          {
            id: '2',
            type: ForgeEntityType.story,
            _translationId: '2',
            _entityId: '2',
            selfUrl: 'https://example.com/entities/2',
            slug: 'entity-2',
            title: 'Entity 2',
            headline: 'Headline 2',
            tags: [],
            relations: [],
            references: {},
            fields: {},
            createdBy: 'user-2',
            lastUpdatedBy: 'user-2',
            lastUpdatedDate: '2023-05-24',
            contentDate: '2023-05-24',
            context: null,
            featured: 0,
            thumbnail: null,
            parts: [],
            url: 'https://old-url',
          },
        ],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'https://old-url',
      },
    ];
    const linkRules: LinkRuleResponse = {
      data: [
        { id: '1-story', url: 'https://new-url-1', success: true },
        { id: '2-story', url: 'https://new-url-2', success: true },
      ],
      meta: { version: '1' },
    };
    let expectedResult: DistributionEntity[] = [];
    if (mockEntities[0].relations && mockEntities[0].relations[0]) {
      expectedResult = [
        {
          ...mockEntities[0],
          url: 'https://new-url-1',
          relations: [
            {
              ...mockEntities[0].relations[0],
              url: 'https://new-url-2',
            },
          ],
        },
      ];
    }
    // ACT
    const result = updateEntityURLs(mockEntities, linkRules);
    // ASSERT
    expect(result).toEqual(expectedResult);
  });

  it('should update URLs of entity parts based on link rules', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [
          {
            id: '1',
            thumbnail: null,
            content: '',
            inputUrl: '',
            externalType: ForgeExternalEntityType.storyPartPhoto,
            entityCode: ForgeEntityCode.photo,
            type: ForgeEntityType.photo,
            url: 'https://old-url',
            image: fallbackImageAssetWithoutTemplateUrl,
            description: '',
            elements: null,
            fields: {},
          },
        ] as StoryPart[],
        url: 'https://old-url',
      },
    ];
    const linkRules: LinkRuleResponse = {
      data: [
        { id: '1-story', url: 'https://new-url-1', success: true },
        { id: '1-photo-photo', url: 'https://new-url-2', success: true },
      ],
      meta: { version: '1' },
    };
    let expectedResult: DistributionEntity[] = [];
    if (mockEntities[0].parts && mockEntities[0].parts[0]) {
      expectedResult = [
        {
          ...mockEntities[0],
          url: 'https://new-url-1',
          parts: [
            {
              ...mockEntities[0].parts[0],
              url: 'https://new-url-2',
            },
          ],
        },
      ];
    }
    // ACT
    const result = updateEntityURLs(mockEntities, linkRules);
    // ASSERT
    expect(result).toEqual(expectedResult);
  });

  it('should log an error when an invalid URL is provided', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
        url: 'invalid-url',
      },
    ];
    const linkRules: LinkRuleResponse = {
      data: [{ id: '1-story', url: 'invalid-url', success: true }],
      meta: { version: '1' },
    };

    process.env.KEEP_LINK_RULES_LOCAL = 'true';

    // ACT
    updateEntityURLs(mockEntities, linkRules);

    // ASSERT
    expect(mockLogger).toHaveBeenLastCalledWith(
      expect.stringContaining('Error updating link rule URL'),
      LoggerLevel.error
    );

    process.env.KEEP_LINK_RULES_LOCAL = 'false';
  });
});

describe('enrichDistributionEntities function', () => {
  it('should return original entities if no options are provided', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
      },
    ];
    // ACT
    const result = await enrichDistributionEntities(mockEntities);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should enrich entities with references fields if option is set', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
      },
    ];
    const options: ForgeDistributionApiOption = {
      hasReferencesFieldsInList: true,
      hasGadAssetsFields: true,
      hasThumbnailPlaceholder: true,
      hasLinkRulesForRelationsAndParts: true,
      linkRuleVariations: [],
    };
    // ACT
    const result = await enrichDistributionEntities(mockEntities, options);
    // ASSERT
    expect(result).not.toBeNull();
  });

  it('should enrich entities with references fields if option is set', async () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      {
        id: '1',
        type: ForgeEntityType.story,
        _translationId: '1',
        _entityId: '1',
        selfUrl: 'https://example.com/entities/1',
        slug: 'entity-1',
        title: 'Entity 1',
        headline: 'Headline 1',
        tags: [],
        relations: [],
        references: {},
        fields: {},
        createdBy: 'user-1',
        lastUpdatedBy: 'user-1',
        lastUpdatedDate: '2023-05-24',
        contentDate: '2023-05-24',
        context: null,
        featured: 0,
        thumbnail: null,
        parts: [],
      },
    ];
    const options: ForgeDistributionApiOption = {
      hasReferencesFieldsInList: true,
      hasGadAssetsFields: true,
      hasThumbnailPlaceholder: true,
      hasLinkRules: true,
      linkRuleVariations: [],
    };
    // ACT
    const result = await enrichDistributionEntities(mockEntities, options);
    // ASSERT
    expect(result).not.toBeNull();
  });
});

describe('getSortParams function', () => {
  it('should return undefined if no sort options are provided', () => {
    // ACT
    const result = getSortParams();
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return sort parameter for property if sort prop is provided', () => {
    // ARRANGE
    const sort: SortOptions = { prop: 'contentDate', order: SortOrder.ASC };
    // ACT
    const result = getSortParams(sort);
    // ASSERT
    expect(result).toEqual('$sort=contentDate:asc');
  });

  it('should return sort parameter for field if sort field is provided', () => {
    // ARRANGE
    const sort: SortOptions = { field: 'scheduledStartTime', order: SortOrder.ASC };
    // ACT
    const result = getSortParams(sort);
    // ASSERT
    expect(result).toEqual('$sort=fields.scheduledStartTime:asc');
  });

  it('should return sort parameter without order if order is not provided', () => {
    // ARRANGE
    const sort: SortOptions = { prop: 'contentDate' };
    // ACT
    const result = getSortParams(sort);
    // ASSERT
    expect(result).toEqual('$sort=contentDate');
  });
});

describe('getTagsParam function', () => {
  it('should return undefined if no tags are provided', () => {
    // ACT
    const result = getTagsParam();
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return undefined if empty string is provided', () => {
    // ACT
    const result = getTagsParam('');
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return single tag parameter if single tag is provided', () => {
    // ACT
    const result = getTagsParam('tag1');
    // ASSERT
    expect(result).toEqual(['tags.slug=tag1']);
  });

  it('should return multiple tag parameters if multiple tags are provided', () => {
    // ACT
    const result = getTagsParam('tag1,tag2');
    // ASSERT
    expect(result).toEqual(['tags.slug=tag1', 'tags.slug=tag2']);
  });
});

describe('getQueryString function', () => {
  it('should return query string with skip and limit parameters', () => {
    // ACT
    const result = getQueryString({ skip: 10, limit: 20, tags: '', page: 1 });
    // ASSERT
    expect(result).toEqual('$skip=10&$limit=20&$sort=contentDate');
  });

  it('should return query string with tags parameters', () => {
    // ACT
    const result = getQueryString({ skip: 0, limit: 0, tags: 'tag1,tag2', page: 1 });
    // ASSERT
    expect(result).toEqual('tags.slug=tag1&tags.slug=tag2&$sort=contentDate');
  });

  it('should return query string with context parameter', () => {
    // ACT
    const result = getQueryString({ skip: 0, limit: 0, tags: '', page: 1, context: 'context1' });
    // ASSERT
    expect(result).toEqual('context.slug=context1&$sort=contentDate');
  });

  it('should return query string with fields parameter', () => {
    // ACT
    const result = getQueryString({ skip: 0, limit: 0, tags: '', page: 1, context: '', fields: { field1: 'value1' } });
    // ASSERT
    expect(result).toEqual('fields.field1=value1&$sort=contentDate');
  });

  it('should return query string with extraData parameter', () => {
    // ACT
    const result = getQueryString({
      skip: 0,
      limit: 0,
      tags: '',
      page: 1,
      context: '',
      fields: undefined,
      extraData: { extraData1: 'value1' },
    });
    // ASSERT
    expect(result).toEqual('tags.extraData.extraData1=value1&$sort=contentDate');
  });

  it('should return query string with sort parameter', () => {
    // ACT
    const result = getQueryString({
      skip: 0,
      limit: 0,
      tags: '',
      page: 1,
      context: '',
      fields: undefined,
      extraData: undefined,
      sort: { prop: 'prop1', order: SortOrder.ASC },
    });
    // ASSERT
    expect(result).toEqual('$sort=prop1:asc');
  });

  it('should return query string with range parameter', () => {
    // ACT
    const result = getQueryString({
      skip: 0,
      limit: 0,
      tags: '',
      page: 1,
      context: '',
      fields: undefined,
      extraData: undefined,
      sort: undefined,
      range: {
        field: 'field1',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      },
    });
    // ASSERT
    expect(result).toEqual('$sort=contentDate&field1=$range(2023-01-01,2023-12-31)');
  });

  it('should return query string with listAvailability parameter', () => {
    // ACT
    const result = getQueryString({
      skip: 0,
      limit: 0,
      tags: '',
      page: 1,
      context: '',
      fields: undefined,
      extraData: undefined,
      sort: undefined,
      range: undefined,
      listAvailability: ListAvailabilityOption.public,
    });
    // ASSERT
    expect(result).toEqual('$sort=contentDate&_listAvailability=0');
  });

  it('should return query string without limit if is undefined', () => {
    // ACT
    const result = getQueryString({
      skip: 0,
      limit: undefined,
      page: 2,
    });
    // ASSERT
    expect(result).toEqual('$sort=contentDate');
  });

  it('should return query string with all parameters', () => {
    // ACT
    const result = getQueryString({
      skip: 10,
      limit: 20,
      tags: 'tag1,tag2',
      page: 2,
      context: 'context1',
      fields: { field1: 'value1' },
      extraData: { extraData1: 'value1' },
      sort: {
        prop: 'prop1',
        order: SortOrder.ASC,
      },
      range: { field: 'field1', startDate: '2023-01-01', endDate: '2023-12-31' },
      listAvailability: ListAvailabilityOption.public,
    });
    // ASSERT
    expect(result).toEqual(
      '$skip=20&$limit=20&tags.slug=tag1&tags.slug=tag2&context.slug=context1&fields.field1=value1&tags.extraData.extraData1=value1&$sort=prop1:asc&field1=$range(2023-01-01,2023-12-31)&_listAvailability=0'
    );
  });
});

describe('getFilteredItems function', () => {
  // ARRANGE
  const getFilteredItemsMocks = [
    {
      id: '1',
      type: ForgeEntityType.story,
      _translationId: '1',
      _entityId: '1',
      selfUrl: 'https://example.com/entities/1',
      slug: 'entity-1',
      title: 'Entity 1',
      headline: 'Headline 1',
      tags: [],
      relations: [],
      references: {},
      fields: {},
      createdBy: 'user-1',
      lastUpdatedBy: 'user-1',
      lastUpdatedDate: '2023-05-24',
      contentDate: '2023-05-24',
      context: null,
      featured: 0,
      thumbnail: null,
      parts: [],
    },
    {
      id: '2',
      type: ForgeEntityType.story,
      _translationId: '2',
      _entityId: '2',
      selfUrl: 'https://example.com/entities/2',
      slug: 'entity-2',
      title: 'Entity 2',
      headline: 'Headline 2',
      tags: [],
      relations: [],
      references: {},
      fields: {},
      createdBy: 'user-2',
      lastUpdatedBy: 'user-2',
      lastUpdatedDate: '2023-05-24',
      contentDate: '2023-05-24',
      context: null,
      featured: 0,
      thumbnail: null,
      parts: [],
    },
    {
      id: '3',
      type: ForgeEntityType.story,
      _translationId: '3',
      _entityId: '3',
      selfUrl: 'https://example.com/entities/3',
      slug: 'entity-3',
      title: 'Entity 3',
      headline: 'Headline 3',
      tags: [],
      relations: [],
      references: {},
      fields: {},
      createdBy: 'user-3',
      lastUpdatedBy: 'user-3',
      lastUpdatedDate: '2023-05-24',
      contentDate: '2023-05-24',
      context: null,
      featured: 0,
      thumbnail: null,
      parts: [],
    },
  ];
  it('should return empty array if no items are provided', () => {
    // ACT
    const result = getFilteredItems(null, 0, 0);
    // ASSERT
    expect(result).toEqual([]);
  });

  it('should return all items if skip and limit are zero', () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [getFilteredItemsMocks[0], getFilteredItemsMocks[1]];
    // ACT
    const result = getFilteredItems(mockEntities, 0, 0);
    // ASSERT
    expect(result).toEqual(mockEntities);
  });

  it('should return items starting from skip index', () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      getFilteredItemsMocks[0],
      getFilteredItemsMocks[1],
      getFilteredItemsMocks[2],
    ];
    // ACT
    const result = getFilteredItems(mockEntities, 1, 0);
    // ASSERT
    expect(result).toEqual([]);
  });

  it('should return items up to limit count', () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      getFilteredItemsMocks[0],
      getFilteredItemsMocks[1],
      getFilteredItemsMocks[2],
    ];
    // ACT
    const result = getFilteredItems(mockEntities, 0, 2);
    // ASSERT
    expect(result).toEqual([getFilteredItemsMocks[0], getFilteredItemsMocks[1]]);
  });

  it('should return items from skip index up to limit count', () => {
    // ARRANGE
    const mockEntities: DistributionEntity[] = [
      getFilteredItemsMocks[0],
      getFilteredItemsMocks[1],
      getFilteredItemsMocks[2],
    ];
    // ACT
    const result = getFilteredItems(mockEntities, 1, 1);
    // ASSERT
    expect(result).toEqual([getFilteredItemsMocks[1]]);
  });
});

describe('getEntityType function', () => {
  it('should return entity code if it exists', () => {
    // ARRANGE
    const entity: DistributionEntity = { entityCode: ForgeEntityCode.story, type: ForgeEntityType.story } as any;
    // ACT
    const result = getEntityType(entity);
    // ASSERT
    expect(result).toEqual('story');
  });

  it('should return entity type if entity code does not exist', () => {
    // ARRANGE
    const entity: DistributionEntity = { type: ForgeEntityType.photo } as any;
    // ACT
    const result = getEntityType(entity);
    // ASSERT
    expect(result).toEqual('photo');
  });

  it('should return empty string if neither entity code nor type exist', () => {
    // ARRANGE
    const entity: DistributionEntity = {} as any;
    // ACT
    const result = getEntityType(entity);
    // ASSERT
    expect(result).toEqual('');
  });
});

describe('getAPIQueryString function', () => {
  it('should return query string with default parameters if no options are provided', () => {
    // ACT
    const result = getAPIQueryString({});
    // ASSERT
    expect(result).toEqual('?$sort=contentDate');
  });

  it('should return query string with provided skip and limit parameters', () => {
    const options: ForgeDistributionApiOption = { skip: 10, limit: 20 };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?$skip=10&$limit=20&$sort=contentDate');
  });

  it('should return query string with tags parameters', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { tags: 'tag1,tag2' };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?tags.slug=tag1&tags.slug=tag2&$sort=contentDate');
  });

  it('should return query string with context parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { context: 'context1' };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?context.slug=context1&$sort=contentDate');
  });

  it('should return query string with fields parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { fields: { field1: 'value1' } };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?fields.field1=value1&$sort=contentDate');
  });

  it('should return query string with extraData parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { extraData: { extraData1: 'value1' } };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?tags.extraData.extraData1=value1&$sort=contentDate');
  });

  it('should return query string with sort parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { sort: { prop: 'prop1', order: SortOrder.ASC } };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?$sort=prop1:asc');
  });

  it('should return query string with range parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = {
      range: { field: 'field1', startDate: '2023-01-01', endDate: '2023-12-31' },
    };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?$sort=contentDate&field1=$range(2023-01-01,2023-12-31)');
  });

  it('should return query string with listAvailability parameter', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = { listAvailability: ListAvailabilityOption.public };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('?$sort=contentDate&_listAvailability=0');
  });

  it('should return query string with all parameters', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = {
      skip: 10,
      limit: 20,
      tags: 'tag1,tag2',
      context: 'context1',
      fields: { field1: 'value1' },
      extraData: { extraData1: 'value1' },
      sort: { prop: 'prop1', order: SortOrder.ASC },
      range: { field: 'field1', startDate: '2023-01-01', endDate: '2023-12-31' },
      listAvailability: ListAvailabilityOption.public,
    };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual(
      '?$skip=10&$limit=20&tags.slug=tag1&tags.slug=tag2&context.slug=context1&fields.field1=value1&tags.extraData.extraData1=value1&$sort=prop1:asc&field1=$range(2023-01-01,2023-12-31)&_listAvailability=0'
    );
  });

  it('should return empty string if options is undefined', () => {
    // ARRANGE
    const options: ForgeDistributionApiOption = {
      sort: { prop: undefined },
      extraData: undefined,
    };
    // ACT
    const result = getAPIQueryString(options);
    // ASSERT
    expect(result).toEqual('');
  });
});

describe('getRangeParams function', () => {
  it('should return undefined if no range is provided', () => {
    // ACT
    const result = getRangeParams();
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return undefined if range does not have a start date and an end date', () => {
    // ARRANGE
    const range: RangeOption = { field: 'field1' };
    // ACT
    const result = getRangeParams(range);
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return range parameter if range has a start date and an end date', () => {
    // ARRANGE
    const range: RangeOption = { field: 'field1', startDate: '2023-01-01', endDate: '2023-12-31' };
    // ACT
    const result = getRangeParams(range);
    // ASSERT
    expect(result).toEqual('field1=$range(2023-01-01,2023-12-31)');
  });

  it('should return range parameter with empty start date if range does not have a start date', () => {
    // ARRANGE
    const range: RangeOption = { field: 'field1', endDate: '2023-12-31' };
    // ACT
    const result = getRangeParams(range);
    // ASSERT
    expect(result).toEqual('field1=$range(,2023-12-31)');
  });

  it('should return range parameter with empty end date if range does not have an end date', () => {
    // ARRANGE
    const range: RangeOption = { field: 'field1', startDate: '2023-01-01' };
    // ACT
    const result = getRangeParams(range);
    // ASSERT
    expect(result).toEqual('field1=$range(2023-01-01,)');
  });
});

describe('createLinkRuleId function', () => {
  it('should return id, type and entityCode if entityCode exists', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '1', type: 'story', entityCode: 'code1' } as any;
    // ACT
    const result = createLinkRuleId(entity);
    // ASSERT
    expect(result).toEqual('1-story-code1');
  });

  it('should return _entityId, type and entityCode if id does not exist but entityCode does', () => {
    // ARRANGE
    const entity: DistributionEntity = { _entityId: '2', type: 'story', entityCode: 'code2' } as any;
    // ACT
    const result = createLinkRuleId(entity);
    // ASSERT
    expect(result).toEqual('2-story-code2');
  });

  it('should return id and type if entityCode does not exist', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '3', type: 'story' } as any;
    // ACT
    const result = createLinkRuleId(entity);
    // ASSERT
    expect(result).toEqual('3-story');
  });

  it('should return _entityId and type if neither id nor entityCode exist', () => {
    // ARRANGE
    const entity: DistributionEntity = { _entityId: '4', type: 'story' } as any;
    // ACT
    const result = createLinkRuleId(entity);
    // ASSERT
    expect(result).toEqual('4-story');
  });
});

describe('getContextParam function', () => {
  it('should return undefined if no context is provided', () => {
    // ACT
    const result = getContextParam();
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return context parameter if context is provided', () => {
    // ACT
    const result = getContextParam('context1');
    // ASSERT
    expect(result).toEqual('context.slug=context1');
  });
});

describe('getGenericParams function', () => {
  it('should return undefined if no extra data is provided', () => {
    // ACT
    const result = getGenericParams('fields');
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return undefined if no generic key is provided', () => {
    // ACT
    const result = getGenericParams('', { field1: 'value1' });
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return generic parameters if extra data is provided', () => {
    // ACT
    const result = getGenericParams('fields', { field1: 'value1' });
    // ASSERT
    expect(result).toEqual(['fields.field1=value1']);
  });

  it('should return multiple generic parameters if multiple extra data are provided', () => {
    // ACT
    const result = getGenericParams('fields', { field1: 'value1', field2: 'value2' });
    // ASSERT
    expect(result).toEqual(['fields.field1=value1', 'fields.field2=value2']);
  });
});

describe('getListAvailabilityParams function', () => {
  it('should return undefined if no list availability is provided', () => {
    // ACT
    const result = getListAvailabilityParams();
    // ASSERT
    expect(result).toBeUndefined();
  });

  it('should return list availability parameter if list availability is provided', () => {
    // ACT
    const result = getListAvailabilityParams(ListAvailabilityOption.public);
    // ASSERT
    expect(result).toEqual('_listAvailability=0');
  });
});

describe('updateEntityURL function', () => {
  it('should update entity URL based on link rule', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '1', type: 'story', url: 'https://old-url' } as any;
    const linkRules: LinkRuleResponse = {
      data: [{ id: '1-story', url: 'https://new-url', success: true }],
      meta: { version: '1' },
    };
    // ACT
    updateEntityURL(entity, linkRules);
    // ASSERT
    expect(entity.url).toEqual('https://new-url');
  });

  it('should not update entity URL if no matching link rule is found', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '1', type: 'story', url: 'https://old-url' } as any;
    const linkRules: LinkRuleResponse = {
      data: [{ id: '2-story', url: 'https://new-url', success: true }],
      meta: { version: '1' },
    };
    // ACT
    updateEntityURL(entity, linkRules);
    // ASSERT
    expect(entity.url).toEqual('https://old-url');
  });

  it('should update entity URL based on environment variables if KEEP_LINK_RULES_LOCAL is true', () => {
    // ARRANGE
    process.env.KEEP_LINK_RULES_LOCAL = 'true';
    process.env.LINK_RULES_LOCAL_HOSTNAME = 'localhost';
    process.env.LINK_RULES_LOCAL_PORT = '3000';
    process.env.LINK_RULES_LOCAL_PROTOCOL = 'http';
    const entity: DistributionEntity = { id: '1', type: 'story', url: 'https://old-url' } as any;
    const linkRules: LinkRuleResponse = {
      data: [{ id: '1-story', url: 'https://new-url', success: true }],
      meta: { version: '1' },
    };
    // ACT
    updateEntityURL(entity, linkRules);
    // ASSERT
    expect(entity.url).toEqual('http://localhost:3000/');
    process.env.KEEP_LINK_RULES_LOCAL = 'false';
  });

  it('should not update entity URL if it is #nolink', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '1', type: 'story', url: '#nolink' } as any;
    const linkRules: LinkRuleResponse = {
      data: [{ id: '1-story', url: '#nolink', success: true }],
      meta: { version: '1' },
    };
    // ACT
    updateEntityURL(entity, linkRules);
    // ASSERT
    expect(entity.url).toEqual('#nolink');
  });
});

describe('addLinkRulesForEntities function', () => {
  it('should not add any link rule requests if entities are undefined', () => {
    // ARRANGE
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRulesForEntities(undefined, linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toEqual([]);
  });

  it('should not add any link rule requests if entities are empty', () => {
    // ARRANGE
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRulesForEntities([], linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toEqual([]);
  });

  it('should add link rule requests for each entity', () => {
    // ARRANGE
    const entities: DistributionEntity[] = [
      { id: '1', type: 'story', entityCode: 'code1' } as any,
      { id: '2', type: 'photo', entityCode: 'code2' } as any,
    ];
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRulesForEntities(entities, linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toHaveLength(2);
    expect(linkRulesRequest[0].id).toEqual('1-story-code1');
    expect(linkRulesRequest[1].id).toEqual('2-photo-code2');
  });
});

describe('addLinkRuleRequest function', () => {
  it('should add a link rule request for the given entity', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '1', type: 'story', entityCode: 'story' } as any;
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRuleRequest(entity, linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toHaveLength(1);
    expect(linkRulesRequest[0].id).toEqual('1-story-story');
    expect(linkRulesRequest[0].entity).toEqual(entity);
    expect(linkRulesRequest[0].entityType).toEqual('story');
  });

  it('should add a link rule request with entity type if entity code does not exist', () => {
    // ARRANGE
    const entity: DistributionEntity = { id: '2', type: 'photo' } as any;
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRuleRequest(entity, linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toHaveLength(1);
    expect(linkRulesRequest[0].id).toEqual('2-photo');
    expect(linkRulesRequest[0].entity).toEqual(entity);
    expect(linkRulesRequest[0].entityType).toEqual('photo');
  });

  it('should add a link rule request with empty id if neither id nor entity code exist', () => {
    // ARRANGE
    const entity: DistributionEntity = { type: 'photo', _entityId: '1' } as any;
    const linkRulesRequest: LinkRuleRequest[] = [];
    // ACT
    addLinkRuleRequest(entity, linkRulesRequest);
    // ASSERT
    expect(linkRulesRequest).toHaveLength(1);
    expect(linkRulesRequest[0].id).toEqual('1-photo');
    expect(linkRulesRequest[0].entity).toEqual(entity);
    expect(linkRulesRequest[0].entityType).toEqual('photo');
  });
});

describe('enrichLinkRuleRequestEntity function', () => {
  it('should enrich entities with link rule variations', () => {
    // ARRANGE
    const entities: DistributionEntity[] = [
      { id: '1', type: 'story', fields: {} } as any,
      { id: '2', type: 'photo', fields: {} } as any,
    ];
    const linkRuleVariations: LinkRuleVariation[] = [
      { type: LinkRuleVariationType.fields, key: 'key1', value: 'value1' },
      { type: LinkRuleVariationType.root, key: 'key2', value: 'value2' },
    ];

    // ACT
    enrichLinkRuleRequestEntity(entities, linkRuleVariations);

    // ASSERT
    expect(entities[0].fields?.key1).toEqual('value1');
    expect(entities[0].key2).toEqual('value2');
    expect(entities[1].fields?.key1).toEqual('value1');
    expect(entities[1].key2).toEqual('value2');
  });

  it('should not enrich entities if no link rule variations are provided', () => {
    // ARRANGE
    const entities: DistributionEntity[] = [
      { id: '1', type: 'story', fields: {} } as any,
      { id: '2', type: 'photo', fields: {} } as any,
    ];

    // ACT
    enrichLinkRuleRequestEntity(entities);

    // ASSERT
    expect(entities[0].fields).toEqual({});
    expect(entities[1].fields).toEqual({});
  });

  it('should not enrich entities if no entities are provided', () => {
    // ARRANGE
    const linkRuleVariations: LinkRuleVariation[] = [
      { type: LinkRuleVariationType.fields, key: 'key1', value: 'value1' },
      { type: LinkRuleVariationType.root, key: 'key2', value: 'value2' },
    ];

    // ACT
    enrichLinkRuleRequestEntity([], linkRuleVariations);

    // ASSERT
    // No entities to check for enrichment
  });

  it('should not enrich entity fields if entity does not have fields', () => {
    // ARRANGE
    const entities: DistributionEntity[] = [{ id: '1', type: 'story' } as any, { id: '2', type: 'photo' } as any];
    const linkRuleVariations: LinkRuleVariation[] = [
      { type: LinkRuleVariationType.fields, key: 'key1', value: 'value1' },
    ];

    // ACT
    enrichLinkRuleRequestEntity(entities, linkRuleVariations);

    // ASSERT
    expect(entities[0].fields).toBeUndefined();
    expect(entities[1].fields).toBeUndefined();
  });
});
