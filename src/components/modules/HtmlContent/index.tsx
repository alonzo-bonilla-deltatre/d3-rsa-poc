import { ComponentProps } from '@/models/types/components';

type ModuleProps = {
  content?: string;
};

const HtmlContent = ({ ...data }: ComponentProps) => {
  const { content } = data.properties as ModuleProps;

  return (
    <div
      className="htmlcontent-code w-full"
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
    />
  );
};
export default HtmlContent;
