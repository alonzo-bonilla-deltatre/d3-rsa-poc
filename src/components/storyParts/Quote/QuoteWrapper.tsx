import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Quote from '@/components/storyParts/Quote/Quote';

const QuoteWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Quote {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <QuoteWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
