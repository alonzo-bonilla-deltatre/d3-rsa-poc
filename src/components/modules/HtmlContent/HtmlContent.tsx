import { ComponentProps, ModuleProps } from '@/models/types/components';
import HtmlContentComponent from '@/components/commons/HtmlContent/HtmlContent';
import { getDarkClass, getHideModule } from '@/helpers/pageComponentPropertyHelper';

type HtmlContentProps = {
  content?: string;
} & ModuleProps;

const HtmlContent = ({ data }: { data: ComponentProps }) => {
  const { content, isDark } = data.properties as HtmlContentProps;

  if (getHideModule(data)) return null;

  return (
    <HtmlContentComponent
      content={content}
      className={getDarkClass(isDark)}
    />
  );
};

export default HtmlContent;
