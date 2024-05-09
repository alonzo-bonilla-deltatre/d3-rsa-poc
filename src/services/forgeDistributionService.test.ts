import { sampleStory } from '@/__mocks__/entities/story';
import {
  ForgeDapiEntityCode,
  ForgeDistributionApiOption,
  ListAvailabilityOption,
  SortOrder,
} from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import axios from 'axios';
import { getAllEntities, getEntity, getEntityList, getSelection } from './forgeDistributionService';
import { enrichDistributionEntities as actualEnrichDistributionEntities } from '@/helpers/forgeDistributionEntityHelper';

jest.mock('axios');
jest.mock('@/utilities/loggerUtility');
jest.mock('@/helpers/forgeDistributionEntityHelper', () => ({
  ...jest.requireActual('@/helpers/forgeDistributionEntityHelper'),
  enrichDistributionEntities: jest.fn(),
}));

const enrichDistributionEntities = actualEnrichDistributionEntities as jest.Mock;

const defaultSortQueryString = '&$sort=contentDate';
const urlBase = process.env.FORGE_DISTRIBUTION_API_BASE_URL;

describe('forgeDistributionService', () => {
  const mockAxiosGet = axios.get as jest.Mock;
  const mockLogger = logger.log as jest.Mock;

  describe('getEntity', () => {
    it('should retrieve and enrich entity data successfully', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: sampleStory });
      (enrichDistributionEntities as jest.Mock).mockResolvedValueOnce([sampleStory]);

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'example-of-a-story');

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/stories/example-of-a-story`
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], null);
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
        `${urlBase}/v2/content/en-GB/stories/example-of-a-story`
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
        `${urlBase}/v2/content/en-GB/stories/example-of-a-story`
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getEntity(ForgeDapiEntityCode.stories, 'xxx');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = urlBase;
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
        `${urlBase}/v2/content/en-GB/stories?$skip=5&$limit=10` +
          defaultSortQueryString
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

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
        `${urlBase}/v2/content/en-GB/stories?$skip=5&$limit=10` +
          defaultSortQueryString
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
    });

    it('should retrieve and enrich entities data successfully with fieldOptions', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 10,
        skip: 5,
        variables: [],
        fields: { videoStatus: 'Scheduled' },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$skip=5&$limit=10&fields.videoStatus=Scheduled` +
          defaultSortQueryString
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should retrieve and enrich entities data successfully with sorting by fields', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 10,
        variables: [],
        sort: {
          field: 'scheduledStartTime',
          order: SortOrder.ASC,
        },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$limit=10&$sort=fields.scheduledStartTime:asc`
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should retrieve and enrich entities data successfully with sorting by prop', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 10,
        variables: [],
        sort: {
          prop: 'contentDate',
          order: SortOrder.DESC,
        },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$limit=10&$sort=contentDate:desc`
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should retrieve and enrich entities data successfully with range values', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 20,
        variables: [],
        range: { field: 'fields.scheduledStartTime', startDate: '2023-10-10' },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT

      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$limit=20${defaultSortQueryString}&fields.scheduledStartTime=$range(2023-10-10,)`
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should retrieve and do not enrich entities data with range object with an empty startDate string and no endDate', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 20,
        variables: [],
        range: { field: 'fields.scheduledStartTime', startDate: '' },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$limit=20` +
          defaultSortQueryString
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should retrieve and do not enrich entities data with range obj with an empty endDate string and no startDate', async () => {
      // ARRANGE
      const queryOptions: ForgeDistributionApiOption = {
        limit: 20,
        variables: [],
        range: { field: 'fields.scheduledStartTime', endDate: '' },
      };
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/divavideos?$limit=20` +
          defaultSortQueryString
      );

      expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getAllEntities(ForgeDapiEntityCode.stories);

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = urlBase;
    });
  });

  it('should retrieve and enrich entities data successfully with context', async () => {
    // ARRANGE
    const queryOptions: ForgeDistributionApiOption = {
      variables: [],
      context: 'highlighted-videos',
    };
    mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

    // ACT
    await getAllEntities(ForgeDapiEntityCode.divaVideos, queryOptions);

    // ASSERT
    expect(mockAxiosGet).toHaveBeenCalledWith(
      `${urlBase}/v2/content/en-GB/divavideos?context.slug=highlighted-videos` +
        defaultSortQueryString
    );

    expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
  });

  it('should retrieve and enrich entities data successfully with listAvailability params', async () => {
    // ARRANGE
    const queryOptions: ForgeDistributionApiOption = {
      variables: [],
      listAvailability: ListAvailabilityOption.unlisted,
    };
    mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

    // ACT
    await getAllEntities(ForgeDapiEntityCode.stories, queryOptions);

    // ASSERT
    expect(mockAxiosGet).toHaveBeenCalledWith(
      `${urlBase}/v2/content/en-GB/stories?$sort=contentDate&_listAvailability=1`
    );

    expect(enrichDistributionEntities).toHaveBeenCalledWith([sampleStory], queryOptions);
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
        `${urlBase}/v2/content/en-GB/sel-test-editorial-list?$sort=contentDate`
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

      expect(enrichDistributionEntities).toBeCalledTimes(0);
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getSelection('xxx');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = urlBase;
    });
  });

  describe('getEntityList', () => {
    it('should call getSelection if selectionSlug argument has been provided', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });
      (enrichDistributionEntities as jest.Mock).mockResolvedValueOnce([sampleStory]);

      // ACT
      const result = await getEntityList('test-editorial-list', ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/sel-test-editorial-list?$sort=contentDate`
      );
      expect(result).not.toBeNull();
    });

    it('should call getAllEntities if selectionSlug argument is empty', async () => {
      // ARRANGE
      mockAxiosGet.mockResolvedValueOnce({ data: { items: [sampleStory] } });

      // ACT
      const result = await getEntityList('', ForgeDapiEntityCode.stories);

      // ASSERT
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${urlBase}/v2/content/en-GB/stories?$sort=contentDate`
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
        `${urlBase}/v2/content/en-GB/stories?$sort=contentDate`
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
        `${urlBase}/v2/content/en-GB/sel-test-editorial-list?$sort=contentDate`
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
        `${urlBase}/v2/content/en-GB/stories?$sort=contentDate`
      );
      expect(result).not.toBeNull();
    });
    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = undefined;

      // ACT
      const result = await getEntityList('xxx', null);

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(
        expect.stringMatching('FORGE DISTRIBUTION API Error'),
        LoggerLevel.error
      );
      process.env.FORGE_DISTRIBUTION_API_BASE_URL = urlBase;
    });
  });
});
