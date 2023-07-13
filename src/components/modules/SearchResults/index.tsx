import CallToAction from '@/components/common/CallToAction';
import Card from '@/components/common/Card';
import SearchBar from '@/components/common/SearchBar';
import {
  createSearchResultItems,
  getLink,
  getPaginationNextUrl,
  getPaginationPrevUrl,
  getPaginationUrl,
  getSearchPath,
  getTotalCount,
} from '@/components/modules/SearchResults/SearchResultsHelper';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { AzureSearchOption, SearchResult } from '@/models/types/azureSearch';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { search } from '@/services/azureCognitiveSearchService';
import { translate } from '@/utilities/i18n';
import { nanoid } from 'nanoid';

type ModuleProps = {
  limit?: string;
  keyPagesLimit?: string;
};

const allTranslatedTag = 'all';
const nextTranslatedTag = 'next';
const prevTranslatedTag = 'prev';
const defaultLimit = '25';

const SearchResults = async ({ ...data }: ComponentProps) => {
  const { limit, keyPagesLimit } = data.properties as ModuleProps;
  const azureSearchOption = JSON.parse(getDataVariable(data.variables, 'azureSearchOption')) as AzureSearchOption;
  azureSearchOption.limit = parseInt(limit ?? defaultLimit);
  azureSearchOption.keyPagesLimit = parseInt(keyPagesLimit ?? defaultLimit);

  const searchResult = await search(azureSearchOption, data.variables);

  const types = searchResult.forgeEntities.items.map((item: SearchResult) => item.type);
  const items = createSearchResultItems(azureSearchOption.facetValue, searchResult);

  // mapping based on Forge's rules
  const getFacetType = (type: string) =>
    ['photo', 'album', 'document', 'story'].includes(type) ? 'type' : 'entityCode';

  // get the Search path retrieved from data variables
  const searchPath = getSearchPath(data.variables);
  const paginationUrl = getPaginationUrl(searchPath, azureSearchOption);
  const nextUrl = getPaginationNextUrl(searchResult, items, azureSearchOption, paginationUrl);
  const prevUrl = getPaginationPrevUrl(azureSearchOption, paginationUrl);

  const totalCount = getTotalCount(azureSearchOption, searchResult);

  return (
    <div className="container px-4 mx-auto">
      <SearchBar
        additionalClasses="mb-4"
        inputValue={azureSearchOption.q}
        show
        showResultsCount
        resultsCount={totalCount}
        redirectPath={searchPath}
      />
      <ul className="mb-2 flex list-none">
        <li key={translate(allTranslatedTag)}>
          <a
            href={getLink(searchPath, azureSearchOption.q)}
            className={`uppercase mr-4 text-gray-300 `}
          >
            {translate(allTranslatedTag)}
          </a>
        </li>
        {types.map((type) => (
          <li key={type}>
            <a
              href={getLink(searchPath, azureSearchOption.q, getFacetType(type), type)}
              className={`uppercase mr-4 text-gray-300 `}
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
      {searchResult.keyPages && (
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
          {searchResult.keyPages.items.map((document) => {
            return (
              <Card
                key={nanoid()}
                entity={
                  {
                    title: document.Title,
                    thumbnail: {
                      title: document.Title,
                      templateUrl: document.Image,
                    },
                    url: document.Url,
                  } as DistributionEntity
                }
                options={{
                  hideIcon: true,
                  hideRoofline: true,
                  hideTitle: false,
                  hideDate: true,
                  hideAuthor: true,
                  hideCta: true,
                }}
              ></Card>
            );
          })}
        </div>
      )}
      {items && (
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
          {items.map((item) => {
            return (
              <Card
                key={nanoid()}
                entity={item}
                options={{
                  hideIcon: true,
                  hideRoofline: true,
                  hideTitle: false,
                  hideDate: true,
                  hideAuthor: true,
                  hideCta: true,
                }}
              ></Card>
            );
          })}
        </div>
      )}
      <div className={`flex my-4 ${prevUrl ? 'justify-between' : 'justify-end'}`}>
        {prevUrl ? (
          <CallToAction
            url={prevUrl}
            text={translate(prevTranslatedTag)}
            isExternal={false}
            style={'default'}
            hide={false}
          ></CallToAction>
        ) : (
          <></>
        )}
        {nextUrl ? (
          <CallToAction
            url={nextUrl}
            text={translate(nextTranslatedTag)}
            isExternal={false}
            style={'default'}
            hide={false}
          ></CallToAction>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default SearchResults;
