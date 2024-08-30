import { NextApiRequest, NextApiResponse } from 'next';
import { getDivaPlayerDictionary } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

/**
 * Handles the API request to render the Diva Player Dictionary.
 *
 * This function retrieves the Diva Player Dictionary and sends it as a JSON response.
 * If an error occurs, it logs the error and sends a 500 status code with an error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 */
const renderDivaPlayerDictionary = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = getDivaPlayerDictionary();
    res.status(result ? 200 : 500).json(result);
    res.end();
  } catch (error) {
    logger.log(`Error rendering Diva Player Dictionary: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal server error');
  }
};

export default renderDivaPlayerDictionary;
