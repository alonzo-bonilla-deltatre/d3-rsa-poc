import { NextApiRequest, NextApiResponse } from 'next';
import { getDivaPlayerEntitlement } from '@/services/divaPlayerService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

const renderDivaPlayerEntitlement = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = getDivaPlayerEntitlement(req.body);
    res.status(result ? 200 : 500).json(result);
    res.end();
  } catch (error) {
    logger.log(`Error rendering Diva Player Entitlement: ${JSON.stringify(error)}`, LoggerLevel.error);
    res.status(500).send('Internal server error');
  }
};

export default renderDivaPlayerEntitlement;
