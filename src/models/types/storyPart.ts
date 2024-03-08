import { AlbumEntity, ForgeExternalEntityType } from '@/models/types/forge';

export type StoryPart = AlbumEntity & DistributionEntityStoryPart;

type DistributionEntityStoryPart = {
  content: any;
  externalType: ForgeExternalEntityType;
  inputUrl: string;
};
