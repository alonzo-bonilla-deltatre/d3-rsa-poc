import { getSiteUrl } from '@/services/configurationService';
import { getRobotsTxt } from '@/services/robotsService';
import { PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH } from '@/utilities/constsUtility';
import { getPageStructure } from './pageService';
import { ForgeMetadataCategoryType, ForgeRobotsMetadataKey, ForgeSitemapsMetadataKey } from '@/models/types/forge';

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));
jest.mock('@/services/configurationService', () => ({
  getSiteUrl: jest.fn(),
}));

describe('getRobotsTxt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when getPageStructure returns null', async () => {
    // ARRANGE
    const basePath = process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
    delete process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toBeNull();
    expect(getPageStructure).toHaveBeenCalledWith(PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH = basePath;
  });

  it('should return default robots when getPageStructure returns without metadata field', async () => {
    // ARRANGE
    (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: {} });
    (getPageStructure as jest.Mock).mockResolvedValue({ data: {} });

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
  });

  it('should return the correct robots.txt content when getPageStructure returns valid data', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.sitemaps,
            key: ForgeSitemapsMetadataKey.sitemap_article_entity_code,
            value: 'stories',
          },
          {
            category: ForgeMetadataCategoryType.sitemaps,
            key: ForgeSitemapsMetadataKey.sitemap_article_schema,
            value: 'article',
          },
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.allows,
            value: '/allowed-path|/allowed-path2',
          },
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.disallows,
            value: '/disallowed-path|/disallowed-path2',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValue(pageStructure);
    (getSiteUrl as jest.Mock).mockResolvedValueOnce('https://example.com');

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Allow: /allowed-path');
    expect(result).toContain('Allow: /allowed-path2');
    expect(result).toContain('Disallow: /disallowed-path');
    expect(result).toContain('Disallow: /disallowed-path2');
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml');
    expect(result).toContain('Sitemap: https://example.com/sitemap-article.xml');

    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
  });

  it('should return the correct robots.txt content when getPageStructure has undefined values', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.allows,
            value: undefined,
          },
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.disallows,
            value: undefined,
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);
    (getSiteUrl as jest.Mock).mockResolvedValueOnce('https://example.com');

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
    expect(result).not.toContain('Allow:');
    expect(result).not.toContain('Sitemap: https://example.com/sitemap.xml');
    expect(result).not.toContain('Sitemap: https://example.com/sitemap-article.xml');

    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
  });
});
