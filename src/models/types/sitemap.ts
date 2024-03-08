import { DistributionEntity, ForgeDistributionApiOption } from '@/models/types/forge';

export interface EntityConfig {
  name: string;
  entitycode: string;
  schema: string;
}

export interface SchemaConfig {
  [key: string]: {
    xmlContainer: (content: string) => string;
    xmlSchema: (entity: DistributionEntity, language?: string) => string;
  };
}

export interface EntityCodeOptions {
  [key: string]: { options: ForgeDistributionApiOption };
}
