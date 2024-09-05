'use client';

import MenuListItem from '@/components/commons/menus/MenuListItem/MenuListItem';
import { MenuItem, MenuSources } from '@/models/types/menu';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type HeaderMenuListProps = {
  menuItems: MenuItem[];
  source?: MenuSources;
  baseUrl?: string;
};

const HeaderMenuList = ({ menuItems, source, baseUrl }: HeaderMenuListProps) => {
  const isHeader = source === MenuSources.header;
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
    <ul className={twMerge('relative flex w-fit', !isHeader ? 'flex-col' : 'flex-row gap-4 text-white')}>
      {menuItems.map((menuItem: MenuItem) => (
        <li
          className="relative w-fit"
          key={menuItem.id}
          onMouseEnter={isHeader ? () => handleMenuSelection(menuItem.id) : undefined}
          onMouseLeave={isHeader ? () => handleMenuSelection() : undefined}
        >
          <MenuListItem
            menuItem={menuItem}
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
