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
    <div className="hamburger z-50 flex items-center justify-start text-black">
      <HamburgerDrawer>
        <div className="mx-auto flex min-h-[4rem] w-full flex-grow items-center justify-center">
          <div className="w-140px">
            {renderItemsInSlot(data.items, HamburgerLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
        </div>
        <div className="mx-10 flex h-full flex-col overflow-auto border-t-2 border-t-black py-2 pt-5 uppercase">
          {renderItemsInSlot(
            data.items,
            HamburgerLayoutSlots.primaryNavigation,
            [...(data.variables || []), primaryNavigationSource],
            data.metadata,
            data.previewToken
          )}
        </div>
        <div className="mx-auto flex w-full flex-col justify-center px-4 shadow-[0_-6px_9px_0px_rgba(0,0,0,0.20)] md:justify-between">
          <div className="flex items-center justify-center gap-4 py-4">
            <SocialIcons />
          </div>
          {hasFrontendConfiguration && (
            <div className="flex w-full justify-center gap-2 pb-4">
              <LanguageSwitcher
                hasLanguageSeparator
                variables={data.variables}
                allSiteConfiguration={frontendConfiguration}
              />
            </div>
          )}
        </div>
      </HamburgerDrawer>
    </div>
  );
};

export default Hamburger;
