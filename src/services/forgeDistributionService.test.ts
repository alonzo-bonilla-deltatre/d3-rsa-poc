import { sampleStory } from '@/__mocks__/entities/story';
import axios from 'axios';
import { getAllEntities, getEntity, getEntityList, getSelection } from './forgeDistributionService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { ForgeDapiEntityCode, ForgeDistributionApiOption } from '@/models/types/forge';
import { enrichDistributionEntities } from '@/helpers/forgeDistributionEntityHelper';

jest.mock('axios');
jest.mock('@/utilities/logger');
jest.mock('@/helpers/forgeDistributionEntityHelper', () => ({
  ...jest.requireActual('@/helpers/forgeDistributionEntityHelper'),
  enrichDistributionEntities: jest.fn(),
}));

describe('forgeDistributionService', () => {
  const mockAxiosGet = axios.get as jest.Mock;
  const mockLogger = logger.log as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEntity', () => {
    it('should retrieve and enrich entity data successfully', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: sampleStory });
      (enrichDistributionEntities as jest.Mock).mockResolvedValueOnce([sampleStory]);

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories/example-of-a-story'
      );
      expect(result).not.toBeNull();
      expect(result).toBe(sampleStory);
    });
    it('should return null if enrichDistributionEntities return empty array', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: sampleStory });
      (enrichDistributionEntities as jest.Mock).mockResolvedValueOnce([]);

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories/example-of-a-story'
      );
      expect(result).toBeNull();
    });
    it('should retrieve null if no results', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: null });

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories/example-of-a-story'
      );
      expect(result).toBeNull();
    });
    it('should retrieve null if no slug', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: null });

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories);

      // ASSERT
      expect(result).toBeNull();
    });
    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('FORGE DISTRIBUTION API Error: unauthorized'),
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
      await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );
    });
    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      const apiUrl = process.env.FORGE_DISTRIBUTION_API_BASE_URL;
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'xxx');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = apiUrl;
    });
  });

  describe('getAllEntities', () => {
    it('should retrieve and enrich entities data successfully', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 10,
        skip: 5,
        variables: [],
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.stories, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories?$skip=5&$limit=10'
      );
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('FORGE DISTRIBUTION API Error: unauthorized'),
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
      await getAllEntities(ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );
    });
    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      const apiUrl = process.env.FORGE_DISTRIBUTION_API_BASE_URL;
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getAllEntities(ForgeDapiEntityCode.stories);

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = apiUrl;
    });
  });

  describe('getSelection', () => {
    it('should retrieve and enrich selection entities successfully', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        variables: [],
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getSelection('test-editorial-list', queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/sel-test-editorial-list'
      );
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getSelection('test-editorial-list');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('FORGE DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );
    });
    it('should return null with empty slug', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      const result = await getSelection('');

      // ASSERT
      expect(result).toBe(null);
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
      await getSelection('test-editorial-list');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );
    });
    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      const apiUrl = process.env.FORGE_DISTRIBUTION_API_BASE_URL;
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getSelection('xxx');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = apiUrl;
    });
  });

  describe('getEntityList', () => {
    it('should call getSelection if selectionSlug argument has been provided', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList('test-editorial-list', ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/sel-test-editorial-list'
      );
    });

    it('should call getAllEntities if selectionSlug argument is empty', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList('', ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories'
      );
      expect(result).not.toBeNull();
    });

    it('should call getAllEntities if selectionSlug argument is null', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList(null, ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories'
      );
      expect(result).not.toBeNull();
    });

    it('should should return null if both selectionSlug and type arguments are not valid', async () => {
      // ACT
      const result = await getEntityList(null, null);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledTimes(0);
      expect(result).toBeNull();
    });

    it('should return a PagedResult by selectionSlug if has pagination', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({
        data: {
          items: [sampleStory],
          pagination: {
            nextUrl: 'next-url',
            previousUrl: 'previous-url',
            maxItems: 10,
            page: 1,
            hasPagination: true,
          },
        },
      });

      // ACT
      const result = await getEntityList('test-editorial-list', null, { hasPagination: true });

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/sel-test-editorial-list'
      );
      expect(result).not.toBeNull();
    });
    it('should return a PagedResult by getAllEntities if has pagination', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({
        data: {
          items: [sampleStory],
          pagination: {
            nextUrl: 'next-url',
            previousUrl: 'previous-url',
            maxItems: 10,
            page: 1,
            hasPagination: true,
          },
        },
      });

      // ACT
      const result = await getEntityList('', ForgeDapiEntityCode.stories, { hasPagination: true });

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories'
      );
      expect(result).not.toBeNull();
    });
    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      const apiUrl = process.env.FORGE_DISTRIBUTION_API_BASE_URL;
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getEntityList('xxx', null);

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = apiUrl;
    });
  });
});
