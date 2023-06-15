import { NextApiRequest, NextApiResponse } from 'next';
import { LoggerLevel } from '@/models/types/logger';
import { getManifestJson } from '@/services/manifestService';
import logger from '@/utilities/logger';
import { ManifestResponse } from '@/models/types/manifest';

const renderManifest = async (_req: NextApiRequest, res: NextApiResponse) => {
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
