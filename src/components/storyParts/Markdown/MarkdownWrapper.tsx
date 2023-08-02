import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Markdown from '@/components/storyParts/Markdown/Markdown';

const MarkdownWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Markdown {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <MarkdownWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
