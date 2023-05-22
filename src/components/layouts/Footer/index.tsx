/* istanbul ignore file */

import React from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';

// @ts-ignore
const SocialIcons = dynamic(() => import('@/components/common/SocialIcons'));
// @ts-ignore
const LanguageSwitcher = dynamic(() => import('@/components/common/LanguageSwitcher'));

const Footer = ({ ...data }: ComponentProps) => {
  const socialIconsProps = {
    hide: false,
    size: 34,
    className: 'mr-4 cursor-pointer hover:text-[#EE3123] transition duration-300',
  };

  return (
    <footer className="w-full text-sm">
      {/* Fixed Slots */}
      <div className="container flex flex-col md:flex-row md:justify-between px-4 mx-auto py-4 md:py-12 border-b border-[#FFFFFF33]">
        <div className="flex py-6">
          <SocialIcons {...socialIconsProps}></SocialIcons>
        </div>

        <div className="flex items-center text-[#BEBEBE] pb-6 md:pb-0">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="bg-[#141414]/0">
        <div className="container mx-auto py-12 lg:text-center">
          <div className="flex flex-col lg:flex-row uppercase justify-between">
            {/* Footer  */}
            {data &&
              data.items?.map((item: StructureItem) =>
                renderItem(item, data.variables, data.metadata, data.previewToken)
              )}
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
