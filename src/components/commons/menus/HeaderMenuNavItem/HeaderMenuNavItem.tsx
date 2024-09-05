import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem } from '@/models/types/menu';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

type HeaderMenuNavItemProps = {
  menuItem?: MenuItem;
  itemIcon?: ReactNode | null;
  itemText?: ReactNode | null;
};

const HeaderMenuNavItem = ({ menuItem, itemIcon, itemText }: HeaderMenuNavItemProps) => {
  const isActive = getBooleanProperty(menuItem?.isActive);
  return (
    <div
      className={twMerge(
        'flex cursor-pointer items-center transition duration-300 hover:text-link',
        isActive ? 'text-link' : ''
      )}
    >
      {itemIcon}
      {itemText}
    </div>
  );
};

export default HeaderMenuNavItem;
