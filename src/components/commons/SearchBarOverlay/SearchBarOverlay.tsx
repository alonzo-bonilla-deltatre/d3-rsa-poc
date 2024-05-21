'use client';

import { useEffect, useRef, useState } from 'react';
import Overlay from '@/components/commons/Overlay/Overlay';
import SearchBar from '@/components/commons/SearchBar/SearchBar';
import { twMerge } from 'tailwind-merge';

type SearchBarOverlayProps = {
  additionalOverlayClasses?: string;
  additionalWrapperClasses?: string;
  additionalSearchBarClasses?: string;
  inputTitle?: string;
  inputValue?: string;
  redirectPath?: string;
};

const SearchBarOverlay = ({
  additionalOverlayClasses = '',
  additionalWrapperClasses = '',
  additionalSearchBarClasses = '',
  inputTitle = 'insert your text here',
  inputValue = '',
  redirectPath = '/search',
}: SearchBarOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSearchClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(!isOpen);
      setTimeout(() => {
        inputRef.current?.focus();
      });
    };
    // find the "search" icon on the menu and attach to it an event so when clicked it toggles the search bar
    const searchBtn = document.querySelector('[data-tag=search]') as HTMLButtonElement;
    if (searchBtn) {
      searchBtn.setAttribute('role', 'button');
      searchBtn.setAttribute('aria-expanded', isOpen?.toString());
      searchBtn.addEventListener('click', handleSearchClick);
    }
  }, [isOpen]);

  return (
    <div
      id="search-bar-overlay"
      className={additionalWrapperClasses}
    >
      {isOpen && (
        <Overlay
          onCloseHandler={() => setIsOpen(false)}
          additionalClasses={additionalOverlayClasses}
        >
          <SearchBar
            redirectPath={redirectPath}
            additionalClasses={twMerge('align-start bg-black text-white', additionalSearchBarClasses)}
            inputTitle={inputTitle}
            inputValue={inputValue}
          />
        </Overlay>
      )}
    </div>
  );
};

export default SearchBarOverlay;
