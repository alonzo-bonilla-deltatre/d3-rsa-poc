import { NextApiRequest, NextApiResponse } from 'next';
import { LoggerLevel } from '@/models/types/logger';
import { getManifestJson } from '@/services/manifestService';
import logger from '@/utilities/logger';
import { ManifestResponse } from '@/models/types/manifest';

/**
 * Handler for the manifest API route.
 *
 * This handler processes requests to the manifest API route. It fetches the manifest JSON,
 * sets the 'Content-Type' and 'Cache-Control' headers, and sends the JSON in the response.
 *
 * If the JSON is not fetched successfully, it logs an error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const renderManifest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const manifestContent: ManifestResponse | null = await getManifestJson();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=120');
    res.send(manifestContent ?? '');
    res.end();
  } catch (error: unknown) {
    logger.log(`Error rendering manifest.json: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal server error');
  }
};

export default renderManifest;
