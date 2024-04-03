'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { Dispatch, SetStateAction, useState } from 'react';
import useTranslate from '@/hooks/useTranslate';

const allTranslatedTag = 'all';

type SearchCategoriesProps = {
  types?: string[];
  azureSearchOption: AzureSearchOption;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setAzureSearchOption: Dispatch<SetStateAction<AzureSearchOption>>;
  refreshSearch: Function;
};

// mapping based on Forge's rules
const getFacetType = (type: string) => (['photo', 'album', 'document', 'story'].includes(type) ? 'type' : 'entityCode');

const SearchCategories = ({
  refreshSearch,
  setAzureSearchOption,
  azureSearchOption,
  types,
  setIsLoading,
}: SearchCategoriesProps) => {
  const translate = useTranslate();
  const itemClassName =
    'd3-ty-navigation-xlarge hover:text-accent dark:hover:text-accent cursor-pointer mb-6 whitespace-nowrap';
  const [activeItem, setActiveItem] = useState<string>(allTranslatedTag);

  const handlerNavigationClick = (q: string, facetType: string = '', facetValue: string = '') => {
    setIsLoading(true);
    azureSearchOption.q = q;
    azureSearchOption.page = 0;
    azureSearchOption.facetType = facetType;
    azureSearchOption.facetValue = facetValue;
    setAzureSearchOption(azureSearchOption);
    setActiveItem(facetValue ? facetValue : allTranslatedTag);
    refreshSearch();
  };

  return (
    <ul className="flex flex-row relative gap-4 overflow-auto">
      <li key={translate(allTranslatedTag)}>
        <button
          className={`${itemClassName} ${
            activeItem === allTranslatedTag ? 'border-b-2 border-accent text-accent' : 'text-black dark:text-grey-100'
          }`}
          onClick={() => handlerNavigationClick(azureSearchOption.q)}
        >
          <TranslatedLabel translationTermKey={allTranslatedTag} />
        </button>
      </li>
      {types?.map((type: string) => (
        <li key={type}>
          <button
            className={`${
              activeItem === type ? 'border-b-2 border-accent text-accent' : 'text-black dark:text-grey-100'
            } ${itemClassName}`}
            onClick={() => handlerNavigationClick(azureSearchOption.q, getFacetType(type), type)}
          >
            <TranslatedLabel translationTermKey={type} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchCategories;
