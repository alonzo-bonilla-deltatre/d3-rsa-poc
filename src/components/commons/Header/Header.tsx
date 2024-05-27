import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { use } from 'react';
import { PageStructureData, Variable } from '@/models/types/pageStructure';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { createDataVariable, getDataVariable } from '@/helpers/dataVariableHelper';
import { MenuSources } from '@/models/types/menu';
import { HeaderScrollManager } from '@/components/commons/Header/HeaderScrollManager';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { translate } from '@/helpers/translationHelper';
import { getPageStructureFromVariablePath } from '@/helpers/pageHelper';
import SearchBarOverlay from '@/components/commons/SearchBarOverlay/SearchBarOverlay';
import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';

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

const Header = ({ data }: { data: CommonHeaderProps }) => {
  if (getHideLayout(data)) {
    return null;
  }
  const { isTransparent } = data as CommonHeaderProps;

  const hamburgerStructure = use(
    getPageStructureFromVariablePath('inc_hamburger', data.variables, data.previewToken)
  ) as PageStructureData;
  const hamburgerStructureItem = hamburgerStructure?.structure;
  hamburgerStructureItem?.items?.forEach((item) => {
    item.slot = CommonHeaderSlots.hamburger;
  });
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
      className="z-50 w-full"
    >
      {isTransparent && (
        <HeaderScrollManager
          transparentClasses={['bg-transparent']}
          defaultColor="bg-grey-900"
        />
      )}
      <nav
        id="header-nav"
        className={`flex flex-col justify-center ${
          isTransparent ? 'transition-colors duration-200 ease-linear fixed top-0 left-0 right-0' : 'bg-grey-900'
        }`}
      >
        <div className="h-[72px] container mx-auto px-4 grid grid-cols-3 grid-flow-row gap-4 md:items-center md:justify-between">
          {hamburgerElement}
          <div
            className="flex items-center"
            role="presentation"
            id={CommonHeaderSlots.logo}
          >
            {renderItemsInSlot(data.items, CommonHeaderSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className="justify-end hidden lg:flex"
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
              <div className="flex flex-row uppercase items-center justify-center flex-wrap lg:justify-between">
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
            className="w-full flex items-center justify-center"
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
            className="w-full flex items-center"
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

export default Header;
