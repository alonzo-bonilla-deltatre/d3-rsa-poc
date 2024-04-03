import { getPageData } from '@/helpers/pageHelper';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Enum for health check statuses.
 *
 * @readonly
 * @enum {string}
 */
export const HealthzStatus = {
  HEALTHY: 'Healthy',
  UNHEALTHY: 'Unhealthy',
};

/**
 * Handler for the health check API route.
 *
 * This handler processes requests to the health check API route. It fetches the page data for the root page,
 * and if the page data is successfully fetched, it sends a 200 status code and a JSON object with the status 'Healthy' in the response.
 * If the page data is not successfully fetched, it sends a 500 status code and a JSON object with the status 'Unhealthy' in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getPageData('/', '');
  res.status(result ? 200 : 500).json({ status: result ? HealthzStatus.HEALTHY : HealthzStatus.UNHEALTHY });
  res.end();
};

export default handler;
