import { Metadata as NextMetadata } from 'next';
import { handleAlbumMosaicSeoMetadata } from './albumMosaicSeoMetadataHandler';
import { Variable } from '@/models/types/pageStructure';
import { handleBrightcoveVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/brightcoveVideoSeoMetadataHandler';
import { handleDivaVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/divaVideoSeoMetadataHandler';
import { handleJWPlayerVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/jwPlayerVideoSeoMetadataHandler';
import { handleLiveBloggingSeoMetadata } from '@/services/moduleSeoMetadataHandlers/liveBloggingSeoMetadataHandler';
import { handleStorySeoMetadata } from '@/services/moduleSeoMetadataHandlers/storySeoMetadataHandler';
import { handleYouTubeVideoSeoMetadata } from '@/services/moduleSeoMetadataHandlers/youTubeVideoSeoMetadataHandler';

type ModuleHandler = (
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
) => Promise<NextMetadata>;

export interface ModuleHandlers {
  AlbumMosaic: ModuleHandler;
  BrightcoveVideo: ModuleHandler;
  DivaVideo: ModuleHandler;
  JWPlayerVideo: ModuleHandler;
  LiveBlogging: ModuleHandler;
  Story: ModuleHandler;
  YouTubeVideo: ModuleHandler;
}

export const moduleHandlers: ModuleHandlers = {
  AlbumMosaic: handleAlbumMosaicSeoMetadata,
  BrightcoveVideo: handleBrightcoveVideoSeoMetadata,
  DivaVideo: handleDivaVideoSeoMetadata,
  JWPlayerVideo: handleJWPlayerVideoSeoMetadata,
  LiveBlogging: handleLiveBloggingSeoMetadata,
  Story: handleStorySeoMetadata,
  YouTubeVideo: handleYouTubeVideoSeoMetadata,
};
