'use client';

import MenuListItem from '@/components/commons/menus/MenuListItem/MenuListItem';
import { MenuItem, MenuSources } from '@/models/types/menu';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type FooterMenuListProps = {
  menuItems: MenuItem[];
  source?: MenuSources;
  baseUrl?: string;
};

const FooterMenuList = ({ menuItems, source, baseUrl }: FooterMenuListProps) => {
  const [subMenuId, setSubMenuId] = useState<string>();

  const handleMenuSelection = useCallback((id?: string) => {
    setSubMenuId(id);
  }, []);

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
    if (hasSubItemsOrLink(menuItem)) {
      return handleMenuSelection(menuItem.id);
    }
    if (!hasSubItemsOrLink(menuItem)) {
      return handleMenuSelection();
    }
    return undefined;
  };

  const onKeyEnterHandler = (menuItem: MenuItem) => {
    if (!subMenuId) {
      return handleMenuSelection(menuItem.id);
    }
    return handleMenuSelection();
  };

  return (
    <ul
      className={twMerge(
        'flex flex-col md:flex-row items-center justify-center transition duration-300 gap-3 lg:gap-4'
      )}
    >
      {menuItems.map((menuItem: MenuItem) => (
        <li
          className="relative w-fit"
          key={menuItem.id}
          onMouseEnter={() => handleMenuSelection(menuItem.id)}
          onMouseLeave={() => handleMenuSelection()}
        >
          <MenuListItem
            menuItem={menuItem}
            source={source}
            subMenuId={subMenuId}
            onClick={() => handleMenuSelection(menuItem.id)}
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

export default FooterMenuList;
