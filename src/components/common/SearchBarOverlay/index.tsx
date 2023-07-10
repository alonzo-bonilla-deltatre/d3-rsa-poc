'use client';

import { useEffect, useRef, useState } from 'react';
import Overlay from '../Overlay';
import SearchBar from '../SearchBar';

type SearchBarOverlayProps = {
  additionalOverlayClasses?: string;
  additionalWrpperClasses?: string;
  additionalSearchBarClasses?: string;
  inputTitle?: string;
  inputValue?: string;
  lightTheme?: boolean;
  redirectPath?: string;
  resultsCount?: number;
  show?: boolean;
  showResultsCount?: boolean;
  widthCssClass?: string;
};

const SearchBarOverlay = ({
  additionalOverlayClasses = '',
  additionalWrpperClasses = '',
  additionalSearchBarClasses = '',
  inputTitle = 'insert your text here',
  inputValue = '',
  lightTheme = false,
  redirectPath = '/search',
  resultsCount = 0,
  show = false,
  showResultsCount = false,
}: SearchBarOverlayProps) => {
  const [isOpen, setIsOpen] = useState(show);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSearchClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(!isOpen);
      setTimeout(() => {
        inputRef.current?.focus();
      });
    };
    const initializeSearchButton = () => {
      // find the "search" icon on the menu and attach to it an event so when clicked it toggles the search bar
      const searchBtn = document.querySelector('[data-tag=search]') as HTMLButtonElement;
      if (searchBtn) {
        searchBtn.setAttribute('role', 'button');
        searchBtn.setAttribute('aria-expanded', isOpen.toString());
        searchBtn.addEventListener('click', handleSearchClick);
      }
    };
    document.addEventListener('DOMContentLoaded', initializeSearchButton);
  }, [isOpen]);

  return (
    <div
      id="search-bar-overlay"
      className={additionalWrpperClasses}
    >
      {isOpen && (
        <Overlay
          onCloseHandler={() => setIsOpen(false)}
          additionalClasses={additionalOverlayClasses}
        >
          <SearchBar
            show
            redirectPath={redirectPath}
            additionalClasses={'align-start ' + additionalSearchBarClasses}
            inputTitle={inputTitle}
            inputValue={inputValue}
            lightTheme={lightTheme}
            resultsCount={resultsCount}
            showResultsCount={showResultsCount}
          />
        </Overlay>
      )}
    </div>
  );
};

export default SearchBarOverlay;
