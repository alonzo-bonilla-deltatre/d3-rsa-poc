import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { SCHEMA_CONFIG_MOCK } from '@/__mocks__/sitemaps/schemaConfigs';
import { mockSitemapItems } from '@/__mocks__/sitemaps/sitemapItems';
import {
  cleanStringForXML,
  expandSitemapItem,
  expandSitemapItems,
  removeDisallowItems,
  SCHEMA_CONFIG,
  sitemapItemsManipulation,
} from '@/helpers/sitemapHelper';
import { DistributionEntity } from '@/models/types/forge';
import { SitemapItem } from '@/models/types/siteStructure';

describe('removeDisallowItems', () => {
  it('should remove items with disallowed URL values', () => {
    // ARRANGE
    const disallowedValues = ['disallowed-url'];

    // ACT
    const result = removeDisallowItems(mockSitemapItems, disallowedValues);

    // ASSERT
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.objectContaining({
            value: 'allowed-url',
          }),
        }),
      ])
    );
    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.objectContaining({
            value: 'disallowed-url',
          }),
        }),
      ])
    );
  });
});

const frontendBaseUrl = 'https://www.yourfrontend.com';

describe('sitemapItemsManipulation', () => {
  it('should replace tilde with frontendBaseUrl in URL values', () => {
    // ARRANGE
    const sitemapItemsWithTilde: SitemapItem[] = [
      {
        url: {
          value: '~/path',
          parameters: {},
        },
        alias: {
          value: '~/alias-path',
          parameters: {},
        },
      },
    ];
    // ACT
    const result = sitemapItemsManipulation(sitemapItemsWithTilde, frontendBaseUrl);

    // ASSERT
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.objectContaining({
            value: 'https://www.yourfrontend.com/path',
          }),
        }),
      ])
    );
  });
});

describe('expandSitemapItem', () => {
  it('should expand a sitemap item with parameters into multiple items', async () => {
    // ARRANGE
    const sitemapItemWithParameters: SitemapItem = {
      url: {
        value: '/path/{param1}/{param2}',
        parameters: {
          param1: {
            validation: {
              allowedValues: 'one,two',
            },
          },
          param2: {
            validation: {
              allowedValues: 'alpha,beta',
            },
          },
        },
      },
      alias: {
        value: '/alias-path',
        parameters: {},
      },
    };
    // ACT
    const result = await expandSitemapItem(sitemapItemWithParameters);

    // ASSERT
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.objectContaining({
            value: '/path/one/alpha',
          }),
        }),
        expect.objectContaining({
          url: expect.objectContaining({
            value: '/path/one/beta',
          }),
        }),
      ])
    );
    expect(result.length).toBe(4); // two parameters with two values each should create 4 combinations
  });

  it('should expand a sitemap item with empty array with missing validation prop', async () => {
    // ARRANGE
    const sitemapItemWithParameters: SitemapItem = {
      url: {
        value: '/path/{param1}/{param2}',
        parameters: {
          param1: {
            validation: undefined as any,
          },
          param2: {
            validation: {
              allowedValues: 'alpha,beta',
            },
          },
        },
      },
      alias: {
        value: '/alias-path',
        parameters: {
          param1: {} as any,
          param2: {} as any,
        },
      },
    };
    // ACT
    const result = await expandSitemapItem(sitemapItemWithParameters);

    // ASSERT
    expect(result.length).toBe(0); // two parameters with two values each should create 4 combinations
  });
});

describe('expandSitemapItems', () => {
  it('should expand all sitemap items with parameters', async () => {
    // ARRANGE
    const sitemapItemWithParameters: SitemapItem = {
      url: {
        value: '/path/{param1}/{param2}',
        parameters: {
          param1: {
            validation: {
              allowedValues: 'one,two',
            },
          },
          param2: {
            validation: {
              allowedValues: 'alpha,beta',
            },
          },
        },
      },
      alias: {
        value: '/alias-path',
        parameters: {},
      },
    };

    const sitemapItemsForExpansion: SitemapItem[] = [sitemapItemWithParameters];

    // ACT
    const result = await expandSitemapItems(sitemapItemsForExpansion);

    // ASSERT
    expect(result.length).toBeGreaterThan(sitemapItemsForExpansion.length);
  });
});

describe('expandSitemapItem with dataPath', () => {
  it('should return an empty array if a parameter has a valid dataPath', async () => {
    // ARRANGE
    const sitemapItemWithDataPath: SitemapItem = {
      url: {
        value: '/path/{param1}',
        parameters: {
          param1: {
            validation: {
              dataPath: '/some/valid/path',
            },
          },
        },
      },
      alias: {
        value: '/alias-path',
        parameters: {},
      },
    };

    // ACT
    const result = await expandSitemapItem(sitemapItemWithDataPath);

    // ASSERT
    expect(result).toEqual([]);
  });
});

describe('expandSitemapItem with null parameter object', () => {
  it('should return an empty array if a parameter object is null', async () => {
    // ARRANGE
    const sitemapItemWithNullParameter: SitemapItem = {
      url: {
        value: '/path/{param1}',
        parameters: {
          param1: {
            validation: {},
          },
        },
      },
      alias: {
        value: '/alias-path',
        parameters: {},
      },
    };

    // ACT
    const result = await expandSitemapItem(sitemapItemWithNullParameter);

    // ASSERT
    expect(result).toEqual([]);
  });
});

