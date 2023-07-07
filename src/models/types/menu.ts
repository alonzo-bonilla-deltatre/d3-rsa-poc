export type MenuStructureResponse = {
  data: MenuResponseData;
  meta: {
    version: string;
  };
};
export type MenuResponseData = {
  items: MenuItem[] | [];
  variables: MenuVariable[] | [];
  name: string;
  path: string;
};

export type MenuItem = {
  id: string;
  text: string;
  tag: string;
  link: string;
  target: string;
  tooltip: string;
  visible: boolean;
  icon: MenuIcon;
  properties: MenuProperty;
  items: MenuItem[] | [];
  isActive?: boolean;
};

export type MenuVariable = {
  key: string;
  type: string;
  keyValue: Record<any, string>[] | [];
};

export type MenuIcon = {
  data: string;
};

export type MenuProperty = {
  data: string;
};
