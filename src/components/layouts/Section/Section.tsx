import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, LayoutProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import SectionContainer from '@/components/commons/SectionContainer/SectionContainer';

const Section = ({ data }: { data: ComponentProps }) => {
  const { removeSectionHtmlTag, isFullWidth } = data.properties as LayoutProps;
  if (getHideLayout(data)) {
    return null;
  }
  
  return (
    <SectionContainer isFullWidth={isFullWidth} removeSectionHtmlTag={removeSectionHtmlTag}>
      {data.items?.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </SectionContainer>
  );
};

export default Section;
