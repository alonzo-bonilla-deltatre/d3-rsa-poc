'use client';

import HeaderMenuList from '@/components/commons/MenuList/components/HeaderMenuList';
import MenuListItem from '@/components/commons/MenuList/MenuListItem';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { MenuItem } from '@/models/types/menu';

type MenuProps = {
  menuItems?: MenuItem[];
  source?: `${MenuSources}`;
  wrapperClassName?: string;
  baseUrl?: string;
};

const MenuList = ({ menuItems, source, wrapperClassName, baseUrl }: MenuProps) => {
  if (!menuItems || menuItems?.length === 0) {
    return null;
  }

  const defaultNavItemClasses = 'flex flex-row items-center transition duration-300';
  const defaultNavWrapperClasses = 'flex ';

  const getMenuNavWrapperClasses = (source: string | undefined) => {
    switch (source) {
      case MenuSources.footer:
        return `${defaultNavWrapperClasses} flex-row gap-3 lg:gap-4 mx-auto`;
      case MenuSources.legal:
        return `${defaultNavWrapperClasses} flex-row flex-wrap justify-center gap-10 lg:gap-16`;
      case MenuSources.social:
      case MenuSources.service:
        return `${defaultNavWrapperClasses} flex-row`;
      default:
        return defaultNavWrapperClasses;
    }
  };

  const getMenuNavItemClasses = (source: string | undefined) => {
    switch (source) {
      case MenuSources.header:
        return `${defaultNavItemClasses} d3-ty-navigation-large hover:text-component-module-menu-hover`;
      case MenuSources.hamburger:
        return `${defaultNavItemClasses} d3-ty-navigation-large hover:text-component-module-menu-hover`;
      case MenuSources.footer:
        return `${defaultNavItemClasses} d3-ty-footer-large mb-6 hover:text-component-module-menu-hover`;
      case MenuSources.service:
        return `${defaultNavItemClasses} d3-ty-navigation-large gap-0`;
      case MenuSources.social:
        return `${defaultNavItemClasses} opacity-60 hover:opacity-100`;
      case MenuSources.legal:
        return `${defaultNavItemClasses} d3-ty-navigation-large`;
      case MenuSources.enhancedTitle:
        return `${defaultNavItemClasses} text-component-module-menu-enhanced-title d3-ty-sec-navigation uppercase leading-[53px]`;
      default:
        return defaultNavItemClasses;
    }
  };

  if (source === MenuSources.header || source === MenuSources.hamburger || source === MenuSources.service) {
    return (
      <HeaderMenuList
        menuItems={menuItems}
        source={source}
        navItemClasses={getMenuNavItemClasses(source)}
        baseUrl={baseUrl}
      />
    );
  }

  return (
    <ul className={`${getMenuNavWrapperClasses(source)} ${wrapperClassName}`}>
      {menuItems.map((menuItem: MenuItem) => (
        <li key={menuItem.id}>
          <MenuListItem
            menuItem={menuItem}
            navItemClasses={getMenuNavItemClasses(source)}
            source={source}
            baseUrl={baseUrl}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
