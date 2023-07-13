import {
  createSearchResultItems,
  getLink,
  getPaginationNextUrl,
  getPaginationPrevUrl,
  getPaginationUrl,
  getSearchPath,
  getTotalCount,
} from '@/components/modules/SearchResults/SearchResultsHelper';
import { AzureSearchOption, AzureSearchResult } from '@/models/types/azureSearch';
import { describe, expect, test } from '@jest/globals';

describe('createSearchResultItems', () => {
  test('should not alter original array and returns array with all entities without facetValue', () => {
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
            type: 'photo',
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
          { count: 1, documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }], type: 'album' },
        ],
      },
      keyPages: {
        count: 2,
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
          {
            Id: '64a6dd61-857e-4886-ae05-b5229b130e39',
            Title: 'Volleyball',
            Summary: 'The official Volleyball World website',
            Image:
              'https://images.volleyballworld.com/image/upload/f_png/assets/backgrounds/Branded_Bg_-_Libero_Magenta_2_-_1920',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2022-01-13T15:20:01.675Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley', 'volleyball', 'federation'],
          },
        ],
      },
    };

    // ACT
    const result = createSearchResultItems('', azureSearchResult);

    // ASSERT
    expect(result.length).toBe(7);
  });

  test('should not alter original array and returns array with all entities filtered with facetValue equals photo', () => {
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
            type: 'photo',
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
          { count: 1, documents: [{ id: '4d7ae40b-1acd-427d-9c52-d8656f67d612', title: 'Album 1' }], type: 'album' },
        ],
      },
      keyPages: {
        count: 2,
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
          {
            Id: '64a6dd61-857e-4886-ae05-b5229b130e39',
            Title: 'Volleyball',
            Summary: 'The official Volleyball World website',
            Image:
              'https://images.volleyballworld.com/image/upload/f_png/assets/backgrounds/Branded_Bg_-_Libero_Magenta_2_-_1920',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2022-01-13T15:20:01.675Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley', 'volleyball', 'federation'],
          },
        ],
      },
    };

    // ACT
    const result = createSearchResultItems('photo', azureSearchResult);

    // ASSERT
    expect(result.length).toBe(2);
  });

  test('should not alter original array and returns array with all entities filtered with facetValue equals photo and return empty array if we have this type without documents', () => {
    // ARRANGE
    const azureSearchResult: AzureSearchResult = {
      totalCount: 4,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [],
            type: 'photo',
          },
        ],
      },
      keyPages: {
        count: 2,
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
          {
            Id: '64a6dd61-857e-4886-ae05-b5229b130e39',
            Title: 'Volleyball',
            Summary: 'The official Volleyball World website',
            Image:
              'https://images.volleyballworld.com/image/upload/f_png/assets/backgrounds/Branded_Bg_-_Libero_Magenta_2_-_1920',
            Schema_Keywords: [],
            Schema_Abstract: [],
            Schema_Text: [],
            Schema_Image: [],
            Original_Meta_Title: 'volleyballworld.com',
            Original_Meta_Summary: 'The official Volleyball World website',
            LastIndex: '2022-01-13T15:20:01.675Z',
            Url: 'https://en.volleyballworld.com/',
            Culture: 'en-GB',
            Tags: ['volley', 'volleyball', 'federation'],
          },
        ],
      },
    };

    // ACT
    const result = createSearchResultItems('photo', azureSearchResult);

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

describe('getLink', () => {
  test('should return all query parameters empty if the props are empty without facetType and facetValue', () => {
    // ARRANGE
    const path = '';

    // ACT
    const result = getLink(path, '', '', '');

    // ASSERT
    expect(result).toBe(`${path}?q=`);
  });

  test('should return all query parameters if the props have value', () => {
    // ARRANGE
    const path = 'search';

    // ACT
    const result = getLink(path, 'test', 'facetType', 'facetValue');

    // ASSERT
    expect(result).toBe(`${path}?q=test&facetType=facetType&facetValue=facetValue`);
  });
});

