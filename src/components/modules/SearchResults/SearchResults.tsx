import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { getBooleanProperty, getHideModule, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import SearchResultView from '@/components/modules/SearchResults/SearchResultsView';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type SearchResultsProps = {
  limit?: number;
  keyPagesLimit?: number;
} & ModuleProps;

const defaultLimit = 25;

const SearchResults = async ({ data }: { data: ComponentProps }) => {
  const { limit, keyPagesLimit, isFullWidth } = data.properties as SearchResultsProps;

  if (getHideModule(data)) return null;

  const azureSearchOption = JSON.parse(getDataVariable(data.variables, 'azureSearchOption')) as AzureSearchOption;
  azureSearchOption.page = 0;
  azureSearchOption.keyPagesPage = 0;
  azureSearchOption.limit = getNumberProperty(limit, defaultLimit);
  azureSearchOption.keyPagesLimit = getNumberProperty(keyPagesLimit, defaultLimit);

  // get the Search path retrieved from data variables
  const searchPath = getSearchPath(data.variables);

  return (
    <ModuleContainer
      isFullWidth={getBooleanProperty(isFullWidth)}
      className="px-2"
    >
      <SearchResultView
        searchPath={searchPath}
        initialAzureSearchOption={azureSearchOption}
        variables={data.variables}
      />
    </ModuleContainer>
  );
};
export default SearchResults;
