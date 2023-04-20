import { MenuItem } from "@/models/types/menu";
import MenuNavItem from "@/components/common/MenuNavItem/MenuNavItem";
import { nanoid } from "nanoid";

type MenuProps = {
  menuItems: MenuItem[];
  navItemClasses: string;
}


const MenuList = ({ ...data }: MenuProps) => {
  const { menuItems, navItemClasses } = data as MenuProps;
  const iconSize = 44;
  return (
    <>
      {menuItems && menuItems.map((menuItem) => (

        <>
          <MenuNavItem key={nanoid()} menuItem={menuItem} navItemClasses={navItemClasses} parentId="" iconSize={iconSize} />

          {
            menuItem.menuItems.map((subMenuItem) => (
              <MenuNavItem key={nanoid()} menuItem={subMenuItem} navItemClasses={navItemClasses+" sub"} parentId={menuItem.id} iconSize={iconSize} />
            ))
          }
        </>
      ))
      }
    </>
  );
};

export default MenuList;
