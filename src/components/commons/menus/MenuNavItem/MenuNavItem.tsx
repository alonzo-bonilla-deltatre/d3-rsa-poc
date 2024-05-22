import Link from '@/components/commons/Link/Link';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { icons, renderSvgIcon } from '@/components/icons';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem, MenuSources } from '@/models/types/menu';
import Typography from '@/components/commons/Typography/Typography';
import { twMerge } from 'tailwind-merge';

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
  const itemText = menuItem?.tag ? (
    <TranslatedLabel translationTermKey={menuItem.tag} />
  ) : (
    <TranslatedLabel translationTermKey={menuItem?.text || ''} />
  );
  const icon = menuItem?.icon?.data ?? '';

  let itemIcon;
  if (icon) {
    itemIcon = renderSvgIcon(icon as keyof typeof icons, {
      width: iconWidth,
      height: iconHeight,
    });
  }

  const additionalAttributes = {
    ...(parentId ? { parentId: parentId } : undefined),
    ...(menuItem?.target && menuItem?.link ? { target: menuItem.target } : undefined),
    ...(!menuItem?.target && menuItem?.link ? { rel: 'noopener' } : undefined),
    ...(menuItem?.tag ? { 'data-tag': menuItem.tag } : undefined),
  };

  const menuClasses =
    source === MenuSources.header
      ? "after:block after:bottom-0 after:content-[''] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-600 after:origin-center"
      : "after:block after:bottom-0 after:content-[''] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-600 after:origin-left";

  const itemValue = (
    <div
      className={twMerge(
        'flex items-center transition duration-300 hover:text-link cursor-pointer',
        isActive ? 'text-link' : '',
        menuClasses
      )}
    >
      {itemIcon ? itemIcon : null}
      {itemText && <Typography variant={'navigation-m'}>{itemText}</Typography>}
    </div>
  );

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
