import { getMenu } from '@/services/menuService';
import { MenuResponseData } from '@/models/types/menu';
import { getSingleAssetByTag } from '@/services/gadService';
import Logo from '@/components/common/Logo';
import MenuHeaderService from '@/components/common/Menu';
import React from 'react';
import HeaderElement from './HeaderElement';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import SvgIcon from '@/components/common/SvgIcon';
import HamburgerMenuTwoRow from '@/components/icons/HamburgerMenuTwoRow';

const Header = async (): Promise<React.ReactElement> => {
  const menuData = getMenu('headerServiceMenu') as MenuResponseData;
  const navItemClasses = 'mx-1';
  const iconSize = 44;
  const logo = (await getSingleAssetByTag('react-poc-supercars-logo')) as GraphicAssetsDashboardItem;

  return (
    <>
      <HeaderElement
        menuData={menuData}
        menuItemClasses={navItemClasses}
        iconSize={iconSize}
        logo={logo}
        logoWidth={226}
        logoHeight={25}
        logoName={'Poc'}
        logoLink={'/test/react-poc/demo'}
      ></HeaderElement>
    </>
  );
};

export default Header;
