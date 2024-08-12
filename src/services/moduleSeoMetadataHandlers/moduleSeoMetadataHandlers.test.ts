import { handleAlbumMosaicSeoMetadata } from './albumMosaicSeoMetadataHandler';
import { handleBrightcoveVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/brightcoveVideoSeoMetadataHandler';
import { handleDivaVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/divaVideoSeoMetadataHandler';
import { handleJWPlayerVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/jwPlayerVideoSeoMetadataHandler';
import { handleLiveBloggingSeoMetadata } from '@/services/moduleSeoMetadataHandlers/liveBloggingSeoMetadataHandler';
import { handleStorySeoMetadata } from '@/services/moduleSeoMetadataHandlers/storySeoMetadataHandler';
import { handleYouTubeVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/youTubeVideoSeoMetadataHandler';
import { moduleHandlers } from './moduleSeoMetadataHandlers';
import { Metadata as NextMetadata } from 'next';
import { Variable } from '@/models/types/pageStructure';

jest.mock('./albumMosaicSeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/brightcoveVideoSeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/divaVideoSeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/jwPlayerVideoSeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/liveBloggingSeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/storySeoMetadataHandler');
jest.mock('@/services/moduleSeoMetadataHandlers/youTubeVideoSeoMetadataHandler');

describe('moduleHandlers', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('handles AlbumMosaic metadata correctly', async () => {
    // ARRANGE
    (handleAlbumMosaicSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'Album Mosaic Title' });
    // ACT
    const result = await moduleHandlers.AlbumMosaic(seoData, { slug: 'album-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Album Mosaic Title' });
  });

  it('handles BrightcoveVideo metadata correctly', async () => {
    // ARRANGE
    (handleBrightcoveVideoSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'Brightcove Video Title' });
    // ACT
    const result = await moduleHandlers.BrightcoveVideo(seoData, { slug: 'video-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Brightcove Video Title' });
  });

  it('handles DivaVideo metadata correctly', async () => {
    // ARRANGE
    (handleDivaVideoSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'Diva Video Title' });
    // ACT
    const result = await moduleHandlers.DivaVideo(seoData, { slug: 'video-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Diva Video Title' });
  });

  it('handles JWPlayerVideo metadata correctly', async () => {
    // ARRANGE
    (handleJWPlayerVideoSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'JWPlayer Video Title' });
    // ACT
    const result = await moduleHandlers.JWPlayerVideo(seoData, { slug: 'video-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'JWPlayer Video Title' });
  });

  it('handles LiveBlogging metadata correctly', async () => {
    // ARRANGE
    (handleLiveBloggingSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'Live Blogging Title' });
    // ACT
    const result = await moduleHandlers.LiveBlogging(seoData, { slug: 'blog-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Live Blogging Title' });
  });

  it('handles Story metadata correctly', async () => {
    // ARRANGE
    (handleStorySeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'Story Title' });
    // ACT
    const result = await moduleHandlers.Story(seoData, { slug: 'story-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Story Title' });
  });

  it('handles YouTubeVideo metadata correctly', async () => {
    // ARRANGE
    (handleYouTubeVideoSeoMetadata as jest.Mock).mockResolvedValue({ ...seoData, title: 'YouTube Video Title' });
    // ACT
    const result = await moduleHandlers.YouTubeVideo(seoData, { slug: 'video-slug' }, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'YouTube Video Title' });
  });
});
