import { ComponentProps } from '@/models/types/components';
import { hasItemsInSlot, renderItemsInSlot } from '@/services/renderService';
import { translate } from '@/helpers/translationHelper';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { Variable } from '@/models/types/pageStructure';
import { createDataVariable } from '@/helpers/dataVariableHelper';
import { MenuSources } from '@/models/types/menu';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import SocialIcons from '@/components/commons/SocialIcons/SocialIcons';
import Typography from '@/components/commons/Typography/Typography';

enum FooterLayoutSlots {
  logo = 'logo',
  footerContent = 'footerContent',
  footerNavigation = 'footerNavigation',
}

const Footer = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }

  const footerNavigationSource: Variable = createDataVariable('source', MenuSources.footer);

  return (
    <footer className="bg-white text-black border-t">
      <ModuleContainer className="first:mt-0">
        {hasItemsInSlot(data.items, FooterLayoutSlots.footerContent) && (
          <div className="flex flex-col pb-6 lg:pb-10 mb-6 lg:mb-10 h-full border-b border-black">
            {renderItemsInSlot(
              data.items,
              FooterLayoutSlots.footerContent,
              [...(data.variables || []), footerNavigationSource],
              data.metadata,
              data.previewToken
            )}
          </div>
        )}
        <div className="my-6 lg:text-center flex justify-center gap-4">
          <SocialIcons className="cursor-pointer text-grey-500 hover:text-link transition duration-300" />
        </div>
        {hasItemsInSlot(data.items, FooterLayoutSlots.footerNavigation) && (
          <div className="flex flex-col pb-6 lg:pb-10 lg:text-center">
            <div className="pb-6 lg:text-center flex flex-col border-b border-black">
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
            <div className="flex justify-center mb-5 min-w-[140px] mx-auto">
              {renderItemsInSlot(data.items, FooterLayoutSlots.logo, data.variables, data.metadata, data.previewToken)}
            </div>
          )}
          <Typography
            variant="body-xs"
            className="flex justify-center text-grey-500"
          >
            {translate('footer-copyright')}
          </Typography>
        </div>
      </ModuleContainer>
    </footer>
  );
};

export default Footer;
