import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import { nanoid } from 'nanoid';

const Section = ({ ...data }: ComponentProps) => {
  const { properties } = data;
  const columns = (properties.templates as number) || 12;
  return (
    <section className={`grid grid-cols-${columns} gap-4`}>
      {data?.items &&
        data?.items?.length != 0 &&
        data.items.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </section>
  );
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <Section
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
