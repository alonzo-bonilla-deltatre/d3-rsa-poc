import { NextApiRequest, NextApiResponse } from 'next';
import { getPageData } from '@/app/pageHelpers';
import healthCheck, { HealthzStatus } from '@/pages/api/healthz/live';
import { indexStructure } from '@/__mocks__/pageStructures';

jest.mock('@/app/pageHelpers', () => ({
  getPageData: jest.fn(),
}));

const mockReq = {} as NextApiRequest;
let mockRes: any;

describe('/healthz/live', () => {
  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 status', async () => {
    // ARRANGE
    (getPageData as jest.Mock).mockResolvedValueOnce(indexStructure);

    const mockResponse = {
      status: HealthzStatus.HEALTHY,
    };

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return 500 status', async () => {
    // ARRANGE
    (getPageData as jest.Mock).mockResolvedValueOnce(null);

    const mockResponse = {
      status: HealthzStatus.UNHEALTHY,
    };

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
    expect(mockRes.end).toHaveBeenCalled();
  });
});
