import { StoryPart } from '@/models/types/storyPart';
import Markdown from '@/components/storyParts/Markdown/Markdown';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const MarkdownWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Markdown data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <MarkdownWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
