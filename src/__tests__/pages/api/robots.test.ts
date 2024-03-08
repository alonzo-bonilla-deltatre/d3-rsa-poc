import renderRobots from '@/pages/api/robots';
import { getRobotsTxt } from '@/services/robotsService';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/services/robotsService', () => ({
  getRobotsTxt: jest.fn(),
}));

const mockReq = {} as NextApiRequest;
let mockRes: any;

describe('renderRobots', () => {
  beforeEach(() => {
    mockRes = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the robots.txt content', async () => {
    // ARRANGE
    const mockRobotsTxtContent = 'User-agent: *\nDisallow: /';

    (getRobotsTxt as jest.Mock).mockResolvedValueOnce(mockRobotsTxtContent);

    // ACT
    await renderRobots(mockReq, mockRes);

    // ASSERT
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockRes.write).toHaveBeenCalledWith(mockRobotsTxtContent);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should render the robots.txt content empty if is empty', async () => {
    // ARRANGE
    const mockRobotsTxtContent = '';

    (getRobotsTxt as jest.Mock).mockResolvedValueOnce(mockRobotsTxtContent);

    // ACT
    await renderRobots(mockReq, mockRes);

    // ASSERT
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockRes.write).toHaveBeenCalledWith(mockRobotsTxtContent);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should render the robots.txt content empty if is undefined', async () => {
    // ARRANGE
    const mockRobotsTxtContent = '';

    (getRobotsTxt as jest.Mock).mockResolvedValueOnce(undefined);

    // ACT
    await renderRobots(mockReq, mockRes);

    // ASSERT
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockRes.write).toHaveBeenCalledWith(mockRobotsTxtContent);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    // ARRANGE
    const mockError = new Error('Mock error');

    (getRobotsTxt as jest.Mock).mockRejectedValueOnce(mockError);

    // ACT
    await renderRobots(mockReq, mockRes);
    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
  });
});
