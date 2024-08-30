import { ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getSelection } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler for getting a specific selection by its slug.
 *
 * This handler takes a Next.js API request and response, and uses the slug from the request query
 * to fetch the corresponding selection from the Forge Distribution Service.
 * It also includes link rules, a thumbnail placeholder, and pagination options in the request options.
 *
 * If the selection is fetched successfully, it is returned in the response as JSON.
 * If an error occurs, it is logged and a 500 status code is sent in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const response: PagedResult | null = await getSelection(
      req.query.selectionSlug as string,
      {
        hasLinkRules: true,
        hasLinkRulesForRelationsAndParts: true,
        hasThumbnailPlaceholder: true,
        skip: req.query.skip ?? 0,
        limit: req.query.limit ?? 0,
        tags: req.query.tags ?? '',
      } as ForgeDistributionApiOption
    );

    res.json(response);
    res.end();
  } catch (error: unknown) {
    logger.log(`Error rendering DAPI getSelection : ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send(error);
  }
};

export default handler;
