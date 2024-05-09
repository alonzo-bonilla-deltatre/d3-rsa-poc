import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/dapi/[entityCode]/[slug]';
import { sampleStory } from '@/__mocks__/entities/story';
import { getEntity } from '@/services/forgeDistributionService';
import { ForgeEntityCode } from '@/models/types/forge';

jest.mock('@/services/forgeDistributionService', () => ({
  getEntity: jest.fn(),
}));

let mockReq = {} as NextApiRequest;
let mockRes: any;

describe('DAPI getEntity handler', () => {
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
    mockReq.query = {
      entityCode: ForgeEntityCode.story,
      slug: 'foo',
    };

    (getEntity as jest.Mock).mockResolvedValueOnce(sampleStory);

    // ACT
    await handler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.json).toHaveBeenCalledWith(sampleStory);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('it should throw an error', async () => {
    // ARRANGE
    mockReq.query = {
      entityCode: ForgeEntityCode.story,
      slug: 'foo',
    };

    (getEntity as jest.Mock).mockRejectedValueOnce({
      message: 'Exception',
      data: {
        status: 500,
        title: 'Exception',
      },
    });

    // ACT
    await handler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
