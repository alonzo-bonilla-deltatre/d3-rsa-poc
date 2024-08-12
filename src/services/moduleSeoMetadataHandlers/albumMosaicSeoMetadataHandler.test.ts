import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleAlbumMosaicSeoMetadata } from '@/services/moduleSeoMetadataHandlers/albumMosaicSeoMetadataHandler';
import { getEntity } from '@/services/forgeDistributionService';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleAlbumMosaicSeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns original seoData when slug is missing', async () => {
    // ARRANGE
    const properties = {};
    // ACT
    const result = await handleAlbumMosaicSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData when album is found', async () => {
    // ARRANGE
    const properties = { slug: 'album-slug' };
    const album = { id: 'album-id', title: 'Album Title' };
    (getEntity as jest.Mock).mockResolvedValue(album);
    (overrideVideoMetadata as jest.Mock).mockImplementation((seoData, album) => ({ ...seoData, title: album.title }));
    // ACT
    const result = await handleAlbumMosaicSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Album Title' });
  });

  it('returns original seoData when album is not found', async () => {
    // ARRANGE
    const properties = { slug: 'album-slug' };
    (getEntity as jest.Mock).mockResolvedValue(null);
    // ACT
    const result = await handleAlbumMosaicSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });
});
