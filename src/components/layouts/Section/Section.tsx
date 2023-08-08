import { ComponentProps, HeaderTitleProps, LayoutProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';

const Section = ({ ...data }: ComponentProps) => {
  const { removeSectionHtmlTag, isFullScreen } = data.properties as LayoutProps;
  const sectionContainerCssClass = isFullScreen?.toString() === 'true' ? 'w-full' : 'container w-full mx-auto';
  const SectionContainer = `${
    removeSectionHtmlTag?.toString() === 'true' ? 'div' : 'section'
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
        hideHeaderTitle={hideHeaderTitle?.toString() === 'true'}
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
