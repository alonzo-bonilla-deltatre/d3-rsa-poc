import SitemapIndex from '@/pages/api/sitemaps/sitemap-index';
import { getSitemapIndexXml } from '@/services/sitemapService';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/services/sitemapService');

describe('/api/sitemap-index', () => {
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

  test('should return XML and 200 status when getSitemapIndexXml is successful', async () => {
    // ARRANGE
    const mockXml = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex></sitemapindex>';
    (getSitemapIndexXml as jest.Mock).mockResolvedValue(mockXml);

    // ACT
    await SitemapIndex(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml');
    expect(mockRes.send).toHaveBeenCalledWith(mockXml);
  });

  test('should return 500 status when getSitemapIndexXml throws an error', async () => {
    // ARRANGE
    (getSitemapIndexXml as jest.Mock).mockRejectedValue(new Error('Error generating sitemap index'));

    // ACT
    await SitemapIndex(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error');
  });
});
