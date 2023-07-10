'use client';

import React, { useEffect, useState } from 'react';

type MenuProps = {
  structureItem?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | never[];
};

const HamburgerMenu = ({ ...data }: MenuProps) => {
  const { structureItem } = data as MenuProps;
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((current: boolean) => !current);
  };

  useEffect(() => {
    const cssClasses = 'max-h-[100vh]'; // this will prevent content to scroll vertically
    const contentElement = document.getElementById('main-container');
    contentElement?.classList.toggle(cssClasses, isOpen);
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Extra content menu"
        aria-expanded={isOpen}
        className="group mx-4 space-y-2 z-20 mb-4"
        onClick={toggleMenu}
      >
        <span
          className={`block h-1 w-10 origin-center rounded-full bg-white transition-transform ease-in-out ${
            !isOpen ? 'lg:group-hover:translate-y-1.5 lg:group-hover:rotate-45' : 'translate-y-1.5 rotate-45'
          } transition duration-300`}
        ></span>
        <span
          className={`block h-1 w-10 origin-center rounded-full bg-[#EE3123] transition-transform ease-in-out ${
            !isOpen
              ? 'lg:group-hover:w-10 lg:group-hover:-translate-y-1.5 lg:group-hover:-rotate-45'
              : 'w-10 -translate-y-1.5 -rotate-45'
          } transition duration-300`}
        ></span>
      </button>

      <div
        aria-hidden={!isOpen}
        className={`${isOpen ? 'visible' : 'collapse'} fixed flex w-[100%] h-[100%] bg-black z-10 top-0 left-0`}
      >
        <div className="m-auto">{structureItem}</div>
      </div>
    </>
  );
};

export default HamburgerMenu;
