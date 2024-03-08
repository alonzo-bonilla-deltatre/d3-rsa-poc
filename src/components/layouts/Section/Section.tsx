import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { getBooleanProperty, getDarkClass, getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, LayoutProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import { parseFieldValue } from '@/utilities/fieldValueParser';

const Section = ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
    isDark,
    removeSectionHtmlTag,
    isFullWidth,
  } = data.properties as LayoutProps;
  if (getHideLayout(data)) {
    return null;
  }
  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        removeSectionHtmlTag: removeSectionHtmlTag,
        sectionClassName: `d3-section-layout ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)} ${getBooleanProperty(isDark) ? 'bg-component-layout-section-background-dark' : ''}`,
        children:
          data?.items?.length != 0 ? (
            <div className={'text-component-layout-section-text-light dark:text-component-layout-section-text-dark'}>
              {data.items?.map((item: StructureItem) =>
                renderItem(item, data.variables, data.metadata, data.previewToken)
              )}
            </div>
          ) : undefined,
      }}
    />
  );
};

export default Section;
