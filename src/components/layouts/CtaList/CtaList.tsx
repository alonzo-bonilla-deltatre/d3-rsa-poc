import { ComponentProps, LayoutProps } from '@/models/types/components';
import { hasItemsInSlot, renderItemsInSlot } from '@/services/renderService';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { getBooleanProperty, getDarkClass, getHideLayout } from '@/helpers/pageComponentPropertyHelper';

const CtaList = ({ data }: { data: ComponentProps }) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, isDark, isFullWidth } = data.properties as LayoutProps;
  if (getHideLayout(data)) {
    return null;
  }
  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-cta-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)} ${getBooleanProperty(isDark) ? 'bg-component-layout-cta-list-background-dark' : ''}`,
        children: hasItemsInSlot(data.items, 'items') ? (
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 lg:gap-4 text-component-layout-cta-list-text-light dark:text-component-layout-cta-list-text-dark">
            {renderItemsInSlot(data.items, 'items', data.variables, data.metadata, data.previewToken)}
          </div>
        ) : undefined,
      }}
    />
  );
};

export default CtaList;
