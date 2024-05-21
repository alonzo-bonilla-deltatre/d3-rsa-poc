import { FrontendConfiguration, FrontendSiteConfiguration } from '@/models/types/frontendConfiguration';
import { getFrontendAllSiteConfiguration } from '@/services/configurationService';
import { translate } from '@/helpers/translationHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type LanguageSwitcherProps = {
  allSiteConfiguration?: FrontendConfiguration;
  languageNavItemCssClasses?: string;
  languageContainerNavItemCssClasses?: string;
  languageContainerCssClasses?: string;
  languageSeparatorCssClasses?: string;
  hasLanguageSeparator?: boolean;
};

const LanguageSwitcher = ({
  allSiteConfiguration,
  languageNavItemCssClasses = `text-sm font-normal transition duration-300 hover:text-link`,
  languageContainerNavItemCssClasses = 'w-fit inline-flex gap-2',
  languageContainerCssClasses = 'overflow-auto inline-flex gap-2',
  languageSeparatorCssClasses = 'border-l border-l-text-component-commons-language-switcher-separator rotate-[17deg]',
  hasLanguageSeparator,
}: LanguageSwitcherProps) => {
  allSiteConfiguration = allSiteConfiguration ?? getFrontendAllSiteConfiguration();
  const navItemCssClasses = languageNavItemCssClasses ?? languageNavItemCssClasses;
  const containerNavItemCssClasses = languageContainerNavItemCssClasses ?? languageContainerNavItemCssClasses;

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
                  className={navItemCssClasses}
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
