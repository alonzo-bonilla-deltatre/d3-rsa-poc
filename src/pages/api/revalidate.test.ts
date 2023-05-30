import { NextApiRequest, NextApiResponse } from 'next';
import revalidateHandler from '@/pages/api/revalidate';

describe('process.env', () => {
  let mockResponse: NextApiResponse;

  beforeEach(() => {
    mockResponse = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      revalidate: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 401 error if token is not valid', async () => {
    // ARRANGE
    const mockRequest = {
      headers: {
        token: 'foo',
      },
    } as unknown as NextApiRequest;

    // ACT
    await revalidateHandler(mockRequest, mockResponse);

    // ASSERT
    expect(mockResponse.status).toHaveBeenCalledWith(401);
  });

  it('should return 400 error if path query string empty', async () => {
    // ARRANGE
    const mockRequest = {
      headers: {
        token: 'test_token',
      },
      query: {
        path: '',
      },
    } as unknown as NextApiRequest;

    // ACT
    await revalidateHandler(mockRequest, mockResponse);

    // ASSERT
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('should return revalidate the path received', async () => {
    // ARRANGE
    const path = '/news/latest';
    const mockRequest = {
      headers: {
        token: 'test_token',
      },
      query: {
        path,
      },
    } as unknown as NextApiRequest;

    // ACT
    await revalidateHandler(mockRequest, mockResponse);

    // ASSERT
    expect(mockResponse.revalidate).toHaveBeenCalledWith(path);
    expect(mockResponse.json).toHaveBeenCalledWith({ revalidated: true });
  });

  it('should return 500 in case of generic error', async () => {
    // ARRANGE
    const path = '/news/latest';
    const mockRequest = {
      headers: {
        token: 'test_token',
      },
      query: {
        path,
      },
    } as unknown as NextApiRequest;
    (mockResponse.revalidate as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    // ACT
    await revalidateHandler(mockRequest, mockResponse);

    // ASSERT
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
