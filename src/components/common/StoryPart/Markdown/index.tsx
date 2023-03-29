import { StoryPart } from "@/models/types/storyPart";
import { nanoid } from "nanoid";

type MarkdownProps = {
  markdownText: string;
};

const Markdown = ({ ...props }: MarkdownProps) => {

  return props.markdownText ? (
    <>
      <div className="text-white prose lg:prose-xl">
        {props.markdownText}
      </div>
    </>
  ) : <></>;
};

export default Markdown;

export const renderMarkdownStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
data ? <Markdown key={nanoid()} markdownText={data.content} /> : <></>;