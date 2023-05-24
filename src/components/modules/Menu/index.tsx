import MenuList from '@/components/common/Menu';
import { ComponentProps } from '@/models/types/components';
import { getMenuStructure } from '@/services/menuService';

type MenuModuleProps = {
  path: string;
};

const Menu = async ({ ...data }: ComponentProps) => {
  const { path } = data.properties as MenuModuleProps;
  const menuData = await getMenuStructure(path, data.previewToken);
  return menuData ? (
    <>
      <div className="container mx-auto my-4 lg:text-center text-[#BEBEBE]">
        <div className="flex flex-col lg:flex-row uppercase items-center justify-between">
          <MenuList
            menuItems={menuData.data.items}
            navItemClasses={''}
          ></MenuList>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Menu;
