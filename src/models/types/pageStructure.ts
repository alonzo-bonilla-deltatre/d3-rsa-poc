export type PageStructureResponse = {
  data: {
    structure: StructureItem;
    variables: Variable[];
    metadata: Metadata[];
  };
};

export type StructureItem = {
  key: {
    id: string;
    namespace: string;
  };
  type: PageStructureItemType;
  properties: Record<string, unknown>;
  slot?: string;
  slots?: string[];
  items?: StructureItem[];
};

export type Variable = {
  key: string;
  type: string;
  keyValue: Record<any, string>[];
};

export type Metadata = {
  category: string;
  key: string;
  value: string;
  type: string;
};

export enum PageStructureItemType {
  module = 'module',
  layout = 'layout',
  template = 'template',
}
