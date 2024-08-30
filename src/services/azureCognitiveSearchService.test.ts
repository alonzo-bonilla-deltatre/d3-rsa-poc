/**
 * @jest-environment node
 */
import { searchTotalCount, searchForgeEntities, searchKeyPages } from '@/services/azureCognitiveSearchService';
import { SearchClient } from '@azure/search-documents';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@azure/search-documents');
jest.mock('@/utilities/loggerUtility');

describe('azureCognitiveSearchService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchTotalCount', () => {
    it('returns total count of search results without key pages', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 10, facets: {} }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchTotalCount({
        q: 'test',
        page: -1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result).toBe(10);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
    });

    it('returns total count of search results with key pages', async () => {
      // ARRANGE
      process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME = 'key-pages';
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 10, facets: {} }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchTotalCount({
        q: 'test',
        page: -1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result).toBe(20);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
      delete process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME;
    });

    it('returns total count of search results with count 0 value as default', async () => {
      // ARRANGE
      process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME = 'key-pages';
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: undefined, facets: {} }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchTotalCount({
        q: 'test',
        page: -1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result).toBe(0);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
      delete process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME;
    });

    it('handles error in searchTotalCount', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockRejectedValue(new Error('Search error')),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      // ASSERT
      await expect(
        searchTotalCount({
          q: 'test',
          page: 1,
          limit: 10,
          keyPagesPage: 1,
          keyPagesLimit: 10,
          facetType: '',
          facetValue: '',
        })
      ).rejects.toThrow('Search error');
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('AZURE COGNITIVE SEARCH Error'),
        LoggerLevel.error
      );
    });
  });

  describe('searchForgeEntities', () => {
    it('returns forge entities search results', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 5, facets: {}, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchForgeEntities({
        q: 'test',
        page: -1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(5);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
    });

    it('returns forge entities search results with count 0 value as default', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: undefined, facets: {}, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchForgeEntities({
        q: 'test',
        page: -1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(0);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
    });

    it('returns zero count when no results found in searchForgeEntities', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 0, facets: {}, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchForgeEntities({
        q: 'test',
        page: 1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(0);
    });

    it('handles error in searchForgeEntities', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockRejectedValue(new Error('Search error')),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      // ASSERT
      await expect(
        searchForgeEntities({
          q: 'test',
          page: 1,
          limit: 10,
          keyPagesPage: 1,
          keyPagesLimit: 10,
          facetType: '',
          facetValue: '',
        })
      ).rejects.toThrow('Search error');
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('AZURE COGNITIVE SEARCH Error'),
        LoggerLevel.error
      );
    });
  });

  describe('searchKeyPages', () => {
    it('returns key pages search results', async () => {
      // ARRANGE
      process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME = 'key-pages';
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 3, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchKeyPages({
        q: 'test',
        page: 1,
        keyPagesPage: -1,
        limit: 10,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(3);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
      delete process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME;
    });

    it('returns key pages search results with count 0 value as default', async () => {
      // ARRANGE
      process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME = 'key-pages';
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: undefined, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchKeyPages({
        q: 'test',
        page: 1,
        keyPagesPage: -1,
        limit: 10,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(0);
      expect(mockSearchClient.search).toHaveBeenCalledWith('test', expect.any(Object));
      delete process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME;
    });

    it('handles error in searchKeyPages', async () => {
      // ARRANGE
      process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME = 'key-pages';
      const mockSearchClient = {
        search: jest.fn().mockRejectedValue(new Error('Search error')),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      // ASSERT
      await expect(
        searchKeyPages({
          q: 'test',
          page: 1,
          keyPagesPage: 1,
          limit: 10,
          keyPagesLimit: 10,
          facetType: '',
          facetValue: '',
        })
      ).rejects.toThrow('Search error');
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('AZURE COGNITIVE KEY PAGES SEARCH Error'),
        LoggerLevel.error
      );
      delete process.env.AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME;
    });

    it('returns zero count when no results found in searchTotalCount', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 0, facets: {} }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchTotalCount({
        q: 'test',
        page: 1,
        limit: 10,
        keyPagesPage: 1,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result).toBe(0);
    });

    it('returns zero count when no results found in searchKeyPages', async () => {
      // ARRANGE
      const mockSearchClient = {
        search: jest.fn().mockResolvedValue({ count: 0, results: [] }),
      };
      jest.spyOn(SearchClient.prototype, 'search').mockImplementation(function (this: SearchClient<any>) {
        return mockSearchClient.search.apply(this, arguments);
      });

      // ACT
      const result = await searchKeyPages({
        q: 'test',
        page: 1,
        keyPagesPage: 1,
        limit: 10,
        keyPagesLimit: 10,
        facetType: '',
        facetValue: '',
      });

      // ASSERT
      expect(result.count).toBe(0);
    });
  });
});
