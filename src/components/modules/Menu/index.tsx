import MenuList from '@/components/common/Menu';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { parseMenuItemFields, setActiveMenuItem } from '@/helpers/menuHelper';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getMenuStructure } from '@/services/menuService';
import logger from '@/utilities/logger';

type MenuModuleProps = {
  path: string;
};

const Menu = async ({ ...data }: ComponentProps) => {
  const { path } = data.properties as MenuModuleProps;
  const menuData = await getMenuStructure(path, data.previewToken);

  if (menuData == null) {
    logger.log(`Cannot render Menu from path ${path}`, LoggerLevel.error);
    return <></>;
  }

  const menuItems = parseMenuItemFields(menuData.data.items, data.variables);
  const pagePath = getDataVariable(data.variables, 'pagePath'); // this value has been set in page.tsx
  if (pagePath) setActiveMenuItem(menuItems, pagePath);

  return (
    <>
      <div className="container mx-auto my-4 lg:text-center text-[#BEBEBE]">
        <div className="flex flex-col lg:flex-row uppercase items-center justify-between">
          <MenuList
            menuItems={menuItems}
            navItemClasses={''}
          ></MenuList>
        </div>
      </div>
    </>
  );
};

export default Menu;
