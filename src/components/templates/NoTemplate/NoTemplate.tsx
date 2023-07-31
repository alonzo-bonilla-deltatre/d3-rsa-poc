import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';

const NoTemplate = ({ ...data }: ComponentProps) => {
  return (
    <div
      id="main-container"
      className="d3-o-template d3-o-template--no-template"
    >
      {data?.items &&
        data?.items?.length != 0 &&
        data.items.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </div>
  );
};

export default NoTemplate;
