import { overrideVideoMetadata } from '@/helpers/metadataHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';
import { getEntity } from '@/services/forgeDistributionService';
import { Metadata as NextMetadata } from 'next';

export const handleAlbumMosaicSeoMetadata = async (
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<NextMetadata> => {
  const slug = properties?.slug?.toString() ?? '';
  if (!slug) {
    return seoData;
  }
  const album = await getEntity(ForgeDapiEntityCode.albums, slug);
  return album ? overrideVideoMetadata(seoData, album) : seoData;
};
