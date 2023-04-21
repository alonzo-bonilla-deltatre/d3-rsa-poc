import { DistributionEntity } from '@/models/types/dapi';

export type StoryPart = DistributionEntity & DistributionEntityStoryPart;

type DistributionEntityStoryPart = {
  content: any;
  externalType: string;
  inputUrl: string;
};
