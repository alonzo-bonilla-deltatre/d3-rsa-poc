import { AzureSearchResult } from '@/models/types/azureSearch';
import { SearchIterator } from '@azure/search-documents';
import {
  calculateSkip,
  createFilter,
  enrichSearchResultsWithDistributionEntities,
  groupSearchResultsByEntityType,
  processDocuments,
  processFacets,
  processKeyPagesDocuments,
} from '@/helpers/azureCognitiveSearchHelper';
import {
  enrichDistributionEntitiesWithLinkRules,
  enrichEntitiesWithThumbnailPlaceholder,
} from '@/helpers/forgeDistributionEntityHelper';
import { Variable } from '@/models/types/pageStructure';
import { ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';

jest.mock('@/helpers/forgeDistributionEntityHelper', () => ({
  enrichDistributionEntitiesWithLinkRules: jest.fn(),
  enrichEntitiesWithThumbnailPlaceholder: jest.fn(),
}));

describe('groupSearchResultsByEntityType', () => {
  it('should not alter original array if results does not contain any video type', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 5,
      forgeEntities: {
        count: 3,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityCode.photo,
          },
          {
            count: 1,
            documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }],
            type: ForgeEntityCode.album,
          },
        ],
      },
      keyPages: {
        count: 2,
        items: [
          {
            Id: 'test-id-1',
            Title: 'Test Title 1',
            Summary: 'Test Summary 1',
            Image: 'https://test.url.com/test-image-path-1',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 1',
            Original_Meta_Summary: 'Test Meta Summary 1',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-1'],
          },
          {
            Id: 'test-id-2',
            Title: 'Test Title 2',
            Summary: 'Test Summary 2',
            Image: 'https://test.url.com/test-image-path-2',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 2',
            Original_Meta_Summary: 'Test Meta Summary 2',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-2', 'test-tag-3'],
          },
        ],
      },
    };

    // ACT
    groupSearchResultsByEntityType(azureSearchResult);

    // ASSERT
    expect(azureSearchResult.forgeEntities.items.length).toBe(2);
    expect(azureSearchResult.forgeEntities.items[0].type).toBe(ForgeEntityCode.photo);
    expect(azureSearchResult.forgeEntities.items[1].type).toBe(ForgeEntityCode.album);
  });

  it('should alter original array if results contain video types but documents are empty', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 6,
      forgeEntities: {
        count: 4,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityCode.photo,
          },
          { count: 1, documents: [], type: 'brightcovevideo' },
          {
            count: 1,
            documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }],
            type: ForgeEntityCode.album,
          },
        ],
      },
      keyPages: {
        count: 2,
        items: [
          {
            Id: 'test-id-1',
            Title: 'Test Title 1',
            Summary: 'Test Summary 1',
            Image: 'https://test.url.com/test-image-path-1',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 1',
            Original_Meta_Summary: 'Test Meta Summary 1',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-1'],
          },
          {
            Id: 'test-id-2',
            Title: 'Test Title 2',
            Summary: 'Test Summary 2',
            Image: 'https://test.url.com/test-image-path-2',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 2',
            Original_Meta_Summary: 'Test Meta Summary 2',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-2', 'test-tag-3'],
          },
        ],
      },
    };

    // ACT
    groupSearchResultsByEntityType(azureSearchResult);

    // ASSERT
    expect(azureSearchResult.forgeEntities.items.length).toBe(3);
    expect(azureSearchResult.forgeEntities.items.some((item) => item.type === 'video')).toBeTruthy();
  });

  it('should add items to the "video" key if results contain the expected video types', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 9,
      forgeEntities: {
        count: 7,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityCode.photo,
          },
          {
            count: 2,
            documents: [
              { id: 'da2bced1-062f-47ac-aa12-5403a264d639', title: 'Brightcove Video 1' },
              { id: 'c89683fd-915b-4a11-bb0a-00a6699f10ae', title: 'Brightcove Video 2' },
            ],
            type: ForgeEntityCode.brightcoveVideo,
          },
          {
            count: 2,
            documents: [
              { id: 'e5e3fda7-f802-4188-87f1-ce7824ffc7b6', title: 'Youtubevideo Video 1' },
              { id: 'c2c8bb39-41ec-4d97-be89-c2b987be08af', title: 'Youtubevideo Video 2' },
            ],
            type: ForgeEntityCode.youTubeVideo,
          },
          {
            count: 1,
            documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }],
            type: ForgeEntityCode.album,
          },
        ],
      },
      keyPages: {
        count: 2,
        items: [
          {
            Id: 'test-id-1',
            Title: 'Test Title 1',
            Summary: 'Test Summary 1',
            Image: 'https://test.url.com/test-image-path-1',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 1',
            Original_Meta_Summary: 'Test Meta Summary 1',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-1'],
          },
          {
            Id: 'test-id-2',
            Title: 'Test Title 2',
            Summary: 'Test Summary 2',
            Image: 'https://test.url.com/test-image-path-2',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'Test Meta Title 2',
            Original_Meta_Summary: 'Test Meta Summary 2',
            LastIndex: '2022-01-01T00:00:00Z',
            Url: 'https://test.url.com/',
            Culture: 'en-GB',
            Tags: ['test-tag-2', 'test-tag-3'],
          },
        ],
      },
    };

    // ACT
    groupSearchResultsByEntityType(azureSearchResult);

    // ASSERT
    expect(azureSearchResult.forgeEntities.items.length).toBe(3);

    expect(azureSearchResult.forgeEntities.items.some((item) => item.type === 'video')).toBeTruthy();
    expect(azureSearchResult.forgeEntities.items.find((item) => item.type === 'video')?.count).toBe(4);

    expect(
      azureSearchResult.forgeEntities.items.some((item) => item.type === ForgeEntityCode.brightcoveVideo)
    ).toBeFalsy();
    expect(
      azureSearchResult.forgeEntities.items.some((item) => item.type === ForgeEntityCode.youTubeVideo)
    ).toBeFalsy();
  });
});

