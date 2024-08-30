import { NextApiRequest, NextApiResponse } from 'next';
import renderDivaPlayerEntitlement from '@/pages/api/diva/entitlement';
import { getDivaPlayerEntitlement } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@/services/divaPlayerService');
jest.mock('@/utilities/loggerUtility');

describe('renderDivaPlayerEntitlement', () => {
  it('returns 200 status when entitlement is found', () => {
    // ARRANGE
    (getDivaPlayerEntitlement as jest.Mock).mockReturnValue({ entitlement: 'valid' });

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerEntitlement(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ entitlement: 'valid' });
  });

  it('returns 500 status when entitlement is not found', () => {
    // ARRANGE
    (getDivaPlayerEntitlement as jest.Mock).mockReturnValue(null);

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerEntitlement(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it('logs error and returns 500 status when an exception occurs', () => {
    // ARRANGE
    (getDivaPlayerEntitlement as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    const req = { body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), end: jest.fn() } as unknown as NextApiResponse;

    // ACT
    renderDivaPlayerEntitlement(req, res);

    // ASSERT
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching('Error rendering Diva Player Entitlement'),
      LoggerLevel.error
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal server error');
  });
});
