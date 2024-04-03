import HtmlContent from '@/components/commons/HtmlContent/HtmlContent';
import { transform } from '@/helpers/markdownHelper';

type MarkdownProps = {
  markdownText?: string;
  containerClassName?: string;
  classNames?: string;
};

const Markdown = async ({ markdownText, classNames, containerClassName }: MarkdownProps) => {
  if (!markdownText) return null;
  const html = await transform(markdownText);
  if (!html) return null;

  return (
    <div className={`d3-markdown ${containerClassName ? containerClassName : ''}`}>
      <HtmlContent
        content={html}
        className={classNames ? classNames : ''}
        fromMarkdown
      />
    </div>
  );
};

export default Markdown;
