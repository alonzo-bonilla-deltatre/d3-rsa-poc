import { ComponentProps, HeaderTitleProps, LayoutProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

const Section = ({ ...data }: ComponentProps) => {
  const { removeSectionHtmlTag, isFullScreen } = data.properties as LayoutProps;
  const sectionContainerCssClass = getBooleanProperty(isFullScreen) ? 'w-full' : 'container w-full mx-auto';
  const SectionContainer = `${
    getBooleanProperty(removeSectionHtmlTag) ? 'div' : 'section'
  }` as keyof JSX.IntrinsicElements;
  return <SectionContainer className={sectionContainerCssClass}>{renderSectionComponent(data)}</SectionContainer>;
};

function renderSectionComponent(data: ComponentProps) {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink } =
    data.properties as HeaderTitleProps;
  return (
    <>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        ctaTitle={ctaTitle}
        ctaLink={ctaLink}
      ></HeaderTitle>
      {data?.items &&
        data?.items?.length != 0 &&
        data.items.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </>
  );
}

export default Section;
