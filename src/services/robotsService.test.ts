import { getRobotsTxt } from '@/services/robotsService';
import { getPageStructure } from './pageService';
import { ForgeMetadataCategoryType, ForgeRobotsMetadataKey } from '@/models/types/forge';

jest.mock('./pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getRobotsTxt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when getPageStructure returns null', async () => {
    // ARRANGE
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toBeNull();
    expect(getPageStructure).toHaveBeenCalledWith('~/', '');
  });

  it('should return the correct robots.txt content when getPageStructure returns valid data', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.sitemaps,
            value: 'https://example.com/sitemap.xml|https://example.com/sitemap2.xml',
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
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Allow: /allowed-path');
    expect(result).toContain('Allow: /allowed-path2');
    expect(result).toContain('Disallow: /disallowed-path');
    expect(result).toContain('Disallow: /disallowed-path2');
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml');
    expect(result).toContain('Sitemap: https://example.com/sitemap2.xml');

    expect(getPageStructure).toHaveBeenCalledWith('~/', '');
  });

  it('should return the correct robots.txt content when getPageStructure has undefined values', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.robots,
            key: ForgeRobotsMetadataKey.sitemaps,
            value: undefined,
          },
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

    // ACT
    const result = await getRobotsTxt();

    // ASSERT
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
    expect(result).not.toContain('Allow:');
    expect(result).not.toContain('Sitemap:');

    expect(getPageStructure).toHaveBeenCalledWith('~/', '');
  });
});
