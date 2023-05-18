import { transform } from '@/helpers/markdownHelper';
import './Markdown.scss';

type MarkdownProps = {
  markdownText: string;
};

const Markdown = async ({ ...props }: MarkdownProps) => {
  const html = await transform(props.markdownText);
  return props.markdownText ? (
    <>
      <div
        className="c-markdown-story-part text-white prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  ) : (
    <></>
  );
};

export default Markdown;
