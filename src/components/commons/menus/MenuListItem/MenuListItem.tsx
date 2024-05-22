import MenuNavItem from '@/components/commons/menus/MenuNavItem/MenuNavItem';
import { MenuItem, MenuSources } from '@/models/types/menu';

type MenuItemProps = {
  menuItem: MenuItem;
  source?: MenuSources;
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
  const iconSize = MenuSources.header ? 32 : undefined;
  const hasSubItems = menuItem.items && menuItem.items.length > 0;

  const subMenuClasses = subMenuId === menuItem.id || (!isHeader && !isHeaderMobile) ? 'visible' : 'hidden';

  return (
    <>
      {!isHeaderMobile || !subMenuId || (isHeaderMobile && subMenuId === menuItem.id) ? (
        <MenuNavItem
          menuItem={menuItem}
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
          className={`flex ${subMenuClasses}`}
          aria-hidden={subMenuId === menuItem.id ? 'false' : isHeader || isHeaderMobile ? 'true' : undefined}
        >
          {menuItem.items.map((subMenuItem: MenuItem) => (
            <li key={subMenuItem.id}>
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
