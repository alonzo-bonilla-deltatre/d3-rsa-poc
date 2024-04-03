'use client';

import MenuListItem from '@/components/commons/MenuList/MenuListItem';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { MenuItem } from '@/models/types/menu';
import { useCallback, useEffect, useState } from 'react';

type HeaderMenuListProps = {
  menuItems: MenuItem[];
  source?: `${MenuSources}`;
  navItemClasses?: string;
  baseUrl?: string;
};

const HeaderMenuList = ({ menuItems, source, navItemClasses, baseUrl }: HeaderMenuListProps) => {
  const isHeader = source === MenuSources.header || source === MenuSources.service;
  const [subMenuId, setSubMenuId] = useState<string>();

  const handleMenuSelection = useCallback(
    (id?: string) => {
      if (!isHeader) {
        setSubMenuId(subMenuId ? undefined : id);
      } else {
        setSubMenuId(id);
      }
    },
    [isHeader, subMenuId]
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleMenuSelection();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleMenuSelection]);

  const hasSubItemsOrLink = (item: MenuItem) => {
    return item.items.some((item) => item.link || item.items.length > 0);
  };

  const lastSubMenuId = menuItems.flatMap((item) => item?.items)?.slice(-1)?.[0]?.id;

  const onFocusHandler = (menuItem: MenuItem) => {
    if (isHeader && hasSubItemsOrLink(menuItem)) {
      return handleMenuSelection(menuItem.id);
    }
    if (isHeader && !hasSubItemsOrLink(menuItem)) {
      return handleMenuSelection();
    }
    return undefined;
  };

  const onKeyEnterHandler = (menuItem: MenuItem) => {
    if (isHeader) {
      return undefined;
    }
    if (!subMenuId) {
      return handleMenuSelection(menuItem.id);
    }
    return handleMenuSelection();
  };

  return (
    <ul className={`flex flex-row relative ${!isHeader ? 'flex-col' : 'gap-4'}`}>
      {menuItems.map((menuItem: MenuItem) => (
        <li
          className="relative"
          key={menuItem.id}
          onMouseEnter={isHeader ? () => handleMenuSelection(menuItem.id) : undefined}
          onMouseLeave={isHeader ? () => handleMenuSelection() : undefined}
        >
          <MenuListItem
            menuItem={menuItem}
            navSubMenuClasses={
              isHeader
                ? 'flex-col gap-3 min-w-[200px] p-6 absolute top-[100%] -left-6 skew-x-[-11deg] origin-top bg-grey-900'
                : 'flex-col gap-3 py-5 px-6'
            }
            navItemClasses={`${navItemClasses ? navItemClasses : ''} ${
              menuItem.items.length > 0 ? 'cursor-pointer hover:text-light-blue' : ''
            }`}
            source={source}
            subMenuId={subMenuId}
            onClick={!isHeader ? () => handleMenuSelection(menuItem.id) : undefined}
            onFocus={() => onFocusHandler(menuItem)}
            onKeyEnter={() => onKeyEnterHandler(menuItem)}
            onBlur={() => handleMenuSelection()}
            lastSubMenuId={lastSubMenuId}
            baseUrl={baseUrl}
          />
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenuList;
