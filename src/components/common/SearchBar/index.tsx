'use client';

import { useRef } from 'react';

type SearchBarProps = {
  additionalClasses?: string;
  inputTitle?: string;
  inputValue?: string;
  lightTheme?: boolean;
  redirectPath?: string;
  resultsCount?: number;
  show?: boolean;
  showResultsCount?: boolean;
  widthCssClass?: string;
};

const SearchBar = ({
  additionalClasses = '',
  inputTitle = 'insert your text here',
  inputValue = '',
  lightTheme = false,
  redirectPath = '/search',
  resultsCount: results = 0,
  show = false,
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
      className={`${
        lightTheme ? 'bg-white' : 'bg-black'
      } flex bg-black h-40 items-center justify-center ${widthCssClass} ${additionalClasses}`}
    >
      <div className="w-3/4 px-1 pt-2 flex flex-col justify-between h-full">
        {show && <div className="flex justify-center text-black font-bold">Search Results for:</div>}
        <input
          className={`${
            lightTheme ? 'bg-white text-black border-b-gray-200' : 'bg-black text-slate-300 border-b-[#EE3123]'
          } w-full h-12 leading-5 border outline-0 text-2xl`}
          autoFocus={true}
          type={'search'}
          title={inputTitle}
          placeholder="What are you looking for?"
          ref={inputRef}
          onKeyUp={onKeyUp}
          defaultValue={inputValue}
        />
        {show && showResultsCount && (
          <div className="flex justify-end text-sm text-gray-400 py-2">{results} Results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
