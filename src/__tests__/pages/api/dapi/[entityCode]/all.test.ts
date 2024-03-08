import { sampleStories } from '@/__mocks__/modules/sampleStories';
import { ForgeApiError } from '@/models/types/errors';
import handler from '@/pages/api/dapi/[entityCode]/all';
import { getAllEntities } from '@/services/forgeDistributionService';
import { NextApiRequest, NextApiResponse } from 'next';
import { ForgeEntityCode } from '@/models/types/forge';

jest.mock('@/services/forgeDistributionService', () => ({
  getAllEntities: jest.fn(),
}));

let mockReq = {} as NextApiRequest;
let mockRes: any;

describe('DAPI getAllEntities handler', () => {
  beforeEach(() => {
    mockRes = {
      end: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the appropriate JSON response', async () => {
    // ARRANGE
    const entityListResponse = { data: sampleStories };
    mockReq.query = {
      entityCode: ForgeEntityCode.story,
      skip: '1',
      limit: '1',
      tags: 'foo',
    };
    (getAllEntities as jest.Mock).mockResolvedValueOnce(entityListResponse);

    // ACT
    await handler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.json).toHaveBeenCalledWith(entityListResponse);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return the appropriate JSON response', async () => {
    // ARRANGE
    const entityListResponse = { sampleStories };
    mockReq.query = {
      entityCode: ForgeEntityCode.story,
    };
    (getAllEntities as jest.Mock).mockResolvedValueOnce(entityListResponse);

    // ACT
    await handler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.json).toHaveBeenCalledWith(entityListResponse);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('it should throw an error', async () => {
    // ARRANGE
    mockReq.query = {
      entityCode: ForgeEntityCode.story,
      skip: '1',
      limit: '1',
      tags: 'foo',
    };
    (getAllEntities as jest.Mock).mockRejectedValueOnce({
      message: 'Exception',
      data: {
        status: 500,
        title: 'Exception',
      } as ForgeApiError,
    });

    // ACT
    await handler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
