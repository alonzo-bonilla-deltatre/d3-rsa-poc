import {translate} from "@/utilities/i18n";
import {MenuItem} from "@/models/types/menu";
import ImgIcon from "@/components/common/ImgIcon";
import "./MenuNavItem.scss"

type MenuNavItemProps = {
  menuItem: MenuItem;
  navItemClasses: string;
  parentId: string;
  iconSize: number;
}

const MenuNavItem = ({...data}: MenuNavItemProps) => {
  const {menuItem, navItemClasses, parentId, iconSize} = data as MenuNavItemProps;
  //const router = usePathname();
  const parentid = parentId;
  const itemLink = menuItem.properties.link ?? "#nolink";
  const isActive = false;//router.pathname == itemLink;
  //TODO isActive handler
  const isActiveClass = isActive ? "-active" : "";
  const itemText = translate(menuItem.properties.tag) ?? menuItem.text

  const itemIcon = menuItem.properties.icon;
  const additionalAttributes = {
    ...(parentid ? {parentid: parentid} : undefined),
    ...(menuItem.properties.target ? {target: menuItem.properties.target} : undefined),
    ...(!menuItem.properties.target ? {rel: "noopener"} : undefined),
    ...(itemText ? {text: itemText} : undefined),
    ...(itemText ? {alt: itemText} : undefined),
    ...(itemText ? {"aria-label": itemText} : undefined)
  }
  const classNames = navItemClasses + isActiveClass;
  const hasIcon = itemIcon && iconSize;

  return (
    <>
      {
        <>
          <a href={itemLink} className={classNames} data-id={menuItem.id} {...additionalAttributes}>
            {
              hasIcon && (
                <ImgIcon src={itemIcon} width={iconSize} height={iconSize} alt={itemText}
                         className={"cursor-pointer transition duration-300 c-img-menu-nav-item"}
                         ariaHidden={!itemText}></ImgIcon>
              )
            }
          </a>
        </>
      }
    </>
  )
};

export default MenuNavItem;