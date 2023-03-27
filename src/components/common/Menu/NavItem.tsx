import { translate } from "@/utilities/i18n";
import Link from "next/link";
import { MenuItem } from "@/models/types/menu";
import { usePathname } from 'next/navigation';
import SvgIcon from "../SvgIcon";

type NavItemProps = {
  menuItem: MenuItem;
  navItemClasses: string;
  parentId: string;
  iconSize: number;
}

const NavItem = ({ ...data }: NavItemProps) => {
  const { menuItem, navItemClasses, parentId, iconSize } = data as NavItemProps;
  //const router = usePathname();
  const parentid = parentId;
  const itemLink = menuItem.properties.link ?? "#nolink";
  const isActive = false;//router.pathname == itemLink;
  //TODO isActive handler
  const isActiveClass= isActive ? "-active":"";
  const itemText = translate(menuItem.properties.tag) ?? menuItem.text
  
  const itemTooltip = menuItem.properties.toolTip ? translate(menuItem.properties.toolTip) : itemText;
  const itemIcon = menuItem.properties.icon;
  var additionalAttributes = {
    ...(parentid ? {parentid: parentid} : undefined),
    ...(menuItem.properties.target ? {target: menuItem.properties.target} : undefined),
    ...(!menuItem.properties.target ? {rel: "noopener"} : undefined),
    ...(itemText ? {text: itemText} : undefined),
    ...(itemText ? {alt: itemText} : undefined),
    ...(itemText ? {"aria-label": itemText} : undefined)
  }
  const classNames = navItemClasses+isActiveClass;
  const hasIcon = itemIcon && iconSize;
  return (
    <>
    {//@ts-ignore}
      <a href={itemLink} class={classNames} data-id={menuItem.id} {...additionalAttributes}>
        {
          hasIcon && (<SvgIcon src={itemIcon} width={iconSize} height={iconSize} alt={itemText}></SvgIcon>)
        }
        {
          !hasIcon && itemText
        }
      </a>
}
    </>
  )
};


export default NavItem;
