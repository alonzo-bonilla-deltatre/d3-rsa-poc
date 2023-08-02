import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Table from '@/components/storyParts/Table/Table';

const TableWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Table {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <TableWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
