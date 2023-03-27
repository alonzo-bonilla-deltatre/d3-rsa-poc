export type MenuResponse = {
  data: MenuResponseData;
  meta: {
    version: string;
  }
};
export type MenuResponseData = {
  menuItems: MenuItem[] | [];
  variables: MenuVariable[] | [];
  id: string;
  name: string;
  uriSegmentTranslations: object;
}

export type MenuItem = {
  id: string;
  text: string;
  properties: MenuProperty;
  menuItems: MenuItem[] | [];
};

export type MenuVariable = {
  key: string;
  type: string;
  keyValue: Record<any, string>[] | [];
};

export type MenuProperty = {
  tag: string;
  toolTip: string;
  link: string;
  icon: string;
  target: string;
  data: string;
  customProperties: string;
  isActive: boolean;
};
