import { transform } from '@/helpers/markdown';
import './Markdown.scss';

type MarkdownProps = {
  markdownText: string;
};

const Markdown = async ({ ...props }: MarkdownProps) => {
  const markdownTransformFetch = transform(props.markdownText);
  const [html] = await Promise.all([markdownTransformFetch]);
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
