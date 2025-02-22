import MenuList from '@/components/commons/menus/MenuList/MenuList';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { parseMenuItemFields, setActiveMenuItem } from '@/helpers/menuHelper';
import { getHideModule } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getMenuStructure } from '@/services/menuService';
import logger from '@/utilities/loggerUtility';
import { getSiteUrl } from '@/services/configurationService';
import { MenuSources } from '@/models/types/menu';

type MenuProps = {
  path?: string;
} & ModuleProps;

const Menu = async ({ data }: { data: ComponentProps }) => {
  const { path } = data.properties as MenuProps;

  if (getHideModule(data)) return null;

  const menuData = await getMenuStructure(path, data.previewToken);
  const baseUrl = process.env.BASE_URL || (await getSiteUrl());

  if (menuData == null) {
    logger.log(`Cannot render Menu from path ${path}`, LoggerLevel.error);
    return null;
  }
  const menuItems = parseMenuItemFields(menuData.data.items, data.variables);
  const pagePath = getDataVariable(data.variables, 'pagePath'); // this value has been set in page.tsx
  const source = getDataVariable(data.variables, 'source') || '';
  if (pagePath) setActiveMenuItem(menuItems, pagePath);

  return (
    <MenuList
      menuItems={menuItems}
      source={source as MenuSources}
      baseUrl={baseUrl}
    ></MenuList>
  );
};

export default Menu;
