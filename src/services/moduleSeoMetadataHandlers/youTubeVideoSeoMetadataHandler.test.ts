import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleYouTubeVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/youTubeVideoSeoMetadataHandler';
import { getEntity } from '@/services/forgeDistributionService';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleYouTubeVideoSeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns original seoData when slug is missing', async () => {
    // ARRANGE
    const properties = {};
    // ACT
    const result = await handleYouTubeVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData when YouTube video is found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    const youTubeVideo = { id: 'video-id', title: 'YouTube Video Title' };
    (getEntity as jest.Mock).mockResolvedValue(youTubeVideo);
    (overrideVideoMetadata as jest.Mock).mockImplementation((seoData, video) => ({ ...seoData, title: video.title }));
    // ACT
    const result = await handleYouTubeVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'YouTube Video Title' });
  });

  it('returns original seoData when YouTube video is not found', async () => {
    // ARRANGE
    const properties = { slug: 'video-slug' };
    (getEntity as jest.Mock).mockResolvedValue(null);
    // ACT
    const result = await handleYouTubeVideoSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });
});
