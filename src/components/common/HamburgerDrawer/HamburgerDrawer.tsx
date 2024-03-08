'use client';

import React, { useEffect, useState } from 'react';
import '@/components/common/HamburgerDrawer/HamburgerDrawer.scss';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { renderSvgIcon } from '@/components/icons';

type DrawerProps = {
  children: React.ReactNode;
  isDark: boolean;
  isDarkHeader: boolean;
};

const HamburgerDrawer = ({ children, isDark, isDarkHeader }: DrawerProps) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const drawerClassname = `drawer-wrapper flex transform transition-transform duration-300 ease-in-out ${getBooleanProperty(isDark) ? 'bg-component-layout-hamburger-background-dark component-layout-hamburger-text-dark' : 'bg-component-layout-hamburger-background-light component-layout-hamburger-text-light'} ${
    isOpen ? 'drawer-open translate-x-0' : '-translate-x-full rtl:translate-x-full'
  }
`;

  return (
    <div className={`flex z-50`}>
      {isOpen && (
        <div
          className="cover-screen"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <button
        className="group space-y-2 w-full h-full"
        onClick={() => setOpen(true)}
        aria-expanded={isOpen}
        id="hamburger"
        aria-label="Open"
      >
        {renderSvgIcon('HamburgerMenu', {
          width: 32,
          height: 32,
          className: `fill-current ${getBooleanProperty(isDarkHeader) ? 'text-component-common-common-header-text-dark' : 'text-component-common-common-header-text-light'}`,
        })}
      </button>
      <div className={drawerClassname}>
        <button
          className={`cursor-pointer absolute top-6 ltr:left-8 rtl:right-8 ${getBooleanProperty(isDark) ? 'text-component-layout-hamburger-text-dark' : 'text-component-layout-hamburger-text-light'}`}
          onClick={() => setOpen(false)}
          id="hamburger-open"
          aria-label="Close"
        >
          {renderSvgIcon('Close', {
            width: 16,
            height: 16,
            className: `fill-current ${getBooleanProperty(isDark) ? 'text-component-layout-hamburger-text-dark' : 'text-component-layout-hamburger-text-light'}`,
          })}
        </button>
        <div className="flex flex-col h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default HamburgerDrawer;
