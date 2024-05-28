import { NextApiRequest, NextApiResponse } from 'next';
import { getDivaPlayerDictionary } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

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
