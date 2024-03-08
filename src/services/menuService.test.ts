import axios from 'axios';
import { getMenuStructure } from '@/services/menuService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { sampleMenu } from '@/__mocks__/menu/sampleMenu';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;
const pathPlaceholder = 'path';
const tokenPlaceholder = 'token';

jest.mock('axios');
jest.mock('@/utilities/logger');

describe('getMenuStructure', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the default API URL', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getMenuStructure();

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Menu?path=&culture=${culture}&environment=${environment}`,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });

  it('should call the right API URL without token', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getMenuStructure(pathPlaceholder);

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}`,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });
  it('should call the right API URL without token and path', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getMenuStructure('');

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Menu?path=&culture=${culture}&environment=${environment}`,
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
    await getMenuStructure(pathPlaceholder, tokenPlaceholder);

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/Menu?path=${pathPlaceholder}&culture=${culture}&environment=${environment}&token=${tokenPlaceholder}`,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });

  it('should return menu structure if menu structure object contains all the required properties', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue(sampleMenu);

    // ACT
    const result = await getMenuStructure(pathPlaceholder);

    // ASSERT
    expect(result?.data?.name).not.toBeNull();
    expect(result?.data?.path).not.toBeNull();
    expect(result?.data?.items).not.toBeNull();
    expect(result?.data?.variables).not.toBeNull();
  });

  it('should return null in case of exception', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockRejectedValueOnce({});

    // ACT
    const result = await getMenuStructure(pathPlaceholder);

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
        message: errorMessage,
        detail: 'More details',
      },
    });

    // ACT
    const result = await getMenuStructure(pathPlaceholder);

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringContaining('More details'), LoggerLevel.error);
  });

  it('should return null in case of exception for empty url and return null', async () => {
    // ASSERT
    const apiUrl = process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL;
    process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL = undefined;

    // ACT
    const result = await getMenuStructure(pathPlaceholder);

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(
      expect.stringMatching('PAGE BUILDER FRONTEND API Error'),
      LoggerLevel.error
    );
    process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL = apiUrl;
  });
});
