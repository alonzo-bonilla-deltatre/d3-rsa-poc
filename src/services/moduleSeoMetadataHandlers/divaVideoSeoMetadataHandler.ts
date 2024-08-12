import { overrideVideoMetadata } from '@/helpers/metadataHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';
import { getEntity } from '@/services/forgeDistributionService';
import { Metadata as NextMetadata } from 'next';

export const handleDivaVideoSeoMetadata = async (
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<NextMetadata> => {
  const slug = properties?.slug?.toString() ?? '';
  if (!slug) {
    return seoData;
  }
  const divaVideo = await getEntity(ForgeDapiEntityCode.divaVideos, slug);
  return divaVideo ? overrideVideoMetadata(seoData, divaVideo) : seoData;
};
