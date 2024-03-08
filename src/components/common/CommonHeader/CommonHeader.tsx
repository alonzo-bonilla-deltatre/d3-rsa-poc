import { ComponentProps, LayoutProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { use } from 'react';
import SearchBarOverlay from '@/components/common/SearchBarOverlay/SearchBarOverlay';
import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';
import { PageStructureData, Variable } from '@/models/types/pageStructure';
import { getHamburgerStructure } from '@/services/hamburgerService';
import { getBooleanProperty, getDarkClass, getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { createDataVariable, getDataVariable } from '@/helpers/dataVariableHelper';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { ScrollManager } from '@/components/common/CommonHeader/ScrollManager';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { enrichPageVariables } from '@/app/pageHelpers';
import { translate } from '@/helpers/translationHelper';

enum CommonHeaderSlots {
  logo = 'logo',
  hamburger = 'hamburger',
  primaryNavigation = 'primaryNavigation',
  secondaryNavigation = 'secondaryNavigation',
  serviceNavigation = 'serviceNavigation',
  middleContent = 'middleContent',
}

export type CommonHeaderProps = {
  isTransparent?: boolean;
} & ComponentProps;

const CommonHeader = ({ data }: { data: CommonHeaderProps }) => {
  if (getHideLayout(data)) {
    return null;
  }
  const { isDark } = data.properties as LayoutProps;
  const { isTransparent } = data as CommonHeaderProps;

  const hamburgerStructure = use(getHamburgerStructure(data.variables, data.previewToken)) as PageStructureData;
  const hamburgerStructureItem = hamburgerStructure?.structure;
  hamburgerStructureItem?.items?.forEach((item) => {
    item.slot = CommonHeaderSlots.hamburger;
  });
  const hamburgerVariables = data.variables || [];
  enrichPageVariables(hamburgerVariables, { isDarkHeader: `${isDark}` });
  const hamburgerElement = hamburgerStructureItem
    ? renderItemsInSlot(
        hamburgerStructureItem.items,
        CommonHeaderSlots.hamburger,
        data.variables,
        data.metadata,
        data.previewToken
      )
    : [];

  const primaryNavigationSource: Variable = createDataVariable('source', MenuSources.header);
  const secondaryNavigationSource: Variable = createDataVariable('source', MenuSources.header);
  const serviceNavigationSource: Variable = createDataVariable('source', MenuSources.header);

  const azureSearchOption = JSON.parse(getDataVariable(data.variables, 'azureSearchOption')) as AzureSearchOption;

  return (
    <header
      id="header"
      className={`z-50 w-full ${getDarkClass(isDark)}`}
    >
      {isTransparent && (
        <ScrollManager
          transparentClasses={['bg-transparent']}
          defaultColor={`${getBooleanProperty(isDark) ? 'bg-component-common-common-header-background-dark' : 'bg-component-common-common-header-background-light'}`}
        />
      )}
      <nav
        id="header-nav"
        aria-label={translate('common-header-navigation')}
        className={`flex flex-col justify-center ${
          isTransparent
            ? 'transition-colors duration-200 ease-linear text-component-common-common-header-text-light dark:text-component-common-common-header-text-dark fixed top-0 left-0 right-0'
            : 'bg-component-common-common-header-background-light dark:bg-component-common-common-header-background-dark'
        }`}
      >
        <div className="h-header-height container px-4 grid grid-cols-3 grid-flow-row gap-4 md:items-center md:justify-between">
          {hamburgerElement}
          <div
            className="flex items-center"
            role="presentation"
            id={CommonHeaderSlots.logo}
          >
            {renderItemsInSlot(data.items, CommonHeaderSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className={`flex justify-end hidden lg:flex ${getBooleanProperty(isDark) ? 'text-component-common-common-header-text-dark' : 'text-component-common-common-header-text-light'}`}
            id={CommonHeaderSlots.serviceNavigation}
          >
            {renderItemsInSlot(
              data.items,
              CommonHeaderSlots.serviceNavigation,
              [...(data.variables || []), serviceNavigationSource],
              data.metadata,
              data.previewToken
            )}
          </div>
        </div>
        <SearchBarOverlay
          redirectPath={getSearchPath(data.variables)}
          inputValue={azureSearchOption.q}
        />
        <div className="container px-4 hidden lg:block">
          <div
            className="w-full flex items-center"
            id={CommonHeaderSlots.primaryNavigation}
          >
            <div className="container mx-auto lg:text-center">
              <div
                className={`flex flex-row uppercase items-center justify-center flex-wrap lg:justify-between ${getBooleanProperty(isDark) ? 'text-component-common-common-header-text-dark' : 'text-component-common-common-header-text-light'}`}
              >
                {renderItemsInSlot(
                  data.items,
                  CommonHeaderSlots.primaryNavigation,
                  [...(data.variables || []), primaryNavigationSource],
                  data.metadata,
                  data.previewToken
                )}
              </div>
            </div>
          </div>
          <div
            className={`w-full flex items-center justify-center ${getBooleanProperty(isDark) ? 'bg-component-common-common-header-background-light text-component-common-common-header-text-light' : 'bg-component-common-common-header-background-dark text-component-common-common-header-text-dark'}`}
            id={CommonHeaderSlots.secondaryNavigation}
          >
            <div className="container mx-auto lg:text-center">
              <div className="flex flex-row uppercase items-center justify-center flex-wrap lg:justify-between">
                {renderItemsInSlot(
                  data.items,
                  CommonHeaderSlots.secondaryNavigation,
                  [...(data.variables || []), secondaryNavigationSource],
                  data.metadata,
                  data.previewToken
                )}
              </div>
            </div>
          </div>
          <div
            className={`w-full flex items-center ${getBooleanProperty(isDark) ? 'text-component-common-common-header-text-dark' : 'text-component-common-common-header-text-light'}`}
            id={CommonHeaderSlots.middleContent}
          >
            {renderItemsInSlot(
              data.items,
              CommonHeaderSlots.middleContent,
              data.variables,
              data.metadata,
              data.previewToken
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CommonHeader;
