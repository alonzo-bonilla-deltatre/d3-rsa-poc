import { StoryPart } from '@/models/types/storyPart';
import HtmlContent from '@/components/commons/HtmlContent/HtmlContent';
import Typography from '@/components/commons/Typography/Typography';

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
      {title && <Typography variant={'h6'} className={'mb-4'}>{title}</Typography>}
      {body && <HtmlContent content={body} />}
    </div>
  );
};

export default Table;
