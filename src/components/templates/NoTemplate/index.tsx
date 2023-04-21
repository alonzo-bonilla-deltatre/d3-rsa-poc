import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import { nanoid } from 'nanoid';

const NoTemplate = ({ ...data }: ComponentProps) => {
  return (
    <div className="d3-o-template d3-o-template--no-template">
      {data?.items && data?.items?.length != 0 && data.items.map((item: StructureItem) => renderItem(item))}
    </div>
  );
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <NoTemplate
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
