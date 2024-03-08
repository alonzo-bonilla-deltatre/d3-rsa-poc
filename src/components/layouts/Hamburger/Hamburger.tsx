import { ComponentProps, LayoutProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import HamburgerDrawer from '@/components/common/HamburgerDrawer/HamburgerDrawer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';
import SocialIcons from '@/components/common/SocialIcons/SocialIcons';
import {
  getBooleanProperty,
  getBooleanPropertyFromString,
  getDarkClass,
  getHideLayout,
} from '@/helpers/pageComponentPropertyHelper';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { createDataVariable, getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';

enum HamburgerLayoutSlots {
  logo = 'logo',
  primaryNavigation = 'primaryNavigation',
}

const Hamburger = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }
  const { isDark } = data.properties as LayoutProps;
  const socialIconsProps = {
    hide: false,
    size: 34,
    className: `cursor-pointer hover:text-component-layout-hamburger-social-icon-hover transition duration-300 ${getBooleanProperty(isDark) ? 'text-component-layout-hamburger-social-icon-dark' : 'text-component-layout-hamburger-social-icon-light'}`,
  };

  const primaryNavigationSource: Variable = createDataVariable('source', MenuSources.hamburger);

  const isDarkHeader = getDataVariable(data.variables, 'isDarkHeader');

  return (
    <div
      className={`hamburger z-50 flex items-center justify-start ${getDarkClass(isDark)} ${getBooleanProperty(isDark) ? 'text-component-layout-hamburger-text-dark' : 'text-component-layout-hamburger-text-light'}`}
    >
      <HamburgerDrawer
        isDarkHeader={getBooleanPropertyFromString(isDarkHeader)}
        isDark={getBooleanProperty(isDark)}
      >
        <div className="w-full min-h-[4rem] flex-grow flex items-center justify-center mx-auto">
          <div className={'w-140px'}>
            {renderItemsInSlot(data.items, HamburgerLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
        </div>
        <div
          className={`h-full flex overflow-auto py-2 mx-10 pt-5 uppercase flex-col border-t-2 ${getBooleanProperty(isDark) ? 'border-t-component-layout-hamburger-border-dark' : 'border-t-component-layout-hamburger-border-light'}`}
        >
          {renderItemsInSlot(
            data.items,
            HamburgerLayoutSlots.primaryNavigation,
            [...(data.variables || []), primaryNavigationSource],
            data.metadata,
            data.previewToken
          )}
        </div>
        <div
          className={`w-full flex flex-col justify-center md:justify-between px-4 mx-auto ${getBooleanProperty(isDark) ? 'shadow-hamburger-dark' : 'shadow-hamburger-light'}`}
        >
          <div className="flex pt-4 items-center justify-center gap-4">
            <SocialIcons {...socialIconsProps}></SocialIcons>
          </div>
          <div className="flex gap-2 py-4 justify-center w-full">
            <LanguageSwitcher
              isDark={isDark}
              hasLanguageSeparator
            />
          </div>
        </div>
      </HamburgerDrawer>
    </div>
  );
};

export default Hamburger;
