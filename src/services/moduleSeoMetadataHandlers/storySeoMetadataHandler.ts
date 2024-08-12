import { overrideStoryMetadata } from '@/helpers/metadataHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';
import { getEntity } from '@/services/forgeDistributionService';
import { Metadata as NextMetadata } from 'next';

export const handleStorySeoMetadata = async (
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<NextMetadata> => {
  const slug = properties?.slug?.toString() ?? '';
  if (!slug) {
    return seoData;
  }
  const story = await getEntity(ForgeDapiEntityCode.stories, slug);
  return story ? overrideStoryMetadata(seoData, story) : seoData;
};
