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
        "after:duration-600 flex cursor-pointer items-center transition duration-300 after:absolute after:bottom-0 after:block after:w-full after:origin-left after:scale-x-0 after:border after:border-link after:transition after:content-[''] hover:text-link after:hover:scale-x-100",
        isActive ? 'text-link after:scale-x-100' : ''
      )}
    >
      {itemIcon}
      {itemText}
    </div>
  );
};

export default HamburgerMenuNavItem;
