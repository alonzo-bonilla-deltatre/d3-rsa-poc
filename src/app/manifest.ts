import { LoggerLevel } from '@/models/types/logger';
import { ManifestResponse } from '@/models/types/manifest';
import { getManifestJson } from '@/services/manifestService';
import logger from '@/utilities/loggerUtility';

/* SSG revalidate time */
export const revalidate = 300;

/* SSG process */
export async function generateStaticParams() {
  return [];
}

export default async function manifest(): Promise<ManifestResponse | null> {
  const manifestContent: ManifestResponse | null = await getManifestJson();
  if (!manifestContent) {
    logger.log(`No manifest data found!`, LoggerLevel.error);
    return null;
  }
  return manifestContent;
}
