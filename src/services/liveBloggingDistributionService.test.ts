import { sampleBlog, sampleBlogs, samplePost } from '@/__mocks__/entities/sampleLiveblogging';
import axios from 'axios';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { getBlogEntity, getBlogPost, getBlogs } from '@/services/liveBloggingDistributionService';
import { enrichDistributionEntities } from '@/helpers/liveBloggingBlogEntityHelper';
import { LiveBloggingDistributionApiOption } from '@/models/types/liveblogging';

jest.mock('axios');
jest.mock('@/utilities/loggerUtility');
jest.mock('@/helpers/liveBloggingBlogEntityHelper', () => {
  const actual = jest.requireActual('@/helpers/liveBloggingBlogEntityHelper');
  return {
    ...actual,
    enrichDistributionEntities: jest.fn(),
  };
});

const urlBase = process.env.LIVE_BLOGGING_DAPI_BASE_URL;

describe('liveBloggingDistributionService', () => {
  const mockAxiosGet = axios.get as jest.Mock;
  const mockLogger = logger.log as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogEntity', () => {
    it('should retrieve and enrich entity data successfully', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: sampleBlog });

      // ACT
      await getBlogEntity('sample-blog');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(`${urlBase}/api/distribution/v1/en-GB/Blogs/sample-blog`);
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getBlogEntity('sample-blog');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );
    });

    it('should handle error responses with data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({
        message: 'unauthorized',
        data: {
          status: 401,
          title: 'unauthorized',
        },
      });

      // ACT
      await getBlogEntity('sample-blog');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ARRANGE
      const apiUrl = process.env.LIVE_BLOGGING_DAPI_BASE_URL;
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = undefined;

      // ACT
      const result = await getBlogEntity('sample-blog');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = apiUrl;
    });
  });

  describe('getBlogs', () => {
    it('should retrieve and enrich entity data successfully with skip e limit', async () => {
      // ARRANGE
      const queryOptions: LiveBloggingDistributionApiOption = {
        limit: 1,
        skip: 1,
        variables: [],
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: sampleBlogs } });

      // ACT
      await getBlogs(queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(`${urlBase}/api/distribution/v1/en-GB/Blogs?$skip=1&$limit=1`);

      expect(enrichDistributionEntities).toHaveBeenCalledWith(sampleBlogs, queryOptions);
    });

    it('should retrieve and enrich entity data successfully without options', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: sampleBlogs } });

      // ACT
      await getBlogs();

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(`${urlBase}/api/distribution/v1/en-GB/Blogs`);

      expect(enrichDistributionEntities).toHaveBeenCalledWith(sampleBlogs, null);
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getBlogs();

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toHaveBeenCalledTimes(0);
    });

    it('should handle error responses with data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({
        message: 'unauthorized',
        data: {
          status: 401,
          title: 'unauthorized',
        },
      });

      // ACT
      await getBlogs();

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toHaveBeenCalledTimes(0);
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ARRANGE
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = undefined;

      // ACT
      const result = await getBlogs();

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = urlBase;
    });
  });

  describe('getBlogPost', () => {
    it('should retrieve and enrich entity data successfully with skip e limit', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: samplePost });

      // ACT
      await getBlogPost('sample-blog', 'test-post-id');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/api/distribution/v1/en-GB/Blogs/sample-blog/Posts/test-post-id`
      );
    });

    it('should retrieve and enrich entity data successfully without options', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: samplePost });

      // ACT
      await getBlogPost('sample-blog', 'test-post-id');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/api/distribution/v1/en-GB/Blogs/sample-blog/Posts/test-post-id`
      );
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getBlogPost('sample-blog', 'test-post-id');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );
    });

    it('should handle error responses with data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({
        message: 'unauthorized',
        data: {
          status: 401,
          title: 'unauthorized',
        },
      });

      // ACT
      await getBlogPost('sample-blog', 'test-post-id');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ARRANGE
      const apiUrl = process.env.LIVE_BLOGGING_DAPI_BASE_URL;
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = undefined;

      // ACT
      const result = await getBlogPost('sample-blog', 'test-post-id');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('LIVEBLOGGING DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.LIVE_BLOGGING_DAPI_BASE_URL = apiUrl;
    });
  });
});
