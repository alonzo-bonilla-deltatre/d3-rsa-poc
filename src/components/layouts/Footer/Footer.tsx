import { ComponentProps } from '@/models/types/components';
import { hasItemsInSlot, renderItemsInSlot } from '@/services/renderService';
import { translate } from '@/helpers/translationHelper';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { Variable } from '@/models/types/pageStructure';
import { createDataVariable } from '@/helpers/dataVariableHelper';
import { MenuSources } from '@/models/types/menu';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import SocialIcons from '@/components/commons/SocialIcons/SocialIcons';

enum FooterLayoutSlots {
  logo = 'logo',
  footerContent = 'footerContent',
  footerNavigation = 'footerNavigation',
  serviceNavigation = 'serviceNavigation',
}

const Footer = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }

  const footerNavigationSource: Variable = createDataVariable('source', MenuSources.footer);

  return (
    <footer>
      <ModuleContainer className={'border-t pt-6 last:mb-10'}>
        {hasItemsInSlot(data.items, FooterLayoutSlots.footerContent) && (
          <div className="flex flex-col pb-6 lg:pb-10 mb-6 lg:mb-10 h-full border-b">
            {renderItemsInSlot(
              data.items,
              FooterLayoutSlots.footerContent,
              [...(data.variables || []), footerNavigationSource],
              data.metadata,
              data.previewToken
            )}
          </div>
        )}
        <div className={'my-6 lg:text-center flex justify-center gap-4'}>
          <SocialIcons />
        </div>
        {hasItemsInSlot(data.items, FooterLayoutSlots.serviceNavigation) && (
          <div className="flex flex-col pb-6 lg:pb-10 lg:text-center">
            <div className="pb-6 lg:text-center flex flex-col border-b">
              {renderItemsInSlot(
                data.items,
                FooterLayoutSlots.serviceNavigation,
                [...(data.variables || []), footerNavigationSource],
                data.metadata,
                data.previewToken
              )}
            </div>
          </div>
        )}
        {hasItemsInSlot(data.items, FooterLayoutSlots.footerNavigation) && (
          <div className="flex flex-col pb-6 lg:pb-10 lg:text-center">
            <div className="pb-6 lg:text-center flex flex-col border-b">
              {renderItemsInSlot(
                data.items,
                FooterLayoutSlots.footerNavigation,
                [...(data.variables || []), footerNavigationSource],
                data.metadata,
                data.previewToken
              )}
            </div>
          </div>
        )}
        <div className="lg:text-center flex flex-col">
          {hasItemsInSlot(data.items, FooterLayoutSlots.logo) && (
            <div className={'flex justify-center mb-5 min-w-[140px] mx-auto'}>
              {renderItemsInSlot(data.items, FooterLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
            </div>
          )}
          <div className="flex justify-center">{translate('footer-copyright')}</div>
        </div>
      </ModuleContainer>
    </footer>
  );
};

export default Footer;
