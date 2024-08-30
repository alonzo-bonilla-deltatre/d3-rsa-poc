import { NextApiRequest, NextApiResponse } from 'next';
import renderDivaPlayerSetting from '@/pages/api/diva/settings/[type]/html5';
import { getDivaPlayerSetting } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { VideoType } from '@/models/types/diva';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@/services/divaPlayerService');
jest.mock('@/utilities/loggerUtility');

describe('renderDivaPlayerSetting', () => {
  it('returns 200 status when setting is found', () => {
    // ARRANGE
    (getDivaPlayerSetting as jest.Mock).mockReturnValue({ setting: 'valid' });

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerSetting(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ setting: 'valid' });
  });

  it('returns 500 status when setting is not found', async () => {
    // ARRANGE
    (getDivaPlayerSetting as jest.Mock).mockReturnValue(null);

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerSetting(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it('logs error and returns 500 status when an exception occurs', async () => {
    // ARRANGE
    (getDivaPlayerSetting as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    const req = { body: {}, query: { type: VideoType.vod } } as unknown as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerSetting(req, res);

    // ASSERT
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching('Error rendering Diva Player Setting for vod'),
      LoggerLevel.error
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal server error');
  });
});
