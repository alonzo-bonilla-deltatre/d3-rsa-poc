import entitySitemapHandler from '@/pages/api/sitemaps/sitemap-entity';
import { getSitemapEntityXml } from '@/services/sitemapService';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/services/sitemapService');

describe('/api/sitemaps/sitemap-entity', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  let mockReq: Partial<NextApiRequest>;
  let mockRes: any;

  beforeEach(() => {
    mockReq = { query: {} };
    mockRes = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  test('should return 404 status if sitemapName query parameter is not provided', async () => {
    // ACT
    await entitySitemapHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('No sitemap found: undefined');
  });

  test('should return XML and 200 status when getSitemapEntityXml is successful', async () => {
    // ARRANGE
    const mockXml = '<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>';
    mockReq.query!.sitemapName = 'test-sitemap';
    (getSitemapEntityXml as jest.Mock).mockResolvedValue(mockXml);

    // ACT
    await entitySitemapHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml');
    expect(mockRes.send).toHaveBeenCalledWith(mockXml);
  });

  test('should return 404 status when getSitemapEntityXml returns null', async () => {
    // ARRANGE
    mockReq.query!.sitemapName = 'empty-sitemap';
    (getSitemapEntityXml as jest.Mock).mockResolvedValue(null);

    // ACT
    await entitySitemapHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('No data found');
  });

  test('should return 500 status when getSitemapEntityXml throws an error', async () => {
    // ARRANGE
    mockReq.query!.sitemapName = 'test-sitemap';
    (getSitemapEntityXml as jest.Mock).mockRejectedValue(new Error('Error generating sitemap'));

    // ACT
    await entitySitemapHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error');
  });
});
