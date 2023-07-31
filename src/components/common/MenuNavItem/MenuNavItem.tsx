import ImgIcon from '@/components/common/ImgIcon/ImgIcon';
import { MenuItem } from '@/models/types/menu';
import { translate } from '@/utilities/i18n';
import '@/components/common/MenuNavItem/MenuNavItem.scss';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type MenuNavItemProps = {
  menuItem?: MenuItem;
  navItemClasses?: string;
  parentId?: string;
  iconSize?: number;
};

const MenuNavItem = ({ ...data }: MenuNavItemProps) => {
  const { menuItem, navItemClasses, parentId, iconSize } = data as MenuNavItemProps;
  const parentid = parentId;
  const itemLink = menuItem?.link ?? '#nolink';
  const isActive = getBooleanProperty(menuItem?.isActive);

  const isActiveClass = isActive ? 'is-active' : '';
  const itemText = menuItem?.tag ? translate(menuItem?.tag) : menuItem?.text;

  const itemIcon = menuItem?.icon?.data ?? '';
  const additionalAttributes = {
    ...(parentid ? { parentid: parentid } : undefined),
    ...(menuItem?.target ? { target: menuItem.target } : undefined),
    ...(!menuItem?.target ? { rel: 'noopener' } : undefined),
    ...(itemText ? { text: itemText } : undefined),
    ...(itemText ? { alt: itemText } : undefined),
    ...(itemText ? { 'aria-label': itemText } : undefined),
    ...(menuItem?.tag ? { 'data-tag': menuItem.tag } : undefined),
  };
  const classNames = navItemClasses + isActiveClass;
  const hasIcon = itemIcon && iconSize;

  return (
    <>
      {
        <>
          <a
            href={itemLink}
            className={classNames}
            data-id={menuItem?.id}
            {...additionalAttributes}
          >
            {hasIcon && (
              <ImgIcon
                src={itemIcon}
                width={iconSize}
                height={iconSize}
                alt={itemText}
                className={'cursor-pointer transition duration-300 c-img-menu-nav-item'}
                ariaHidden={!itemText}
              ></ImgIcon>
            )}
            {!hasIcon && itemText}
          </a>
        </>
      }
    </>
  );
};

export default MenuNavItem;
