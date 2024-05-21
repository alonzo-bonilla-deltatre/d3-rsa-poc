import { ComponentProps, ModuleProps } from '@/models/types/components';
import HtmlContentComponent from '@/components/commons/HtmlContent/HtmlContent';
import { getHideModule } from '@/helpers/pageComponentPropertyHelper';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type HtmlContentProps = {
  content?: string;
} & ModuleProps;

const HtmlContent = ({ data }: { data: ComponentProps }) => {
  const { content, isFullWidth } = data.properties as HtmlContentProps;

  if (getHideModule(data)) return null;

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <HtmlContentComponent
        content={content}
      />
    </ModuleContainer>
  );
};

export default HtmlContent;
