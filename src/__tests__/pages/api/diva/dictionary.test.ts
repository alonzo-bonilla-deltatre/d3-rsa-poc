import { NextApiRequest, NextApiResponse } from 'next';
import renderDivaPlayerDictionary from '@/pages/api/diva/dictionary';
import { getDivaPlayerDictionary } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@/services/divaPlayerService');
jest.mock('@/utilities/loggerUtility');

describe('renderDivaPlayerDictionary', () => {
  it('returns 200 status when dictionary is found', () => {
    (getDivaPlayerDictionary as jest.Mock).mockReturnValue({ dictionary: 'valid' });

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    renderDivaPlayerDictionary(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ dictionary: 'valid' });
  });

  it('returns 500 status when dictionary is not found', () => {
    (getDivaPlayerDictionary as jest.Mock).mockReturnValue(null);

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    renderDivaPlayerDictionary(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it('logs error and returns 500 status when an exception occurs', () => {
    (getDivaPlayerDictionary as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    renderDivaPlayerDictionary(req, res);

    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching('Error rendering Diva Player Dictionary'),
      LoggerLevel.error
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal server error');
  });
});
