import { DistributionEntity } from "./dapi";

export type StoryPart = DistributionEntity & DistributionEntityStoryPart;

type DistributionEntityStoryPart = {
  content: string;
}