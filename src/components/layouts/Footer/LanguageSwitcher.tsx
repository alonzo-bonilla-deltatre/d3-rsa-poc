'use client';

import { usePathname } from 'next/navigation';
import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';
import { nanoid } from 'nanoid';

const languageNavItemClasses = 'text-sm font-light text-[#BEBEBE]';

type LanguageSwitcherProps = {
  allSiteConfiguration: FrontendConfiguration;
};

const LanguageSwitcher = ({ ...props }: LanguageSwitcherProps) => {
  const pathname = usePathname();

  return (
    <>
      <div>
        {props.allSiteConfiguration.allSites.map((item: FrontendSiteConfiguration) => {
          return (
            <a
              key={nanoid()}
              href={new URL(pathname ?? '/', item.originUrl).href}
              className={`${languageNavItemClasses} pr-4 last:pr-0 pl-0 last:pl-4 border-[#FFFFFF33] border-r last:border-r-0 transition duration-300 hover:text-[#fff]`}
            >
              {item.translation}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default LanguageSwitcher;
