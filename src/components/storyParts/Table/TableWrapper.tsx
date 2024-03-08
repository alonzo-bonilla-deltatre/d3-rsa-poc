import { StoryPart } from '@/models/types/storyPart';
import Table from '@/components/storyParts/Table/Table';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const TableWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Table data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <TableWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
