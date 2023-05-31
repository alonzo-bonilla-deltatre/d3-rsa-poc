import { DistributionEntity } from '@/models/types/forge';

export type StoryPart = DistributionEntity & DistributionEntityStoryPart;

type DistributionEntityStoryPart = {
  content: any;
  externalType: string;
  inputUrl: string;
};
