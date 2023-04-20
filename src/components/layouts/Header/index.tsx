import { getMenu } from "@/services/menuService";
import { MenuResponseData } from "@/models/types/menu";
import { getSingleAssetByTag } from "@/services/gadService";
import Logo from "@/components/common/Logo";
import MenuHeaderService from "@/components/common/Menu";
import React from "react";
import SvgIcon from "@/components/common/SvgIcon";
import HamburgerMenuTwoRow from "@/components/icons/HamburgerMenuTwoRow";

const Header = async (): Promise<React.ReactElement> => {

  const menuData = getMenu("headerServiceMenu") as MenuResponseData;
  const navItemClasses = "mx-1";
  const iconSize = 44;
  const logo = await getSingleAssetByTag("react-poc-supercars-logo");


  return (
    <header className="w-full fixed z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex justify-between items-center">
            <button>
              <SvgIcon className={"cursor-pointer hover:text-[#EE3123] transition duration-300"} size={iconSize} icon={HamburgerMenuTwoRow}></SvgIcon>
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
