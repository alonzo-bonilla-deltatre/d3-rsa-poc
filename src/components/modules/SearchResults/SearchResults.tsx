import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { getDarkClass, getHideModule, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import SearchResultView from '@/components/modules/SearchResults/SearchResultsView';

type SearchResultsProps = {
  limit?: number;
  keyPagesLimit?: number;
  cardLayout?: string;
} & ModuleProps;

const defaultLimit = 25;

const SearchResults = async ({ data }: { data: ComponentProps }) => {
  const { limit, keyPagesLimit, isDark, isFullWidth, cardLayout } = data.properties as SearchResultsProps;

  if (getHideModule(data)) return null;

  const azureSearchOption = JSON.parse(getDataVariable(data.variables, 'azureSearchOption')) as AzureSearchOption;
  azureSearchOption.page = 0;
  azureSearchOption.keyPagesPage = 0;
  azureSearchOption.limit = getNumberProperty(limit, defaultLimit);
  azureSearchOption.keyPagesLimit = getNumberProperty(keyPagesLimit, defaultLimit);

  // get the Search path retrieved from data variables
  const searchPath = getSearchPath(data.variables);

  return (
    <SectionWithHeader
      data={{
        headerTitle: 'search',
        hideHeaderTitle: true,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        contentClassName: 'flex flex-col gap-10',
        sectionClassName: `d3-search-results ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <SearchResultView
            cardLayout={cardLayout}
            searchPath={searchPath}
            initialAzureSearchOption={azureSearchOption}
            variables={data.variables}
            isDark={isDark}
          />
        ),
      }}
    />
  );
};
export default SearchResults;
