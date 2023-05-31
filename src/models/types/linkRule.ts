import { DistributionEntity } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';

export type LinkRuleResponse = {
  data: LinkRuleData[];

  meta: {
    version: string;
  };
};

export type LinkRuleData = {
  id: string;
  url: string;
  success: boolean;
};

export type LinkRuleRequest = {
  id: string;
  entity: DistributionEntity | StoryPart;
  entityType: string;
  culture: string;
  environment: string;
};
