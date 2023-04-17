import { DistributionEntity } from "./dapi";

export type StoryPart = DistributionEntity & DistributionEntityStoryPart;

type DistributionEntityStoryPart = {
  content: any;
  externalType: string;
  inputUrl: string;
}