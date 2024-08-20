import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem } from '@/models/types/menu';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

type HeaderMenuNavItemProps = {
  menuItem?: MenuItem;
  itemIcon?: ReactNode | null;
  itemText?: ReactNode | null;
};

const HamburgerMenuNavItem = ({ menuItem, itemIcon, itemText }: HeaderMenuNavItemProps) => {
  const isActive = getBooleanProperty(menuItem?.isActive);
  return (
    <div
      className={twMerge(
        "flex items-center transition duration-300 hover:text-link cursor-pointer after:block after:bottom-0 after:content-[''] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-600 after:origin-left",
        isActive ? 'text-link after:scale-x-100' : ''
      )}
    >
      {itemIcon}
      {itemText}
    </div>
  );
};

export default HamburgerMenuNavItem;
