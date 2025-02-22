import Link from '@/components/commons/Link/Link';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { icons, renderSvgIcon } from '@/components/icons';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem, MenuSources } from '@/models/types/menu';
import Typography from '@/components/commons/Typography/Typography';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import HeaderMenuNavItem from '@/components/commons/menus/HeaderMenuNavItem/HeaderMenuNavItem';
import FooterMenuNavItem from '@/components/commons/menus/FooterMenuNavItem/FooterMenuNavItem';
import HamburgerMenuNavItem from '@/components/commons/menus/HamburgerMenuNavItem/HamburgerMenuNavItem';

type MenuNavItemProps = {
  menuItem?: MenuItem;
  navItemClasses?: string;
  parentId?: string;
  iconWidth?: number;
  iconHeight?: number;
  source?: MenuSources;
  subMenuId?: string;
  lastSubMenuId?: string;
  baseUrl?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyEnter?: () => void;
};

const MenuNavItem = ({
  menuItem,
  parentId,
  iconWidth,
  iconHeight,
  source,
  subMenuId,
  lastSubMenuId,
  baseUrl,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onFocus,
  onBlur,
  onKeyEnter,
}: MenuNavItemProps) => {
  const isActive = getBooleanProperty(menuItem?.isActive);
  const translatedText = menuItem?.tag ? menuItem.tag : (menuItem?.text ?? '');
  const itemText = (
    <Typography variant="navigation-m">
      <TranslatedLabel translationTermKey={translatedText} />
    </Typography>
  );
  const icon = menuItem?.icon?.data ?? '';
  let itemIcon;
  if (icon) {
    itemIcon = renderSvgIcon(icon as keyof typeof icons, {
      width: iconWidth,
      height: iconHeight,
    });
  }
  let itemValue: ReactNode | null = null;
  switch (source) {
    case MenuSources.header:
      itemValue = (
        <HeaderMenuNavItem
          menuItem={menuItem}
          itemIcon={itemIcon}
          itemText={itemText}
        />
      );
      break;
    case MenuSources.hamburger:
      itemValue = (
        <HamburgerMenuNavItem
          menuItem={menuItem}
          itemIcon={itemIcon}
          itemText={itemText}
        />
      );
      break;
    case MenuSources.footer:
      itemValue = (
        <FooterMenuNavItem
          menuItem={menuItem}
          itemIcon={itemIcon}
          itemText={itemText}
        />
      );
      break;
    default:
      itemValue = (
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
      break;
  }
  const additionalAttributes = {
    ...(parentId ? { parentId: parentId } : undefined),
    ...(menuItem?.target && menuItem?.link ? { target: menuItem.target } : undefined),
    ...(!menuItem?.target && menuItem?.link ? { rel: 'noopener' } : undefined),
    ...(menuItem?.tag ? { 'data-tag': menuItem.tag } : undefined),
  };
  if (menuItem?.link) {
    return (
      <Link
        href={menuItem.link}
        data-id={menuItem?.id}
        onFocus={onFocus}
        baseUrl={baseUrl}
        {...additionalAttributes}
      >
        {itemValue}
      </Link>
    );
  }

  return (
    <span
      data-id={menuItem?.id}
      tabIndex={menuItem?.items && menuItem.items?.length > 0 ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onKeyDown={(e) => (e.key === 'Enter' ? onKeyEnter?.() : undefined)}
      onBlur={lastSubMenuId === menuItem?.id ? onBlur : undefined}
      {...additionalAttributes}
    >
      {itemValue}
    </span>
  );
};

export default MenuNavItem;
