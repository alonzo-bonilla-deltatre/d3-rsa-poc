'use client';

import React, { useEffect, useState } from 'react';
import { renderSvgIcon } from '@/components/icons';

type DrawerProps = {
  children: React.ReactNode;
};

const HamburgerDrawer = ({ children }: DrawerProps) => {
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

  const drawerClassname = `bg-white flex transform transition-transform duration-300 ease-in-out top-0 ltr:left-0 rtl-right-0 w-full md:w-[360px] lg:w-[464px] h-full fixed overflow-hidden ${
    isOpen
      ? 'drawer-open ltr:translate-x-0 rtl:transform-none ltr:left-0 rtl:right-0'
      : 'ltr:-translate-x-[100vw] rtl:translate-x-[100vw]'
  }
`;

  return (
    <div className="flex z-50">
      {isOpen && (
        <div
          className="cover-screen left-0 top-0 right-0 bottom-0 fixed bg-black/60"
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
          className: `fill-current transition duration-300 text-white hover:text-link`,
        })}
      </button>
      <div className={drawerClassname}>
        <button
          className="cursor-pointer absolute top-6 ltr:left-8 rtl:right-8"
          onClick={() => setOpen(false)}
          id="hamburger-open"
          aria-label="Close"
        >
          {renderSvgIcon('Close', {
            width: 16,
            height: 16,
            className: `fill-current transition duration-300 hover:text-link`,
          })}
        </button>
        <div className="flex flex-col h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default HamburgerDrawer;
