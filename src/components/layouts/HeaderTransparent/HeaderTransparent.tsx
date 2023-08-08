import HamburgerMenu from '@/components/common/HamburgerMenu/HamburgerMenu';
import { ComponentProps } from '@/models/types/components';
import { PageStructureData } from '@/models/types/pageStructure';
import { getHamburgerStructure } from '@/services/hamburgerService';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import { use } from 'react';
import SearchBarOverlay from '@/components/common/SearchBarOverlay/SearchBarOverlay';
import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';
import './HeaderTransparent.css';

const logo: string = 'logo';
const serviceNavigation: string = 'serviceNavigation';

const HeaderTransparent = ({ ...data }: ComponentProps) => {
  const hamburgerStructure = use(getHamburgerStructure(data.variables, data.previewToken)) as PageStructureData;
  const hamburgerStructureItem = hamburgerStructure?.structure;
  const hamburgerElement = hamburgerStructureItem
    ? renderItem(hamburgerStructureItem, data.variables, data.metadata, data.previewToken)
    : [];

  return (
    <header
      className={`z-10 w-full h-[76px] lg:h-[71px] transition-colors duration-200 ease-linear text-white fixed top-0 left-0 right-0`}
      id="header"
    >
      <nav className="h-full">
        <div className="container px-4 mx-auto flex flex-wrap justify-center md:items-center md:justify-between">
          <HamburgerMenu structureItem={hamburgerElement}></HamburgerMenu>
          <div
            className="flex items-center"
            role="presentation"
            id={`${logo}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, logo, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className="flex justify-end"
            id={`${serviceNavigation}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, serviceNavigation, data.variables, data.metadata, data.previewToken)}
          </div>
        </div>
        <SearchBarOverlay redirectPath={getSearchPath(data.variables)} />
      </nav>
    </header>
  );
};

export default HeaderTransparent;
