import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleJWPlayerVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/jwPlayerVideoSeoMetadataHandler';
import { getEntity } from '@/services/forgeDistributionService';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleJWPlayerVideoSeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns original seoData when slug is missing', async () => {
    // ARRANGE
    const properties = {};
    // ACT
    const result = await handleJWPlayerVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData when JWPlayer video is found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    const jwPlayerVideo = { id: 'video-id', title: 'JWPlayer Video Title' };
    (getEntity as jest.Mock).mockResolvedValue(jwPlayerVideo);
    (overrideVideoMetadata as jest.Mock).mockImplementation((seoData, video) => ({ ...seoData, title: video.title }));
    // ACT
    const result = await handleJWPlayerVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'JWPlayer Video Title' });
  });

  it('returns original seoData when JWPlayer video is not found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    (getEntity as jest.Mock).mockResolvedValue(null);
    // ACT
    const result = await handleJWPlayerVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });
});
