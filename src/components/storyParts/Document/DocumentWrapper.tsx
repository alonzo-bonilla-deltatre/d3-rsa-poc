import { ReturnComponentRender } from '@/models/types/components';
import { StoryPart } from '@/models/types/storyPart';
import { nanoid } from 'nanoid';
import Document from '@/components/storyParts/Document/Document';

const DocumentWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => {
  return <Document data={data} />;
};

const render = ({ ...data }: StoryPart): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <DocumentWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
