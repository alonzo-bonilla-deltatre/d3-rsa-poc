import { sampleStory } from '@/__mocks__/entities/story';
import axios from 'axios';
import { enrichDistributionEntities } from '@/helpers/forgeDistributionEntityHelper';
import { getEntity, getAllEntities, getSelection, getEntityList } from './forgeDistributionService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { ForgeApiError } from '@/models/types/errors';
import { ForgeDistributionApiOption } from '@/models/types/forge';

jest.mock('axios');
jest.mock('@/utilities/logger');
jest.mock('@/helpers/forgeDistributionEntityHelper', () => {
  const actual = jest.requireActual('@/helpers/forgeDistributionEntityHelper');
  return {
    ...actual,
    enrichDistributionEntities: jest.fn(),
  };
});

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

      // ACT
      await getEntity('stories', 'example-of-a-story');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories/example-of-a-story'
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], null);
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getEntity('stories', 'example-of-a-story');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('FORGE DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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
      await getEntity('stories', 'example-of-a-story');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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
      await getAllEntities('stories', queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/stories?$skip=5&$limit=10'
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should handle error responses with no data', async () => {
      // ARRANGE
      mockAxiosGet.mockRejectedValueOnce({ message: 'unauthorized' });

      // ACT
      await getAllEntities('stories');

      // ASSERT
      expect(mockLogger).toHaveBeenLastCalledWith(
        expect.stringContaining('FORGE DISTRIBUTION API Error: unauthorized'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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
      await getAllEntities('stories');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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
      await getSelection('test-editorial-list');

      // ASSERT
      expect(mockLogger).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('FORGE DISTRIBUTION API Error status:'),
        LoggerLevel.error
      );

      expect(enrichDistributionEntities).toBeCalledTimes(0);
    });
  });

  describe('getEntityList', () => {
    it('should call getSelection if selectionSlug argument has been provided', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList('test-editorial-list', 'stories');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-GB/sel-test-editorial-list'
      );
      expect(result).not.toBeNull();
    });

    it('should call getAllEntities if selectionSlug argument is empty', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList('', 'stories');

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
      const result = await getEntityList(null, 'stories');

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
  });
});
