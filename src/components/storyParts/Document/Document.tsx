import { Document as DocumentComponent } from '@/components/commons/Document/Document';
import { StoryPart } from '@/models/types/storyPart';

const Document = async ({ data }: { data: StoryPart }) => {
  if (!data) return null;

  return (
    <DocumentComponent
      entity={data}
      className="p-2 border transition duration-300 hover:text-link hover:border-link"
      iconSize={80}
    />
  );
};

export default Document;
