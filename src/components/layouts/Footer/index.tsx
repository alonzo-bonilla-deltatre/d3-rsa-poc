import { translate } from '@/utilities/i18n';
import { getMenu } from '@/services/menuService';
import { MenuResponseData } from '@/models/types/menu';
import SocialIcons from '@/components/common/SocialIcons';
import Menu from '@/components/common/Menu';
import LanguageSwitcher from '@/components/layouts/Footer/LanguageSwitcher';
import React from 'react';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';
import FooterElement from './FooterElement';

const navItemClasses = 'font-bold py-3 lg:py-0 first:pt-0 last:pb-0 px-4 transition duration-300 hover:text-[#EE3123]';

const Footer = async (): Promise<React.ReactElement> => {
  const menuData = getMenu('footerMenu') as MenuResponseData;
  const allSiteConfiguration = await getFrontendAllSiteConfiguration();
  //TODO menu items validation

  const SocialIconsProps = {
    hide: false,
    size: 34,
    className: 'mr-4 cursor-pointer hover:text-[#EE3123] transition duration-300',
  };

  return (
    <>
      <FooterElement
        social={SocialIconsProps}
        languages={allSiteConfiguration}
        menuData={menuData}
        menuItemClasses={navItemClasses}
        copyright={translate('copyright')}
      ></FooterElement>
    </>
  );
};

export default Footer;
