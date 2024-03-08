import { ForgeMetadataCategoryType, ForgeMetadataKeyType } from '@/models/types/forge';

export type PageStructureResponse = {
  data: PageStructureData;

  meta: {
    version: string;
  };
};

export type PageStructureData = {
  structure: StructureItem;
  variables: Variable[];
  metadata: Metadata[];
};
export type PageStructureItemKey = {
  id: string;
  namespace: string;
};
export type StructureItem = {
  key: PageStructureItemKey;
  type: PageStructureItemType;
  properties: Record<string, unknown>;
  slot?: string;
  slots?: string[];
  items?: StructureItem[];
};

export type Variable = {
  key: string;
  type: string;
  keyValue: KeyValue;
};

export type KeyValue = {
  value: string;
  valueType: string;
};

export type Metadata = {
  category: ForgeMetadataCategoryType;
  key: ForgeMetadataKeyType;
  value: string;
  type: string;
};

export enum PageStructureItemType {
  module = 'module',
  layout = 'layout',
  template = 'template',
}
