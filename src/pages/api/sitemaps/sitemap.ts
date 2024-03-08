import { NextApiRequest, NextApiResponse } from 'next';
import { getSiteStructureXml } from '@/services/sitemapService';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';

/**
 * Handler for the sitemap API route.
 *
 * This handler processes requests to the sitemap API route. It fetches the site structure XML,
 * sets the 'Content-Type' and 'Cache-Control' headers, and sends the XML in the response.
 *
 * If the XML is not fetched successfully, it logs an error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const sitemapHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const xml = await getSiteStructureXml();

    if (!xml) throw new Error('No site structure data found!');

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'max-age=120');
    res.status(200).send(xml);
  } catch (error: unknown) {
    logger.log(`Error rendering sitemap.xml: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal Server Error');
  }
};

export default sitemapHandler;
