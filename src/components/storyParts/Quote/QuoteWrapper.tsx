import { StoryPart } from '@/models/types/storyPart';
import Quote from '@/components/storyParts/Quote/Quote';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const QuoteWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Quote data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <QuoteWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
