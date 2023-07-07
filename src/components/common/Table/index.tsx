import { StoryPart } from '@/models/types/storyPart';
import Title from '@/components/common/Title';

type TableProps = {
  entity?: StoryPart;
};

const Table = ({ ...props }: TableProps) => {
  const { entity } = props as TableProps;
  const content = entity?.content as any;
  const title = content['title'];
  const body = content['body'];

  return entity ? (
    <>
      <div className="grid grid-cols-1 relative overflow-hidden w-full">
        <Title
          title={title}
          heading={'h3'}
          hide={false}
        />
        {body && (
          <div
            className="w-full mx-auto"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Table;
