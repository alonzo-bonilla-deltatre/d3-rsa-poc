import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import HamburgerDrawer from '@/components/commons/HamburgerDrawer/HamburgerDrawer';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { MenuSources } from '@/models/types/menu';
import { createDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';
import SocialIcons from '@/components/commons/SocialIcons/SocialIcons';
import LanguageSwitcher from '@/components/commons/LanguageSwitcher/LanguageSwitcher';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';

enum HamburgerLayoutSlots {
  logo = 'logo',
  primaryNavigation = 'primaryNavigation',
}

const Hamburger = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }

  const primaryNavigationSource: Variable = createDataVariable('source', MenuSources.hamburger);
  const frontendConfiguration = getFrontendAllSiteConfiguration();
  const hasFrontendConfiguration = frontendConfiguration && frontendConfiguration?.allSites?.length > 0;

  return (
    <div className="hamburger z-50 flex items-center justify-start">
      <HamburgerDrawer>
        <div className="w-full min-h-[4rem] flex-grow flex items-center justify-center mx-auto">
          <div className="w-140px">
            {renderItemsInSlot(data.items, HamburgerLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
        </div>
        <div className="h-full flex overflow-auto py-2 mx-10 pt-5 uppercase flex-col border-t-2">
          {renderItemsInSlot(
            data.items,
            HamburgerLayoutSlots.primaryNavigation,
            [...(data.variables || []), primaryNavigationSource],
            data.metadata,
            data.previewToken
          )}
        </div>
        <div
          className={`w-full flex flex-col justify-center md:justify-between px-4 mx-auto shadow-[0_-6px_9px_0px_rgba(0,0,0,0.20)]`}
        >
          <div className="flex py-4 items-center justify-center gap-4">
            <SocialIcons/>
          </div>
          {hasFrontendConfiguration && (
            <div className="flex gap-2 pb-4 justify-center w-full">
              <LanguageSwitcher
                hasLanguageSeparator
              />
            </div>
          )}
        </div>
      </HamburgerDrawer>
    </div>
  );
};

export default Hamburger;
