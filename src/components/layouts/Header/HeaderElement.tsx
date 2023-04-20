import Image from "next/image";
import { MenuResponseData } from "@/models/types/menu";
import Logo from "@/components/common/Logo";
import MenuHeaderService from "@/components/common/Menu";
import React from "react";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";

type HeaderProps = {
  menuData: MenuResponseData;
  menuItemClasses: string;
  iconSize: number;
  logo: GraphicAssetsDashboardItem;
  logoWidth: number;
  logoHeight: number;
  logoName:string;
  logoLink:string;
}
const Header = ({ ...props }: HeaderProps) => {
  return (
    <header className="w-full fixed z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex justify-between items-center">
            <button>
              <Image
                src={"/icons/header_hamburger_menu.svg"}
                width={props.iconSize}
                height={props.iconSize}
                alt=""
              />
            </button>
          </div>
          {props.logo && (
            <Logo className={"max-sm:w-full"} width={props.logoWidth} height={props.logoHeight} alt={props.logoName} link={props.logoLink} assetUrl={props.logo.assetUrl}></Logo>
          )}
          <div className="flex justify-end text-gray-600">
            <MenuHeaderService menuItems={props.menuData?.menuItems} navItemClasses={props.menuItemClasses}></MenuHeaderService>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
