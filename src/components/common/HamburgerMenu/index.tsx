'use client';

import React, { useState } from 'react';

type MenuProps = {
  structureItem: React.ReactElement<any, string | React.JSXElementConstructor<any>> | never[];
};

const HamburgerMenu = ({ ...data }: MenuProps) => {
  const { structureItem } = data as MenuProps;
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl">
          {isOpen && (
            <div className="fixed w-[100%] h-[100%] bg-black z-10 top-0 left-0 cursor-default overflow-auto py-12">
              <div className="space-y-2 py-4 container px-4 mx-auto">
                <div
                  className="mx-4 space-y-2"
                  onClick={toggleMenu}
                >
                  <span className="block h-1 w-10 origin-center rounded-full bg-white transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45 transition duration-300"></span>
                  <span className="block h-1 w-8 origin-center rounded-full bg-[#EE3123] transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45 transition duration-300"></span>
                </div>
                <div className="container mx-auto my-4 py-4 flex w-full">{structureItem}</div>
              </div>
            </div>
          )}
          <div
            className="space-y-2"
            onClick={toggleMenu}
          >
            <span className="block h-1 w-10 origin-center rounded-full bg-white transition-transform ease-in-out transition duration-300"></span>
            <span className="block h-1 w-8 origin-center rounded-full bg-[#EE3123] transition-transform ease-in-out transition duration-300"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
