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
    <div className="z-50 flex">
      {isOpen && (
        <div
          className="cover-screen fixed bottom-0 left-0 right-0 top-0 bg-black/60"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <button
        className="group h-full w-full space-y-2"
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
          className="absolute top-6 cursor-pointer ltr:left-8 rtl:right-8"
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
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>
    </div>
  );
};

export default HamburgerDrawer;
