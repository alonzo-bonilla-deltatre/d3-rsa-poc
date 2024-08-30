import { NextApiRequest, NextApiResponse } from 'next';
import renderDivaPlayerHeartbeat from '@/pages/api/diva/heartbeat';

describe('renderDivaPlayerHeartbeat', () => {
  it('should always return 200 status', () => {
    // ARRANGE
    const req = {} as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerHeartbeat(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('OK');
  });

  it('should not be affected by request body', () => {
    // ARRANGE
    const req = {
      body: { random: 'data' },
    } as unknown as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerHeartbeat(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('OK');
  });
});
