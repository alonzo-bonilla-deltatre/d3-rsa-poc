import { sampleBlog, samplePost } from '@/__mocks__/entities/sampleLiveblogging';
import axios from 'axios';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { ForgeApiError } from '@/models/types/errors';
import { getBlogEntity, getBlogPosts } from './liveBloggingDistributionService';
import { addLiveBloggingWidgetConfig } from '@/helpers/liveBloggingDistributionEntityHelper';
import { ForgeDistributionApiOption } from '@/models/types/forge';

jest.mock('axios');
jest.mock('@/utilities/logger');
jest.mock('@/helpers/liveBloggingDistributionEntityHelper', () => {
  const actual = jest.requireActual('@/helpers/liveBloggingDistributionEntityHelper');
  return {
    ...actual,
    addLiveBloggingWidgetConfig: jest.fn(),
  };
});

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
      await getBlogEntity('sample-blog', true);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://liveblogging.integrations-lab-forge.deltatre.digital/api/distribution/v1/en-GB/Blogs/sample-blog'
      );

      expect(addLiveBloggingWidgetConfig).toHaveBeenCalledWith(
        sampleBlog,
        'https://liveblogging.integrations-lab-forge.deltatre.digital',
        'en-GB',
        'sample-blog',
        true
      );
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getBlogEntity('sample-blog', true);

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );

      expect(addLiveBloggingWidgetConfig).toBeCalledTimes(0);
    });

    it('should handle error responses with data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({
        message: 'unauthorized',
        data: {
          status: 401,
          title: 'unauthorized',
        } as ForgeApiError,
      });

      // ACT
      await getBlogEntity('sample-blog', true);

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );

      expect(addLiveBloggingWidgetConfig).toBeCalledTimes(0);
    });
  });

  describe('getBlogPosts', () => {
    it('should retrieve and enrich entity data successfully with skip e limit', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 1,
        skip: 1,
        variables: [],
      };
      mockAxiosGet.mockResolvedValueOnce({ data: samplePost });

      // ACT
      await getBlogPosts('sample-blog', true, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://liveblogging.integrations-lab-forge.deltatre.digital/api/distribution/v1/en-GB/Blogs/sample-blog/Posts?$skip=1&$limit=1'
      );

      expect(addLiveBloggingWidgetConfig).toHaveBeenCalledWith(
        samplePost,
        'https://liveblogging.integrations-lab-forge.deltatre.digital',
        'en-GB',
        'sample-blog',
        true
      );
    });

    it('should retrieve and enrich entity data successfully without options', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 0,
        skip: 0,
        variables: [],
      };
      mockAxiosGet.mockResolvedValueOnce({ data: samplePost });

      // ACT
      await getBlogPosts('sample-blog', true, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://liveblogging.integrations-lab-forge.deltatre.digital/api/distribution/v1/en-GB/Blogs/sample-blog/Posts'
      );

      expect(addLiveBloggingWidgetConfig).toHaveBeenCalledWith(
        samplePost,
        'https://liveblogging.integrations-lab-forge.deltatre.digital',
        'en-GB',
        'sample-blog',
        true
      );
    });

    it('should retrieve and enrich entity data successfully', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: samplePost });

      // ACT
      await getBlogPosts('sample-blog', true);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://liveblogging.integrations-lab-forge.deltatre.digital/api/distribution/v1/en-GB/Blogs/sample-blog/Posts'
      );

      expect(addLiveBloggingWidgetConfig).toHaveBeenCalledWith(
        samplePost,
        'https://liveblogging.integrations-lab-forge.deltatre.digital',
        'en-GB',
        'sample-blog',
        true
      );
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getBlogPosts('sample-blog', true, null);

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );

      expect(addLiveBloggingWidgetConfig).toBeCalledTimes(0);
    });

    it('should handle error responses with data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({
        message: 'unauthorized',
        data: {
          status: 401,
          title: 'unauthorized',
        } as ForgeApiError,
      });

      // ACT
      await getBlogPosts('sample-blog', true, null);

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('LIVEBLOGGING DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );

      expect(addLiveBloggingWidgetConfig).toBeCalledTimes(0);
    });
  });
});
