import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem } from '@/models/types/menu';
import { twMerge } from 'tailwind-merge';
import React from 'react';

type HeaderMenuNavItemProps = {
  menuItem?: MenuItem;
  itemIcon?: JSX.Element | null;
};

const HeaderMenuNavItem = ({ menuItem, itemIcon }: HeaderMenuNavItemProps) => {
  const isActive = getBooleanProperty(menuItem?.isActive);
  return (
    <div
      className={twMerge(
        'flex items-center transition duration-300 hover:text-link cursor-pointer',
        isActive ? 'text-link' : ''
      )}
    >
      {itemIcon}
    </div>
  );
};

export default HeaderMenuNavItem;
