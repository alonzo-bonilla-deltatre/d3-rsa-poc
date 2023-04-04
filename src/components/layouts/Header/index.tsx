import Image from "next/image";
import dynamic from "next/dynamic";
import { getMenu } from "@/services/menuService";
import { MenuResponseData } from "@/models/types/menu";
import { getSingleAssetByTag } from "@/services/gadService";
import Logo from "@/components/common/Logo";

const Header = async (): Promise<React.ReactElement> => {

  // @ts-ignore
  const MenuHeaderService = dynamic(() => import("@/components/common/Menu"));
 

  const menuData = getMenu("headerServiceMenu") as MenuResponseData;
  const navItemClasses = "mx-1";
  const iconSize = "44";
  const logo = await getSingleAssetByTag("react-poc-supercars-logo");


  return (
    <header className="w-full fixed z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex justify-between items-center">
            <button>
              <Image
                src={"/icons/header_hamburger_menu.svg"}
                width={iconSize}
                height={iconSize}
                alt=""
              />
            </button>
          </div>
          {logo && (
            <Logo className={"max-sm:w-full"} width={226} height={25} alt={"Poc"} link={"/test/react-poc/demo"} assetUrl={logo.assetUrl}></Logo>
          )}
          <div className="flex justify-end text-gray-600">
            <MenuHeaderService menuItems={menuData?.menuItems} navItemClasses={navItemClasses}></MenuHeaderService>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
