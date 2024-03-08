import { ForgeDapiEntityCode, ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getAllEntities } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler for getting all entities of a specific type.
 *
 * This handler takes a Next.js API request and response, and uses the entity code from the request query
 * to fetch all entities of that type from the Forge Distribution Service.
 * It also includes link rules, a thumbnail placeholder, and pagination options in the request options.
 *
 * If the entities are fetched successfully, they are returned in the response as JSON.
 * If an error occurs, it is logged and a 500 status code is sent in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response: PagedResult | null = await getAllEntities(
      req.query.entityCode as ForgeDapiEntityCode,
      {
        hasLinkRules: true,
        hasLinkRulesForRelationsAndParts: true,
        hasThumbnailPlaceholder: true,
        skip: req.query.skip ?? 0,
        limit: req.query.limit ?? 0,
        tags: req.query.tags ?? '',
        dateFrom: req.query.dateFrom ?? '',
      } as ForgeDistributionApiOption
    );

    res.json(response);
    res.end();
  } catch (error: unknown) {
    logger.log(`Error rendering DAPI getAllEntities ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send(error);
  }
};

export default handler;
