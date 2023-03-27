import Picture from "@/components/common/Picture";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { firstAssetOrDefault, getAssetsByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getMenu } from "@/services/menuService";
import { MenuResponseData } from "@/models/types/menu";

const Header = async (): Promise<React.ReactElement> => {
  // const gadAssetsFetch = getAssetsByTag("react-poc-supercars-logo");

  // const [gadAssets] = await Promise.all([gadAssetsFetch]);
  // const logo: GraphicAssetsDashboardItem | null = firstAssetOrDefault(gadAssets);

  // @ts-ignore
  const MenuHeaderService = dynamic(() => import("@/components/common/Menu"));
  // @ts-ignore
  const Logo = dynamic(() => import("@/components/common/Logo"));
  
  const menuData = getMenu("headerServiceMenu") as MenuResponseData;
  const navItemClasses = "mx-1";
  const iconSize = "44"; 

  return (
    <header className="w-full fixed z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex justify-between items-center">
            <button>
              <Image
                src={"/icons/header_hamburger_menu.svg"}
                width={44}
                height={44}
                alt=""
              />
            </button>
          </div>
          <Logo tagName={"react-poc-supercars-logo"} className={"max-sm:w-full"} width={226} height={25} alt={"Poc"} link="/test/react-poc/demo"></Logo>
          {/* {logo && (
            <div className="flex items-center" role="presentation">
              <Picture
                className="max-sm:w-full"
                src={logo.assetUrl}
                alt=""
                width={226}
                height={25}
                transformations={transformations.logos}
              />
            </div>
          )} */}

          <div className="flex justify-end text-gray-600">
            <MenuHeaderService menuItems={menuData?.menuItems} navItemClasses={navItemClasses}></MenuHeaderService>

            {/* <Link href="/" className="mx-1">
              <Image
                src={"/icons/header_ticket.svg"}
                width={44}
                height={44}
                alt=""
              />
            </Link>
            <Link href="/" className="mx-1">
              <Image
                src={"/icons/header_shop.svg"}
                width={44}
                height={44}
                alt=""
              />
            </Link>
            <Link href="/" className="mx-1">
              <Image
                src={"/icons/header_search.svg"}
                width={44}
                height={44}
                alt=""
              />
            </Link>
            <Link href="/" className="mx-1">
              <Image
                src={"/icons/header_login.svg"}
                width={44}
                height={44}
                alt=""
              />
            </Link> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
