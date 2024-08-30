import { DistributionEntity, ForgeDapiEntityCode, ForgeDistributionApiOption } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler for getting a specific entity by its entity code and slug.
 *
 * This handler takes a Next.js API request and response, and uses the entity code and slug from the request query
 * to fetch the corresponding entity from the Forge Distribution Service.
 * It also includes link rules and a thumbnail placeholder in the request options.
 *
 * If the entity is fetched successfully, it is returned in the response as JSON.
 * If an error occurs, it is logged and a 500 status code is sent in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const response: DistributionEntity | null = await getEntity(
      req.query.entityCode as ForgeDapiEntityCode,
      req.query.slug as string,
      {
        hasLinkRules: true,
        hasLinkRulesForRelationsAndParts: true,
        hasThumbnailPlaceholder: true,
      } as ForgeDistributionApiOption
    );

    res.json(response);
    res.end();
  } catch (error: unknown) {
    logger.log(`Error rendering DAPI getEntity : ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send(error);
  }
};

export default handler;
