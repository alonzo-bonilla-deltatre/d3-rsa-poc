import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';
import { nanoid } from 'nanoid';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';
import { translate } from '@/utilities/i18n';

const languageNavItemClasses = 'text-sm font-light text-[#BEBEBE]';

type LanguageSwitcherProps = {
  allSiteConfiguration?: FrontendConfiguration;
};

const LanguageSwitcher = ({ ...props }: LanguageSwitcherProps) => {
  const allSiteConfiguration = props.allSiteConfiguration ?? getFrontendAllSiteConfiguration();

  return (
    <>
      <div>
        {allSiteConfiguration &&
          allSiteConfiguration.allSites.map((item: FrontendSiteConfiguration) => {
            return (
              <a
                key={nanoid()}
                href={new URL('/', item.originUrl).href}
                className={`${languageNavItemClasses} pr-4 last:pr-0 pl-0 last:pl-4 border-[#FFFFFF33] border-r last:border-r-0 transition duration-300 hover:text-[#fff]`}
              >
                {translate(item.translation)}
              </a>
            );
          })}
      </div>
    </>
  );
};

export default LanguageSwitcher;
