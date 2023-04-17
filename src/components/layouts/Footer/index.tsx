import { translate } from "@/utilities/i18n";
import { getMenu} from "@/services/menuService";
import { MenuResponseData } from "@/models/types/menu";
import SocialIcons from "@/components/common/SocialIcons";
import Menu from "@/components/common/Menu";
import LanguageSwitcher from "@/components/layouts/Footer/LanguageSwitcher";
import React from "react";
import {getFrontendAllSiteConfiguration} from "@/services/configurationService";

const navItemClasses =
  "font-bold py-3 lg:py-0 first:pt-0 last:pb-0 px-4 transition duration-300 hover:text-[#EE3123]";

const Footer = async(): Promise<React.ReactElement> => {
  const menuData = getMenu("footerMenu") as MenuResponseData;
  const allSiteConfiguration = await getFrontendAllSiteConfiguration();
  //TODO menu items validation
  return (
    <footer className="w-full text-sm">
      <nav className="bg-[#141414]/0">
        <div className="container flex flex-col md:flex-row md:justify-between px-4 mx-auto py-4 md:py-12 border-b border-[#FFFFFF33]">
          <div className="flex py-6">
          <SocialIcons hide={false} size={34} className={"mr-4"}></SocialIcons>
          </div>

          <div className="flex items-center text-[#BEBEBE] pb-6 md:pb-0">
            <LanguageSwitcher allSiteConfiguration={allSiteConfiguration}/>
          </div>
        </div>
        <div className="container mx-auto py-12 lg:text-center">
          <div className="flex flex-col lg:flex-row uppercase justify-between">
            <Menu menuItems={menuData?.menuItems} navItemClasses={navItemClasses}></Menu>
          </div>
        </div>

        <div className="container px-4 mx-auto pb-12 text-[#BEBEBE]">
          <div>
            <p>{translate("copyright")}</p>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