describe('getPaginationUrl', () => {
  test('should return all query parameters empty if the props are empty', () => {
    // ARRANGE
    const path = '';
    const azureSearchOption = {} as AzureSearchOption;

    // ACT
    const result = getPaginationUrl(path, azureSearchOption);

    // ASSERT
    expect(result).toBe(
      `${path}?q=${azureSearchOption.q}&facetType=${azureSearchOption.facetType}&facetValue=${azureSearchOption.facetValue}`
    );
  });

  test('should return all query parameters if the props have value', () => {
    // ARRANGE
    const path = 'search';
    const azureSearchOption = {
      q: 'test',
      facetType: 'type',
      facetValue: 'photo',
    } as AzureSearchOption;

    // ACT
    const result = getPaginationUrl(path, azureSearchOption);

    // ASSERT
    expect(result).toBe(
      `${path}?q=${azureSearchOption.q}&facetType=${azureSearchOption.facetType}&facetValue=${azureSearchOption.facetValue}`
    );
  });
});

describe('getPaginationNextUrl', () => {
  test('should return pagination url with page query parameter updated if the forge entities result count is equals to the azure search option top', () => {
    // ARRANGE
    const paginationUrl = '';
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
            type: 'photo',
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
    const result = getPaginationNextUrl(azureSearchResult, items, azureSearchOption, paginationUrl);

    // ASSERT
    expect(result).toBe(`${paginationUrl}&page=${azureSearchOption.page + 1}`);
  });

  test('should return pagination url with page query parameter updated if the key pages result count is equals to the azure search option top', () => {
    // ARRANGE
    const paginationUrl = '';
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
            type: 'photo',
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
    const result = getPaginationNextUrl(azureSearchResult, items, azureSearchOption, paginationUrl);

    // ASSERT
    expect(result).toBe(`${paginationUrl}&page=${azureSearchOption.page + 1}`);
  });

  test('should return pagination url with empty page query parameter if the forge entities result or key pages result is less to the azure search option top', () => {
    // ARRANGE
    const paginationUrl = '';
    const azureSearchResult: AzureSearchResult = {
      totalCount: 2,
      forgeEntities: {
        count: 2,
        items: [
          {
            count: 2,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Photo 1' }],
            type: 'photo',
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
    const result = getPaginationNextUrl(azureSearchResult, items, azureSearchOption, paginationUrl);

    // ASSERT
    expect(result).toBe(``);
  });
});

describe('getPaginationPrevUrl', () => {
  test('should return pagination url with page query parameter updated if the result count is equals to the azure search option top', () => {
    // ARRANGE
    const paginationUrl = '';
    const azureSearchOption = {
      page: 1,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevUrl(azureSearchOption, paginationUrl);

    // ASSERT
    expect(result).toBe(`${paginationUrl}&page=${azureSearchOption.page - 1}`);
  });

  test('should return pagination url with empty page query parameter if the result count is less to the azure search option top', () => {
    // ARRANGE
    const paginationUrl = '';
    const azureSearchOption = {
      page: 0,
    } as AzureSearchOption;

    // ACT
    const result = getPaginationPrevUrl(azureSearchOption, paginationUrl);

    // ASSERT
    expect(result).toBe(``);
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
            type: 'photo',
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
            type: 'photo',
          },

          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Story 1' }],
            type: 'story',
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
      facetValue: 'photo',
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
            type: 'photo',
          },

          {
            count: 1,
            documents: [{ id: 'd78eacab-cac7-4b86-9f09-179f454d26ad', title: 'Story 1' }],
            type: 'story',
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
      facetValue: 'photo',
    } as AzureSearchOption;

    // ACT
    const result = getTotalCount(azureSearchOption, azureSearchResult);

    // ASSERT
    expect(result).toBe(2);
  });
});
