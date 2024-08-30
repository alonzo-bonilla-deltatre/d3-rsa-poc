import sitemapHandler from '@/pages/api/sitemaps/sitemap';
import { getSiteStructureXml } from '@/services/sitemapService';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/services/sitemapService');

describe('/api/sitemap', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockReq = {} as NextApiRequest;
  let mockRes: any;

  beforeEach(() => {
    mockRes = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  test('should return XML and 200 status when getSitestructureXml is successful', async () => {
    // ARRANGE
    const mockXml =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
    (getSiteStructureXml as jest.Mock).mockResolvedValue(mockXml);

    // ACT
    await sitemapHandler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml');
    expect(mockRes.send).toHaveBeenCalledWith(mockXml);
  });

  test('should throw an error and return 500 status when getSitestructureXml returns null', async () => {
    // ARRANGE
    (getSiteStructureXml as jest.Mock).mockResolvedValue(null);

    // ACT
    await sitemapHandler(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error');
  });
});
