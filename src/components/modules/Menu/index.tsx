import MenuList from '@/components/common/Menu';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { setActiveMenuItem } from '@/helpers/menuHelper';
import { ComponentProps } from '@/models/types/components';
import { getMenuStructure } from '@/services/menuService';

type MenuModuleProps = {
  path: string;
};

const Menu = async ({ ...data }: ComponentProps) => {
  const { path } = data.properties as MenuModuleProps;
  const menuData = await getMenuStructure(path, data.previewToken);

  if (menuData == null) {
    return <></>;
  }
  const menuItems = menuData.data.items;
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
