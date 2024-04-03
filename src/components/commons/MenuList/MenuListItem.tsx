import MenuNavItem from '@/components/commons/MenuNavItem/MenuNavItem';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { MenuItem } from '@/models/types/menu';

type MenuItemProps = {
  menuItem: MenuItem;
  navSubMenuClasses?: string;
  navItemClasses: string;
  source?: `${MenuSources}`;
  subMenuId?: string;
  lastSubMenuId?: string;
  baseUrl?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyEnter?: () => void;
};

const MenuListItem = ({
  menuItem,
  navSubMenuClasses,
  navItemClasses,
  source,
  subMenuId,
  lastSubMenuId,
  baseUrl,
  onClick,
  onFocus,
  onBlur,
  onKeyEnter,
}: MenuItemProps) => {
  const isHeader = source === MenuSources.header;
  const isHeaderMobile = source === MenuSources.hamburger;
  const iconSize = source === MenuSources.social ? 34 : MenuSources.header ? 24 : undefined;
  const hasSubItems = menuItem.items && menuItem.items.length > 0;

  const wrapperFooterClasses = source === MenuSources.footer ? 'flex-col gap-3 lg:gap-4' : '';
  const wrapperLegalClasses = source === MenuSources.legal ? 'flex-wrap justify-center gap-10 lg:gap-16' : '';
  const subMenuClasses = subMenuId === menuItem.id || (!isHeader && !isHeaderMobile) ? 'visible' : 'hidden';

  const getSubMenuNavItemClasses = (source?: `${MenuSources}`) => {
    switch (source) {
      case 'header':
        return 'd3-ty-navigation-skew w-max skew-x-[11deg]';
      case 'footer':
        return 'd3-ty-footer-small text-grey-light';
      default:
        return 'd3-ty-navigation-large';
    }
  };

  return (
    <>
      {!isHeaderMobile || !subMenuId || (isHeaderMobile && subMenuId === menuItem.id) ? (
        <MenuNavItem
          menuItem={menuItem}
          navItemClasses={`${navItemClasses} ${source === MenuSources.legal ? 'opacity-50 hover:opacity-100' : ''}`}
          parentId=""
          iconWidth={iconSize}
          iconHeight={iconSize}
          source={source}
          subMenuId={subMenuId}
          baseUrl={baseUrl}
          onClick={onClick}
          onFocus={onFocus}
          onKeyEnter={onKeyEnter}
        />
      ) : null}

      {hasSubItems ? (
        <ul
          className={`flex ${subMenuClasses} ${navSubMenuClasses} ${wrapperFooterClasses} ${wrapperLegalClasses}`}
          aria-hidden={subMenuId === menuItem.id ? 'false' : isHeader || isHeaderMobile ? 'true' : undefined}
        >
          {menuItem.items.map((subMenuItem: MenuItem) => (
            <li
              key={subMenuItem.id}
              className={getSubMenuNavItemClasses(source)}
            >
              <MenuNavItem
                menuItem={subMenuItem}
                parentId={menuItem.id}
                iconWidth={iconSize}
                iconHeight={iconSize}
                source={source}
                lastSubMenuId={lastSubMenuId}
                baseUrl={baseUrl}
                onBlur={onBlur}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default MenuListItem;
