'use client';

import HeaderMenuList from '@/components/commons/menus/HeaderMenuList/HeaderMenuList';
import FooterMenuList from '@/components/commons/menus/FooterMenuList/FooterMenuList';
import MenuListItem from '@/components/commons/menus/MenuListItem/MenuListItem';
import { MenuItem, MenuSources } from '@/models/types/menu';

type MenuProps = {
  menuItems?: MenuItem[];
  source?: MenuSources;
  baseUrl?: string;
};

const MenuList = ({ menuItems, source, baseUrl }: MenuProps) => {
  if (!menuItems || menuItems?.length === 0) {
    return null;
  }

  if (source === MenuSources.header || source === MenuSources.hamburger) {
    return (
      <HeaderMenuList
        menuItems={menuItems}
        source={source}
        baseUrl={baseUrl}
      />
    );
  }

  if (source === MenuSources.footer) {
    return (
      <FooterMenuList
        menuItems={menuItems}
        source={source}
        baseUrl={baseUrl}
      />
    );
  }

  return (
    <ul className="flex flex-row items-center justify-center transition duration-300 gap-3 lg:gap-4">
      {menuItems.map((menuItem: MenuItem) => (
        <li
          key={menuItem.id}
          className="relative"
        >
          <MenuListItem
            menuItem={menuItem}
            source={source}
            baseUrl={baseUrl}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
