import { StoryPart } from '@/models/types/storyPart';
import HtmlContent from '@/components/commons/HtmlContent/HtmlContent';

type TableProps = {
  entity?: StoryPart;
};

const Table = ({ entity }: TableProps) => {
  if (!entity) return null;
  const content = entity?.content;
  const title = content['title'];
  const body = content['body'];
  return (
    <div className="grid grid-cols-1 relative overflow-hidden w-full">
      {title && <div className={'d3-ty-heading-6 font-bold mb-4'}>{title}</div>}
      {body && <HtmlContent content={body} />}
    </div>
  );
};

export default Table;
