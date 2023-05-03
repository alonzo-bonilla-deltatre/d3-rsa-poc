import { getRobotsTxt } from '@/services/robotsService';
import { getPageStructure } from './pageService';

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
            category: 'seo',
            key: 'sitemaps',
            value: 'https://example.com/sitemap.xml|https://example.com/sitemap2.xml',
          },
          {
            category: 'seo',
            key: 'allows',
            value: '/allowed-path|/allowed-path2',
          },
          {
            category: 'seo',
            key: 'disallows',
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
});
