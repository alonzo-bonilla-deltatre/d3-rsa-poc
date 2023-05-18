/* istanbul ignore file */

import React from 'react';
import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import HamburgerMenu from '@/components/common/HamburgerMenu';

const logo: string = 'logo';
const primaryNavigation: string = 'primaryNavigation';
const serviceNavigation: string = 'serviceNavigation';
const middleContent: string = 'middleContent';

const Header = ({ ...data }: ComponentProps) => {
  return (
    <header className="w-full z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <HamburgerMenu
            menuItems={[]}
            navItemClasses={''}
          ></HamburgerMenu>
          <div
            className="flex items-center"
            role="presentation"
            id={`${logo}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, logo)}
          </div>
          <div
            className="flex justify-end text-gray-600"
            id={`${serviceNavigation}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, serviceNavigation)}
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div
            className="w-full flex items-center bg-white"
            id={`${primaryNavigation}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, primaryNavigation)}
          </div>
          <div
            className="w-full flex items-center"
            id={`${middleContent}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, middleContent)}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
