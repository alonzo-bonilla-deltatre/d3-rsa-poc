'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { Dispatch, SetStateAction, useState } from 'react';
import useTranslate from '@/hooks/useTranslate';
import { twMerge } from 'tailwind-merge';
import Typography from '@/components/commons/Typography/Typography';

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
  const itemClassName = 'transition duration-300 hover:text-link cursor-pointer whitespace-nowrap after:block after:bottom-0 after:content-[\'\'] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-600 after:origin-left';
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
    <ul className="flex flex-row relative gap-4 overflow-auto mb-6 ">
      <li key={translate(allTranslatedTag)} className="relative">
        <button
          className={twMerge(itemClassName, activeItem === allTranslatedTag ? 'after:scale-x-100 text-link' : '')}
          onClick={() => handlerNavigationClick(azureSearchOption.q)}
        >
          <Typography variant={'navigation-xl'}>
            <TranslatedLabel translationTermKey={allTranslatedTag} />
          </Typography>
        </button>
      </li>
      {types?.map((type: string) => (
        <li key={type} className="relative">
          <button
            className={twMerge(itemClassName, activeItem === type ? 'after:scale-x-100 text-link' : '')}
            onClick={() => handlerNavigationClick(azureSearchOption.q, getFacetType(type), type)}
          >
            <Typography variant={'navigation-xl'}>
              <TranslatedLabel translationTermKey={type} />
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchCategories;
