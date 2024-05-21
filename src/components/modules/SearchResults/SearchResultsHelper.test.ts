import {
  createSearchResultItems,
  getPaginationNextPage,
  getPaginationPrevPage,
  getPaginationNextKeyPagesPage,
  getPaginationPrevKeyPagesPage,
  getSearchPath,
  getTotalCount,
} from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureSearchForgeEntitiesResult, AzureSearchOption, AzureSearchResult } from '@/models/types/azureSearch';
import { describe, expect, test } from '@jest/globals';
import { ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';

describe('createSearchResultItems', () => {
  test('should not alter original array and returns array with all entities without facetValue', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchForgeEntitiesResult = {
      count: 7,
      items: [
        {
          count: 2,
          documents: [
            { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
            { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
          ],
          type: ForgeEntityType.photo,
        },
        {
          count: 2,
          documents: [
            { id: 'da2bced1-062f-47ac-aa12-5403a264d639', title: 'Brightcove Video 1' },
            { id: 'c89683fd-915b-4a11-bb0a-00a6699f10ae', title: 'Brightcove Video 2' },
          ],
          type: 'brightcovevideo',
        },
        {
          count: 2,
          documents: [
            { id: 'e5e3fda7-f802-4188-87f1-ce7824ffc7b6', title: 'Youtubevideo Video 1' },
            { id: 'c2c8bb39-41ec-4d97-be89-c2b987be08af', title: 'Youtubevideo Video 2' },
          ],
          type: 'youtubevideo',
        },
        {
          count: 1,
          documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }],
          type: ForgeEntityCode.album,
        },
      ],
    };

    // ACT
    const result = createSearchResultItems('', azureSearchResult);

    // ASSERT
    expect(result.length).toBe(7);
  });

  test('should not alter original array and returns array with all entities filtered with facetValue equals photo', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchForgeEntitiesResult = {
      count: 7,
      items: [
        {
          count: 2,
          documents: [
            { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
            { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
          ],
          type: ForgeEntityType.photo,
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
    };

    // ACT
    const result = createSearchResultItems(ForgeEntityType.photo, azureSearchResult);

    // ASSERT
    expect(result.length).toBe(2);
  });

  test('should not alter original array and returns array with all entities filtered with facetValue equals photo and return empty array if we have this type without documents', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchForgeEntitiesResult = {
      count: 2,
      items: [
        {
          count: 2,
          documents: [],
          type: ForgeEntityType.photo,
        },
      ],
    };

    // ACT
    const result = createSearchResultItems(ForgeEntityType.photo, azureSearchResult);

    // ASSERT
    expect(result.length).toBe(0);
  });
});

describe('searchPath', () => {
  test("should return the searchPath variables' value from the page variables", () => {
    // ARRANGE
    const variables = [
      {
        type: 'keyValue',
        key: 'inc_header',
        keyValue: { value: '~/test/react-poc/library/_header', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_footer',
        keyValue: { value: '~/test/react-poc/library/_footer', valueType: 'string' },
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
        keyValue: { value: 'FORGE GO', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_amp_header',
        keyValue: { value: '~/_libraries/_ampheader', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'user_profile',
        keyValue: { value: '/account/profile/overview', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'hello',
        keyValue: { value: 'val in english parent', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_hamburger',
        keyValue: {
          value: '~/test/react-poc/library/_hamburger',
          valueType: 'string',
        },
      },
      {
        key: 'pagePath',
        type: 'keyValue',
        keyValue: { value: '/test/react-poc/search', valueType: 'string' },
      },
      {
        key: 'azureSearchOption',
        type: 'keyValue',
        keyValue: {
          value: '{\n  "q": "uefa",\n  "page": 0,\n  "facetType": "",\n  "facetValue": ""\n}',
          valueType: 'string',
        },
      },
      {
        key: 'search_path',
        type: 'keyValue',
        keyValue: { value: '/test/react-poc/search', valueType: 'string' },
      },
    ];

    // ACT
    const result = getSearchPath(variables);

    // ASSERT
    expect(result).toBe('/test/react-poc/search');
  });

  test('should return /search if pagePath is not present in the variables', () => {
    // ARRANGE
    const variables = [
      {
        type: 'keyValue',
        key: 'inc_header',
        keyValue: { value: '~/test/react-poc/library/_header', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_footer',
        keyValue: { value: '~/test/react-poc/library/_footer', valueType: 'string' },
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
        keyValue: { value: 'FORGE GO', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_amp_header',
        keyValue: { value: '~/_libraries/_ampheader', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'user_profile',
        keyValue: { value: '/account/profile/overview', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'hello',
        keyValue: { value: 'val in english parent', valueType: 'string' },
      },
      {
        type: 'keyValue',
        key: 'inc_hamburger',
        keyValue: {
          value: '~/test/react-poc/library/_hamburger',
          valueType: 'string',
        },
      },
      {
        key: 'azureSearchOption',
        type: 'keyValue',
        keyValue: {
          value: '{\n  "q": "uefa",\n  "page": 0,\n  "facetType": "",\n  "facetValue": ""\n}',
          valueType: 'string',
        },
      },
    ];

    // ACT
    const result = getSearchPath(variables);

    // ASSERT
    expect(result).toBe('/search');
  });
});

describe('getPaginationNextPage', () => {
  test('should return pagination url with page query parameter updated if the forge entities result count is equals to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [],
      },
    };
    const items = [
      { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
      { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
    ] as any[];
    const azureSearchOption = {
      page: 1,
      limit: 2,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(azureSearchOption.page + 1);
  });

  test('should return pagination url with page query parameter updated if the key pages result count is equals to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [],
      },
    };
    const items = [
      { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
      { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
    ] as any[];
    const azureSearchOption = {
      page: 1,
      limit: 2,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(azureSearchOption.page + 1);
  });

  test('should return page 0 with page 0 query parameter if the forge entities result or key pages result is less to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const items = [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }] as any[];
    const azureSearchOption = {
      page: 0,
      limit: 2,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(0);
  });
});

describe('getPaginationPrevPage', () => {
  test('should return page 0 with page query parameter set to 1', () => {
    // ARRANGE
    const azureSearchOption = {
      page: 1,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(0);
  });

  test('should return page -1 with page query parameter set to 0', () => {
    // ARRANGE
    const azureSearchOption = {
      page: 0,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(-1);
  });

  test('should return page -1 with page query parameter set to -1', () => {
    // ARRANGE
    const azureSearchOption = {
      page: -1,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(-1);
  });
});

describe('getPaginationNextKeyPagesPage', () => {
  test('should return pagination url with page query parameter updated if the forge entities result count is equals to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [],
      },
    };
    const items = [
      { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
      { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
    ] as any[];
    const azureSearchOption = {
      keyPagesPage: 1,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextKeyPagesPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(azureSearchOption.keyPagesPage + 1);
  });

  test('should return pagination url with page query parameter updated if the key pages result count is equals to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [
              { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
              { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
            ],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [],
      },
    };
    const items = [
      { id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' },
      { id: '19b3123b-8c91-42d5-881e-fa8556e2d1f9', title: 'Photo 2' },
    ] as any[];
    const azureSearchOption = {
      keyPagesPage: 1,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextKeyPagesPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(azureSearchOption.keyPagesPage + 1);
  });

  test('should return page 0 with page 0 query parameter if the forge entities result or key pages result is less to the azure search option top', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 0,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const items = [{ id: '515c4c05-ba54-4228-9ca2-86be80793501', title: 'volleyballworld.com' }] as any[];
    const azureSearchOption = {
      keyPagesPage: 0,
      keyPagesLimit: 2,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationNextKeyPagesPage(azureSearchOption, items, azureSearchResult.totalCount);

    // ASSERT
    expect(result).toBe(0);
  });
});

describe('getPaginationPrevKeyPagesPage', () => {
  test('should return page 0 with page query parameter set to 1', () => {
    // ARRANGE
    const azureSearchOption = {
      keyPagesPage: 1,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevKeyPagesPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(0);
  });

  test('should return page -1 with page query parameter set to 0', () => {
    // ARRANGE
    const azureSearchOption = {
      keyPagesPage: 0,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevKeyPagesPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(-1);
  });

  test('should return page -1 with page query parameter set to -1', () => {
    // ARRANGE
    const azureSearchOption = {
      keyPagesPage: -1,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevKeyPagesPage(azureSearchOption);

    // ASSERT
    expect(result).toBe(-1);
  });
});

describe('getTotalCount', () => {
  test('should return all total count if facetType and facetValue is not set', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 1,
        items: [
          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },
        ],
      },
      keyPages: {
        count: 1,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const azureSearchOption = {} as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, azureSearchResult);

    // ASSERT
    expect(result).toBe(2);
  });

  test('should return specific total count if facetType and facetValue is set', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 3,
      forgeEntities: {
        count: 1,
        items: [
          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },

          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Story 1' }],
            type: ForgeEntityType.story,
          },
        ],
      },
      keyPages: {
        count: 1,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const azureSearchOption = {
      facetType: 'type',
      facetValue: ForgeEntityType.photo,
    } as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, azureSearchResult);

    // ASSERT
    expect(result).toBe(2);
  });

  test('should return specific total count if facetType and facetValue is set', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 3,
      forgeEntities: {
        count: 1,
        items: [
          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },

          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Story 1' }],
            type: ForgeEntityType.story,
          },
        ],
      },
      keyPages: {
        count: 1,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const azureSearchOption = {
      facetType: 'type',
      facetValue: ForgeEntityType.photo,
    } as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, azureSearchResult);

    // ASSERT
    expect(result).toBe(2);
  });

  test('should return specific total count if facetType and facetValue is set but not match', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 3,
      forgeEntities: {
        count: 1,
        items: [
          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: ForgeEntityType.photo,
          },

          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Story 1' }],
            type: ForgeEntityType.story,
          },
        ],
      },
      keyPages: {
        count: 1,
        items: [
          {
            Id: '515c4c05-ba54-4228-9ca2-86be80793501',
            Title: 'volleyballworld.com',
            Summary: 'The official Volleyball World website',
            Image:
              'https://volleyball-world-ressh.cloudinary.com/image/upload/v1619617498/assets/VolleyballWorld_Icon_Logo_Black_qgytes.png',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2023-06-27T11:15:38.75Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley'],
          },
        ],
      },
    };
    const azureSearchOption = {
      facetType: 'type',
      facetValue: 'video',
    } as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, azureSearchResult);

    // ASSERT
    expect(result).toBe(1);
  });

  test('should return 0 if facetType and facetValue is not set', () => {
    // ARRANGE
    const azureSearchOption = {} as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, undefined);

    // ASSERT
    expect(result).toBe(0);
  });

  test('should return 0 if searchResult is undefined', () => {
    // ARRANGE
    const azureSearchOption = {
      facetType: 'type',
      facetValue: 'video',
    } as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, undefined);

    // ASSERT
    expect(result).toBe(0);
  });
});
