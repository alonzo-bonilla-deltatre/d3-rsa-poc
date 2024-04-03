import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { getGridChildrenCssClasses } from '@/components/layouts/DynamicGrid/DynamicGridHelper';
import { getBooleanProperty, getDarkClass, getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, HeaderTitleProps, LayoutProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';

export type DynamicGridProps = {
  gridTemplate: string;
  componentProps: ComponentProps;
};

const DynamicGrid = ({ gridTemplate, componentProps }: DynamicGridProps) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink } =
    componentProps.properties as HeaderTitleProps;
  const { isFullWidth, isDark } = componentProps.properties as LayoutProps;
  const { items, variables, metadata, previewToken } = componentProps;
  const childrenClasses: string[] = getGridChildrenCssClasses(gridTemplate);
  const slotsLength: number = gridTemplate.split('-').length;
  if (getHideLayout(componentProps)) {
    return null;
  }
  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        ctaLink: parseFieldValue(ctaLink, componentProps.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-section-layout ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)} ${getBooleanProperty(isDark) ? 'bg-component-layout-dynamic-grid-background-dark' : ''}`,
        children: (
          <div className="d3-grid-container grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 lg:gap-y-6 text-component-layout-dynamic-grid-text-light dark:text-component-layout-dynamic-grid-text-dark">
            {[...Array(slotsLength)].map((_, index: number) => (
              <div
                className={`col-span-1 ${childrenClasses[index]}`}
                key={index}
              >
                {renderItemsInSlot(items, 'col' + (index + 1), variables, metadata, previewToken)}
              </div>
            ))}
          </div>
        ),
      }}
    />
  );
};

export default DynamicGrid;
