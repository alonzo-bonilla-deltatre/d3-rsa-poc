import MenuList from '@/components/common/Menu';
import { ComponentProps } from '@/models/types/components';
import { MenuItem, MenuResponseData } from '@/models/types/menu';
import { getMenu } from '@/services/menuService';

type MenuModuleProps = {
  menuItems: MenuItem[];
  navItemClasses: string;
  menuName: string;
};

const Menu = async ({ ...data }: ComponentProps) => {
  const { navItemClasses, menuName } = data.properties as MenuModuleProps;
  //TODO: remove default menuName
  const defaultMenuName = menuName ? menuName : 'footerMenu';
  const menuData = (await getMenu(defaultMenuName)) as MenuResponseData;
  return menuData ? (
    <>
      <div className="container mx-auto lg:text-center">
        <div className="flex flex-col lg:flex-row uppercase justify-between">
          <MenuList
            menuItems={menuData?.menuItems}
            navItemClasses={navItemClasses}
          ></MenuList>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Menu;
