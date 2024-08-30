import { NextApiRequest, NextApiResponse } from 'next';
import { getSitemapEntityXml } from '@/services/sitemapService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

/**
 * Handler for the entity sitemap API route.
 *
 * This handler processes requests to the entity sitemap API route. It fetches the sitemap entity XML based on the sitemap name from the request query,
 * sets the 'Content-Type' and 'Cache-Control' headers, and sends the XML in the response.
 *
 * If the sitemap name is not provided, it sends a 404 status code and an error message in the response.
 * If the XML is not fetched successfully, it sends a 404 status code and an error message in the response.
 * If an error occurs, it logs the error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const entitySitemapHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { sitemapName } = req.query;

  if (!sitemapName) {
    res.status(404).send(`No sitemap found: ${sitemapName}`);
    return;
  }
  try {
    const xml = await getSitemapEntityXml(sitemapName as string);

    if (!xml) {
      res.status(404).send(`No data found`);
      return;
    }

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'max-age=120');
    res.status(200).send(xml);
  } catch (error) {
    logger.log(`Error rendering sitemap-${sitemapName}.xml: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal Server Error');
  }
};

export default entitySitemapHandler;
