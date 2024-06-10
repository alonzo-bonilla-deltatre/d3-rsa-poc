import { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { getDivaPlayerSetting } from '@/services/divaPlayerService';

/**
 * This function handles the rendering of Diva Player Settings.
 * It is an asynchronous function that takes in a request and a response object.
 * It tries to get the Diva Player Settings and sends a response based on the result.
 * If the settings are found, it sends a 200 status code along with the settings in JSON format.
 * If the settings are not found, it sends a 500 status code.
 * In case of any error during the process, it logs the error and sends a 500 status code with a message 'Internal server error'.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {void} - The function does not return anything.
 */
const renderDivaPlayerSetting = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = getDivaPlayerSetting();
    res.status(result ? 200 : 500).json(result);
    res.end();
  } catch (error) {
    logger.log(
      `Error rendering Diva Player Setting for ${req.query.type}: ${JSON.stringify(error)}`,
      LoggerLevel.error
    );
    res.status(500).send('Internal server error');
  }
};

export default renderDivaPlayerSetting;
