import { LoggerLevel } from '@/models/types/logger';
import { getSitemapIndexXml } from '@/services/sitemapService';
import logger from '@/utilities/loggerUtility';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler for the sitemap index API route.
 *
 * This handler processes requests to the sitemap index API route. It fetches the sitemap index XML,
 * sets the 'Content-Type' and 'Cache-Control' headers, and sends the XML in the response.
 *
 * If the XML is not fetched successfully, it logs an error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const SitemapIndex = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const xml = await getSitemapIndexXml();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(200).send(xml);
  } catch (error) {
    logger.log(`Error rendering sitemap-index.xml: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal Server Error');
  }
};

export default SitemapIndex;
