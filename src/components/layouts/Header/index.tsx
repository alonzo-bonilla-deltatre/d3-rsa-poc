/* istanbul ignore file */

import React from 'react';
import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';

const Header = ({ ...data }: ComponentProps) => {
  return (
    <header className="w-full fixed z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          {data && data.items?.map((item: StructureItem) => renderItem(item))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
