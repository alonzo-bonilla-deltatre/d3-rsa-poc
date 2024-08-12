import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleDivaVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/divaVideoSeoMetadataHandler';
import { getEntity } from '@/services/forgeDistributionService';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleDivaVideoSeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns original seoData when slug is missing', async () => {
    // ARRANGE
    const properties = {};
    // ACT
    const result = await handleDivaVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData when diva video is found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    const divaVideo = { id: 'video-id', title: 'Diva Video Title' };
    (getEntity as jest.Mock).mockResolvedValue(divaVideo);
    (overrideVideoMetadata as jest.Mock).mockImplementation((seoData, video) => ({ ...seoData, title: video.title }));
    // ACT
    const result = await handleDivaVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Diva Video Title' });
  });

  it('returns original seoData when diva video is not found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    (getEntity as jest.Mock).mockResolvedValue(null);
    // ACT
    const result = await handleDivaVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });
});
