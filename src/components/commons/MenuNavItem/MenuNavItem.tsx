import Link from '@/components/commons/Link/Link';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { icons, renderSvgIcon } from '@/components/icons';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { MenuItem } from '@/models/types/menu';

type MenuNavItemProps = {
  menuItem?: MenuItem;
  navItemClasses?: string;
  parentId?: string;
  iconWidth?: number;
  iconHeight?: number;
  source?: `${MenuSources}`;
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
  navItemClasses,
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

  const isActiveClass = isActive ? ' is-active' : '';
  const itemText = menuItem?.tag ? (
    <TranslatedLabel translationTermKey={menuItem.tag} />
  ) : (
    <TranslatedLabel translationTermKey={menuItem?.text || ''} />
  );
  const icon = menuItem?.icon?.data ?? '';

  let itemIcon;
  if (icon) {
    itemIcon = renderSvgIcon(icon as keyof typeof icons, {
      className: `cursor-pointer object-contain ${isActive ? 'text-component-module-menu-hover' : ''}`,
      width: iconWidth,
      height: iconHeight,
    });
  }

  const additionalAttributes = {
    ...(parentId ? { parentid: parentId } : undefined),
    ...(menuItem?.target && menuItem?.link ? { target: menuItem.target } : undefined),
    ...(!menuItem?.target && menuItem?.link ? { rel: 'noopener' } : undefined),
    ...(menuItem?.tag ? { 'data-tag': menuItem.tag } : undefined),
  };
  const classNames = (navItemClasses || '') + isActiveClass;
  const isHamburgerMenuItems = source === MenuSources.hamburger && menuItem?.items && menuItem.items.length > 0;
  const isSelectedMobile = isHamburgerMenuItems && subMenuId === menuItem?.id;
  const isParentMobile = isHamburgerMenuItems && subMenuId !== menuItem?.id;
  const isSelectedMobileClasses = isSelectedMobile ? 'underline d3-ty-navigation-xlarge' : '';

  const itemValue = (
    <>
      {itemIcon ? itemIcon : null}
      {itemText && source !== MenuSources.social ? (
        <>
          {isSelectedMobile ? renderSvgIcon('CaretLeftIcon') : null}
          <span className={`${isSelectedMobileClasses}`}>{itemText}</span>
          {isParentMobile ? renderSvgIcon('CaretRightIcon') : null}
        </>
      ) : (
        itemText && <span className="sr-only">{itemText}</span>
      )}
    </>
  );

  if (menuItem?.link) {
    return (
      <Link
        href={menuItem.link}
        className={`${classNames} cursor-pointer ${isActive ? 'text-component-module-menu-hover' : ''}`}
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
      className={`${classNames ?? ''} ${isActive ? 'text-component-module-menu-hover' : ''}`}
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
