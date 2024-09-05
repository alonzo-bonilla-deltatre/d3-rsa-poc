import { Document as DocumentComponent } from '@/components/commons/Document/Document';
import { StoryPart } from '@/models/types/storyPart';

const Document = async ({ data }: { data: StoryPart }) => {
  if (!data) return null;

  return (
    <DocumentComponent
      entity={data}
      className="border p-2 transition duration-300 hover:border-link hover:text-link"
      iconSize={80}
    />
  );
};

export default Document;