describe('SCHEMA_CONFIG', () => {
  it('should generate correct XML schema for article', () => {
    // ARRANGE
    const mockEntity = {
      ...emptyDistributionEntity,
      url: 'http://example.com/article-url',
      contentDate: '2021-01-01T14:41:27Z',
    };

    // ACT
    const xmlSchema = SCHEMA_CONFIG_MOCK.article.xmlSchema(mockEntity);

    // ASSERT
    expect(xmlSchema).toContain('<loc>http://example.com/article-url</loc>');
    expect(xmlSchema).toContain('<news:publication_date>2021-01-01</news:publication_date>');
  });

  it('should generate correct XML schema for video', () => {
    // ARRANGE
    const mockEntity: DistributionEntity = {
      ...emptyDistributionEntity,
      url: 'http://example.com/article-url',
      description: 'Video description',
      contentDate: '2021-01-01T14:41:27Z',
    };

    // ACT
    const xmlSchema = SCHEMA_CONFIG_MOCK.video.xmlSchema(mockEntity);

    // ASSERT
    expect(xmlSchema).toContain('<loc>http://example.com/article-url</loc>');
    expect(xmlSchema).toContain('<video:publication_date>2021-01-01</video:publication_date>');
  });
});

describe('cleanString for XML', () => {
  it('should handle special characters', () => {
    // ARRANGE
    const input = `BOULDER' & LEAD-"<TEST>"`;
    const expectedResult = 'BOULDER&apos; &amp; LEAD-&quot;&lt;TEST&gt;&quot;';

    // ACT
    const cleanedString = cleanStringForXML(input);

    // ASSERT
    expect(cleanedString).toBe(expectedResult);
  });

  it('should handle empty string', () => {
    // ARRANGE
    const input = '';
    // ACT
    const cleanedString = cleanStringForXML(input);

    // ASSERT
    expect(cleanedString).toBe('');
  });

  it('should handle string without special characters', () => {
    // ARRANGE
    const input = '/t';
    const expectedResult = '/t';

    // ACT
    const cleanedString = cleanStringForXML(input);

    // ASSERT
    expect(cleanedString).toBe(expectedResult);
  });
});

describe('SCHEMA_CONFIG', () => {
  it('should generate correct XML container for article', () => {
    // ARRANGE
    const content = '<url><loc>http://example.com/article-url</loc></url>';
    // ACT
    const xmlContainer = SCHEMA_CONFIG.article.xmlContainer(content);
    // ASSERT
    expect(xmlContainer).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xmlContainer).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">');
    expect(xmlContainer).toContain(content);
  });

  it('should generate correct XML schema for article', () => {
    // ARRANGE
    const mockEntity = {
      url: 'http://example.com/article-url',
      title: 'Example Article',
      contentDate: '2021-01-01T14:41:27Z',
    } as any;
    const language = 'en';
    // ACT
    const xmlSchema = SCHEMA_CONFIG.article.xmlSchema(mockEntity, language);
    // ASSERT
    expect(xmlSchema).toContain('<loc>http://example.com/article-url</loc>');
    expect(xmlSchema).toContain('<news:publication_date>2021-01-01</news:publication_date>');
    expect(xmlSchema).toContain('<news:language>en</news:language>');
  });

  it('should generate correct XML container for video', () => {
    // ARRANGE
    const content = '<url><loc>http://example.com/video-url</loc></url>';
    // ACT
    const xmlContainer = SCHEMA_CONFIG.video.xmlContainer(content);
    // ASSERT
    expect(xmlContainer).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xmlContainer).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">');
    expect(xmlContainer).toContain(content);
  });

  it('should generate correct XML schema for video', () => {
    // ARRANGE
    const mockEntity = {
      url: 'http://example.com/video-url',
      title: 'Example Video',
      thumbnail: { thumbnailUrl: 'http://example.com/thumbnail.jpg' },
      fields: { description: 'Video description' },
      contentDate: '2021-01-01T14:41:27Z',
    } as any;
    // ACT
    const xmlSchema = SCHEMA_CONFIG.video.xmlSchema(mockEntity);
    // ASSERT
    expect(xmlSchema).toContain('<loc>http://example.com/video-url</loc>');
    expect(xmlSchema).toContain('<video:thumbnail_loc>http://example.com/thumbnail.jpg</video:thumbnail_loc>');
    expect(xmlSchema).toContain('<video:publication_date>2021-01-01</video:publication_date>');
  });

  it('should handle missing optional fields in video schema', () => {
    // ARRANGE
    const mockEntity = {
      url: 'http://example.com/video-url',
      title: 'Example Video',
      contentDate: '2021-01-01T14:41:27Z',
    } as any;
    // ACT
    const xmlSchema = SCHEMA_CONFIG.video.xmlSchema(mockEntity);
    // ASSERT
    expect(xmlSchema).toContain('<loc>http://example.com/video-url</loc>');
    expect(xmlSchema).toContain('<video:title>Example Video</video:title>');
    expect(xmlSchema).toContain('<video:publication_date>2021-01-01</video:publication_date>');
  });
});
