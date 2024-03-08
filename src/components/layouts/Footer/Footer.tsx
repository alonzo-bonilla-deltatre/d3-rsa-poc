import { ComponentProps, LayoutProps } from '@/models/types/components';
import { hasItemsInSlot, renderItemsInSlot } from '@/services/renderService';
import dynamic from 'next/dynamic';
import { translate } from '@/services/translationService';
import { getBooleanProperty, getDarkClass, getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { Variable } from '@/models/types/pageStructure';
import { createDataVariable } from '@/helpers/dataVariableHelper';
import { MenuSources } from '@/components/modules/Menu/Menu';
const SocialIcons = dynamic(() => import('@/components/common/SocialIcons/SocialIcons'));

enum FooterLayoutSlots {
  logo = 'logo',
  footerContent = 'footerContent',
  footerNavigation = 'footerNavigation',
}

const Footer = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }
  const { isDark } = data.properties as LayoutProps;

  const footerNavigationSource: Variable = createDataVariable('source', MenuSources.footer);

  const socialIconsProps = {
    hide: false,
    size: 34,
    className: `cursor-pointer hover:text-component-layout-footer-social-icon-hover transition duration-300 ${getBooleanProperty(isDark) ? 'text-component-layout-footer-social-icon-dark' : 'text-component-layout-footer-social-icon-light'}`,
  };

  return (
    <footer
      className={`d3-footer ${getDarkClass(isDark)} ${getBooleanProperty(isDark) ? 'bg-component-layout-footer-background-dark text-component-layout-footer-text-dark' : 'bg-component-layout-footer-background-light text-component-layout-footer-text-light'}`}
    >
      <div className="container">
        <div
          className={`flex flex-col py-5 lg:py-10 lg:text-center border-b ${getBooleanProperty(isDark) ? 'border-b-component-layout-footer-border-dark' : 'border-b-component-layout-footer-border-light'}`}
        >
          {hasItemsInSlot(data.items, FooterLayoutSlots.footerContent) && (
            <div className="py-6 lg:text-center flex flex-col">
              {renderItemsInSlot(
                data.items,
                FooterLayoutSlots.footerContent,
                [...(data.variables || []), footerNavigationSource],
                data.metadata,
                data.previewToken
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col py-5 lg:py-10 lg:text-center ">
          <div className={'my-6 lg:text-center flex justify-center gap-4'}>
            <SocialIcons {...socialIconsProps}></SocialIcons>
          </div>
          {hasItemsInSlot(data.items, FooterLayoutSlots.footerNavigation) && (
            <div
              className={`py-6 lg:text-center flex flex-col border-b ${getBooleanProperty(isDark) ? 'border-b-component-layout-footer-border-dark text-component-layout-footer-text-dark' : 'border-b-component-layout-footer-border-light text-component-layout-footer-text-light'}`}
            >
              {renderItemsInSlot(
                data.items,
                FooterLayoutSlots.footerNavigation,
                [...(data.variables || []), footerNavigationSource],
                data.metadata,
                data.previewToken
              )}
            </div>
          )}
        </div>
        <div className={`mt-4 lg:mt-6 lg:text-center flex flex-col pb-5 lg:pb-10`}>
          {hasItemsInSlot(data.items, FooterLayoutSlots.logo) && (
            <div className={'flex justify-center mb-5 min-w-[140px] mx-auto'}>
              {renderItemsInSlot(data.items, FooterLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
            </div>
          )}
          <div
            className={`flex justify-center d3-ty-body-xsmall ${getBooleanProperty(isDark) ? 'text-component-layout-footer-copyright-dark' : 'text-component-layout-footer-copyright-light'}`}
          >
            {translate('footer-copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
