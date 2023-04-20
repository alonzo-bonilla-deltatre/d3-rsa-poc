import { MenuResponseData } from "@/models/types/menu";
import SocialIcons, { SocialIconsProps } from "@/components/common/SocialIcons";
import Menu from "@/components/common/Menu";
import LanguageSwitcher from "@/components/layouts/Footer/LanguageSwitcher";
import { FrontendConfiguration } from "@/models/types/frontendConfiguration";

type FooterProps = {
  social: SocialIconsProps;
  languages: FrontendConfiguration;
  menuData: MenuResponseData;
  menuItemClasses: string;
  copyright: string;
};

const FooterElement = ({ ...props }: FooterProps) => {

  return (
    <footer className="w-full text-sm">
      <nav className="bg-[#141414]/0">
        <div className="container flex flex-col md:flex-row md:justify-between px-4 mx-auto py-4 md:py-12 border-b border-[#FFFFFF33]">
          <div className="flex py-6">
            <SocialIcons hide={props.social.hide} size={props.social.size} className={props.social.className}></SocialIcons>
          </div>

          <div className="flex items-center text-[#BEBEBE] pb-6 md:pb-0">
            <LanguageSwitcher allSiteConfiguration={props.languages} />
          </div>
        </div>
        <div className="container mx-auto py-12 lg:text-center">
          <div className="flex flex-col lg:flex-row uppercase justify-between">
            <Menu menuItems={props.menuData?.menuItems} navItemClasses={props.menuItemClasses}></Menu>
          </div>
        </div>

        <div className="container px-4 mx-auto pb-12 text-[#BEBEBE]">
          <div>
            <p>{props.copyright}</p>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default FooterElement;
