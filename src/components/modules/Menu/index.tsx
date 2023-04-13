import { ComponentProps } from "@/models/types/components";
import { MenuItem, MenuResponseData } from "@/models/types/menu";
import MenuList from "@/components/common/Menu";
import { getFooterMenu } from "@/services/menuService";


type MenuModuleProps = {
    menuItems: MenuItem[];
    navItemClasses: string;
    menuName: string;
}


const Menu = async ({ ...data }: ComponentProps) => {
    const properties = data.properties as MenuModuleProps;
    const { menuItems, navItemClasses, menuName } = data.properties as MenuModuleProps;
    //TODO: remove default menuName
    const defaultMenuName = menuName ? menuName :"footerMenu";
    const getMenuData = getFooterMenu() as MenuResponseData;
    const [menuData] = await Promise.all([getMenuData]);
    return menuData ? (
        <>
            <div className="container mx-auto py-12 lg:text-center">
                <div className="flex flex-col lg:flex-row uppercase justify-between">
                    <MenuList menuItems={menuData?.menuItems} navItemClasses={navItemClasses}></MenuList>
                </div>
            </div>
        </>
    ) : (
        <></>
    );
};

export default Menu;