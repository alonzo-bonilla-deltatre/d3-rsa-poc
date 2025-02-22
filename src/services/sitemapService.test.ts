import axios from 'axios';
import {
  getSiteStructureData,
  getSiteStructureXml,
  getSitemapEntityXml,
  getSitemapIndexXml,
} from '@/services/sitemapService';
import { getPageStructure } from '@/services/pageService';
import { getAllEntities } from './forgeDistributionService';
import { mockPagedResult } from '@/__mocks__/entities/sampleStoriesDapi';
import { getSiteUrl } from '@/services/configurationService';
import { mockApiResponse, mockSitemapItems } from '@/__mocks__/sitemaps/sitemapItems';
import { mockPageStructureResponse } from '@/__mocks__/sitemaps/pageStructure';

jest.mock('axios');

jest.mock('@/services/configurationService', () => ({
  getSiteUrl: jest.fn(),
}));

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

jest.mock('@/services/forgeDistributionService', () => ({
  getAllEntities: jest.fn(),
}));

describe('Sitemap Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSiteStructureData', () => {
    it('should return null if getPageStructure returns null', async () => {
      // ARRANGE
      const basePath = process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
      delete process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
      (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

      // ACT
      const result = await getSiteStructureData();

      // ASSERT
      expect(result).toBeNull();
      process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH = basePath;
    });

    it('should return sitemap items if data is valid', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);

      // ACT
      const result = await getSiteStructureData();

      // ASSERT
      expect(result).toEqual(mockSitemapItems);
    });

    it('should handle metadata without disallows', async () => {
      // ARRANGE
      const mockPageStructureResponseWithoutDisallows = {
        data: {
          metadata: [
            {
              category: 'sitemaps',
              key: 'sitemap_article_entity_code',
              value: 'articles',
            },
            {
              category: 'sitemaps',
              key: 'sitemap_article_schema',
              value: 'article',
            },
          ],
        },
      };
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponseWithoutDisallows);
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });

      // ACT
      const result = await getSiteStructureData();

      // ASSERT
      expect(result).toEqual(expect.any(Array));
      expect(result).not.toBeNull();
    });
  });

  describe('getSiteStructureXml', () => {
    it('should return null if getSiteStructureData returns null', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: { sitemap: [] } } });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

      // ACT
      const result = await getSiteStructureXml();

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return the correct XML string when getSiteStructureData returns valid data', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);

      // ACT
      const result = await getSiteStructureXml();

      // ASSERT
      expect(result).toContain('<loc>https://example.com/page-1</loc>');
      expect(result).toContain('<loc>https://example.com/page-2</loc>');
    });
  });

  describe('getSitemapEntityXml', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null if entity configuration is not found', async () => {
      // ARRANGE
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);

      // ACT
      const result = await getSitemapEntityXml('nonexistent-entity');
      expect(result).toBeNull();
    });

    it('should return the correct XML string for a valid entity', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockSitemapItems } });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getAllEntities as jest.Mock).mockResolvedValueOnce(mockPagedResult);

      // ACT
      const result = await getSitemapEntityXml('article');

      // ASSERT
      expect(result).toContain('<loc>https://test.url.com/test-article</loc>');
      expect(result).toContain('<loc>https://test.url.com/test-article</loc>');
    });

    it('should return null if getAllEntities returns null', async () => {
      // ARRANGE
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getAllEntities as jest.Mock).mockResolvedValueOnce(null);

      // ACT
      const result = await getSitemapEntityXml('article');

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return null if getAllEntities returns data without items', async () => {
      // ARRANGE
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getAllEntities as jest.Mock).mockResolvedValueOnce({ items: null });

      // ACT
      const result = await getSitemapEntityXml('article');

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return the correct XML string when entity have schema on type', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockSitemapItems } });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getAllEntities as jest.Mock).mockResolvedValueOnce(mockPagedResult);

      // ACT
      const result = await getSitemapEntityXml('testStory');

      // ASSERT
      expect(result).toContain('<loc>https://test.url.com/test-article</loc>');
      expect(result).toContain('<loc>https://test.url.com/test-article-2</loc>');
    });

    it('should return null when entity have no schema available', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockSitemapItems } });
      (getPageStructure as jest.Mock).mockResolvedValueOnce({
        data: {
          metadata: [
            {
              category: 'sitemaps',
              key: 'sitemap_dummy_entity_code',
              value: 'articles',
            },
            {
              category: 'sitemaps',
              key: 'sitemap_dummy_schema',
              value: 'notexistingschema',
            },
          ],
        },
      });
      (getAllEntities as jest.Mock).mockResolvedValueOnce(mockPagedResult);

      // ACT
      const result = await getSitemapEntityXml('dummy');

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return null when sitemap metadata is not valid', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockSitemapItems } });
      (getPageStructure as jest.Mock).mockResolvedValueOnce({
        data: {
          metadata: [
            {
              category: 'sitemaps',
              key: 'sitemap_dummy_fake',
              value: 'test',
            },
          ],
        },
      });
      (getAllEntities as jest.Mock).mockResolvedValueOnce(mockPagedResult);

      // ACT
      const result = await getSitemapEntityXml('dummy');

      // ASSERT
      expect(result).toBeNull();
    });
  });

  describe('getSitemapIndexXml', () => {
    it('should return the correct XML string for sitemap index with absolute url if languages url metadata is configured', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getSiteUrl as jest.Mock).mockResolvedValueOnce('http://localhost');

      // ACT
      const result = await getSitemapIndexXml();

      // ASSERT
      expect(result).toContain('<loc>http://localhost/sitemap.xml</loc>');
      expect(result).toContain('<loc>http://localhost/sitemap-article.xml</loc>');
    });

    it('should return the correct XML string for sitemap index with relative path if languages url metadata is not configured', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });
      (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructureResponse);
      (getSiteUrl as jest.Mock).mockResolvedValueOnce('');

      // ACT
      const result = await getSitemapIndexXml();

      // ASSERT
      expect(result).toContain('<loc>/sitemap.xml</loc>');
      expect(result).toContain('<loc>/sitemap-article.xml</loc>');
    });
  });

  describe('getSiteMapEntities', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should return an empty array if getPageStructure returns null', async () => {
      // ARRANGE
      jest.mock('@/services/pageService', () => ({
        getPageStructure: jest.fn().mockResolvedValueOnce(null),
      }));

      const { getSiteMapEntitiesFromMetadata } = require('@/services/sitemapService');

      // ACT
      const result = await getSiteMapEntitiesFromMetadata();

      // ASSERT
      expect(result).toEqual([]);
    });
  });
});
