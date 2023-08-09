import { DistributionEntity } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';

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
  entity: DistributionEntity | StoryPart | LiveBloggingBlogEntity;
  entityType: string;
  culture: string;
  environment: string;
};

export type LinkRuleVariation = {
  key: string;
  value: string;
  type: LinkRuleVariationType;
};

export enum LinkRuleVariationType {
  fields = 'fields',
  root = 'root',
}
