import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { use } from 'react';
import { PageStructureData, Variable } from '@/models/types/pageStructure';
import { getBooleanProperty, getHideLayout } from '@/helpers/pageComponentPropertyHelper';
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
  serviceNavigation = 'serviceNavigation',
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

  const serviceNavigationSource: Variable = createDataVariable('source', MenuSources.header);

  const azureSearchOption = JSON.parse(getDataVariable(data.variables, 'azureSearchOption')) as AzureSearchOption;

  return (
    <header
      id="header"
      className="z-50 w-full"
    >
      {getBooleanProperty(isTransparent) && (
        <HeaderScrollManager
          transparentClasses={['bg-transparent']}
          defaultColor="bg-grey-900"
        />
      )}
      <nav
        id="header-nav"
        className={`flex flex-col justify-center ${
          getBooleanProperty(isTransparent)
            ? 'fixed left-0 right-0 top-0 transition-colors duration-200 ease-linear'
            : 'bg-grey-900'
        }`}
      >
        <div className="container mx-auto grid h-[72px] grid-flow-row grid-cols-3 gap-4 px-4 md:items-center md:justify-between">
          {hamburgerElement}
          <div
            className="flex items-center"
            role="presentation"
            id={CommonHeaderSlots.logo}
          >
            {renderItemsInSlot(data.items, CommonHeaderSlots.logo, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className="hidden justify-end lg:flex"
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
      </nav>
    </header>
  );
};

export default Header;
