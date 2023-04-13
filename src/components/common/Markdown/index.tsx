import {Transform} from "@/helpers/markdown";

type MarkdownProps = {
  markdownText: string;
};

const Markdown = async ({...props}: MarkdownProps) => {
  const markdownTransformFetch = Transform(props.markdownText);
  const [html] = await Promise.all([markdownTransformFetch]);
  return props.markdownText ? (
      <>
        <div className="c-markdown-story-part text-white prose lg:prose-xl" dangerouslySetInnerHTML={{__html: html}}/>
      </>
  ) : <></>;
};

export default Markdown;
