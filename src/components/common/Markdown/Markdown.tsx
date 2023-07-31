import { transform } from '@/helpers/markdownHelper';
import '@/components/common/Markdown/Markdown.scss';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

type MarkdownProps = {
  markdownText?: string;
};

const Markdown = async ({ ...props }: MarkdownProps) => {
  const html = await transform(props.markdownText);
  return props.markdownText ? (
    <>
      <HtmlContent
        content={html}
        classNames={'c-markdown-story-part text-white prose lg:prose-xl'}
      />
    </>
  ) : (
    <></>
  );
};

export default Markdown;
