import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import GridList from '@/components/modules/GridList/GridList';
import { nanoid } from 'nanoid';

const GridListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <GridList data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <GridListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
