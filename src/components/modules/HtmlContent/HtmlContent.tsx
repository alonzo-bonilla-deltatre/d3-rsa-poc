import { ComponentProps } from '@/models/types/components';
import HtmlContentComponent from '@/components/common/HtmlContent/HtmlContent';

type ModuleProps = {
  content?: string;
};

const HtmlContent = ({ ...data }: ComponentProps) => {
  const { content } = data.properties as ModuleProps;

  return <HtmlContentComponent content={content} />;
};
export default HtmlContent;