describe('createFilter', () => {
  it('should return an empty string if facetType or facetValue is not provided', () => {
    // ASSERT
    expect(createFilter('', '')).toEqual('');
    expect(createFilter('type', '')).toEqual('');
    expect(createFilter('', 'value')).toEqual('');
  });

  it('should create the group filter string correctly', () => {
    // ASSERT
    expect(createFilter('type', 'video')).toEqual(
      "type eq 'video' or type eq 'brightcovevideo' or type eq 'jwplayervideo' or type eq 'youtubevideo' or type eq 'vimeovideo' or type eq 'divavideo'"
    );
  });

  it('should create the filter string correctly', () => {
    // ASSERT
    expect(createFilter('type', ForgeEntityCode.photo)).toEqual("type eq 'photo'");
  });
});

describe('processFacets', () => {
  it('should add items to the "items" array for each type facet value', () => {
    // ARRANGE
    const facets = {
      type: [
        { value: ForgeEntityCode.photo, count: 2 },
        { value: 'video', count: 3 },
        { value: ForgeEntityType.customEntity, count: 1 },
      ],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(2);
    expect(items[0]).toEqual({ count: 2, type: ForgeEntityType.photo, documents: [] });
    expect(items[1]).toEqual({ count: 3, type: 'video', documents: [] });
  });

  it('should add items to the "items" array for each entityCode facet value', () => {
    // ARRANGE
    const facets = {
      entityCode: [
        { value: 'A', count: 2 },
        { value: 'B', count: 3 },
      ],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(2);
    expect(items[0]).toEqual({ count: 2, type: 'A', documents: [] });
    expect(items[1]).toEqual({ count: 3, type: 'B', documents: [] });
  });

  it('should not add items to the "items" array for customentity type facet value', () => {
    // ARRANGE
    const facets = {
      type: [{ value: ForgeEntityType.customEntity, count: 1 }],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(0);
  });

  it('should handle empty facets object', () => {
    // ARRANGE
    const facets = {};
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(0);
  });

  it('should handle missing facets object', () => {
    // ARRANGE
    const items: any[] = [];

    // ACT
    processFacets(undefined, items);

    // ASSERT
    expect(items.length).toBe(0);
  });
});

describe('processDocuments', () => {
  it('should add documents to the corresponding items based on type and entityCode', async () => {
    // ARRANGE
    const results: SearchIterator<Pick<unknown, never>> = {
      // @ts-ignore
      async *[Symbol.asyncIterator]() {
        yield {
          document: { type: ForgeEntityCode.story, entityCode: null },
        };
        yield {
          document: { type: 'custom', entityCode: 'video' },
        };
      },
    };
    const items = [
      { count: 0, type: ForgeEntityCode.story, documents: [] },
      { count: 0, type: 'custom', documents: [] },
      { count: 0, type: ForgeEntityCode.album, documents: [] },
    ];

    // ACT
    await processDocuments(results, items);

    // ASSERT
    expect(items[0].documents.length).toBe(1);
    expect(items[0].documents[0]).toEqual({ type: ForgeEntityCode.story, entityCode: null });

    expect(items[1].documents.length).toBe(1);
    expect(items[1].documents[0]).toEqual({ type: 'custom', entityCode: 'video' });

    expect(items[2].documents.length).toBe(0);
  });

  it('should not add documents to items if type or entityCode does not match', async () => {
    // ARRANGE
    const results: SearchIterator<Pick<unknown, never>> = {
      // @ts-ignore
      async *[Symbol.asyncIterator]() {
        yield {
          document: { type: ForgeEntityCode.photo, entityCode: 'foo' },
        };
        yield {
          document: { type: 'video', entityCode: 'bar' },
        };
        yield {
          document: { type: 'x', entityCode: ForgeEntityCode.event },
        };
      },
    };
    const items = [
      { count: 0, type: ForgeEntityCode.story, documents: [] },
      { count: 0, type: 'custom', documents: [] },
      { count: 0, type: 'video', documents: [] },
      { count: 0, type: ForgeEntityCode.event, documents: [] },
    ];

    // ACT
    await processDocuments(results, items);

    // ASSERT
    expect(items[0].documents.length).toBe(0);
    expect(items[1].documents.length).toBe(0);
    expect(items[2].documents.length).toBe(1);
    expect(items[2].documents[0]).toEqual({ type: 'video', entityCode: 'bar' });
    expect(items[3].documents.length).toBe(1);
    expect(items[3].documents[0]).toEqual({ type: 'x', entityCode: ForgeEntityCode.event });
  });

  it('should handle empty search results', async () => {
    // ARRANGE
    const results: SearchIterator<Pick<unknown, never>> = {
      // @ts-ignore
      async *[Symbol.asyncIterator]() {
        // No results returned
      },
    };
    const items = [
      { count: 0, type: ForgeEntityCode.story, documents: [] },
      { count: 0, type: 'custom', documents: [] },
      { count: 0, type: 'video', documents: [] },
    ];

    // ACT
    await processDocuments(results, items);

    // ASSERT
    expect(items[0].documents.length).toBe(0);
    expect(items[1].documents.length).toBe(0);
    expect(items[2].documents.length).toBe(0);
  });
});

describe('processKeyPagesDocuments', () => {
  it('should add documents to the corresponding field keyPages', async () => {
    // ARRANGE
    const results: SearchIterator<Pick<unknown, never>> = {
      // @ts-ignore
      async *[Symbol.asyncIterator]() {
        yield {
          document: { id: '515c4c05-ba54-4228-9ca2-86be80793501', title: 'test.com' },
        };
        yield {
          document: { id: '64a6dd61-857e-4886-ae05-b5229b130e39', title: 'Test' },
        };
      },
    };
    const keyPages: unknown[] = [];

    // ACT
    await processKeyPagesDocuments(results, keyPages);

    // ASSERT
    expect(keyPages.length).toBe(2);
    expect(keyPages[0]).toEqual({ id: '515c4c05-ba54-4228-9ca2-86be80793501', title: 'test.com' });
    expect(keyPages[1]).toEqual({ id: '64a6dd61-857e-4886-ae05-b5229b130e39', title: 'Test' });
  });

  it('should handle empty search results', async () => {
    // ARRANGE
    const results: SearchIterator<Pick<unknown, never>> = {
      // @ts-ignore
      async *[Symbol.asyncIterator]() {
        // No results returned
      },
    };
    const keyPages: unknown[] = [];

    // ACT
    await processKeyPagesDocuments(results, keyPages);

    // ASSERT
    expect(keyPages.length).toBe(0);
  });
});

describe('processFacets', () => {
  it('should add items to the items array based on type facet (excluding customentity)', () => {
    // ARRANGE
    const facets: any = {
      type: [
        { value: ForgeEntityCode.photo, count: 2 },
        { value: ForgeEntityCode.album, count: 1 },
        { value: ForgeEntityType.customEntity, count: 3 }, // Excluded from adding items
        { value: 'video', count: null },
      ],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(3);
    expect(items).toContainEqual({ count: 2, type: ForgeEntityCode.photo, documents: [] });
    expect(items).toContainEqual({ count: 1, type: ForgeEntityCode.album, documents: [] });
    expect(items).toContainEqual({ count: 0, type: 'video', documents: [] });
  });

  it('should add items to the items array based on entityCode facet', () => {
    // ARRANGE
    const facets: any = {
      entityCode: [
        { value: 'video', count: 2 },
        { value: ForgeEntityCode.promo, count: 3 },
        { value: ForgeEntityCode.event, count: null },
      ],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(3);
    expect(items).toContainEqual({ count: 2, type: 'video', documents: [] });
    expect(items).toContainEqual({ count: 3, type: ForgeEntityCode.promo, documents: [] });
    expect(items).toContainEqual({ count: 0, type: ForgeEntityCode.event, documents: [] });
  });

  it('should not add any items if facets are empty', () => {
    // ARRANGE
    const facets: any = {};
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(0);
  });

  it('should handle undefined facets object', () => {
    // ARRANGE
    const facets: any = undefined;
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(0);
  });

  it('should handle undefined items array', () => {
    // ARRANGE
    const facets: any = {
      type: [{ value: ForgeEntityCode.photo, count: 2 }],
    };
    const items: any[] = [];

    // ACT
    processFacets(facets, items);

    // ASSERT
    expect(items.length).toBe(1);
    expect(items[0].type).toBe(ForgeEntityCode.photo);
    expect(items[0].count).toBe(2);
    expect(items[0].documents).toEqual([]);
  });
});

describe('enrichSearchResultsWithDistributionEntities', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should enrich search results with distribution entities', async () => {
    // ARRANGE
    const mockDocuments = [
      { id: '1', title: 'Document 1' },
      { id: '2', title: 'Document 2' },
    ];
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
            'https://res.cloudinary.com/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/d3-placeholder_d8r7kc',
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
    const items = [
      { type: ForgeEntityCode.photo, documents: mockDocuments },
      { type: 'video', documents: mockDocuments },
    ];

    (enrichDistributionEntitiesWithLinkRules as jest.Mock).mockReturnValueOnce(mockDocuments);
    (enrichDistributionEntitiesWithLinkRules as jest.Mock).mockReturnValueOnce(mockDocuments);

    // ACT
    await enrichSearchResultsWithDistributionEntities(items, mockedVariables);

    // ASSERT
    expect(enrichDistributionEntitiesWithLinkRules).toHaveBeenCalledTimes(2);
    expect(enrichDistributionEntitiesWithLinkRules).toHaveBeenCalledWith(mockDocuments, true);

    expect(enrichEntitiesWithThumbnailPlaceholder).toHaveBeenCalledTimes(2);
    expect(enrichEntitiesWithThumbnailPlaceholder).toHaveBeenCalledWith(mockDocuments, mockedVariables);
  });
});

describe('calculateSkip', () => {
  it('should return 0 if limit is 0', () => {
    // ACT
    const result = calculateSkip(1, 0);
    // ASSERT
    expect(result).toBe(0);
  });
  it('should return 0 if page is 0', () => {
    // ACT
    const result = calculateSkip(0, 5);
    // ASSERT
    expect(result).toBe(0);
  });
  it('should return 10 if page is 2', () => {
    // ACT
    const result = calculateSkip(2, 5);
    // ASSERT
    expect(result).toBe(10);
  });
});
