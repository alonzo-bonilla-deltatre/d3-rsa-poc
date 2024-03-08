'use client';

import { useRef } from 'react';

type SearchBarProps = {
  additionalClasses?: string;
  inputAdditionalClasses?: string;
  inputTitle?: string;
  inputValue?: string;
  redirectPath?: string;
  resultsCount?: number;
  showResultsCount?: boolean;
  widthCssClass?: string;
};

const SearchBar = ({
  additionalClasses = '',
  inputAdditionalClasses = '',
  inputTitle = 'insert your text here',
  inputValue = '',
  redirectPath = '/search',
  resultsCount: results = 0,
  showResultsCount = false,
  widthCssClass = 'w-full',
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // once pressed "Enter", go to "/search" page passing the query string
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement)?.value ?? '';
    if (event.key === 'Enter') {
      window.location.assign(redirectPath + '?q=' + inputValue);
    }
  };

  return (
    <div
      className={`text-black dark:text-white flex h-full items-center justify-center ${widthCssClass} ${additionalClasses}`}
    >
      <div className="w-3/4 px-1 pt-2 flex flex-col justify-center h-full">
        <input
          className={`bg-transparent text-black dark:text-gray-100 border-b-accent w-full h-12 leading-5 border-b-2 outline-0 text-2xl placeholder-black dark:placeholder-gray-100 ${inputAdditionalClasses}`}
          autoFocus={true}
          title={inputTitle}
          placeholder="What are you looking for?"
          ref={inputRef}
          onKeyUp={onKeyUp}
          defaultValue={inputValue}
        />
        {showResultsCount && (
          <div className="flex justify-end text-sm text-black dark:text-gray-100 py-2">{results} Results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
