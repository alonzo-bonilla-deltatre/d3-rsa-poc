import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { getPageStructure } from '@/services/pageService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { indexStructure } from '@/__mocks__/pageStructures';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;
const pathPlaceholder = 'path';
const tokenPlaceholder = 'token';

jest.mock('axios');
jest.mock('@/utilities/logger');

describe('getPageStructure', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the right API URL without token', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getPageStructure(pathPlaceholder);

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });

  it('should call the right API URL with token', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getPageStructure(pathPlaceholder, tokenPlaceholder);

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Page?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });

  it('should return page structure if page structure object contains all the required properties', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue(indexStructure);

    // ACT
    const result = await getPageStructure(pathPlaceholder);

    // ASSERT
    expect(result?.data?.structure).not.toBeNull();
    expect(result?.data?.variables).not.toBeNull();
    expect(result?.data?.metadata).not.toBeNull();
  });

  it('should return null in case of exception', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockRejectedValueOnce({});

    // ACT
    const result = await getPageStructure(pathPlaceholder);

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return null in case of exception and log the response data if available', async () => {
    // ASSERT
    const errorMessage = 'Unauthorized';
    (axios.get as jest.Mock).mockRejectedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
      data: {
        error: { message: errorMessage },
      },
    });

    // ACT
    const result = await getPageStructure(pathPlaceholder);

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
  });
});
