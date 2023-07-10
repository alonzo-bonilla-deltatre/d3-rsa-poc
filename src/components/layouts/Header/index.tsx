/* istanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import { use } from 'react';
import HamburgerMenu from '@/components/common/HamburgerMenu';
import SearchBarOverlay from '@/components/common/SearchBarOverlay';
import { getSearchPath } from '@/components/modules/SearchResults/SearchResultsHelper';
import { PageStructureData } from '@/models/types/pageStructure';
import { getHamburgerStructure } from '@/services/hamburgerService';
import './Header.css';

const logo: string = 'logo';
const primaryNavigation: string = 'primaryNavigation';
const secondaryNavigation: string = 'secondaryNavigation';
const serviceNavigation: string = 'serviceNavigation';
const middleContent: string = 'middleContent';

const Header = ({ ...data }: ComponentProps) => {
  const hamburgerStructure = use(getHamburgerStructure(data.variables, data.previewToken)) as PageStructureData;
  const hamburgerStructureItem = hamburgerStructure?.structure;
  const hamburgerElement = hamburgerStructureItem
    ? renderItem(hamburgerStructureItem, data.variables, data.metadata, data.previewToken)
    : [];

  return (
    <header className="w-full z-10 bg-gradient-to-b from-black to-transparent">
      <nav className="my-4">
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
        <div className="container px-4 mx-auto">
          <div
            className="w-full flex items-center"
            id={`${primaryNavigation}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, primaryNavigation, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className="w-full flex items-center justify-center bg-gray-800"
            id={`${secondaryNavigation}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, secondaryNavigation, data.variables, data.metadata, data.previewToken)}
          </div>
          <div
            className="w-full flex items-center"
            id={`${middleContent}_${nanoid()}`}
          >
            {renderItemsInSlot(data.items, middleContent, data.variables, data.metadata, data.previewToken)}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
