import { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { getRobotsTxt } from '@/services/robotsService';

/**
 * Handler for the robots.txt API route.
 *
 * This handler processes requests to the robots.txt API route. It fetches the robots.txt content,
 * sets the 'Content-Type' header to 'text/plain', and sends the content in the response.
 *
 * If the content is not fetched successfully, it logs an error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const renderRobots = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const robotsTxtContent = await getRobotsTxt();

    res.setHeader('Content-Type', 'text/plain');
    res.write(robotsTxtContent ?? '');
    res.end();
  } catch (error) {
    logger.log('Error rendering robots.txt', LoggerLevel.error);

    res.status(500).send('Internal server error');
  }
};

export default renderRobots;
