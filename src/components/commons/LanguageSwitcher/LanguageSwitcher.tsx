import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';
import { translate } from '@/helpers/translationHelper';
import { twMerge } from 'tailwind-merge';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';

type LanguageSwitcherProps = {
  allSiteConfiguration?: FrontendConfiguration;
  languageNavItemCssClasses?: string;
  languageContainerNavItemCssClasses?: string;
  languageContainerCssClasses?: string;
  languageSeparatorCssClasses?: string;
  hasLanguageSeparator?: boolean;
  variables?: Variable[];
};

const LanguageSwitcher = ({
  allSiteConfiguration,
  languageNavItemCssClasses = `text-sm font-normal transition duration-300 hover:text-link`,
  languageContainerNavItemCssClasses = 'w-fit inline-flex gap-2',
  languageContainerCssClasses = 'overflow-auto inline-flex gap-2',
  languageSeparatorCssClasses = 'border-l border-l-text-component-commons-language-switcher-separator rotate-[17deg]',
  hasLanguageSeparator,
  variables
}: LanguageSwitcherProps) => {
  allSiteConfiguration = allSiteConfiguration ?? getFrontendAllSiteConfiguration();
  const navItemCssClasses = languageNavItemCssClasses ?? languageNavItemCssClasses;
  const containerNavItemCssClasses = languageContainerNavItemCssClasses ?? languageContainerNavItemCssClasses;
  const pageBaseUrl = getDataVariable(variables, 'pageBaseUrl');
  
  return (
    <div className={languageContainerCssClasses}>
      {allSiteConfiguration &&
        allSiteConfiguration.allSites.map(
          (item: FrontendSiteConfiguration, index: number, array: FrontendSiteConfiguration[]) => {
            return (
              <div
                key={index}
                className={containerNavItemCssClasses}
              >
                <a
                  href={new URL('/', item.url).href}
                  className={twMerge(navItemCssClasses, pageBaseUrl && item.url.startsWith(pageBaseUrl) ? 'font-bold' : '')}
                >
                  {translate(item.translation)}
                </a>
                {index + 1 !== array.length && hasLanguageSeparator && <div className={languageSeparatorCssClasses} />}
              </div>
            );
          }
        )}
    </div>
  );
};

export default LanguageSwitcher;
